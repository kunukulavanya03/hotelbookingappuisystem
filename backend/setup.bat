@echo off
echo Setting up this_project_aims_to_develop_a_backend_api_for_the_hotel_booking_application_user_interface_system_using_fastapi_and_sqlalchemy. Backend...
echo.
cd /d "%~dp0"
echo Step 1: Installing dependencies...
pip install -r requirements.txt
echo.
echo Step 2: Creating .env file...
if not exist ".env" (
    copy .env.example .env
    echo .env file created. Please edit it with your configuration.
) else (
    echo .env file already exists.
)
echo.
echo Step 3: Database setup will happen on first run.
echo.
echo Setup complete! Run run_server.bat to start the server.
pause