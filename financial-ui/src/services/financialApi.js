import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service class
class FinancialApiService {
  // Perform complete financial analysis
  async performCompleteAnalysis(data) {
    const response = await api.post('/analyze', data);
    return response.data;
  }

  // Get market valuation metrics only
  async getMarketValuationMetrics(data) {
    const response = await api.post('/analyze/market-valuation', data);
    return response.data;
  }

  // Get growth metrics only
  async getGrowthMetrics(data) {
    const response = await api.post('/analyze/growth', data);
    return response.data;
  }

  // Get profitability metrics only
  async getProfitabilityMetrics(data) {
    const response = await api.post('/analyze/profitability', data);
    return response.data;
  }

  // Get liquidity metrics only
  async getLiquidityMetrics(data) {
    const response = await api.post('/analyze/liquidity', data);
    return response.data;
  }

  // Get leverage metrics only
  async getLeverageMetrics(data) {
    const response = await api.post('/analyze/leverage', data);
    return response.data;
  }

  // Health check
  async healthCheck() {
    const response = await api.get('/health');
    return response.data;
  }
}

// Export singleton instance
export const financialApiService = new FinancialApiService();

// Default form data for easier testing
export const getDefaultFormData = () => ({
  company_name: "Example Corp",
  industry: "Technology",
  revenue: 120000,
  revenue_initial: 100000,
  revenue_final: 150000,
  years: 5,
  net_income: 15000,
  total_assets: 120000,
  total_equity: 80000,
  total_liabilities: 40000,
  ebit: 20000,
  interest_expense: 2000,
  total_debt: 30000,
  current_assets: 50000,
  current_liabilities: 25000,
  shares_outstanding: 1000,
  market_price_per_share: 25,
  dividends: 2000,
  free_cash_flow: 10000,
  eps_growth_percent: 10,
  depreciation: 3000,
  amortization: 1000
});
