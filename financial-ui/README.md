# Financial Analysis UI

A modern React-based user interface for interacting with the Financial Analysis API.

## Features

- **Comprehensive Financial Analysis**: Analyze complete financial metrics including:
  - Market Valuation Metrics (P/E, P/B, Dividend Yield, etc.)
  - Growth Metrics (Revenue CAGR, Net Income CAGR, etc.)
  - Profitability Metrics (ROA, ROE, Profit Margins, etc.)
  - Liquidity Metrics (Current Ratio, Quick Ratio, etc.)
  - Leverage Metrics (Debt-to-Equity, Debt-to-Assets, etc.)

- **User-Friendly Interface**: 
  - Clean, modern design with Tailwind CSS
  - Organized form sections for easy data entry
  - Sample data loading for quick testing
  - Responsive design for all devices

- **Interactive Features**:
  - Real-time form validation
  - Loading states and error handling
  - Toast notifications for user feedback
  - Metric cards with color-coded categories

## Prerequisites

- **Python 3.11+** (for the API backend)
- **Node.js (v16 or higher)** (for the React frontend)
- **npm or yarn** (package managers)
- **pip** (Python package installer)

## System Architecture

```
┌─────────────────────┐    HTTP/JSON    ┌──────────────────────┐
│   React Frontend    │ <=============> │   FastAPI Backend    │
│   (Port 3001)       │                 │   (Port 8000)        │
└─────────────────────┘                 └──────────────────────┘
```

## Installation & Setup

### Step 1: Set up Python API Backend

1. **Navigate to the API directory:**
```bash
cd ../financial_api
```

2. **Install Python dependencies:**
```bash
pip install fastapi uvicorn pydantic pandas python-multipart requests
```

3. **Start the Financial Analysis API:**
```bash
python run.py
```
*Or alternatively:*
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

**API Endpoints:**
- `GET /` - Welcome message
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /health` - Health check
- `POST /api/v1/analyze` - Complete financial analysis
- `POST /api/v1/analyze/market-valuation` - Market valuation metrics only
- `POST /api/v1/analyze/growth` - Growth metrics only
- `POST /api/v1/analyze/profitability` - Profitability metrics only
- `POST /api/v1/analyze/liquidity` - Liquidity metrics only
- `POST /api/v1/analyze/leverage` - Leverage metrics only

### Step 2: Set up React Frontend

1. **Navigate to the UI directory:**
```bash
cd financial-ui
```

2. **Install React dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

The React app will be available at: `http://localhost:3001` (or 3000 if available)

### Quick Start (Windows)

**Option 1: Use batch files for one-click startup**

For API Backend:
```bash
# Navigate to API directory and double-click:
../financial_api/start.bat
```

For React Frontend:
```bash
# In financial-ui directory, double-click:
start-ui.bat
```

**Option 2: Manual startup in separate terminals**

Terminal 1 (API Backend):
```bash
cd ../financial_api
python run.py
```

Terminal 2 (React Frontend):
```bash
cd financial-ui
npm start
```

## Configuration

### API Configuration
The API runs on `http://localhost:8000` by default. To change this:

1. **Edit `financial_api/run.py`:**
```python
if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000,  # Change this port if needed
        reload=True
    )
```

### Frontend Configuration
The React app connects to the API via the service file. To change the API endpoint:

1. **Edit `src/services/financialApi.js`:**
```javascript
const API_BASE_URL = 'http://localhost:8000/api/v1';  // Update this URL
```

### CORS Configuration
The API is configured to allow all origins. For production, update `financial_api/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Specify exact origins
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

## Usage

1. **Start Both Services**: Ensure both API (port 8000) and React app (port 3001) are running
2. **Access the UI**: Open `http://localhost:3001` in your browser
3. **Enter Company Data**: Fill in the financial data form with your company's information
4. **Load Sample Data**: Use the "Load Sample Data" button to populate the form with example values
5. **Analyze**: Click "Analyze Financial Data" to send the data to the API
6. **View Results**: Review the comprehensive analysis results organized by metric categories
7. **New Analysis**: Click "New Analysis" to start over with a different company

### Testing the API Independently
You can also test the API directly using:
- **Swagger UI**: Visit `http://localhost:8000/docs` for interactive API documentation
- **Health Check**: Visit `http://localhost:8000/health` to verify API status
- **Root Endpoint**: Visit `http://localhost:8000` for welcome message

## API Integration

The React application connects to your Financial Analysis API at:
- **Base URL**: `http://localhost:8000/api/v1`
- **Main endpoint**: `/analyze` for complete analysis
- **Individual metric endpoints**: Available for specific analyses
- **Documentation**: Available at `http://localhost:8000/docs`

