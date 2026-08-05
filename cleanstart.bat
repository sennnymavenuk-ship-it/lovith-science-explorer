@echo off
setlocal

set PORT=%1
if "%PORT%"=="" set PORT=3001

echo ==========================================
echo Current directory: %CD%
echo ==========================================
echo.

if not exist package.json (
  echo No package.json found here. Are you in the right project folder?
  echo Nothing was changed.
  exit /b 1
)

echo Changes will be made to THIS directory: %CD%
echo.

echo Clearing Vite cache in: %CD%\node_modules\.vite
if exist node_modules\.vite rmdir /s /q node_modules\.vite

echo.
echo Starting dev server on port %PORT% from: %CD%
npm run dev -- --port=%PORT%