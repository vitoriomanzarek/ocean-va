import csv

INPUT_CSV = r"src/data/VAs_Database_Main.csv"

rows = []
with open(INPUT_CSV, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    
    for row in reader:
        # Check for Ximena collision
        if row["Slug"] == "ximena":
            name = row.get("Name", "").strip()
            # If name is "Ximena" (not Ximena G.), rename slug
            if name == "Ximena":
                print("Renaming slug for 'Ximena' to 'ximena-4e77d'")
                row["Slug"] = "ximena-4e77d"
            elif name == "Ximena G.":
                print("Keeping slug for 'Ximena G.' as 'ximena'")
        rows.append(row)

with open(INPUT_CSV, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print("Done fixing Ximena.")
