@echo off
REM Guidance Chatbot API - Quick Start Script for Windows

echo.
echo ============================================
echo Guidance Chatbot API - Setup
echo ============================================
echo.

REM Check if node_modules exists
if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo Error installing dependencies. Please ensure Node.js is installed.
    pause
    exit /b 1
  )
) else (
  echo Dependencies already installed.
)

echo.
echo ============================================
echo Configuration Check
echo ============================================
echo.

REM Check if .env exists
if not exist .env (
  echo Creating .env file from template...
  copy .env.example .env
  echo .env file created. Please edit it with your Claude API key.
  echo.
  echo Steps:
  echo 1. Open .env file in a text editor
  echo 2. Replace 'your_api_key_here' with your actual Claude API key
  echo 3. Get your key from: https://console.anthropic.com/api_keys
  echo.
  pause
) else (
  REM Check if API key is configured
  for /f "tokens=2 delims==" %%a in ('findstr "ANTHROPIC_API_KEY" .env') do set API_KEY=%%a
  if "!API_KEY!"=="your_api_key_here" (
    echo.
    echo WARNING: ANTHROPIC_API_KEY is not configured in .env
    echo Please edit .env and add your actual Claude API key
    echo Get it from: https://console.anthropic.com/api_keys
    echo.
  )
)

echo.
echo ============================================
echo Starting Server
echo ============================================
echo.
echo Server starting on http://localhost:3001
echo Press Ctrl+C to stop the server
echo.

npm start
