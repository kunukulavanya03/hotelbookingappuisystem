@echo off
echo Starting this_project_aims_to_develop_a_backend_api_for_the_hotel_booking_application_user_interface_system_using_fastapi_and_sqlalchemy. Backend Server...
echo.
cd /d "%~dp0"
if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
)
echo Installing dependencies...
pip install -r requirements.txt
echo.
echo Starting server on http://localhost:8000
echo Press Ctrl+C to stop
echo.
python main.py
pause