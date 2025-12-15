import csv
import os
from bs4 import BeautifulSoup
import re
import glob

# Rutas de Archivos
BASE_DIR = r"c:\Users\USER\CascadeProjects\Ocean VA"
COMPONENTS_DIR = os.path.join(BASE_DIR, "webflow-components")
MAIN_CSV = os.path.join(BASE_DIR, "src", "data", "VAs_Database_Main.csv")
EMPLOYMENT_CSV = os.path.join(BASE_DIR, "src", "data", "VAs_Database_Employment.csv")
EDUCATION_CSV = os.path.join(BASE_DIR, "src", "data", "VAs_Database_Education.csv")

SLUG_MAPPING = {
    "jay-alvin": "jay",
    "louise": "louise", 
    "cherry-mae": "cherry",
    "brandon-l": "brandon",
    "rona-mae": "rona",
    "ximena-g": "ximena",
    "ximena": "ximena-4e77d",
}

def clean_text(text):
    if text:
        return text.strip().replace('\n', ' ').replace('\r', '')
    return ""

def get_slug_from_filename(filename):
    # Ejemplos: 212-Yvette-va-profile.html -> yvette
    # 212-yvette-profile-correct.html -> yvette
    # 230-emmanuel-profile.html -> emmanuel
    # 285-jomer-daniel-profile.html -> jomer-daniel
    
    base = os.path.basename(filename)
    # Quitar extension
    name_no_ext = os.path.splitext(base)[0]
    
    # Buscar numero al inicio seguido de guion
    match = re.match(r"(\d+)-(.*)", name_no_ext)
    if match:
        rest = match.group(2) # "Yvette-va-profile" o "yvette-profile-correct"
        
        # Limpiar sufijos comunes
        rest = rest.lower()
        rest = rest.replace("-va-profile", "")
        rest = rest.replace("-profile", "")
        # rest = rest.replace("-correct", "") # Don't remove correct yet if we want to prioritize it in filename check, but here we just want slug.
        # Actually in logic below we rely on filename having "correct" to pick file. 
        # But for slug extraction, "yvette-profile-correct" -> "yvette".
        rest = rest.replace("-correct", "")
        
        # Limpiar guiones extra al final si quedaron
        rest = rest.strip("-")
        
        return rest
    return None

