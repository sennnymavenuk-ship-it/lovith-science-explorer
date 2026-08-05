@echo off
setlocal

set PORT=%1
if "%PORT%"=="" set PORT=3001

echo Detected shell: Command Prompt (cmd.exe)
echo Working folder: %CD%
echo.

if not exist package.json (
  echo No package.json found here. Are you in the right project folder?
  exit /b 1
)

echo Clearing Vite cache...
if exist node_modules\.vite rmdir /s /q node_modules\.vite

echo Starting dev server on port %PORT%...
npm run dev -- --port=%PORT%