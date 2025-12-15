import csv
import os

# Configuration
INPUT_FILE = r'src/data/VAs Database - Full VAs.csv'
OUTPUT_DIR = r'src/data'
MAIN_OUTPUT = os.path.join(OUTPUT_DIR, 'VAs_Database_Main.csv')
EMPLOYMENT_OUTPUT = os.path.join(OUTPUT_DIR, 'VAs_Database_Employment.csv')
EDUCATION_OUTPUT = os.path.join(OUTPUT_DIR, 'VAs_Database_Education.csv')
TOOLS_OUTPUT = os.path.join(OUTPUT_DIR, 'VAs_Database_Tools_Master.csv')

def structure_data():
    print(f"Reading from: {INPUT_FILE}")
    
    vas_data = []
    
    # Read original CSV
    try:
        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            # Normalize headers (strip BOM if present)
            reader.fieldnames = [name.lstrip('\ufeff') for name in reader.fieldnames]
            for row in reader:
                vas_data.append(row)
    except FileNotFoundError:
        print(f"Error: Input file found at {INPUT_FILE}")
        return

    print(f"Loaded {len(vas_data)} VAs.")

    # 1. Create Main VA CSV with new columns
    # We keep all original columns and add the new structural ones for Webflow
    original_headers = list(vas_data[0].keys())
    new_headers = [
        'Tools_Tags', 'Equipment_Tags', 'Skills_Tags', 
        'DISC_Type', 'English_Score', 'English_Level'
    ]
    
    # Avoid duplicates if running multiple times
    final_headers = []
    for h in original_headers:
        if h not in new_headers:
            final_headers.append(h)
    final_headers.extend(new_headers)

    print(f"Generating {MAIN_OUTPUT}...")
    with open(MAIN_OUTPUT, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=final_headers)
        writer.writeheader()
        
        for va in vas_data:
            # Create a copy to modify
            row = {k: v for k, v in va.items() if k in final_headers}
            
            # Initialize new fields as empty placeholders 
            # (Users will fill this in via bulk edit or we extract from HTML later)
            row['Tools_Tags'] = ''
            row['Equipment_Tags'] = ''
            row['Skills_Tags'] = ''
            
            # Simple extraction logic for Maria Christine (Example)
            if va.get('Slug') == 'maria-christine':
                 row['DISC_Type'] = 'S+C'
                 row['English_Score'] = '85/100'
                 row['English_Level'] = 'B1'
                 row['Skills_Tags'] = 'Multi-State Payroll, Tax Reporting, Compliance, HRIS Management'
                 row['Tools_Tags'] = 'Trinet Zenefits, Gusto, BambooHR, Rippling, QuickBooks, Salesforce'
            else:
                 row['DISC_Type'] = ''
                 row['English_Score'] = ''
                 row['English_Level'] = ''

            writer.writerow(row)

    # 2. Create Employment History CSV (Relational)
    print(f"Generating {EMPLOYMENT_OUTPUT}...")
    employment_headers = ['VA_Slug', 'Company', 'Position', 'Start_Date', 'End_Date', 'Description']
    
    with open(EMPLOYMENT_OUTPUT, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=employment_headers)
        writer.writeheader()
        
        # Example data for Maria Christine
        maria_employment = [
            {
                'VA_Slug': 'maria-christine',
                'Company': 'PORT X',
                'Position': 'Human Resource Coordinator (Freelance)',
                'Start_Date': 'Jan 2024',
                'End_Date': 'Sep 2025',
                'Description': 'Spearheaded workforce management for 300+ employees using BambooHR and Rippling.'
            },
            {
                'VA_Slug': 'maria-christine',
                'Company': 'TRINET – ZENEFITS',
                'Position': 'U.S. Tax & Payroll Compliance',
                'Start_Date': '2018',
                'End_Date': '2023',
                'Description': 'Directed end-to-end HR operations, including multi-state payroll and U.S. tax reporting.'
            }
        ]
        
        for job in maria_employment:
            writer.writerow(job)
            
    # 3. Create Education CSV (Relational)
    print(f"Generating {EDUCATION_OUTPUT}...")
    education_headers = ['VA_Slug', 'Institution', 'Degree', 'Year', 'Description']
    
    with open(EDUCATION_OUTPUT, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=education_headers)
        writer.writeheader()
        
        # Placeholder entry
        writer.writerow({
            'VA_Slug': 'maria-christine', # Example
            'Institution': 'University of Example',
            'Degree': 'Bachelor of Science in Human Resources',
            'Year': '2010',
            'Description': ''
        })

    # 4. Create Tools Master List (Optional)
    print(f"Generating {TOOLS_OUTPUT}...")
    tools_headers = ['Tool_Name', 'Category', 'Icon_URL']
    
    with open(TOOLS_OUTPUT, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=tools_headers)
        writer.writeheader()
        
        # Initial Seed Data from context
        tools_seed = [
            ('Salesforce', 'CRM'),
            ('BambooHR', 'HRIS'),
            ('QuickBooks', 'Finance'),
            ('Gusto', 'Payroll'),
            ('Asana', 'Project Management'),
            ('Slack', 'Communication')
        ]
        
        for name, cat in tools_seed:
            writer.writerow({'Tool_Name': name, 'Category': cat, 'Icon_URL': ''})

    print("\n✅ Data Structure Generation Complete!")
    print(f"📂 Check the folder: {OUTPUT_DIR}")

if __name__ == "__main__":
    structure_data()