def extract_data_from_file(filepath, slug):
    print(f"  Procesando: {os.path.basename(filepath)} (Slug: {slug})")
    
    with open(filepath, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    data = {"Slug": slug}

    # --- Main Info ---
    title_tag = soup.find("p", class_="va-title")
    data["Title"] = clean_text(title_tag.text) if title_tag else ""
    
    summary_tag = soup.find("p", class_="va-summary")
    data["Summary"] = clean_text(summary_tag.text) if summary_tag else ""
    
    tagline_tag = soup.find("p", class_="va-tagline-text")
    data["Tagline"] = clean_text(tagline_tag.text) if tagline_tag else ""

    # Video
    video_container = soup.find("div", class_="va-video-container")
    if video_container and video_container.has_attr("onclick"):
        onclick_text = video_container["onclick"]
        match = re.search(r"window\.open\('([^']+)'", onclick_text)
        if match:
            vid = match.group(1)
            if "embed/" in vid:
                vid_id = vid.split("embed/")[-1]
                vid = f"https://youtu.be/{vid_id}"
            data["Video"] = vid

    # --- Tags ---
    skills = [clean_text(s.text) for s in soup.select(".va-skills-container .va-skill-tag")]
    data["Skills_Tags"] = "; ".join(skills)

    tools = []
    for item in soup.select(".va-tools-list .va-tool-item"):
        spans = item.find_all("span")
        if len(spans) > 1:
            tools.append(clean_text(spans[1].text))
    data["Tools_Tags"] = "; ".join(tools)

    equipment = []
    for item in soup.select(".va-equipment-list .va-equipment-item"):
        span = item.find("span")
        if span:
            equipment.append(clean_text(span.text))
    data["Equipment_Tags"] = "; ".join(equipment)

    # --- Assessment ---
    disc_badge = soup.find("div", class_="va-disc-badge")
    data["DISC_Type"] = clean_text(disc_badge.text) if disc_badge else ""
    
    disc_desc = soup.find("p", class_="va-disc-description")
    data["DISC Description"] = clean_text(disc_desc.text) if disc_desc else ""

    eng_score = soup.find("div", class_="va-english-score")
    data["English_Score"] = clean_text(eng_score.text) if eng_score else ""
    
    eng_desc = soup.find("p", class_="va-english-description")
    data["English Description"] = clean_text(eng_desc.text) if eng_desc else ""

    # CEFR Level (Active Bubble)
    cefr_active = soup.find("div", class_="va-cefr-bubble-active")
    data["English_Level"] = clean_text(cefr_active.text) if cefr_active else ""

    # --- Employment ---
    employment_list = []
    for item in soup.select(".va-employment-list .va-employment-item"):
        comp = item.find("h4", class_="va-employment-company")
        pos = item.find("p", class_="va-employment-position")
        period = item.find("p", class_="va-employment-period")
        desc = item.find("p", class_="va-employment-description")
        
        job = {
            "VA_Slug": slug,
            "Company": clean_text(comp.text) if comp else "",
            "Position": clean_text(pos.text) if pos else "",
            "Description": clean_text(desc.text) if desc else "",
            "Start_Date": "",
            "End_Date": ""
        }
        
        if period:
            p_text = clean_text(period.text)
            parts = p_text.split("-")
            if len(parts) >= 2:
                job["Start_Date"] = parts[0].strip()
                job["End_Date"] = parts[1].strip()
            else:
                job["Start_Date"] = p_text
        
        employment_list.append(job)
    data["Employment"] = employment_list

    # --- Education ---
    education_list = []
    for item in soup.select(".va-education-section .va-education-item"):
        school = item.find("h3", class_="va-education-school")
        # Handle case where school name might be inside the h3 directly or split
        school_text = clean_text(school.text) if school else ""
        
        degree = item.find("p", class_="va-education-degree")
        degree_text = clean_text(degree.text) if degree else ""
        
        edu = {
            "VA_Slug": slug,
            "Institution": school_text,
            "Degree": degree_text,
            "Year": "",
            "Description": ""
        }
        education_list.append(edu)
    data["Education"] = education_list

    return data

def main():
    # 1. Identificar archivos
    all_files = glob.glob(os.path.join(COMPONENTS_DIR, "*.html"))
    files_to_process = {} # ID -> filepath

    for f in all_files:
        filename = os.path.basename(f)
        match = re.search(r"^(\d+)-", filename)
        if match:
            num = int(match.group(1))
            if 200 <= num <= 300: # RANGO AMPLIADO PARA ADRIAN (211)
                if num in files_to_process:
                    curr_file = files_to_process[num]
                    if "correct" in filename and "correct" not in os.path.basename(curr_file):
                        files_to_process[num] = f
                        print(f"Priorizando {filename} sobre {os.path.basename(curr_file)}")
                    elif "correct" not in filename and "correct" in os.path.basename(curr_file):
                        pass 
                    else:
                        pass
                else:
                    files_to_process[num] = f
    
    sorted_ids = sorted(files_to_process.keys())
    print(f"Se encontraron {len(sorted_ids)} archivos para procesar entre 212 y 296.")

    # Extraer data de todos
    extracted_datasets = []
    for pid in sorted_ids:
        filepath = files_to_process[pid]
        raw_slug = get_slug_from_filename(filepath)
        slug = SLUG_MAPPING.get(raw_slug, raw_slug) # Apply mapping
        
        extracted_datasets.append(extract_data_from_file(filepath, slug))

    # 2. Actualizar Main CSV
    print("Actualizando Main CSV...")
    main_rows = []
    main_headers = []
    
    with open(MAIN_CSV, "r", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        main_headers = reader.fieldnames
        main_rows = list(reader)

    updates_count = 0
    for data in extracted_datasets:
        slug = data["Slug"]
        found = False
        for row in main_rows:
            if row.get("Slug") == slug:
                found = True
                row["Title"] = data.get("Title", row["Title"])
                row["Summary"] = data.get("Summary", row["Summary"])
                row["Tagline"] = data.get("Tagline", row["Tagline"])
                
                vid = data.get("Video")
                if vid:
                    if "Video" in main_headers:
                        row["Video"] = vid
                    elif "YouTube URL" in main_headers:
                        row["YouTube URL"] = vid
                
                row["Skills_Tags"] = data.get("Skills_Tags", row.get("Skills_Tags", ""))
                row["Tools_Tags"] = data.get("Tools_Tags", row.get("Tools_Tags", ""))
                row["Equipment_Tags"] = data.get("Equipment_Tags", row.get("Equipment_Tags", ""))
                
                row["DISC_Type"] = data.get("DISC_Type", row.get("DISC_Type", ""))
                row["DISC Description"] = data.get("DISC Description", row.get("DISC Description", ""))
                
                row["English_Score"] = data.get("English_Score", row.get("English_Score", ""))
                row["English Description"] = data.get("English Description", row.get("English Description", ""))
                row["English_Level"] = data.get("English_Level", row.get("English_Level", ""))
                updates_count += 1
                break
        if not found:
            print(f"ADVERTENCIA: No se encontró slug '{slug}' en Main CSV. (Archivo original ID: {data.get('Slug')})")

    with open(MAIN_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=main_headers)
        writer.writeheader()
        writer.writerows(main_rows)
    print(f"Main CSV actualizado con {updates_count} perfiles.")

    # 3. Append Employment (Idempotent)
    print("Agregando Employment (Idempotente)...")
    all_new_jobs = []
    for data in extracted_datasets:
        all_new_jobs.extend(data.get("Employment", []))
    
    if all_new_jobs:
        existing_jobs = set()
        header_list = ["VA_Slug", "Company", "Position", "Start_Date", "End_Date", "Description"]
        
        if os.path.exists(EMPLOYMENT_CSV):
            with open(EMPLOYMENT_CSV, "r", newline="", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    sig = (row.get("VA_Slug"), row.get("Company"), row.get("Position"))
                    existing_jobs.add(sig)
        
        with open(EMPLOYMENT_CSV, "a", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=header_list)
            added = 0
            for job in all_new_jobs:
                sig = (job.get("VA_Slug"), job.get("Company"), job.get("Position"))
                if sig not in existing_jobs:
                    row = {k: job.get(k, "") for k in header_list}
                    writer.writerow(row)
                    existing_jobs.add(sig)
                    added += 1
    print(f"Se agregaron {added} trabajos nuevos.")

    # 4. Append Education (Idempotent)
    print("Agregando Education (Idempotente)...")
    all_new_edu = []
    for data in extracted_datasets:
        all_new_edu.extend(data.get("Education", []))
        
    if all_new_edu:
        existing_edu = set()
        header_list = ["VA_Slug", "Institution", "Degree", "Year", "Description"]

        if os.path.exists(EDUCATION_CSV):
            with open(EDUCATION_CSV, "r", newline="", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    sig = (row.get("VA_Slug"), row.get("Institution"), row.get("Degree"))
                    existing_edu.add(sig)

        with open(EDUCATION_CSV, "a", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=header_list)
            added_edu = 0
            for edu in all_new_edu:
                sig = (edu.get("VA_Slug"), edu.get("Institution"), edu.get("Degree"))
                if sig not in existing_edu:
                    row = {k: edu.get(k, "") for k in header_list}
                    writer.writerow(row)
                    existing_edu.add(sig)
                    added_edu += 1
    print(f"Se agregaron {added_edu} registros de educación nuevos.")

if __name__ == "__main__":
    main()
