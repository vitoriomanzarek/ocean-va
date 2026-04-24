"""
Download all Webflow CDN images referenced in vasData.json and blogData.json
and save them under public/images/ with clean slug-based filenames.

Usage:
    python scripts/download-webflow-images.py           # download everything
    python scripts/download-webflow-images.py --patch   # also update JSON files with local paths
    python scripts/download-webflow-images.py --vas     # only VA images
    python scripts/download-webflow-images.py --blog    # only blog images
    python scripts/download-webflow-images.py --dry-run # show what would be downloaded

Output:
    public/images/vas/[slug].jpg       — VA profile photos
    public/images/blog/[slug].jpg      — blog cover images
    public/images/authors/[slug].jpg   — blog author photos
    src/data/image-mapping.json        — old URL -> new local path mapping
"""

import json
import os
import sys
import time
import argparse
import mimetypes
from pathlib import Path
from urllib.parse import urlparse, unquote
from concurrent.futures import ThreadPoolExecutor, as_completed

try:
    import requests
except ImportError:
    print("Install requests first:  pip install requests")
    sys.exit(1)

# ── Config ─────────────────────────────────────────────────────────────────────
WORKERS = 8          # parallel download threads
TIMEOUT = 30         # seconds per request
RETRY   = 2          # retries on failure
DELAY   = 0.05       # seconds between batches (be polite to CDN)

WEBFLOW_HOST = 'cdn.prod.website-files.com'

VAS_DIR    = Path('public/images/vas')
BLOG_DIR   = Path('public/images/blog')
AUTHOR_DIR = Path('public/images/authors')

VAS_JSON   = Path('src/data/vasData.json')
BLOG_JSON  = Path('src/data/blogData.json')
MAPPING    = Path('src/data/image-mapping.json')

# ── Helpers ────────────────────────────────────────────────────────────────────
def is_webflow(url):
    if not url:
        return False
    try:
        return WEBFLOW_HOST in urlparse(url).netloc
    except Exception:
        return False

def ext_from_url(url):
    path = unquote(urlparse(url).path)
    ext = Path(path).suffix.lower()
    if ext in ('.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'):
        return ext
    return '.jpg'  # fallback

def download_image(url, dest_path, retries=RETRY):
    """Download url to dest_path. Returns (url, dest_path, status)."""
    if dest_path.exists():
        return url, dest_path, 'skipped'

    dest_path.parent.mkdir(parents=True, exist_ok=True)
    attempt = 0
    while attempt <= retries:
        try:
            r = requests.get(url, timeout=TIMEOUT, headers={
                'User-Agent': 'Mozilla/5.0 (OceanVA image migration script)'
            })
            if r.status_code == 404:
                return url, dest_path, 'not_found'
            r.raise_for_status()
            dest_path.write_bytes(r.content)
            return url, dest_path, 'downloaded'
        except Exception as e:
            attempt += 1
            if attempt > retries:
                return url, dest_path, f'error: {e}'
            time.sleep(1)

# ── Build download queue ────────────────────────────────────────────────────────
def build_queue(include_vas=True, include_blog=True):
    """Returns list of (url, dest_path, field_path) tuples."""
    queue = []

    if include_vas and VAS_JSON.exists():
        vas = json.loads(VAS_JSON.read_text(encoding='utf-8'))
        for va in vas:
            slug = va.get('slug', va.get('itemId', 'unknown'))
            image = va.get('image', '')
            if is_webflow(image):
                ext = ext_from_url(image)
                queue.append((image, VAS_DIR / f"{slug}{ext}", ('image', slug)))

    if include_blog and BLOG_JSON.exists():
        blogs = json.loads(BLOG_JSON.read_text(encoding='utf-8'))
        for post in blogs:
            slug = post.get('slug', post.get('itemId', 'unknown'))

            cover = post.get('coverImage', '')
            if is_webflow(cover):
                ext = ext_from_url(cover)
                queue.append((cover, BLOG_DIR / f"{slug}{ext}", ('coverImage', slug)))

            author_img = post.get('authorImage', '')
            if is_webflow(author_img):
                ext = ext_from_url(author_img)
                # Author images may repeat across posts; use hash of URL as key
                url_hash = str(abs(hash(author_img)) % 10**8)
                queue.append((author_img, AUTHOR_DIR / f"{url_hash}{ext}", ('authorImage', slug)))

    # Deduplicate by destination path (same URL may appear multiple times)
    seen = {}
    deduped = []
    for url, dest, meta in queue:
        key = str(dest)
        if key not in seen:
            seen[key] = True
            deduped.append((url, dest, meta))

    return deduped

