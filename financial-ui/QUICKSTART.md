# Quick Start Guide

## Prerequisites
1. Make sure your Financial Analysis API is running on http://localhost:8000
2. Node.js installed on your system (version 16 or higher)

## Installation & Startup

### Option 1: Use the batch file (Windows)
```bash
double-click start-ui.bat
```

### Option 2: Manual setup
```bash
cd financial-ui
npm install
npm start
```

## What to Expect

1. **Installation**: The system will install all required React dependencies including:
   - React 18
   - Axios for API communication
   - Tailwind CSS for styling
   - Lucide React for icons
   - React Hot Toast for notifications

2. **Development Server**: The React app will start on http://localhost:3000

3. **Features Available**:
   - Clean, professional financial data input form
   - Sample data loading for quick testing
   - Real-time validation and error handling
   - Comprehensive financial analysis results display
   - Responsive design that works on all devices

## Using the Application

1. **Enter Company Data**: Fill out the financial information form
2. **Quick Test**: Click "Load Sample Data" to populate with example values
3. **Analyze**: Submit the form to get comprehensive financial analysis
4. **View Results**: See detailed metrics organized by categories:
   - Market Valuation (P/E, P/B, Dividend Yield, etc.)
   - Growth Metrics (Revenue CAGR, Growth rates, etc.)
   - Profitability (ROA, ROE, Profit Margins, etc.)
   - Liquidity (Current Ratio, Quick Ratio, etc.)  
   - Leverage (Debt ratios, etc.)

## Troubleshooting

- **CORS Issues**: Ensure your API has CORS enabled for http://localhost:3000
- **Connection Failed**: Verify your API is running on http://localhost:8000
- **Install Issues**: Delete node_modules folder and run npm install again

The UI provides a modern, user-friendly interface for your Financial Analysis API!
