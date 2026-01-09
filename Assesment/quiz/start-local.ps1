# Script para iniciar el quiz en local (PowerShell)
Write-Host "🚀 Iniciando el Quiz en Local..." -ForegroundColor Green
Write-Host ""

# Verificar si estamos en la carpeta correcta
if (-not (Test-Path "standalone.html")) {
    Write-Host "❌ Error: Este script debe ejecutarse desde la carpeta Assesment/quiz" -ForegroundColor Red
    Write-Host "   Ejecuta: cd Assesment/quiz" -ForegroundColor Yellow
    exit 1
}

# Verificar si el servidor del API está corriendo
Write-Host "📡 Verificando si el servidor del API está corriendo..." -ForegroundColor Cyan
$apiRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/quiz/submit" -Method POST -Body '{}' -ContentType "application/json" -TimeoutSec 2 -ErrorAction SilentlyContinue
    $apiRunning = $true
} catch {
    # El servidor no está corriendo o no responde, eso está bien
}

if (-not $apiRunning) {
    Write-Host "⚠️  El servidor del API no está corriendo en localhost:3000" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Para iniciar el servidor del API:" -ForegroundColor Cyan
    Write-Host "   1. Abre una nueva terminal" -ForegroundColor White
    Write-Host "   2. Ejecuta: cd Assesment" -ForegroundColor White
    Write-Host "   3. Ejecuta: npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "Presiona Enter para continuar sin el API (el quiz funcionará pero no guardará datos)..." -ForegroundColor Yellow
    Read-Host
} else {
    Write-Host "✅ El servidor del API está corriendo" -ForegroundColor Green
    Write-Host ""
}

# Abrir el archivo en el navegador
Write-Host "🌐 Abriendo el quiz en tu navegador..." -ForegroundColor Cyan
$filePath = Join-Path $PWD "standalone.html"
$fileUri = "file:///$($filePath.Replace('\', '/'))"

Start-Process $fileUri

Write-Host ""
Write-Host "✅ Quiz abierto en el navegador!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Notas:" -ForegroundColor Cyan
Write-Host "   - El quiz detectará automáticamente que estás en localhost" -ForegroundColor White
Write-Host "   - Si el API está corriendo, los datos se guardarán en Webflow" -ForegroundColor White
Write-Host "   - Si el API no está corriendo, el quiz funcionará pero no guardará datos" -ForegroundColor White
Write-Host ""
Write-Host "Para detener el servidor del API, presiona Ctrl+C en la terminal donde está corriendo" -ForegroundColor Yellow