# ── Run downloads ───────────────────────────────────────────────────────────────
def run(queue, dry_run=False):
    mapping = {}
    if MAPPING.exists():
        try:
            mapping = json.loads(MAPPING.read_text(encoding='utf-8'))
        except Exception:
            pass

    if dry_run:
        print(f"\nDRY RUN — would download {len(queue)} images:\n")
        for url, dest, _ in queue[:20]:
            print(f"  {url[:80]}...")
            print(f"  -> {dest}")
        if len(queue) > 20:
            print(f"  ... and {len(queue) - 20} more")
        return mapping

    downloaded = skipped = errors = not_found = 0
    total = len(queue)

    print(f"\nDownloading {total} images with {WORKERS} workers...\n")

    with ThreadPoolExecutor(max_workers=WORKERS) as executor:
        futures = {
            executor.submit(download_image, url, dest): (url, dest)
            for url, dest, _ in queue
        }

        for i, future in enumerate(as_completed(futures), 1):
            url, dest = futures[future]
            try:
                _, path, status = future.result()
            except Exception as e:
                status = f'error: {e}'
                path = dest

            local_path = '/' + str(path).replace('\\', '/').removeprefix('public/')

            if status == 'downloaded':
                downloaded += 1
                mapping[url] = local_path
            elif status == 'skipped':
                skipped += 1
                mapping[url] = local_path  # keep existing mapping
            elif status == 'not_found':
                not_found += 1
            else:
                errors += 1
                print(f"  FAIL [{status}] {url[:70]}...")

            if i % 50 == 0 or i == total:
                print(f"  [{i}/{total}] downloaded={downloaded} skipped={skipped} errors={errors} not_found={not_found}")

    # Save mapping
    MAPPING.parent.mkdir(parents=True, exist_ok=True)
    MAPPING.write_text(json.dumps(mapping, indent=2, ensure_ascii=False), encoding='utf-8')

    print(f"\nDone!")
    print(f"  Downloaded : {downloaded}")
    print(f"  Skipped    : {skipped} (already existed)")
    print(f"  Not found  : {not_found}")
    print(f"  Errors     : {errors}")
    print(f"  Mapping    : {MAPPING}  ({len(mapping)} entries)")

    return mapping

# ── Patch JSON files ────────────────────────────────────────────────────────────
def patch_json(mapping):
    """Replace Webflow CDN URLs in vasData.json and blogData.json with local paths."""
    changed_vas = changed_blog = 0

    if VAS_JSON.exists():
        vas = json.loads(VAS_JSON.read_text(encoding='utf-8'))
        for va in vas:
            if va.get('image') in mapping:
                va['image'] = mapping[va['image']]
                changed_vas += 1
        VAS_JSON.write_text(json.dumps(vas, indent=2, ensure_ascii=False), encoding='utf-8')
        print(f"Patched {changed_vas} VA image URLs in {VAS_JSON}")

    if BLOG_JSON.exists():
        blogs = json.loads(BLOG_JSON.read_text(encoding='utf-8'))
        for post in blogs:
            if post.get('coverImage') in mapping:
                post['coverImage'] = mapping[post['coverImage']]
                changed_blog += 1
            if post.get('authorImage') in mapping:
                post['authorImage'] = mapping[post['authorImage']]
        BLOG_JSON.write_text(json.dumps(blogs, indent=2, ensure_ascii=False), encoding='utf-8')
        print(f"Patched {changed_blog} blog cover URLs in {BLOG_JSON}")

# ── CLI ─────────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description='Download Webflow CDN images')
    parser.add_argument('--vas',     action='store_true', help='Only VA images')
    parser.add_argument('--blog',    action='store_true', help='Only blog images')
    parser.add_argument('--patch',   action='store_true', help='Update JSON files with local paths after download')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be downloaded without downloading')
    args = parser.parse_args()

    include_vas  = args.vas  or (not args.vas and not args.blog)
    include_blog = args.blog or (not args.vas and not args.blog)

    queue = build_queue(include_vas, include_blog)

    counts = {}
    for _, dest, _ in queue:
        folder = dest.parent.name
        counts[folder] = counts.get(folder, 0) + 1
    print("Images queued:")
    for folder, count in sorted(counts.items()):
        print(f"  {folder}: {count}")

    mapping = run(queue, dry_run=args.dry_run)

    if args.patch and not args.dry_run:
        print("\nPatching JSON files...")
        patch_json(mapping)

if __name__ == '__main__':
    main()
