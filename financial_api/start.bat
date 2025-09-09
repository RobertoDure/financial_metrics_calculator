@echo off
echo Starting Financial Analysis API...
echo.
echo Installing/Updating dependencies...
pip install -r requirements.txt
echo.
echo Starting the API server...
echo API will be available at: http://localhost:8000
echo Interactive docs at: http://localhost:8000/docs
echo.
python run.py
