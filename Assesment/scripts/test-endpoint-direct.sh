#!/bin/bash
# Script para probar el endpoint /api/quiz/submit directamente
# Uso: ./test-endpoint-direct.sh https://tu-dominio.vercel.app

URL=${1:-"https://ocean-va.vercel.app"}
API_URL="$URL/api/quiz/submit"

echo "🧪 Probando endpoint: $API_URL"
echo ""

# Datos de prueba
TEST_DATA='{
  "contact": {
    "name": "Test User",
    "email": "test@example.com",
    "phone": "(555) 123-4567",
    "industry": "insurance"
  },
  "answers": {
    "q5": "yes",
    "q6": "sometimes",
    "q7": "no"
  },
  "scores": {
    "operational": 7,
    "intent": 10,
    "urgency": 3
  },
  "profile": {
    "profile": "A",
    "name": "HOT LEAD",
    "priority": 1,
    "action": "immediate-sales-call"
  },
  "savings": {
    "currentCost": 5000,
    "vaCost": 2000,
    "monthlySavings": 3000,
    "annualSavings": 36000
  }
}'

echo "📤 Enviando datos de prueba..."
echo ""

response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

echo "Status Code: $http_code"
echo ""
echo "Respuesta:"
echo "$body" | jq '.' 2>/dev/null || echo "$body"

if [ "$http_code" -eq 200 ]; then
    echo ""
    echo "✅ ÉXITO!"
    savedTo=$(echo "$body" | jq -r '.savedTo' 2>/dev/null)
    if [ "$savedTo" = "webflow" ]; then
        echo "✅ Datos guardados en Webflow CMS"
    elif [ "$savedTo" = "local" ]; then
        echo "⚠️  Datos guardados localmente (fallback)"
    fi
else
    echo ""
    echo "❌ ERROR!"
fi

