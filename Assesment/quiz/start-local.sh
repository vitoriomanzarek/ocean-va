#!/bin/bash
# Script para iniciar el quiz en local (Bash/Linux/Mac)

echo "🚀 Iniciando el Quiz en Local..."
echo ""

# Verificar si estamos en la carpeta correcta
if [ ! -f "standalone.html" ]; then
    echo "❌ Error: Este script debe ejecutarse desde la carpeta Assesment/quiz"
    echo "   Ejecuta: cd Assesment/quiz"
    exit 1
fi

# Verificar si el servidor del API está corriendo
echo "📡 Verificando si el servidor del API está corriendo..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/quiz/submit > /dev/null 2>&1; then
    echo "✅ El servidor del API está corriendo"
    echo ""
else
    echo "⚠️  El servidor del API no está corriendo en localhost:3000"
    echo ""
    echo "Para iniciar el servidor del API:"
    echo "   1. Abre una nueva terminal"
    echo "   2. Ejecuta: cd Assesment"
    echo "   3. Ejecuta: npm run dev"
    echo ""
    read -p "Presiona Enter para continuar sin el API (el quiz funcionará pero no guardará datos)..."
fi

# Abrir el archivo en el navegador
echo "🌐 Abriendo el quiz en tu navegador..."
if command -v xdg-open > /dev/null; then
    xdg-open standalone.html
elif command -v open > /dev/null; then
    open standalone.html
else
    echo "Por favor, abre standalone.html en tu navegador"
fi

echo ""
echo "✅ Quiz abierto en el navegador!"
echo ""
echo "📝 Notas:"
echo "   - El quiz detectará automáticamente que estás en localhost"
echo "   - Si el API está corriendo, los datos se guardarán en Webflow"
echo "   - Si el API no está corriendo, el quiz funcionará pero no guardará datos"
echo ""
echo "Para detener el servidor del API, presiona Ctrl+C en la terminal donde está corriendo"

