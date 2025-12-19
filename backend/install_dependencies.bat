@echo off
echo Installing this_project_aims_to_develop_a_backend_api_for_the_hotel_booking_application_user_interface_system_using_fastapi_and_sqlalchemy. Backend Dependencies...
echo.
cd /d "%~dp0"
pip install -r requirements.txt
echo.
echo Dependencies installed successfully!
pause