"""
Script para cargar schemas a Webflow usando la API
==================================================

Este script lee los archivos HTML de schemas y los sube a las páginas correspondientes
en Webflow usando la API.

Requisitos:
- Webflow API Token (obtener en: https://webflow.com/dashboard/settings/integrations)
- Site ID de Webflow
- Python 3.7+
- Librería requests: pip install requests

Uso:
    python upload-schemas-to-webflow.py --site-id YOUR_SITE_ID --token YOUR_API_TOKEN
"""

import json
import os
import re
import argparse
import requests
from pathlib import Path
from typing import Dict, Optional

# Configuración
WEBFLOW_API_BASE = "https://api.webflow.com/v2"
SCHEMAS_DIR = Path(__file__).parent
CATEGORIES_DIR = SCHEMAS_DIR / "categories"
INDIVIDUAL_DIR = SCHEMAS_DIR / "individual"

def extract_json_from_html(html_file: Path) -> Optional[Dict]:
    """Extrae el JSON del schema desde un archivo HTML"""
    try:
        content = html_file.read_text(encoding='utf-8')
        # Buscar el contenido entre <script type="application/ld+json"> y </script>
        pattern = r'<script\s+type=["\']application/ld\+json["\']>\s*(.*?)\s*</script>'
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            json_str = match.group(1)
            return json.loads(json_str)
        else:
            print(f"⚠️  No se encontró JSON-LD en {html_file.name}")
            return None
    except Exception as e:
        print(f"❌ Error leyendo {html_file.name}: {e}")
        return None

def get_pages_list(site_id: str, token: str) -> Dict:
    """Obtiene la lista de páginas del sitio"""
    url = f"{WEBFLOW_API_BASE}/sites/{site_id}/pages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/json"
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def find_page_by_slug(pages: Dict, slug: str) -> Optional[Dict]:
    """Encuentra una página por su slug"""
    for page in pages.get("items", []):
        if page.get("slug") == slug or page.get("slug") == slug.lstrip("/"):
            return page
    return None

def update_page_schema(site_id: str, page_id: str, schema_json: Dict, token: str) -> bool:
    """
    Actualiza el schema markup de una página
    
    NOTA: Necesitamos verificar el nombre exacto del campo en la API de Webflow.
    Puede ser 'seo', 'schemaMarkup', 'customCode', etc.
    """
    url = f"{WEBFLOW_API_BASE}/pages/{page_id}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    
    # Convertir el JSON del schema a string
    schema_string = json.dumps(schema_json, indent=2, ensure_ascii=False)
    
    # Intentar diferentes campos posibles
    # NOTA: Necesitamos verificar cuál es el campo correcto en la API
    possible_fields = [
        "seo",  # Campo SEO que puede incluir schema
        "schemaMarkup",  # Campo específico de schema
        "customCode",  # Código personalizado
    ]
    
    # Primero, obtener los metadatos actuales de la página
    try:
        get_url = f"{WEBFLOW_API_BASE}/pages/{page_id}"
        get_response = requests.get(get_url, headers=headers)
        if get_response.status_code == 200:
            current_data = get_response.json()
            print(f"📄 Estructura actual de la página: {list(current_data.keys())}")
    except Exception as e:
        print(f"⚠️  No se pudo obtener datos actuales: {e}")
    
    # Intentar actualizar con el campo 'seo' que suele contener schema
    payload = {
        "seo": {
            "schemaMarkup": schema_string
        }
    }
    
    try:
        response = requests.patch(url, headers=headers, json=payload)
        
        if response.status_code == 200:
            print(f"✅ Schema actualizado para página {page_id}")
            return True
        else:
            print(f"⚠️  Respuesta inesperada ({response.status_code}): {response.text}")
            # Intentar con otro formato
            return False
    except Exception as e:
        print(f"❌ Error actualizando página {page_id}: {e}")
        return False

