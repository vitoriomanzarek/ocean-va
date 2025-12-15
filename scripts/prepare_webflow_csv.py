import csv
import os
from collections import defaultdict

# Rutas
BASE_DIR = r"c:\Users\USER\CascadeProjects\Ocean VA"
DATA_DIR = os.path.join(BASE_DIR, "src", "data")
MAIN_CSV = os.path.join(DATA_DIR, "VAs_Database_Main.csv")
EMPLOYMENT_CSV = os.path.join(DATA_DIR, "VAs_Database_Employment.csv")
EDUCATION_CSV = os.path.join(DATA_DIR, "VAs_Database_Education.csv")
OUTPUT_CSV = os.path.join(DATA_DIR, "VAs_Database_Webflow_Ready_v3.csv")

def load_csv(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def format_employment_html(jobs):
    if not jobs:
        return ""
    
    html_parts = ["<ul class='employment-list'>"]
    # Sort by End_Date desc (heuristic, assumes string comparison roughly works or empty means current)
    # Ideally parsing dates would be better but simple string sort is okay for now if format is consistent 
    # Actually, let's keep original order or just append.
    
    for job in jobs:
        company = job.get("Company", "").strip()
        position = job.get("Position", "").strip()
        start = job.get("Start_Date", "").strip()
        end = job.get("End_Date", "").strip()
        desc = job.get("Description", "").strip()
        
        date_str = ""
        if start or end:
            date_str = f" ({start} - {end})"
            
        li = f"<li><strong>{position}</strong> at {company}{date_str}"
        if desc:
            li += f"<br>{desc}"
        li += "</li>"
        html_parts.append(li)
        
    html_parts.append("</ul>")
    return "".join(html_parts)

def format_education_html(edu_items):
    if not edu_items:
        return ""
    
    html_parts = ["<ul class='education-list'>"]
    for item in edu_items:
        inst = item.get("Institution", "").strip()
        degree = item.get("Degree", "").strip()
        
        li = f"<li><strong>{degree}</strong> - {inst}</li>"
        html_parts.append(li)
        
    html_parts.append("</ul>")
    return "".join(html_parts)

def main():
    print("Cargando CSVs...")
    main_rows = load_csv(MAIN_CSV)
    emp_rows = load_csv(EMPLOYMENT_CSV)
    edu_rows = load_csv(EDUCATION_CSV)
    
    # Agrupar Employment por Slug
    employment_map = defaultdict(list)
    for row in emp_rows:
        slug = row.get("VA_Slug")
        if slug:
            employment_map[slug].append(row)
            
    # Agrupar Education por Slug
    education_map = defaultdict(list)
    for row in edu_rows:
        slug = row.get("VA_Slug")
        if slug:
            education_map[slug].append(row)
            
    print(f"Procesando {len(main_rows)} perfiles de VA...")
    
    # Campos nuevos
    new_headers = [h for h in list(main_rows[0].keys()) if not h.endswith(".1")]
    # Agregar las nuevas columnas si no existen
    if "Employment_RichText" not in new_headers:
        new_headers.append("Employment_RichText")
    if "Education_RichText" not in new_headers:
        new_headers.append("Education_RichText")
        
    # Cargar Overrides
    overrides_path = os.path.join(DATA_DIR, "manual_cms_overrides.json")
    overrides = {}
    if os.path.exists(overrides_path):
        import json
        with open(overrides_path, "r", encoding="utf-8") as f:
            overrides = json.load(f)
            print(f"Cargados {len(overrides)} overrides manuales.")

    processed_rows = []
    
    processed_rows = []
    seen_slugs = set()
    
    for row in main_rows:
        slug = row.get("Slug")
        if slug in seen_slugs:
            print(f"  -> Saltando duplicado: {slug}")
            continue
        seen_slugs.add(slug)
        title = row.get("Title", "").lower()
        
        # FILTRO: Excluir Licensed Insurance Agents
        if "licensed" in title and "insurance agent" in title:
            print(f"  -> Excluyendo {slug} por ser '{row.get('Title')}'")
            continue
        
        # Aplicar Overrides
        if slug in overrides:
            for k, v in overrides[slug].items():
                if k in row: # Solo si la columna existe o queremos forzarla
                    row[k] = v
                    print(f"  -> Override aplicado a {slug}: {k}={v}")
                elif k in new_headers: # Si es una columna valida pero quizas vacia en row
                    row[k] = v
        
        # Generar HTML
        emp_html = format_employment_html(employment_map.get(slug, []))
        edu_html = format_education_html(education_map.get(slug, []))
        
        # Asignar a row
        row["Employment_RichText"] = emp_html
        row["Education_RichText"] = edu_html
        
        processed_rows.append(row)
        
    print(f"Escribiendo resultado en {OUTPUT_CSV}...")
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=new_headers, extrasaction='ignore')
        writer.writeheader()
        writer.writerows(processed_rows)
        
    print("¡Listo! Archivo preparado para Webflow.")

if __name__ == "__main__":
    main()
