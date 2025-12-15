import csv
import os
import re
import glob

# Configuration
DATA_DIR = r'src/data'
INPUT_CSV = os.path.join(DATA_DIR, 'VAs_Database_Main.csv')
RAW_FILES_PATTERN = os.path.join(DATA_DIR, 'raw_dump_part*.txt')
OUTPUT_CSV = os.path.join(DATA_DIR, 'VAs_Database_Main_Enriched.csv')
TOOLS_MASTER_CSV = os.path.join(DATA_DIR, 'VAs_Database_Tools_Master.csv')

def clean_text(text):
    if not text:
        return ""
    return text.strip()

def parse_profile_block(block):
    """Parses a single text block representing a VA profile."""
    lines = [l.strip() for l in block.split('\n') if l.strip()]
    if not lines:
        return None

    # Assumption: First line is Name
    name = lines[0]
    
    # Initialize data placeholders
    data = {
        'Name': name,
        'Tools': [],
        'Equipment': [],
        'Skills': []
    }

    current_section = 'General'
    
    # Simple state machine
    for line in lines[1:]:
        # Detect sections
        lower_line = line.lower()
        if 'toolkit' in lower_line or 'tool kit' in lower_line or 'software proficiency' in lower_line:
            current_section = 'Tools'
            continue
        elif 'equipment' in lower_line:
            current_section = 'Equipment'
            continue
        elif 'expertise' in lower_line or 'skills' in lower_line:
            current_section = 'Skills' # Though often skills are mixed in top section
            continue
        elif 'click here to learn more' in lower_line:
            continue
        
        # Extract content based on section
        if current_section == 'Tools':
            # Split by common delimiters if presented in one line
            items = re.split(r'[,•]', line)
            for item in items:
                cleaned = item.strip()
                if cleaned and len(cleaned) < 50: # Avoid capturing long sentences
                    data['Tools'].append(cleaned)
                    
        elif current_section == 'Equipment':
             items = re.split(r'[,•]', line)
             for item in items:
                cleaned = item.strip()
                if cleaned:
                    data['Equipment'].append(cleaned)
        
        elif current_section == 'General' or current_section == 'Skills':
             # Heuristic: Short lines in General section are often tasks/skills
             if len(line) < 60 and ':' not in line:
                 data['Skills'].append(line)

    return data

def load_csv_data(filepath):
    """Loads existing CSV data into a list of dicts."""
    data = []
    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found.")
        return []
        
    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            data.append(row)
    return data, reader.fieldnames

def find_match(name, va_list):
    """Finds a VA record matching the name."""
    # Normalize name for comparison (remove middle names, checking containment)
    name_parts = name.lower().split()
    if not name_parts:
        return None
    
    # Try exact match first
    for va in va_list:
        va_name = va['Name'].lower()
        if name.lower() in va_name or va_name in name.lower():
            return va
            
    # Try first and last name match
    if len(name_parts) >= 2:
        first_last = f"{name_parts[0]} {name_parts[-1]}"
        for va in va_list:
            va_name = va['Name'].lower()
            if first_last in va_name:
                return va
                
    return None

def main():
    print("🚀 Starting Profile Parsing...")
    
    # 1. Load Main CSV
    va_records, fieldnames = load_csv_data(INPUT_CSV)
    print(f"Loaded {len(va_records)} VA records from CSV.")

    # 2. Read Raw Files
    raw_files = glob.glob(RAW_FILES_PATTERN)
    all_text = ""
    for rf in raw_files:
        print(f"Reading {rf}...")
        with open(rf, 'r', encoding='utf-8') as f:
            all_text += f.read() + "\n\n\n"

    # 3. Split into Blocks
    # Splitting by double/triple newlines and looking for UPPERCASE identifiers might be safer
    # But let's try a regex split on apparent headers if standard split fails.
    # The dump seems to have Names in ALL CAPS followed by a title.
    
    # We'll split by logic: Looking for lines that are ALL CAPS and short, likely names.
    # Or we can simply use the "Click here to learn more" as a delimiter? No, that's at the end.
    
    # Let's try splitting by double newlines and re-assembling? 
    # Actually, the user copy-pasted blocks. Let's look for the Name pattern.
    # Pattern: ^[A-Z\s]+$ (Name) followed by "English Speaking" or "Bilingual"
    
    potential_profiles = []
    lines = all_text.split('\n')
    current_block = []
    
    for line in lines:
        line_stripped = line.strip()
        # Heuristic for new profile start: UPPERCASE name followed by typical Title line in next few lines?
        # Or just checking if line is ALL CAPS and length > 3 and not a Section Header like "TOOL KIT"
        if line_stripped.isupper() and len(line_stripped) > 3 and "TOOL" not in line_stripped and "EQUIPMENT" not in line_stripped and "THUMBNAIL" not in line_stripped:
             # If we have a current block, save it
             if current_block:
                 potential_profiles.append("\n".join(current_block))
                 current_block = []
             current_block.append(line)
        else:
            current_block.append(line)
            
    if current_block:
        potential_profiles.append("\n".join(current_block))
        
    print(f"Identified {len(potential_profiles)} potential profiles from text.")

    # 4. Process Profiles & Update Records
    matches_found = 0
    tools_set = set() # For Master List

    for block in potential_profiles:
        parsed = parse_profile_block(block)
        if not parsed:
            continue
            
        match = find_match(parsed['Name'], va_records)
        if match:
            matches_found += 1
            # Update fields
            
            # Tools
            current_tools = match.get('Tools_Tags', '')
            new_tools = ", ".join(parsed['Tools'])
            # Merge if needed, or overwrite if current is empty. Let's overwrite/enrich.
            if new_tools:
                match['Tools_Tags'] = new_tools
                for t in parsed['Tools']:
                    tools_set.add(t)

            # Equipment
            match['Equipment_Tags'] = ", ".join(parsed['Equipment'])
            
            # Skills (if empty in CSV, fill from parsing)
            if not match.get('Skills_Tags') and parsed['Skills']:
                 # Filter generic lines
                 filtered_skills = [s for s in parsed['Skills'] if len(s) < 40]
                 match['Skills_Tags'] = ", ".join(filtered_skills)

    print(f"✅ Matched and enriched {matches_found} profiles.")

    # 5. Write Updated Main CSV
    with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(va_records)
    print(f"Saved enriched data to {OUTPUT_CSV}")

    # 6. Update Tools Master CSV
    # Load existing tools first
    existing_tools = set()
    if os.path.exists(TOOLS_MASTER_CSV):
        with open(TOOLS_MASTER_CSV, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                existing_tools.add(row['Tool_Name'])
    
    new_tools_count = 0
    with open(TOOLS_MASTER_CSV, 'a', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['Tool_Name', 'Category', 'Icon_URL'])
        # No header write (appending)
        
        for tool in tools_set:
            if tool not in existing_tools:
                writer.writerow({'Tool_Name': tool, 'Category': 'Uncategorized', 'Icon_URL': ''})
                new_tools_count += 1
                
    print(f"Added {new_tools_count} new tools to Master List.")

if __name__ == "__main__":
    main()
