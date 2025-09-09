from pydantic import BaseModel, Field
from typing import Optional


class CompanyFinancialData(BaseModel):
    """
    Model for company financial data input
    """
    company_name: str = Field(..., description="Company name")
    industry: str = Field(..., description="Industry sector")
    
    # Financial Data
    revenue: float = Field(..., gt=0, description="Current revenue")
    revenue_initial: float = Field(..., gt=0, description="Initial revenue for growth calculation")
    revenue_final: float = Field(..., gt=0, description="Final revenue for growth calculation")
    years: float = Field(..., gt=0, description="Number of years for growth calculation")
    net_income: float = Field(..., description="Net income")
    total_assets: float = Field(..., gt=0, description="Total assets")
    total_equity: float = Field(..., gt=0, description="Total equity")
    total_liabilities: float = Field(..., ge=0, description="Total liabilities")
    ebit: float = Field(..., description="Earnings Before Interest and Taxes")
    interest_expense: float = Field(..., ge=0, description="Interest expense")
    total_debt: float = Field(..., ge=0, description="Total debt")
    current_assets: float = Field(..., gt=0, description="Current assets")
    current_liabilities: float = Field(..., gt=0, description="Current liabilities")
    shares_outstanding: float = Field(..., gt=0, description="Number of shares outstanding")
    market_price_per_share: float = Field(..., gt=0, description="Market price per share")
    dividends: float = Field(..., ge=0, description="Total dividends paid")
    free_cash_flow: float = Field(..., description="Free cash flow")
    eps_growth_percent: float = Field(..., description="EPS growth percentage")
    depreciation: float = Field(..., ge=0, description="Depreciation")
    amortization: float = Field(..., ge=0, description="Amortization")

    class Config:
        schema_extra = {
            "example": {
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
        }


class MarketValuationMetrics(BaseModel):
    """Market and Valuation Metrics"""
    pe_ratio: Optional[float] = Field(None, description="Price-to-Earnings ratio")
    pb_ratio: float = Field(..., description="Price-to-Book ratio")
    dividend_yield: float = Field(..., description="Dividend yield as percentage")
    payout_ratio: float = Field(..., description="Dividend payout ratio as percentage")
    ev_ebitda_ratio: float = Field(..., description="Enterprise Value to EBITDA ratio")
    interest_coverage_ratio: float = Field(..., description="Interest coverage ratio")
    price_to_sales_ratio: float = Field(..., description="Price-to-Sales ratio")


class GrowthMetrics(BaseModel):
    """Growth Metrics"""
    revenue_cagr: float = Field(..., description="Revenue Compound Annual Growth Rate")
    net_income_cagr: float = Field(..., description="Net Income CAGR")
    dividend_growth_rate: float = Field(..., description="Dividend Growth Rate")
    ebitda_growth_rate: float = Field(..., description="EBITDA Growth Rate")


class ProfitabilityMetrics(BaseModel):
    """Profitability Metrics"""
    roa: float = Field(..., description="Return on Assets")
    roe: float = Field(..., description="Return on Equity")
    net_profit_margin: float = Field(..., description="Net Profit Margin")
    operating_margin: float = Field(..., description="Operating Margin")
    gross_profit_margin: float = Field(..., description="Gross Profit Margin")
    asset_turnover: float = Field(..., description="Asset Turnover ratio")
    roic: float = Field(..., description="Return on Invested Capital")


class LiquidityMetrics(BaseModel):
    """Liquidity Metrics"""
    current_ratio: float = Field(..., description="Current Ratio")
    quick_ratio: float = Field(..., description="Quick Ratio")
    cash_ratio: float = Field(..., description="Cash Ratio")


class LeverageMetrics(BaseModel):
    """Leverage Metrics"""
    net_debt_to_equity: float = Field(..., description="Net Debt to Equity ratio")
    debt_to_assets: float = Field(..., description="Debt to Assets ratio")
    debt_to_ebitda: float = Field(..., description="Debt to EBITDA ratio")


class FinancialAnalysisResult(BaseModel):
    """Complete Financial Analysis Result"""
    company_name: str
    industry: str
    market_valuation_metrics: MarketValuationMetrics
    growth_metrics: GrowthMetrics
    profitability_metrics: ProfitabilityMetrics
    liquidity_metrics: LiquidityMetrics
    leverage_metrics: LeverageMetrics
