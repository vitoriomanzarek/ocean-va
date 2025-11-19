#!/usr/bin/env node

/**
 * Script para agregar campo youtubeUrl a todos los VAs en vasData.js
 * Convierte URLs embed a URLs directas de YouTube (youtu.be)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vasDataPath = path.join(__dirname, '../src/data/vasData.js');

// Leer el archivo
let content = fs.readFileSync(vasDataPath, 'utf-8');

// Función para convertir URL embed a youtu.be
function getYoutubeUrl(embedUrl) {
  if (!embedUrl) return null;
  
  // Extraer video ID de URL embed
  const match = embedUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  
  const videoId = match[1];
  return `https://youtu.be/${videoId}`;
}

// Procesar cada VA
const vaPattern = /(\{[\s\S]*?imagen:\s*"[^"]+",\s*videoUrl:\s*"([^"]+)")\s*\n\s*\}/g;

let count = 0;
content = content.replace(vaPattern, (match, beforeClose, videoUrl) => {
  const youtubeUrl = getYoutubeUrl(videoUrl);
  
  if (youtubeUrl) {
    count++;
    return `${beforeClose},\n    youtubeUrl: "${youtubeUrl}"\n  }`;
  }
  
  return match;
});

// Escribir el archivo actualizado
fs.writeFileSync(vasDataPath, content, 'utf-8');

console.log(`✅ Script completado!`);
console.log(`📊 ${count} VAs actualizados con campo youtubeUrl`);
console.log(`📁 Archivo: ${vasDataPath}`);
