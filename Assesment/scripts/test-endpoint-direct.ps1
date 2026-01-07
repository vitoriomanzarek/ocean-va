# Script para probar el endpoint /api/quiz/submit directamente
# Uso: .\test-endpoint-direct.ps1 -Url "https://tu-dominio.vercel.app"

param(
    [string]$Url = "https://ocean-va.vercel.app"
)

$apiUrl = "$Url/api/quiz/submit"

Write-Host "🧪 Probando endpoint: $apiUrl" -ForegroundColor Cyan
Write-Host ""

# Datos de prueba
$testData = @{
    contact = @{
        name = "Test User"
        email = "test@example.com"
        phone = "(555) 123-4567"
        industry = "insurance"
    }
    answers = @{
        q5 = "yes"
        q6 = "sometimes"
        q7 = "no"
    }
    scores = @{
        operational = 7
        intent = 10
        urgency = 3
    }
    profile = @{
        profile = "A"
        name = "HOT LEAD"
        priority = 1
        action = "immediate-sales-call"
    }
    savings = @{
        currentCost = 5000
        vaCost = 2000
        monthlySavings = 3000
        annualSavings = 36000
    }
} | ConvertTo-Json -Depth 10

Write-Host "📤 Enviando datos de prueba..." -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $testData -ContentType "application/json" -ErrorAction Stop
    
    Write-Host "✅ ÉXITO!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Respuesta del servidor:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 10 | Write-Host
    
    if ($response.savedTo -eq "webflow") {
        Write-Host ""
        Write-Host "✅ Datos guardados en Webflow CMS" -ForegroundColor Green
        Write-Host "   Item ID: $($response.data.id)" -ForegroundColor Gray
    } elseif ($response.savedTo -eq "local") {
        Write-Host ""
        Write-Host "⚠️  Datos guardados localmente (fallback)" -ForegroundColor Yellow
        if ($response.warning) {
            Write-Host "   Advertencia: $($response.warning)" -ForegroundColor Yellow
        }
    }
    
} catch {
    Write-Host "❌ ERROR!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host ""
        Write-Host "Respuesta del servidor:" -ForegroundColor Yellow
        Write-Host $responseBody
    }
}

Write-Host ""
Write-Host "💡 Para usar con otra URL:" -ForegroundColor Gray
Write-Host "   .\test-endpoint-direct.ps1 -Url `"https://tu-dominio.vercel.app`"" -ForegroundColor Gray

