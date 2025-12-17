#!/usr/bin/env python3
"""
Script para extraer todas las herramientas de los VAs y clasificarlas por Main Category
"""

import csv
from collections import defaultdict
import re

def extract_tools_by_category(input_file, output_file):
    """
    Extrae todas las herramientas del archivo CSV y las clasifica por Main Category
    """
    # Diccionario para almacenar herramientas por categoría
    tools_by_category = defaultdict(set)
    
    # Diccionario para contar cuántos VAs usan cada herramienta por categoría
    tool_counts = defaultdict(lambda: defaultdict(int))
    
    # Lista para almacenar todas las entradas con detalles
    all_entries = []
    
    print(f"Leyendo archivo: {input_file}")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            main_category = row.get('Main Category', '').strip()
            tools_tags = row.get('Tools_Tags', '').strip()
            va_name = row.get('Name', '').strip()
            
            # Si no hay categoría o herramientas, saltar
            if not main_category or not tools_tags:
                continue
            
            # Separar múltiples categorías (pueden estar separadas por coma)
            categories = [cat.strip() for cat in main_category.split(',')]
            
            # Separar herramientas (están separadas por punto y coma)
            tools = [tool.strip() for tool in tools_tags.split(';') if tool.strip()]
            
            # Procesar cada categoría
            for category in categories:
                if not category:
                    continue
                    
                # Agregar herramientas a la categoría
                for tool in tools:
                    if tool:
                        tools_by_category[category].add(tool)
                        tool_counts[category][tool] += 1
                        
                        # Guardar entrada detallada
                        all_entries.append({
                            'Main Category': category,
                            'Tool': tool,
                            'VA Name': va_name,
                            'Usage Count': tool_counts[category][tool]
                        })
    
    print(f"\nCategorías encontradas: {len(tools_by_category)}")
    for category in sorted(tools_by_category.keys()):
        print(f"  - {category}: {len(tools_by_category[category])} herramientas únicas")
    
    # Crear archivo de salida con herramientas agrupadas por categoría
    print(f"\nCreando archivo de salida: {output_file}")
    
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        
        # Escribir encabezado
        writer.writerow(['Main Category', 'Tool', 'Unique VAs Count', 'All VAs Using This Tool'])
        
        # Escribir herramientas ordenadas por categoría y luego por nombre
        for category in sorted(tools_by_category.keys()):
            tools_sorted = sorted(tools_by_category[category])
            
            for tool in tools_sorted:
                # Contar VAs únicos que usan esta herramienta en esta categoría
                unique_vas = set()
                for entry in all_entries:
                    if entry['Main Category'] == category and entry['Tool'] == tool:
                        unique_vas.add(entry['VA Name'])
                
                # Obtener todos los VAs que usan esta herramienta (en cualquier categoría)
                all_vas_using_tool = set()
                for entry in all_entries:
                    if entry['Tool'] == tool:
                        all_vas_using_tool.add(entry['VA Name'])
                
                writer.writerow([
                    category,
                    tool,
                    len(unique_vas),
                    ', '.join(sorted(all_vas_using_tool))
                ])
    
    # Crear también un archivo resumen por categoría
    summary_file = output_file.replace('.csv', '_summary.csv')
    print(f"Creando archivo resumen: {summary_file}")
    
    with open(summary_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Main Category', 'Total Unique Tools', 'Tools List'])
        
        for category in sorted(tools_by_category.keys()):
            tools_list = sorted(tools_by_category[category])
            writer.writerow([
                category,
                len(tools_list),
                '; '.join(tools_list)
            ])
    
    print(f"\n✅ Proceso completado!")
    print(f"   - Archivo principal: {output_file}")
    print(f"   - Archivo resumen: {summary_file}")
    print(f"   - Total de categorías: {len(tools_by_category)}")
    print(f"   - Total de herramientas únicas: {sum(len(tools) for tools in tools_by_category.values())}")

if __name__ == '__main__':
    input_file = 'src/data/VAs_Database_Webflow_Ready_v3.csv'
    output_file = 'src/data/VAs_Tools_by_Category.csv'
    
    extract_tools_by_category(input_file, output_file)

