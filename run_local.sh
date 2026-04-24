#!/bin/bash

# VinoPredict Local Runner
# This script starts a local server to bypass CORS restrictions for CSV loading.

echo "🍷 Starting VinoPredict Local Server..."

# Check if Python is installed
if command -v python3 &>/dev/null; then
    echo "✅ Found Python 3"
    echo "🌐 Application will be available at: http://localhost:8080"
    python3 server.py
elif command -v python &>/dev/null; then
    echo "✅ Found Python"
    echo "🌐 Application will be available at: http://localhost:8080"
    python server.py
else
    echo "❌ Python not found. Please install Python or use a different static server."
    echo "💡 Alternatively, you can open ./app/index.html directly in your browser,"
    echo "   but external CSV loading may be limited by browser security (CORS)."
    exit 1
fi
