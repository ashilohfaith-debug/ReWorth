@echo off
echo ========================================
echo   ReWorth Backend - Starting Server
echo ========================================
echo.

REM Activate virtual environment if it exists
if exist "venv\Scripts\activate.bat" (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
) else (
    echo WARNING: Virtual environment not found!
    echo Run: python -m venv venv
    echo Then: venv\Scripts\activate
    echo Then: pip install -r requirements.txt
    echo.
    pause
    exit /b 1
)

echo.
echo Starting Flask server...
echo Backend will run at: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

python app.py

pause
