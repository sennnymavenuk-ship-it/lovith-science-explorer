#!/bin/bash

# ---- CONFIG: set your GitHub repo URL here ----
REPO_URL="https://github.com/sennnymavenuk-ship-it/lovith-science-explorer.git"
# -------------------------------------------------

MSG=${1:-"Update site"}

# 1. Check if this folder is already a git repo
if [ ! -d ".git" ]; then
  echo "No git repo found. Setting up for the first time..."

  git init
  git branch -M main

  # Check if user identity is set, warn if not
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
  echo "Existing repo detected. Proceeding with normal update..."

  echo "Staging changes..."
  git add .

  # Only commit if there's actually something staged
  if git diff --cached --quiet; then
    echo "No changes to commit."
  else
    echo "Committing: $MSG"
    git commit -m "$MSG"
  fi

  echo "Pushing to GitHub..."
  git push

  echo "Done! Vercel will redeploy automatically if connected."
fi