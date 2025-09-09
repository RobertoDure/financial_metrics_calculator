@echo off
echo Installing dependencies...
cd /d "c:\Users\rober\Documents\Codes\Financial\financial-ui"
call npm install

echo.
echo Starting development server...
echo Navigate to http://localhost:3000 in your browser
echo Make sure your Financial API is running on http://localhost:8000
echo.
call npm start

pause
