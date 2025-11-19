/**
 * Update vasData.js structure to add categoría_principal
 * Run with: node scripts/updateVasDataStructure.js
 */

import fs from 'fs';
import { vasData } from '../src/data/vasData.js';

// Map of VA names to their primary category
const categoryMap = {
  // Insurance VAs
  Adrian: "Insurance Virtual Assistant",
  Alejandro: "Insurance Virtual Assistant",
  Dafne: "Insurance Virtual Assistant",
  Ivan: "Insurance Virtual Assistant",
  Joana: "Executive Virtual Assistant",
  Karen: "Insurance Virtual Assistant",
  "Maria Paula": "Healthcare Virtual Assistant",
  Moises: "Insurance Virtual Assistant",
  Abigail: "Insurance Virtual Assistant",
  Antonio: "Insurance Virtual Assistant",
  "Cherry Mae": "Insurance Virtual Assistant",
  Emmanuel: "Insurance Virtual Assistant",
  Francis: "Insurance Virtual Assistant",
  Geraldine: "Insurance Virtual Assistant",
  "Jay Alvin": "Insurance Virtual Assistant",
  Javier: "Insurance Virtual Assistant",
  Jerome: "Insurance Virtual Assistant",
  Jimmy: "Insurance Virtual Assistant",
  Joel: "Insurance Virtual Assistant",
  "Joji Marie": "Insurance Virtual Assistant",
  Laurice: "Insurance Virtual Assistant",
  Lorenz: "Insurance Virtual Assistant",
  "Ma. Venus": "Insurance Virtual Assistant",
  Michelle: "Insurance Virtual Assistant",
  Raydon: "Insurance Virtual Assistant",
  "Rona Mae": "Insurance Virtual Assistant",
  Gizelle: "Insurance Virtual Assistant",
  Jasmine: "Insurance Virtual Assistant",
  Jill: "Insurance Virtual Assistant",
  Pavel: "Marketing Virtual Assistant",
  Ana: "Insurance Virtual Assistant",
  "Ana Victoria": "Insurance Virtual Assistant",
  Balbina: "Insurance Virtual Assistant",
  "Brandon L.": "Insurance Virtual Assistant",
  Carolina: "Insurance Virtual Assistant",
  Christine: "Insurance Virtual Assistant",
  Dawn: "Insurance Virtual Assistant",
  Dayana: "Insurance Virtual Assistant",
  Ellen: "Insurance Virtual Assistant",
  Fernanda: "Insurance Virtual Assistant",
  Gonzalo: "Insurance Virtual Assistant",
  Guillermo: "Insurance Virtual Assistant",
  Israel: "Insurance Virtual Assistant",
  Janice: "Insurance Virtual Assistant",
  Kevin: "Insurance Virtual Assistant",
  Lois: "Insurance Virtual Assistant",
  "Maria D.": "Insurance Virtual Assistant",
  Maria: "Insurance Virtual Assistant",
  Melissa: "Insurance Virtual Assistant",
  Patricia: "Insurance Virtual Assistant",
  Rafael: "Insurance Virtual Assistant",
  Rainier: "Insurance Virtual Assistant",
  Rejean: "Insurance Virtual Assistant",
  Rochelle: "Insurance Virtual Assistant",
  Sandra: "Insurance Virtual Assistant",
  "Ximena G.": "Insurance Virtual Assistant",
  Tricia: "Insurance Virtual Assistant",
  Anahi: "Insurance Virtual Assistant",
  Yvette: "Mortgage Specialist",
  Grace: "Insurance Virtual Assistant",
  AC: "Mortgage Specialist",
  Mina: "Insurance Virtual Assistant",
};

// Update vasData with categoría_principal
const updatedVasData = vasData.map((va) => ({
  ...va,
  categoría_principal: categoryMap[va.nombre] || va.categorías[0] || "Virtual Assistant",
}));

// Generate the new file content
let fileContent = "export const vasData = [\n";

updatedVasData.forEach((va, index) => {
  fileContent += "  {\n";
  fileContent += `    id: ${va.id},\n`;
  fileContent += `    nombre: "${va.nombre}",\n`;
  fileContent += `    categoría_principal: "${va.categoría_principal}",\n`;
  fileContent += `    idiomas: "${va.idiomas}",\n`;
  fileContent += `    años_experiencia: ${va.años_experiencia === null ? "null" : va.años_experiencia},\n`;
  fileContent += `    especialización: [${va.especialización.map((e) => `"${e}"`).join(", ")}],\n`;
  fileContent += `    nivel_inglés: "${va.nivel_inglés}",\n`;
  fileContent += `    disponibilidad: "${va.disponibilidad}",\n`;
  fileContent += `    horario: "${va.horario}",\n`;
  fileContent += `    categorías: [${va.categorías.map((c) => `"${c}"`).join(", ")}],\n`;
  fileContent += `    slug: "${va.slug}",\n`;
  fileContent += `    imagen: "${va.imagen}"`;
  
  if (va.videoUrl) {
    fileContent += `,\n    videoUrl: "${va.videoUrl}"`;
  }
  
  fileContent += "\n  }";
  
  if (index < updatedVasData.length - 1) {
    fileContent += ",";
  }
  
  fileContent += "\n";
});

fileContent += "];\n";

// Write to file
fs.writeFileSync("src/data/vasData.js", fileContent);

console.log("✅ vasData.js updated successfully!");
console.log(`📊 Updated ${updatedVasData.length} VAs with categoría_principal field\n`);

// Show a sample
console.log("📋 Sample (Adrian):");
console.log(JSON.stringify(updatedVasData[0], null, 2));
