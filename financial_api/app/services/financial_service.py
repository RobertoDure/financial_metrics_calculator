from app.models.financial_models import (
    CompanyFinancialData,
    MarketValuationMetrics,
    GrowthMetrics,
    ProfitabilityMetrics,
    LiquidityMetrics,
    LeverageMetrics,
    FinancialAnalysisResult
)
from typing import Optional
import pandas as pd


class FinancialAnalysisService:
    """Service class for performing financial analysis calculations"""

    @staticmethod
    def calculate_market_valuation_metrics(data: CompanyFinancialData) -> MarketValuationMetrics:
        """Calculate market and valuation metrics"""
        
        # P/E Ratio calculation with error handling
        if data.net_income <= 0 or data.shares_outstanding <= 0:
            pe_ratio = None
        else:
            pe_ratio = data.market_price_per_share / (data.net_income / data.shares_outstanding)
        
        # P/B Ratio
        pb_ratio = data.market_price_per_share / (data.total_equity / data.shares_outstanding)
        
        # Dividend Yield
        dividend_yield = (data.dividends / data.shares_outstanding) / data.market_price_per_share
        
        # Payout Ratio
        payout_ratio = data.dividends / data.net_income if data.net_income > 0 else 0
        
        # EBITDA and EV/EBITDA calculation
        ebitda = data.ebit + data.depreciation + data.amortization
        enterprise_value = (data.market_price_per_share * data.shares_outstanding + 
                          data.total_debt - (data.current_assets - data.current_liabilities))
        ev_ebitda_ratio = enterprise_value / ebitda if ebitda > 0 else 0
        
        # Interest Coverage Ratio
        interest_coverage_ratio = data.ebit / data.interest_expense if data.interest_expense > 0 else 0
        
        # Price to Sales Ratio
        price_to_sales_ratio = data.market_price_per_share / (data.revenue / data.shares_outstanding)
        
        return MarketValuationMetrics(
            pe_ratio=pe_ratio,
            pb_ratio=pb_ratio,
            dividend_yield=dividend_yield,
            payout_ratio=payout_ratio,
            ev_ebitda_ratio=ev_ebitda_ratio,
            interest_coverage_ratio=interest_coverage_ratio,
            price_to_sales_ratio=price_to_sales_ratio
        )

    @staticmethod
    def calculate_growth_metrics(data: CompanyFinancialData) -> GrowthMetrics:
        """Calculate growth metrics"""
        
        # Revenue CAGR
        revenue_cagr = (data.revenue_final / data.revenue_initial) ** (1 / data.years) - 1
        
        # Net Income CAGR (assuming 10% increase for initial net income)
        initial_net_income = data.net_income - (data.net_income * 0.1)
        net_income_cagr = (data.net_income / initial_net_income) ** (1 / data.years) - 1 if initial_net_income > 0 else 0
        
        # Dividend Growth Rate (assuming 5% increase for initial dividends)
        initial_dividends = data.dividends - (data.dividends * 0.05)
        dividend_growth_rate = (data.dividends / initial_dividends) ** (1 / data.years) - 1 if initial_dividends > 0 else 0
        
        # EBITDA Growth Rate (assuming 10% increase for initial EBITDA)
        ebitda = data.ebit + data.depreciation + data.amortization
        initial_ebitda = ebitda - (ebitda * 0.1)
        ebitda_growth_rate = (ebitda / initial_ebitda) ** (1 / data.years) - 1 if initial_ebitda > 0 else 0
        
        return GrowthMetrics(
            revenue_cagr=revenue_cagr,
            net_income_cagr=net_income_cagr,
            dividend_growth_rate=dividend_growth_rate,
            ebitda_growth_rate=ebitda_growth_rate
        )

    @staticmethod
    def calculate_profitability_metrics(data: CompanyFinancialData) -> ProfitabilityMetrics:
        """Calculate profitability metrics"""
        
        # ROA
        roa = data.net_income / data.total_assets
        
        # ROE
        roe = data.net_income / data.total_equity
        
        # Net Profit Margin
        net_profit_margin = data.net_income / data.revenue
        
        # Operating Margin
        operating_margin = data.ebit / data.revenue
        
        # Gross Profit Margin (assuming COGS is 60% of Revenue)
        gross_profit_margin = (data.revenue - (data.revenue * 0.6)) / data.revenue
        
        # Asset Turnover
        asset_turnover = data.revenue / data.total_assets
        
        # ROIC (Return on Invested Capital)
        roic = data.ebit / (data.total_equity + data.total_debt)
        
        return ProfitabilityMetrics(
            roa=roa,
            roe=roe,
            net_profit_margin=net_profit_margin,
            operating_margin=operating_margin,
            gross_profit_margin=gross_profit_margin,
            asset_turnover=asset_turnover,
            roic=roic
        )

    @staticmethod
    def calculate_liquidity_metrics(data: CompanyFinancialData) -> LiquidityMetrics:
        """Calculate liquidity metrics"""
        
        # Current Ratio
        current_ratio = data.current_assets / data.current_liabilities
        
        # Quick Ratio (assuming 20% of current assets are inventory)
        quick_ratio = (data.current_assets - (data.current_assets * 0.2)) / data.current_liabilities
        
        # Cash Ratio (assuming 10% of current assets are cash)
        cash_ratio = (data.current_assets * 0.1) / data.current_liabilities
        
        return LiquidityMetrics(
            current_ratio=current_ratio,
            quick_ratio=quick_ratio,
            cash_ratio=cash_ratio
        )

    @staticmethod
    def calculate_leverage_metrics(data: CompanyFinancialData) -> LeverageMetrics:
        """Calculate leverage metrics"""
        
        # Net Debt to Equity
        net_debt_to_equity = data.total_debt / data.total_equity
        
        # Debt to Assets
        debt_to_assets = data.total_debt / data.total_assets
        
        # Debt to EBITDA
        ebitda = data.ebit + data.depreciation + data.amortization
        debt_to_ebitda = data.total_debt / ebitda if ebitda > 0 else 0
        
        return LeverageMetrics(
            net_debt_to_equity=net_debt_to_equity,
            debt_to_assets=debt_to_assets,
            debt_to_ebitda=debt_to_ebitda
        )

    @classmethod
    def perform_complete_analysis(cls, data: CompanyFinancialData) -> FinancialAnalysisResult:
        """Perform complete financial analysis"""
        
        market_metrics = cls.calculate_market_valuation_metrics(data)
        growth_metrics = cls.calculate_growth_metrics(data)
        profitability_metrics = cls.calculate_profitability_metrics(data)
        liquidity_metrics = cls.calculate_liquidity_metrics(data)
        leverage_metrics = cls.calculate_leverage_metrics(data)
        
        return FinancialAnalysisResult(
            company_name=data.company_name,
            industry=data.industry,
            market_valuation_metrics=market_metrics,
            growth_metrics=growth_metrics,
            profitability_metrics=profitability_metrics,
            liquidity_metrics=liquidity_metrics,
            leverage_metrics=leverage_metrics
        )

    @staticmethod
    def get_sample_data() -> CompanyFinancialData:
        """Get sample data for testing"""
        return CompanyFinancialData(
            company_name="Example Corp",
            industry="Technology",
            revenue=120000,
            revenue_initial=100000,
            revenue_final=150000,
            years=5,
            net_income=15000,
            total_assets=120000,
            total_equity=80000,
            total_liabilities=40000,
            ebit=20000,
            interest_expense=2000,
            total_debt=30000,
            current_assets=50000,
            current_liabilities=25000,
            shares_outstanding=1000,
            market_price_per_share=25,
            dividends=2000,
            free_cash_flow=10000,
            eps_growth_percent=10,
            depreciation=3000,
            amortization=1000
        )
