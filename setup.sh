#!/bin/bash
# Guidance Chatbot API - Quick Start Script for Mac/Linux

set -e  # Exit on error

echo ""
echo "============================================"
echo "Guidance Chatbot API - Setup"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node -v)"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo "✓ Dependencies installed"
else
    echo "✓ Dependencies already installed"
fi

echo ""
echo "============================================"
echo "Configuration Check"
echo "============================================"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "✓ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit your .env file with your Claude API key"
    echo ""
    echo "Steps:"
    echo "1. Open .env in your editor: nano .env"
    echo "2. Replace 'your_api_key_here' with your actual Claude API key"
    echo "3. Get your key from: https://console.anthropic.com/api_keys"
    echo ""
else
    # Check if API key is configured
    if grep -q "ANTHROPIC_API_KEY=your_api_key_here" .env; then
        echo ""
        echo "⚠️  WARNING: ANTHROPIC_API_KEY is not configured in .env"
        echo "Please edit .env and add your actual Claude API key"
        echo "Get it from: https://console.anthropic.com/api_keys"
        echo ""
    else
        echo "✓ .env file configured"
    fi
fi

echo "============================================"
echo "Starting Server"
echo "============================================"
echo ""
echo "Server starting on http://localhost:3001"
echo "Press Ctrl+C to stop the server"
echo ""

npm start
