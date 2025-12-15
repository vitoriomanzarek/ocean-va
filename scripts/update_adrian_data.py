import csv
import os
from bs4 import BeautifulSoup
import re

# File Paths
BASE_DIR = r"c:\Users\USER\CascadeProjects\Ocean VA"
HTML_FILE = os.path.join(BASE_DIR, "webflow-components", "211-adrian-profile-correct.html")
MAIN_CSV = os.path.join(BASE_DIR, "src", "data", "VAs_Database_Main.csv")
EMPLOYMENT_CSV = os.path.join(BASE_DIR, "src", "data", "VAs_Database_Employment.csv")
EDUCATION_CSV = os.path.join(BASE_DIR, "src", "data", "VAs_Database_Education.csv")

TARGET_SLUG = "adrian"

def clean_text(text):
    if text:
        return text.strip().replace('\n', ' ').replace('\r', '')
    return ""

def extract_from_html():
    print(f"Reading HTML from {HTML_FILE}...")
    with open(HTML_FILE, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    data = {}

    # --- Main Info ---
    # Title
    title_tag = soup.find("p", class_="va-title")
    data["Title"] = clean_text(title_tag.text) if title_tag else ""
    
    # Summary
    summary_tag = soup.find("p", class_="va-summary")
    data["Summary"] = clean_text(summary_tag.text) if summary_tag else ""
    
    # Tagline
    tagline_tag = soup.find("p", class_="va-tagline-text")
    data["Tagline"] = clean_text(tagline_tag.text) if tagline_tag else ""

    # Video - Extract from onclick or iframe
    # onclick="window.open('https://www.youtube.com/embed/k5OatPLSORw', '_blank')"
    video_container = soup.find("div", class_="va-video-container")
    if video_container and video_container.has_attr("onclick"):
        onclick_text = video_container["onclick"]
        match = re.search(r"window\.open\('([^']+)'", onclick_text)
        if match:
            data["Video"] = match.group(1)
            # Convert embed to watch URL if needed, or keep as is. Usually formatted as https://youtu.be/ID for CSV
            if "embed/" in data["Video"]:
                vid_id = data["Video"].split("embed/")[-1]
                data["Video"] = f"https://youtu.be/{vid_id}"

    # --- Tags ---
    # Skills
    skills = [clean_text(s.text) for s in soup.select(".va-skills-container .va-skill-tag")]
    data["Skills_Tags"] = "; ".join(skills)

    # Tools
    # Structure: .va-tool-item -> span (check) + span (text)
    tools = []
    for item in soup.select(".va-tools-list .va-tool-item"):
        spans = item.find_all("span")
        if len(spans) > 1:
            tools.append(clean_text(spans[1].text))
    data["Tools_Tags"] = "; ".join(tools)

    # Equipment
    equipment = []
    for item in soup.select(".va-equipment-list .va-equipment-item"):
        span = item.find("span")
        if span:
            equipment.append(clean_text(span.text))
    data["Equipment_Tags"] = "; ".join(equipment)

    # --- Assessment ---
    # DISC
    disc_badge = soup.find("div", class_="va-disc-badge")
    data["DISC_Type"] = clean_text(disc_badge.text) if disc_badge else ""
    
    disc_desc = soup.find("p", class_="va-disc-description")
    data["DISC Description"] = clean_text(disc_desc.text) if disc_desc else ""

    # English
    eng_score = soup.find("div", class_="va-english-score")
    data["English_Score"] = clean_text(eng_score.text) if eng_score else ""
    
    eng_desc = soup.find("p", class_="va-english-description")
    data["English Description"] = clean_text(eng_desc.text) if eng_desc else ""

    # --- Employment ---
    # List of dicts
    employment_list = []
    for item in soup.select(".va-employment-list .va-employment-item"):
        comp = item.find("h4", class_="va-employment-company")
        pos = item.find("p", class_="va-employment-position")
        period = item.find("p", class_="va-employment-period")
        desc = item.find("p", class_="va-employment-description")
        
        job = {
            "VA_Slug": TARGET_SLUG,
            "Company": clean_text(comp.text) if comp else "",
            "Position": clean_text(pos.text) if pos else "",
            "Description": clean_text(desc.text) if desc else "",
            "Start_Date": "",
            "End_Date": ""
        }
        
        if period:
            p_text = clean_text(period.text)
            # Try to split by "-" or " - "
            parts = p_text.split("-")
            if len(parts) >= 2:
                job["Start_Date"] = parts[0].strip()
                job["End_Date"] = parts[1].strip()
            else:
                job["Start_Date"] = p_text # Fallback
        
        employment_list.append(job)
    
    data["Employment"] = employment_list

    # --- Education ---
    education_list = []
    for item in soup.select(".va-education-section .va-education-item"):
        school = item.find("h3", class_="va-education-school")
        degree = item.find("p", class_="va-education-degree")
        
        edu = {
            "VA_Slug": TARGET_SLUG,
            "Institution": clean_text(school.text) if school else "",
            "Degree": clean_text(degree.text) if degree else "",
            "Year": "", # Not explicitly in this HTML snippet usually, checked HTML content -> It is NOT there for Adrian (just school/degree)
            "Description": ""
        }
        education_list.append(edu)
    
    data["Education"] = education_list

    return data

def update_main_csv(extracted_data):
    print("Updating Main CSV...")
    rows = []
    headers = []
    with open(MAIN_CSV, "r", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames
        for row in reader:
            if row.get("Slug") == TARGET_SLUG:
                print("Found Adrian in Main CSV. Updating...")
                # Map extracted fields to CSV columns
                row["Title"] = extracted_data.get("Title", row["Title"])
                row["Summary"] = extracted_data.get("Summary", row["Summary"])
                row["Tagline"] = extracted_data.get("Tagline", row["Tagline"])
                
                # Check mapping for Video column, sometimes it is YouTube URL
                if "Video" in headers:
                    row["Video"] = extracted_data.get("Video", row.get("Video", ""))
                elif "YouTube URL" in headers:
                    row["YouTube URL"] = extracted_data.get("Video", row.get("YouTube URL", ""))
                
                row["Skills_Tags"] = extracted_data.get("Skills_Tags", row.get("Skills_Tags", ""))
                row["Tools_Tags"] = extracted_data.get("Tools_Tags", row.get("Tools_Tags", ""))
                row["Equipment_Tags"] = extracted_data.get("Equipment_Tags", row.get("Equipment_Tags", ""))
                
                row["DISC_Type"] = extracted_data.get("DISC_Type", row.get("DISC_Type", ""))
                row["DISC Description"] = extracted_data.get("DISC Description", row.get("DISC Description", ""))
                
                row["English_Score"] = extracted_data.get("English_Score", row.get("English_Score", ""))
                row["English Description"] = extracted_data.get("English Description", row.get("English Description", ""))
                
            rows.append(row)
            
    with open(MAIN_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        writer.writerows(rows)
    print("Main CSV updated.")

def update_employment_csv(extracted_data):
    print("Updating Employment CSV...")
    # Read existing to ensure we don't duplicate if already there? 
    # Plan said "Append". But let's be safe and check if he has entries?
    # User said "add to", implied he is not there. I grep'd and he was not there.
    
    new_jobs = extracted_data.get("Employment", [])
    if not new_jobs:
        return

    # Check headers
    with open(EMPLOYMENT_CSV, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        headers = next(reader)
    
    with open(EMPLOYMENT_CSV, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        for job in new_jobs:
            # Align keys
            row = {}
            for h in headers:
                row[h] = job.get(h, "")
            writer.writerow(row)
    print(f"Added {len(new_jobs)} employment records.")

def update_education_csv(extracted_data):
    print("Updating Education CSV...")
    new_edu = extracted_data.get("Education", [])
    if not new_edu:
        return

    with open(EDUCATION_CSV, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        headers = next(reader)
        
    with open(EDUCATION_CSV, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        for edu in new_edu:
            row = {}
            for h in headers:
                row[h] = edu.get(h, "")
            writer.writerow(row)
    print(f"Added {len(new_edu)} education records.")

def main():
    data = extract_from_html()
    # print("Extracted Data:", data)
    update_main_csv(data)
    update_employment_csv(data)
    update_education_csv(data)
    print("Done.")

if __name__ == "__main__":
    main()
