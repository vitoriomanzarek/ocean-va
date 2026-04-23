"""
Convert Webflow blog CSV export to blogData.json.
Usage: python scripts/csv-to-blogdata.py
"""
import csv
import json
import re
import os
from datetime import datetime

CSV_PATH = os.path.join('src', 'data', 'webflow-blog-export.csv')
OUT_PATH = os.path.join('src', 'data', 'blogData.json')


def clean_text(text):
    if not text:
        return ''
    # Fix common encoding issues
    text = text.replace('\u2019', "'")   # RIGHT SINGLE QUOTATION MARK
    text = text.replace('\u2018', "'")   # LEFT SINGLE QUOTATION MARK
    text = text.replace('\u201c', '"')   # LEFT DOUBLE QUOTATION MARK
    text = text.replace('\u201d', '"')   # RIGHT DOUBLE QUOTATION MARK
    text = text.replace('\u2014', '--')  # EM DASH
    text = text.replace('\u2013', '-')   # EN DASH
    text = text.replace('\u200d', '')    # ZERO WIDTH JOINER
    text = text.replace('\u00a0', ' ')   # NON-BREAKING SPACE
    text = text.replace('\u200b', '')    # ZERO WIDTH SPACE
    return text.strip()


def clean_html(html):
    if not html:
        return ''
    html = clean_text(html)
    # Remove empty id attributes Webflow adds: id=""
    html = re.sub(r'\s+id=""', '', html)
    # Remove zero-width space paragraphs (Webflow spacers: <p>‍</p>)
    html = re.sub(r'<p[^>]*>\u200d\s*</p>', '', html)
    html = re.sub(r'<p[^>]*>&#8205;\s*</p>', '', html)
    return html.strip()


def parse_date(date_str):
    """Parse Webflow date string to ISO date (YYYY-MM-DD)."""
    if not date_str:
        return None
    try:
        # Format: "Fri Jun 06 2025 00:00:00 GMT+0000 (Coordinated Universal Time)"
        match = re.match(r'\w+ (\w+ \d+ \d+)', date_str)
        if match:
            dt = datetime.strptime(match.group(1), '%b %d %Y')
            return dt.strftime('%Y-%m-%d')
    except Exception:
        pass
    return None


def format_display_date(iso_date):
    """Format ISO date for display: '2025-06-06' -> 'June 6, 2025'."""
    if not iso_date:
        return ''
    try:
        dt = datetime.strptime(iso_date, '%Y-%m-%d')
        return dt.strftime('%B %-d, %Y') if os.name != 'nt' else dt.strftime('%B {day}, %Y').replace('{day}', str(dt.day))
    except Exception:
        return iso_date


def extract_excerpt(html, max_len=200):
    """Strip HTML tags and return a plain-text excerpt."""
    if not html:
        return ''
    text = re.sub(r'<[^>]+>', ' ', html)
    text = re.sub(r'\s+', ' ', text).strip()
    if len(text) > max_len:
        text = text[:max_len].rsplit(' ', 1)[0] + '...'
    return text


posts = []

with open(CSV_PATH, encoding='utf-8-sig', newline='') as f:
    reader = csv.DictReader(f)
    for row in reader:
        archived = row.get('Archived', '').strip().lower()
        draft = row.get('Draft', '').strip().lower()

        if archived == 'true':
            continue

        name = clean_text(row.get('Name', ''))
        slug = row.get('Slug', '').strip()
        item_id = row.get('Item ID', '').strip()
        date_raw = row.get('Date', '') or row.get('Published On', '')
        iso_date = parse_date(date_raw)
        display_date = format_display_date(iso_date)

        cover_image = (row.get('Image for Blog', '') or '').strip()
        author_name = clean_text(row.get('Name of Author', '') or '')
        author_image = (row.get('Picture of Author', '') or '').strip()
        body_raw = row.get('Content of Blog', '')
        body_html = clean_html(body_raw)
        excerpt = extract_excerpt(body_html)

        if not name or not slug:
            continue

        posts.append({
            'itemId': item_id,
            'name': name,
            'slug': slug,
            'date': iso_date or '',
            'displayDate': display_date,
            'coverImage': cover_image,
            'authorName': author_name,
            'authorImage': author_image,
            'excerpt': excerpt,
            'bodyHtml': body_html,
        })

# Sort newest first
posts.sort(key=lambda p: p['date'] or '0000-00-00', reverse=True)

with open(OUT_PATH, 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print(f"Done: {len(posts)} posts written to {OUT_PATH}")
