from bs4 import BeautifulSoup
import os

filepath = r"c:\Users\USER\CascadeProjects\Ocean VA\webflow-components\237-ximena-g-profile.html"
with open(filepath, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")
    cefr_active = soup.find("div", class_="va-cefr-bubble-active")
    print(f"Found with find: {cefr_active}")
    
    cefr_select = soup.select_one(".va-cefr-bubble-active")
    print(f"Found with select_one: {cefr_select}")
    
    if cefr_active:
        print(f"Text: {cefr_active.text.strip()}")