### Sample API Request
```json
POST /api/v1/analyze
{
  "company_name": "Example Corp",
  "industry": "Technology",
  "revenue": 120000,
  "revenue_initial": 100000,
  "revenue_final": 150000,
  "years": 5,
  "net_income": 15000,
  "total_assets": 120000,
  "total_equity": 80000,
  "total_liabilities": 40000,
  "ebit": 20000,
  "interest_expense": 2000,
  "total_debt": 30000,
  "current_assets": 50000,
  "current_liabilities": 25000,
  "shares_outstanding": 1000,
  "market_price_per_share": 25,
  "dividends": 2000,
  "free_cash_flow": 10000,
  "eps_growth_percent": 10,
  "depreciation": 3000,
  "amortization": 1000
}
```

## Project Structure

### Full System Structure
```
Financial/
├── financial_api/                 # Python FastAPI Backend
│   ├── app/
│   │   ├── api/endpoints/
│   │   │   └── financial_analysis.py
│   │   ├── models/
│   │   │   └── financial_models.py
│   │   └── services/
│   │       └── financial_service.py
│   ├── main.py                    # FastAPI app entry point
│   ├── run.py                     # Server startup script
│   ├── requirements.txt           # Python dependencies
│   └── start.bat                  # Windows startup script
├── financial-ui/                  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalysisResults.js    # Display analysis results
│   │   │   ├── FinancialForm.js      # Financial data input form
│   │   │   ├── LoadingSpinner.js     # Loading component
│   │   │   └── MetricCard.js         # Individual metric display
│   │   ├── services/
│   │   │   └── financialApi.js       # API service and integration
│   │   ├── App.js                    # Main application component
│   │   ├── index.js                  # Application entry point
│   │   └── index.css                 # Global styles with Tailwind
│   ├── public/                       # Static assets
│   ├── package.json                  # React dependencies
│   ├── start-ui.bat                  # Windows startup script
│   └── README.md                     # This file
└── FinancialAnalysis.py           # Original analysis script
```

## Available Scripts

### Python API Scripts
```bash
# In financial_api directory:
python run.py              # Start API server
python test_api.py         # Test API endpoints (if available)
```

### React Frontend Scripts
```bash
# In financial-ui directory:
npm start                  # Start development server
npm build                  # Build for production
npm test                   # Run tests
npm eject                  # Eject from Create React App
```

## Technologies Used

### Backend (Python API)
- **FastAPI** - Modern, fast Python web framework
- **Pydantic** - Data validation using Python type hints
- **Uvicorn** - Lightning-fast ASGI server
- **Pandas** - Data manipulation and analysis
- **Python 3.11+** - Programming language

### Frontend (React App)
- **React 18** with JavaScript (ES6+)
- **Tailwind CSS** for styling and responsive design
- **Axios** for API communication
- **Lucide React** for modern icons
- **React Hot Toast** for user notifications
- **Create React App** for project setup and build tools

### Development Tools
- **Node.js & npm** - JavaScript runtime and package manager
- **Python pip** - Python package installer
- **VS Code** - Recommended IDE with extensions for both React and Python

## Customization

### Adding New Metrics
To add new financial metrics:

1. **Backend**: Update `financial_api/app/models/financial_models.py`
2. **Backend**: Add calculation logic in `financial_api/app/services/financial_service.py`
3. **Backend**: Create new endpoint in `financial_api/app/api/endpoints/financial_analysis.py`
4. **Frontend**: Update `src/services/financialApi.js` to call new endpoint
5. **Frontend**: Add display logic in `src/components/AnalysisResults.js`

### Styling Changes
- Modify `src/index.css` for global styles
- Update Tailwind classes in component files
- Customize colors in `tailwind.config.js`

### API Configuration
- Change port in `financial_api/run.py`
- Update CORS settings in `financial_api/main.py`  
- Modify base URL in `src/services/financialApi.js`

## Troubleshooting

### Common Issues

**1. API Connection Issues**
- ✅ Ensure Python API is running on `http://localhost:8000`
- ✅ Check API health at `http://localhost:8000/health`
- ✅ Verify no firewall blocking port 8000

**2. CORS Errors**
- ✅ API should have CORS enabled for `http://localhost:3001`
- ✅ Check `financial_api/main.py` CORS middleware configuration
- ✅ Restart API server after CORS changes

**3. React Build Issues**
- ✅ Delete `node_modules` folder and run `npm install` again
- ✅ Clear npm cache: `npm cache clean --force`
- ✅ Ensure Node.js version 16+ is installed

**4. Python API Issues**
- ✅ Install missing dependencies: `pip install fastapi uvicorn pydantic pandas`
- ✅ Check Python version compatibility (3.11+ recommended)
- ✅ Verify all imports are working in `financial_api/main.py`

**5. Port Conflicts**
- ✅ API default port: 8000 (change in `run.py` if needed)
- ✅ React default port: 3001 (automatically assigned if 3000 is busy)
- ✅ Kill processes using ports: `netstat -ano | findstr :8000`

### Development Tips
- Use browser Developer Tools (F12) to check console errors
- Monitor API logs in the Python terminal
- Test API endpoints directly using `http://localhost:8000/docs`
- Check network tab for failed HTTP requests

### Getting Help
- Check the FastAPI docs: `http://localhost:8000/docs`
- View React console logs for frontend issues
- Ensure both services are running before testing
- Verify JSON data format matches API expectations
