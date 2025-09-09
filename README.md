# Financial Metrics Calculator

A comprehensive financial analysis system consisting of a FastAPI backend and React frontend for calculating and visualizing financial metrics.

## 🌟 Overview

This project provides a complete solution for financial analysis, featuring:

- **FastAPI REST API**: Powerful backend for financial calculations
- **React UI**: Modern, user-friendly interface
- **Comprehensive Metrics**: Market valuation, growth, profitability, liquidity, and leverage analysis
- **Interactive Documentation**: Auto-generated API documentation with Swagger UI
- **Sample Data**: Built-in test data for quick evaluation

## 🏗️ System Architecture

```
┌─────────────────────┐    HTTP/JSON    ┌──────────────────────┐
│   React Frontend    │ <=============> │   FastAPI Backend    │
│   (Port 3001)       │                 │   (Port 8000)        │
└─────────────────────┘                 └──────────────────────┘
```

## 📁 Project Structure

```
Financial/
├── financial_api/                 # Python FastAPI Backend
│   ├── app/
│   │   ├── api/endpoints/
│   │   │   └── financial_analysis.py    # API endpoints
│   │   ├── models/
│   │   │   └── financial_models.py      # Pydantic models
│   │   └── services/
│   │       └── financial_service.py     # Business logic
│   ├── main.py                          # FastAPI app entry point
│   ├── run.py                           # Server startup script
│   ├── requirements.txt                 # Python dependencies
│   └── start.bat                        # Windows startup script
│
├── financial-ui/                  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalysisResults.js       # Display analysis results
│   │   │   ├── FinancialForm.js         # Financial data input form
│   │   │   ├── LoadingSpinner.js        # Loading component
│   │   │   └── MetricCard.js            # Individual metric display
│   │   ├── services/
│   │   │   └── financialApi.js          # API service integration
│   │   ├── App.js                       # Main application component
│   │   ├── index.js                     # Application entry point
│   │   └── index.css                    # Global styles with Tailwind
│   ├── public/                          # Static assets
│   ├── package.json                     # React dependencies
│   ├── start-ui.bat                     # Windows startup script
│   └── tailwind.config.js               # Tailwind configuration
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+** (for the API backend)
- **Node.js (v16 or higher)** (for the React frontend)
- **npm or yarn** (package managers)
- **pip** (Python package installer)

### Option 1: One-Click Startup (Windows)

**For API Backend:**
```bash
# Navigate to API directory and run:
financial_api/start.bat
```

**For React Frontend:**
```bash
# Navigate to UI directory and run:
financial-ui/start-ui.bat
```

### Option 2: Manual Setup

#### Step 1: Set up Python API Backend

1. **Navigate to the API directory:**
```bash
cd financial_api
```

2. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

3. **Start the Financial Analysis API:**
```bash
python run.py
```

The API will be available at: `http://localhost:8000`

#### Step 2: Set up React Frontend

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

The React app will be available at: `http://localhost:3001`

## 🔗 API Endpoints

### Core Endpoints

- `GET /` - API welcome message
- `GET /health` - Health check endpoint
- `POST /api/v1/analyze` - Complete financial analysis
- `GET /api/v1/sample-data` - Get sample data for testing
- `POST /api/v1/analyze/dataframe` - Analysis results as DataFrame

### Specific Metric Endpoints

- `POST /api/v1/analyze/market-valuation` - Market and valuation metrics
- `POST /api/v1/analyze/growth` - Growth metrics
- `POST /api/v1/analyze/profitability` - Profitability metrics
- `POST /api/v1/analyze/liquidity` - Liquidity metrics
- `POST /api/v1/analyze/leverage` - Leverage metrics

### Interactive Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📊 Financial Metrics Calculated

### Market & Valuation Metrics
- P/E Ratio (Price-to-Earnings)
- P/B Ratio (Price-to-Book)
- Dividend Yield
- Payout Ratio
- EV/EBITDA Ratio
- Interest Coverage Ratio
- Price-to-Sales Ratio

### Growth Metrics
- Revenue CAGR (Compound Annual Growth Rate)
- Net Income CAGR
- Dividend Growth Rate
- EBITDA Growth Rate

### Profitability Metrics
- ROA (Return on Assets)
- ROE (Return on Equity)
- Net Profit Margin
- Operating Margin
- Gross Profit Margin
- Asset Turnover
- ROIC (Return on Invested Capital)

