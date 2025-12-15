import csv
import os

# Rutas
BASE_DIR = r"c:\Users\USER\CascadeProjects\Ocean VA"
DATA_DIR = os.path.join(BASE_DIR, "src", "data")
LOCAL_CSV = os.path.join(DATA_DIR, "VAs_Database_Webflow_Ready.csv")
REMOTE_CSV = os.path.join(DATA_DIR, "VAs Database - Full VAs.csv") # The Webflow Export
REPORT_FILE = os.path.join(BASE_DIR, "DATA_DISCREPANCY_REPORT.md")

def load_csv(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        # Normalize headers to lowercase for safer comparison if needed, 
        # but here we rely on exact match or known mapping
        return list(csv.DictReader(f))

def clean_bool(val):
    if not val: return False
    return str(val).lower() in ["true", "yes", "1"]

def main():
    print("Cargando CSVs...")
    local_data = load_csv(LOCAL_CSV)
    remote_data = load_csv(REMOTE_CSV)
    
    # Map Remote by Slug -> Record
    remote_map = {row.get("Slug"): row for row in remote_data if row.get("Slug")}
    local_map = {row.get("Slug"): row for row in local_data if row.get("Slug")}
    
    discrepancies = []
    
    # 1. Check for Status Discrepancies (Draft/Archived)
    # We want to know if Local overrides a Remote "Draft=TRUE" with "Draft=FALSE"
    
    print("Comparando estados...")
    for slug, remote_row in remote_map.items():
        if slug in local_map:
            local_row = local_map[slug]
            
            # Check Draft
            r_draft = clean_bool(remote_row.get("Draft"))
            l_draft = clean_bool(local_row.get("Draft"))
            
            # Check Archived
            r_archived = clean_bool(remote_row.get("Archived"))
            l_archived = clean_bool(local_row.get("Archived"))
            
            if r_draft != l_draft:
                discrepancies.append({
                    "Slug": slug,
                    "Field": "Draft",
                    "Remote": r_draft,
                    "Local": l_draft,
                    "Severity": "HIGH" if r_draft else "Medium" # High if we are accidentally publishing a draft profiles
                })
                
            if r_archived != l_archived:
                discrepancies.append({
                    "Slug": slug,
                    "Field": "Archived",
                    "Remote": r_archived,
                    "Local": l_archived,
                    "Severity": "HIGH" if r_archived else "Medium"
                })

    # 2. Check for missing Remote Items in Local (Potential Data Loss if we were doing full replace, but we are mostly updating)
    missing_in_local = [slug for slug in remote_map if slug not in local_map]
    
    # 3. Check for new Items in Local
    new_in_local = [slug for slug in local_map if slug not in remote_map]
    
    # Generate Report
    with open(REPORT_FILE, "w", encoding="utf-8") as f:
        f.write("# Reporte de Discrepancias: Webflow vs Local\n\n")
        
        f.write("## 1. Discrepancias de Estado (Draft/Archived)\n")
        if discrepancies:
            f.write("| Slug | Campo | Valor Remote (Webflow) | Valor Local (Nuevo) | Severidad | Acción Recomendada |\n")
            f.write("|---|---|---|---|---|---|\n")
            for d in discrepancies:
                action = "Mantener Remote" if d["Severity"] == "HIGH" else "Revisar"
                f.write(f"| {d['Slug']} | {d['Field']} | {d['Remote']} | {d['Local']} | {d['Severity']} | {action} |\n")
        else:
            f.write("No se encontraron discrepancias de estado críticas.\n")
            
        f.write("\n## 2. Registros Nuevos (En Local, no en Webflow)\n")
        f.write(f"Total: {len(new_in_local)}\n")
        if new_in_local:
            f.write(f"Ejemplos: {', '.join(new_in_local[:10])}...\n")
            
        f.write("\n## 3. Registros Faltantes (En Webflow, no en Local)\n")
        f.write(f"Total: {len(missing_in_local)}\n")
        if missing_in_local:
            f.write(f"Ejemplos: {', '.join(missing_in_local[:10])}...\n")
            
    print(f"Reporte generado en: {REPORT_FILE}")
    print(f"Discrepancias críticas encontradas: {len([d for d in discrepancies if d['Severity'] == 'HIGH'])}")

if __name__ == "__main__":
    main()
