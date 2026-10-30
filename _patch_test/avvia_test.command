#!/bin/bash
# Crea la copia di prova di Open-Higgsfield-AI e la avvia (solo kie.ai).
set -e
ORIG="/Volumes/ORICO/reverse/Open-Higgsfield-AI"
TEST="/Volumes/ORICO/reverse/Open-Higgsfield-AI-test"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js non trovato. Installalo da https://nodejs.org (versione LTS) e rilancia."
  exit 1
fi
echo "Node: $(node -v)"

echo "Copio il progetto in $TEST (senza .git e node_modules)..."
rsync -a --exclude .git --exclude node_modules --exclude _patch_test --exclude docs "$ORIG/" "$TEST/"
cp "$ORIG/_patch_test/main.js" "$TEST/src/main.js"
cp "$ORIG/_patch_test/vite.config.mjs" "$TEST/vite.config.mjs"

cd "$TEST"
echo "Installo le dipendenze (qualche minuto la prima volta)..."
npm install --no-audit --no-fund --ignore-scripts
echo ""
echo "Avvio: apri http://localhost:5173 nel browser. Per fermare: Ctrl+C"
npx vite --port 5173 --open
