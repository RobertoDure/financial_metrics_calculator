# Financial Analysis REST API

A comprehensive REST API for financial analysis and metrics calculation, built with FastAPI.

## Features

- **Complete Financial Analysis**: Calculate all financial metrics in one request
- **Modular Analysis**: Calculate specific metric categories (Market Valuation, Growth, Profitability, Liquidity, Leverage)
- **Data Validation**: Robust input validation using Pydantic models
- **Interactive Documentation**: Auto-generated API documentation with Swagger UI
- **Error Handling**: Comprehensive error handling and validation
- **Sample Data**: Built-in sample data for testing

## Project Structure

```
financial_api/
│
├── main.py                 # FastAPI application entry point
├── run.py                  # Startup script
├── requirements.txt        # Python dependencies
├── README.md              # This file
│
├── app/
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── financial_models.py    # Pydantic models for data validation
│   ├── services/
│   │   ├── __init__.py
│   │   └── financial_service.py   # Business logic for financial calculations
│   └── api/
│       ├── __init__.py
│       └── endpoints/
│           ├── __init__.py
│           └── financial_analysis.py  # API endpoints
```

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd financial_api
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - Windows: `venv\\Scripts\\activate`
   - Linux/Mac: `source venv/bin/activate`

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Running the API

### Option 1: Using the startup script
```bash
python run.py
```

### Option 2: Using uvicorn directly
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at:
- **API Base URL**: http://localhost:8000
- **Interactive Documentation**: http://localhost:8000/docs
- **Alternative Documentation**: http://localhost:8000/redoc

## API Endpoints

### Core Endpoints

- `POST /api/v1/analyze` - Complete financial analysis
- `GET /api/v1/sample-data` - Get sample data for testing
- `POST /api/v1/analyze/dataframe` - Analysis results as DataFrame

### Specific Metric Endpoints

- `POST /api/v1/analyze/market-valuation` - Market and valuation metrics
- `POST /api/v1/analyze/growth` - Growth metrics
- `POST /api/v1/analyze/profitability` - Profitability metrics
- `POST /api/v1/analyze/liquidity` - Liquidity metrics
- `POST /api/v1/analyze/leverage` - Leverage metrics

### Health Check

- `GET /` - API welcome message
- `GET /health` - Health check endpoint

## Financial Metrics Calculated

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

## Sample Request

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

## Testing the API

1. **Using the interactive documentation:**
   - Go to http://localhost:8000/docs
   - Try the `/api/v1/sample-data` endpoint to get sample data
   - Use the sample data with any of the analysis endpoints

2. **Using curl:**
   ```bash
   curl -X GET "http://localhost:8000/api/v1/sample-data"
   curl -X POST "http://localhost:8000/api/v1/analyze" -H "Content-Type: application/json" -d @sample_data.json
   ```

3. **Using Python requests:**
   ```python
   import requests
   
   # Get sample data
   response = requests.get("http://localhost:8000/api/v1/sample-data")
   sample_data = response.json()
   
   # Perform analysis
   analysis = requests.post("http://localhost:8000/api/v1/analyze", json=sample_data)
   print(analysis.json())
   ```

## Development

The API is built with:
- **FastAPI**: Modern, fast web framework
- **Pydantic**: Data validation and serialization
- **Pandas**: Data manipulation and analysis
- **Uvicorn**: ASGI server

## Future Enhancements

- Integration with real financial data sources (Yahoo Finance, Alpha Vantage, etc.)
- User authentication and authorization
- Data persistence (database integration)
- Advanced error handling and logging
- Rate limiting and caching
- Docker containerization
- Unit and integration tests

## License

This project is for educational and demonstration purposes.