def upload_category_schemas(site_id: str, token: str, dry_run: bool = False):
    """Sube los schemas de las páginas de categorías"""
    print("\n📁 Procesando schemas de categorías...")
    
    # Mapeo de archivos a slugs
    category_mapping = {
        "01-insurance-va-category-schema.html": "ovas-insurance-virtual-assistant",
        "02-executive-admin-va-category-schema.html": "ovas-executive-admin-virtual-assistant",
        "03-mortgage-processing-va-category-schema.html": "ovas-mortgage-processing-assistant",
        "04-healthcare-va-category-schema.html": "ovas-healthcare-virtual-assistant",
    }
    
    # Obtener lista de páginas
    pages = get_pages_list(site_id, token)
    
    for filename, slug in category_mapping.items():
        filepath = CATEGORIES_DIR / filename
        if not filepath.exists():
            print(f"⚠️  Archivo no encontrado: {filename}")
            continue
        
        schema_json = extract_json_from_html(filepath)
        if not schema_json:
            continue
        
        # Buscar la página
        page = find_page_by_slug(pages, slug)
        if not page:
            print(f"⚠️  Página no encontrada para slug: {slug}")
            continue
        
        page_id = page.get("id")
        page_name = page.get("title", slug)
        
        print(f"\n📄 Procesando: {page_name} ({slug})")
        
        if dry_run:
            print(f"   [DRY RUN] Se actualizaría página {page_id} con schema")
        else:
            success = update_page_schema(site_id, page_id, schema_json, token)
            if success:
                print(f"   ✅ Schema cargado exitosamente")
            else:
                print(f"   ❌ Error cargando schema")

def upload_individual_va_schemas(site_id: str, token: str, dry_run: bool = False, limit: Optional[int] = None):
    """Sube los schemas de los perfiles individuales de VAs"""
    print("\n👤 Procesando schemas de perfiles individuales...")
    
    # Leer el CSV para mapear nombres a slugs
    csv_path = Path(__file__).parent.parent.parent / "src" / "data" / "VAs Database - VA Merged with licenced VA.csv"
    
    va_slug_map = {}
    if csv_path.exists():
        import csv as csv_lib
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv_lib.DictReader(f)
            for row in reader:
                if 'Licensed Insurance Agent' not in row.get('Title', ''):
                    name = row.get('Name', '').strip()
                    slug = row.get('Profile Slug', '').strip()
                    if name and slug:
                        va_slug_map[name.lower()] = slug.lstrip('/')
    
    # Obtener lista de páginas
    pages = get_pages_list(site_id, token)
    
    # Procesar archivos
    schema_files = sorted(INDIVIDUAL_DIR.glob("*.html"))
    
    if limit:
        schema_files = schema_files[:limit]
    
    for filepath in schema_files:
        schema_json = extract_json_from_html(filepath)
        if not schema_json:
            continue
        
        va_name = schema_json.get("name", "").lower()
        slug = va_slug_map.get(va_name, "")
        
        if not slug:
            # Intentar extraer del nombre del archivo
            filename = filepath.stem
            # Formato: 001-adrian-va-profile-schema
            match = re.search(r'\d+-(.+?)-va-profile', filename)
            if match:
                name_from_file = match.group(1)
                slug = f"{name_from_file}-ocean-va-profile"
        
        if not slug:
            print(f"⚠️  No se pudo determinar slug para {va_name}")
            continue
        
        # Buscar la página
        page = find_page_by_slug(pages, slug)
        if not page:
            print(f"⚠️  Página no encontrada para: {va_name} (slug: {slug})")
            continue
        
        page_id = page.get("id")
        
        if dry_run:
            print(f"   [DRY RUN] Se actualizaría {va_name} ({slug})")
        else:
            success = update_page_schema(site_id, page_id, schema_json, token)
            if success:
                print(f"   ✅ {va_name}")
            else:
                print(f"   ❌ Error: {va_name}")

def main():
    parser = argparse.ArgumentParser(description="Cargar schemas a Webflow")
    parser.add_argument("--site-id", required=True, help="Webflow Site ID")
    parser.add_argument("--token", required=True, help="Webflow API Token")
    parser.add_argument("--dry-run", action="store_true", help="Solo mostrar qué se haría, sin hacer cambios")
    parser.add_argument("--categories-only", action="store_true", help="Solo cargar categorías")
    parser.add_argument("--individual-only", action="store_true", help="Solo cargar perfiles individuales")
    parser.add_argument("--limit", type=int, help="Limitar número de perfiles a procesar (para testing)")
    
    args = parser.parse_args()
    
    print("🚀 Iniciando carga de schemas a Webflow...")
    print(f"   Site ID: {args.site_id}")
    print(f"   Modo: {'DRY RUN' if args.dry_run else 'LIVE'}")
    
    if args.dry_run:
        print("\n⚠️  MODO DRY RUN - No se harán cambios reales")
    
    try:
        if not args.individual_only:
            upload_category_schemas(args.site_id, args.token, args.dry_run)
        
        if not args.categories_only:
            upload_individual_va_schemas(args.site_id, args.token, args.dry_run, args.limit)
        
        print("\n✅ Proceso completado")
        
    except Exception as e:
        print(f"\n❌ Error fatal: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

