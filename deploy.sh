#!/bin/bash

# ---- CONFIG: set your GitHub repo URL here ----
REPO_URL="https://github.com/sennnymavenuk-ship-it/lovith-science-explorer.git"
# -------------------------------------------------

MSG=${1:-"Update site"}

echo "=========================================="
echo "Current directory: $(pwd)"
echo "=========================================="
echo ""

if [ ! -f "package.json" ]; then
  echo "⚠️  No package.json found here. Are you in the right project folder?"
  echo "⚠️  Nothing was changed or pushed."
  exit 1
fi

echo "✅ Changes will be committed and pushed from THIS directory: $(pwd)"
echo ""

# 1. Check if this folder is already a git repo
if [ ! -d ".git" ]; then
  echo "No git repo found. Setting up for the first time..."

  git init
  git branch -M main

  if [ -z "$(git config user.email)" ]; then
    echo ""
    echo "⚠️  Git needs your identity before committing. Run these once:"
    echo "   git config --global user.email \"sennnymavenuk@gmail.com\""
    echo "   git config --global user.name \"Senthil Kumar\""
    exit 1
  fi

  git add .
  git commit -m "Initial commit"
  git remote add origin "$REPO_URL"
  git push -u origin main

  echo "First-time setup complete. Repo pushed to $REPO_URL"

else
  echo "Existing repo detected. Checking what changed..."
  git add .

  if git diff --cached --quiet; then
    echo "No changes detected. Nothing to commit."
  else
    echo ""
    echo "=========================================="
    echo "Files changed in this update:"
    echo "=========================================="
    git diff --cached --name-status | while read status file; do
      case "$status" in
        A) echo "  [Added]    $file" ;;
        M) echo "  [Modified] $file" ;;
        D) echo "  [Deleted]  $file" ;;
        *) echo "  [$status] $file" ;;
      esac
    done
    echo "=========================================="
    echo ""
    echo "Summary of line changes:"
    git diff --cached --stat
    echo ""
    echo "Committing with message: $MSG"
    git commit -m "$MSG"
    echo "Pushing to GitHub from: $(pwd)"
    git push
    echo "Done! Vercel will redeploy automatically if connected."
  fi
fi