#!/usr/bin/env python3
"""
Script to generate Webflow HTML component for all Virtual Assistants
Reads from vasData.js and generates a complete HTML grid
"""

import json
import re

# Read vasData.js
with open('src/data/vasData.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the array content
match = re.search(r'export const vasData = \[(.*?)\];', content, re.DOTALL)
if not match:
    print("Error: Could not find vasData array")
    exit(1)

array_content = '[' + match.group(1) + ']'

# Parse as JSON (with some cleanup)
array_content = array_content.replace("'", '"')  # Replace single quotes with double quotes
array_content = re.sub(r'(\w+):', r'"\1":', array_content)  # Quote keys
array_content = re.sub(r',\s*]', ']', array_content)  # Remove trailing commas
array_content = re.sub(r',\s*}', '}', array_content)  # Remove trailing commas in objects

try:
    vas_data = json.loads(array_content)
except json.JSONDecodeError as e:
    print(f"Error parsing JSON: {e}")
    exit(1)

# Generate HTML for each VA card
def generate_va_card(va):
    name = va.get('nombre', 'Unknown')
    slug = va.get('slug', '#')
    experience = va.get('años_experiencia', 'N/A')
    language = va.get('idiomas', 'English')
    specialization = va.get('especialización', [])
    availability = va.get('disponibilidad', 'Full Time')
    
    # Format experience
    if experience is None or experience == '':
        exp_text = 'Trained'
    elif isinstance(experience, (int, float)):
        if experience < 1:
            exp_text = f'{int(experience * 12)} months'
        else:
            exp_text = f'{experience} years'
    else:
        exp_text = str(experience)
    
    # Generate specialization tags
    tags_html = '\n            '.join([f'<span class="ova-tag">{spec}</span>' for spec in specialization])
    
    card_html = f'''    <!-- {name} -->
    <div class="ova-card">
      <div class="ova-card-image">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed={name}" alt="{name}" loading="lazy">
        <span class="ova-availability-badge">{availability}</span>
      </div>
      <div class="ova-card-content">
        <h3 class="ova-card-name">{name}</h3>
        <p class="ova-card-role">Insurance Virtual Assistant</p>
        <div class="ova-card-info">
          <span class="ova-info-item"><span class="ova-info-label">Experience:</span> {exp_text}</span>
          <span class="ova-info-item"><span class="ova-info-label">Language:</span> {language}</span>
        </div>
        <div class="ova-specialization">
          <div class="ova-spec-title">Specialization</div>
          <div class="ova-tags">
            {tags_html}
          </div>
        </div>
      </div>
      <div class="ova-card-footer">
        <a href="/{slug}" class="ova-btn ova-btn-primary">View Profile</a>
      </div>
    </div>
'''
    return card_html

# Generate all cards
all_cards = '\n'.join([generate_va_card(va) for va in vas_data])

# Read the template
with open('webflow-components/200-our-current-vas-grid.html', 'r', encoding='utf-8') as f:
    template = f.read()

# Replace the placeholder cards with all cards
template = re.sub(
    r'    <!-- Adrian -->.*?    <!-- NOTE: This is a partial grid',
    all_cards + '\n\n    <!-- NOTE: This is the complete grid',
    template,
    flags=re.DOTALL
)

# Write the complete file
with open('webflow-components/200-our-current-vas-grid-complete.html', 'w', encoding='utf-8') as f:
    f.write(template)

print(f"✅ Generated HTML for {len(vas_data)} Virtual Assistants")
print(f"📁 File saved: webflow-components/200-our-current-vas-grid-complete.html")
print(f"\n📋 Summary:")
print(f"   - Total VAs: {len(vas_data)}")
print(f"   - Bilingual VAs: {len([v for v in vas_data if 'Bilingual' in v.get('idiomas', '')])}")
print(f"   - English-only VAs: {len([v for v in vas_data if v.get('idiomas', '') == 'English'])}")
print(f"   - Full-time: {len([v for v in vas_data if v.get('disponibilidad') == 'Full Time'])}")
print(f"   - Part-time: {len([v for v in vas_data if v.get('disponibilidad') == 'Part Time'])}")
print(f"   - Assigned: {len([v for v in vas_data if v.get('disponibilidad') == 'Assigned'])}")