### Liquidity Metrics
- Current Ratio
- Quick Ratio
- Cash Ratio

### Leverage Metrics
- Net Debt to Equity Ratio
- Debt to Assets Ratio
- Debt to EBITDA Ratio

## 💡 Usage

1. **Start Both Services**: Ensure both API (port 8000) and React app (port 3001) are running
2. **Access the UI**: Open `http://localhost:3001` in your browser
3. **Enter Company Data**: Fill in the financial data form with your company's information
4. **Load Sample Data**: Use the "Load Sample Data" button to populate the form with example values
5. **Analyze**: Click "Analyze Financial Data" to send the data to the API
6. **View Results**: Review the comprehensive analysis results organized by metric categories
7. **New Analysis**: Click "New Analysis" to start over with a different company

## 📋 Sample Request

```json
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

## 🧪 Testing the API

### 1. Using the Interactive Documentation
- Go to http://localhost:8000/docs
- Try the `/api/v1/sample-data` endpoint to get sample data
- Use the sample data with any of the analysis endpoints

### 2. Using curl
```bash
curl -X GET "http://localhost:8000/api/v1/sample-data"
curl -X POST "http://localhost:8000/api/v1/analyze" -H "Content-Type: application/json" -d @sample_data.json
```

### 3. Using Python requests
```python
import requests

# Get sample data
response = requests.get("http://localhost:8000/api/v1/sample-data")
sample_data = response.json()

# Perform analysis
analysis = requests.post("http://localhost:8000/api/v1/analyze", json=sample_data)
print(analysis.json())
```

## 🛠️ Technologies Used

### Backend (Python API)
- **FastAPI** - Modern, fast Python web framework
- **Pydantic** - Data validation using Python type hints
- **Uvicorn** - Lightning-fast ASGI server
- **Pandas** - Data manipulation and analysis
- **Python 3.11+** - Programming language

### Frontend (React App)
- **React 18** with JavaScript (ES6+)
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - Promise-based HTTP client
- **Lucide React** - Beautiful & consistent icons
- **React Hot Toast** - Smoking hot notifications
- **Create React App** - Build toolchain

## ⚙️ Configuration

### API Configuration
To change the API port, edit `financial_api/run.py`:
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
To change the API endpoint, edit `financial-ui/src/services/financialApi.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000/api/v1';  // Update this URL
```

### CORS Configuration
For production, update `financial_api/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Specify exact origins
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

## 🔧 Available Scripts

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

## 🎨 Customization

### Adding New Metrics
1. **Backend**: Update `financial_api/app/models/financial_models.py`
2. **Backend**: Add calculation logic in `financial_api/app/services/financial_service.py`
3. **Backend**: Create new endpoint in `financial_api/app/api/endpoints/financial_analysis.py`
4. **Frontend**: Update `financial-ui/src/services/financialApi.js` to call new endpoint
5. **Frontend**: Add display logic in `financial-ui/src/components/AnalysisResults.js`

### Styling Changes
- Modify `financial-ui/src/index.css` for global styles
- Update Tailwind classes in component files
- Customize colors in `financial-ui/tailwind.config.js`

## 🐛 Troubleshooting

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
- ✅ Kill processes using ports: `netstat -ano | findstr :8000` (Windows)

### Development Tips
- Use browser Developer Tools (F12) to check console errors
- Monitor API logs in the Python terminal
- Test API endpoints directly using `http://localhost:8000/docs`
- Check network tab for failed HTTP requests
- Ensure JSON data format matches API expectations

## 🚀 Future Enhancements

- Integration with real financial data sources (Yahoo Finance, Alpha Vantage, etc.)
- User authentication and authorization
- Data persistence (database integration)
- Advanced error handling and logging
- Rate limiting and caching
- Docker containerization
- Unit and integration tests
- Multi-language support
- Export functionality (PDF, Excel)
- Historical data analysis and trending

## 📄 License

This project is for educational and demonstration purposes.

## 🤝 Getting Help

- Check the FastAPI docs: `http://localhost:8000/docs`
- View React console logs for frontend issues
- Ensure both services are running before testing
- Verify JSON data format matches API expectations

---

**Happy Financial Analysis! 📈**
