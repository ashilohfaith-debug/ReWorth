@echo off
title ReWorth Backend Setup
color 0A
echo.
echo  ====================================================
echo    ReWorth Backend - Setup and Start
echo  ====================================================
echo.

cd /d "%~dp0"

REM ── Step 1: Check Python ──────────────────────────────
python --version >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Python not found. Install Python 3.9+ from python.org
    pause & exit /b 1
)
echo  [OK] Python found.

REM ── Step 2: Create venv if not exists ────────────────
if not exist "venv\Scripts\activate.bat" (
    echo  [INFO] Creating virtual environment...
    python -m venv venv
)
echo  [OK] Virtual environment ready.

REM ── Step 3: Activate and install deps ────────────────
call venv\Scripts\activate.bat
echo  [INFO] Installing/checking dependencies...
pip install -q -r requirements.txt
if errorlevel 1 (
    echo  [ERROR] pip install failed. Check requirements.txt
    pause & exit /b 1
)
echo  [OK] Dependencies installed.

REM ── Step 4: Check .env ───────────────────────────────
if not exist ".env" (
    echo  [INFO] .env not found – creating from env.example...
    copy env.example .env
    echo.
    echo  IMPORTANT: Open .env and set DB_PASSWORD to your PostgreSQL password!
    echo.
    pause
)
echo  [OK] .env found.

echo.
echo  ====================================================
echo    Starting Flask server on http://localhost:5000
echo    Press Ctrl+C to stop
echo  ====================================================
echo.

python app.py

pause
