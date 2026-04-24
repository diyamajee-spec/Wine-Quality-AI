# VinoPredict Local Runner (PowerShell)
# This script starts a local server to bypass CORS restrictions for CSV loading.

Write-Host "🍷 Starting VinoPredict Local Server..." -ForegroundColor Cyan

# Check if Python is installed
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "✅ Found Python" -ForegroundColor Green
    Write-Host "🌐 Application will be available at: http://localhost:8080" -ForegroundColor Yellow
    python server.py
}
elseif (Get-Command py -ErrorAction SilentlyContinue) {
    Write-Host "✅ Found Python (py launcher)" -ForegroundColor Green
    Write-Host "🌐 Application will be available at: http://localhost:8080" -ForegroundColor Yellow
    py server.py
}
else {
    Write-Host "❌ Python not found. Please install Python or use a different static server." -ForegroundColor Red
    Write-Host "💡 Alternatively, you can open ./app/index.html directly in your browser," -ForegroundColor Gray
    Write-Host "   but external CSV loading may be limited by browser security (CORS)." -ForegroundColor Gray
    exit 1
}
