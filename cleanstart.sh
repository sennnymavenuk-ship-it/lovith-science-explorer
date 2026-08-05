#!/bin/bash

PORT=${1:-3001}

echo "=========================================="
echo "Current directory: $(pwd)"
echo "=========================================="
echo ""

if [ ! -f "package.json" ]; then
  echo "⚠️  No package.json found here. Are you in the right project folder?"
  echo "⚠️  Nothing was changed."
  exit 1
fi

echo "✅ Changes will be made to THIS directory: $(pwd)"
echo ""

echo "Clearing Vite cache in: $(pwd)/node_modules/.vite"
rm -rf node_modules/.vite

echo ""
echo "Starting dev server on port $PORT from: $(pwd)"
npm run dev -- --port=$PORT