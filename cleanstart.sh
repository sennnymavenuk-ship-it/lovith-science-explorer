#!/bin/bash

PORT=${1:-3001}

echo "Detected shell: $(basename "$SHELL" 2>/dev/null || echo "bash/Git Bash")"
echo "Working folder: $(pwd)"
echo ""

if [ ! -f "package.json" ]; then
  echo "⚠️  No package.json found here. Are you in the right project folder?"
  exit 1
fi

echo "Clearing Vite cache..."
rm -rf node_modules/.vite

echo "Starting dev server on port $PORT..."
npm run dev -- --port=$PORT