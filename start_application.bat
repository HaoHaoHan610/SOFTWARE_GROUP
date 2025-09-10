@echo off
echo Starting Vintage Watch Trading Platform...
echo.

echo Starting Flask API Backend...
cd FlaskAPI\src
start "Flask API" cmd /k "python app.py"
cd ..\..

echo Waiting 3 seconds for API to start...
timeout /t 3 /nobreak > nul

echo Starting React Frontend...
cd vintage-watch-frontend-new
start "React Frontend" cmd /k "npm start"
cd ..

echo.
echo Both applications are starting...
echo API: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
