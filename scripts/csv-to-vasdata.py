"""
Convert Webflow CMS export CSV -> src/data/vasData.json
Usage: python scripts/csv-to-vasdata.py
"""
import csv
import json
import os
import re

CSV_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'webflow-cms-export.csv')
OUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'vasData.json')

def parse_tags(value):
    """Split semicolon or comma-separated tag strings into arrays."""
    if not value or not value.strip():
        return []
    sep = ';' if ';' in value else ','
    return [t.strip() for t in value.split(sep) if t.strip()]

def clean_availability(value):
    v = (value or '').strip().rstrip('!')
    mapping = {
        'Full Time': 'Full Time',
        'Part Time': 'Part Time',
        'Assigned': 'Assigned',
        'not active': 'Not Active',
    }
    return mapping.get(v, v)

def main():
    with open(CSV_PATH, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    # Slugs that are clearly test/migration entries — skip them entirely
    SKIP_SLUGS = {'migration-test', 'victor-test-100'}

    vas = []
    for row in rows:
        # Skip archived entries entirely
        if row.get('Archived', '').lower() == 'true':
            continue

        slug = row.get('Slug', '').strip()
        if not slug or slug in SKIP_SLUGS:
            continue

        # Webflow Draft=true → published:false (hidden from public, visible in admin)
        is_draft = row.get('Draft', 'false').strip().lower() == 'true'

        va = {
            # Identity
            'name': row.get('Name', '').strip(),
            'slug': slug,
            'itemId': row.get('Item ID', '').strip(),
            'profileSlug': row.get('Profile Slug', '').strip() or f'/virtual-assistants/{slug}',
            # Classification
            'mainCategory': row.get('Main Category', '').strip(),
            'mainCategories': parse_tags(row.get('Main Categories', '')),
            'title': row.get('Title', '').strip(),
            'availability': clean_availability(row.get('Availability', '')),
            # Bio
            'tagline': row.get('Tagline', '').strip(),
            'summary': row.get('Summary', '').strip(),
            'thumbnailDescription': row.get('Thumbnail Description', '').strip(),
            # Experience
            'experience': row.get('Experience (Years)', '').strip(),
            'languages': row.get('Languages', '').strip(),
            'specialization': parse_tags(row.get('Specialization', '')),
            # English
            'englishLevel': row.get('English level', '').strip(),
            'englishDescription': row.get('English Description', '').strip(),
            'englishTestType': row.get('Type of English Test', '').strip(),
            'cerfResult': row.get('CERF Result', '').strip(),
            'englishScore': row.get('English score', '').strip(),
            # Media
            'image': row.get('VA Image', '').strip(),
            'video': row.get('Video', '').strip(),
            'videoThumbnail': row.get('Video Thumbnail', '').strip(),
            # DISC
            'discType': row.get('Disc Type', '').strip(),
            'discDescription': row.get('DISC Description', '').strip(),
            # Tags
            'tools': parse_tags(row.get('Tools tags', '')),
            'equipment': parse_tags(row.get('Equipment tags', '')),
            'skills': parse_tags(row.get('Skills tags', '')),
            # Rich text (HTML from Webflow)
            'summaryHtml': row.get('Summary', '').strip(),
            'employmentSummary': row.get('Employment Summary', '').strip(),
            'employmentHtml': row.get('Employment richtext', '').strip(),
            'educationHtml': row.get('Education richtext', '').strip(),
            'skillsHtml': row.get('Skills Richtext', '').strip(),
            'toolsHtml': row.get('Tools Richtext', '').strip(),
            'equipmentHtml': row.get('Equipment Richtext', '').strip(),
            # Published status — mirrors Webflow Draft field
            # false  = visible on public site (Draft=false in Webflow)
            # true   = hidden from public, manageable in admin (Draft=true in Webflow)
            'published': not is_draft,
        }
        vas.append(va)

    vas.sort(key=lambda v: v['name'])

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(vas, f, ensure_ascii=False, indent=2)

    total = len(vas)
    from collections import Counter
    cats = Counter(v['mainCategory'] for v in vas)
    avail = Counter(v['availability'] for v in vas)

    print(f'Generated {OUT_PATH}')
    print(f'   Total VAs: {total}')
    print(f'\n   Categories:')
    for cat, count in cats.most_common():
        print(f'     {cat}: {count}')
    published = Counter(v['published'] for v in vas)
    print(f'\n   Published/Draft:')
    print(f'     Published (public): {published.get(True, 0)}')
    print(f'     Draft (admin only): {published.get(False, 0)}')

    print(f'\n   Availability:')
    for a, c in avail.most_common():
        print(f'     {a}: {c}')

if __name__ == '__main__':
    main()
