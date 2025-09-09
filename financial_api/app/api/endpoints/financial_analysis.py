from fastapi import APIRouter, HTTPException, status
from app.models.financial_models import (
    CompanyFinancialData,
    FinancialAnalysisResult,
    MarketValuationMetrics,
    GrowthMetrics,
    ProfitabilityMetrics,
    LiquidityMetrics,
    LeverageMetrics
)
from app.services.financial_service import FinancialAnalysisService
import pandas as pd

router = APIRouter()


@router.post("/analyze", response_model=FinancialAnalysisResult)
async def analyze_financial_data(data: CompanyFinancialData):
    """
    Perform complete financial analysis on company data
    """
    try:
        result = FinancialAnalysisService.perform_complete_analysis(data)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error performing financial analysis: {str(e)}"
        )


@router.post("/analyze/market-valuation", response_model=MarketValuationMetrics)
async def analyze_market_valuation(data: CompanyFinancialData):
    """
    Calculate market and valuation metrics only
    """
    try:
        result = FinancialAnalysisService.calculate_market_valuation_metrics(data)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error calculating market valuation metrics: {str(e)}"
        )


@router.post("/analyze/growth", response_model=GrowthMetrics)
async def analyze_growth_metrics(data: CompanyFinancialData):
    """
    Calculate growth metrics only
    """
    try:
        result = FinancialAnalysisService.calculate_growth_metrics(data)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error calculating growth metrics: {str(e)}"
        )


@router.post("/analyze/profitability", response_model=ProfitabilityMetrics)
async def analyze_profitability_metrics(data: CompanyFinancialData):
    """
    Calculate profitability metrics only
    """
    try:
        result = FinancialAnalysisService.calculate_profitability_metrics(data)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error calculating profitability metrics: {str(e)}"
        )


@router.post("/analyze/liquidity", response_model=LiquidityMetrics)
async def analyze_liquidity_metrics(data: CompanyFinancialData):
    """
    Calculate liquidity metrics only
    """
    try:
        result = FinancialAnalysisService.calculate_liquidity_metrics(data)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error calculating liquidity metrics: {str(e)}"
        )


@router.post("/analyze/leverage", response_model=LeverageMetrics)
async def analyze_leverage_metrics(data: CompanyFinancialData):
    """
    Calculate leverage metrics only
    """
    try:
        result = FinancialAnalysisService.calculate_leverage_metrics(data)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error calculating leverage metrics: {str(e)}"
        )


@router.get("/sample-data", response_model=CompanyFinancialData)
async def get_sample_data():
    """
    Get sample financial data for testing
    """
    try:
        sample_data = FinancialAnalysisService.get_sample_data()
        return sample_data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving sample data: {str(e)}"
        )


@router.post("/analyze/dataframe")
async def analyze_with_dataframe(data: CompanyFinancialData):
    """
    Perform analysis and return results as a pandas DataFrame (JSON format)
    """
    try:
        # Perform complete analysis
        result = FinancialAnalysisService.perform_complete_analysis(data)
        
        # Convert to dictionary format suitable for DataFrame
        df_data = {
            "Company": [result.company_name],
            "Industry": [result.industry],
            "P/E Ratio": [result.market_valuation_metrics.pe_ratio],
            "P/B Ratio": [result.market_valuation_metrics.pb_ratio],
            "Dividend Yield": [result.market_valuation_metrics.dividend_yield],
            "Revenue CAGR": [result.growth_metrics.revenue_cagr],
            "ROA": [result.profitability_metrics.roa],
            "ROE": [result.profitability_metrics.roe],
            "Current Ratio": [result.liquidity_metrics.current_ratio],
            "Debt to Equity": [result.leverage_metrics.net_debt_to_equity],
        }
        
        # Create DataFrame
        df = pd.DataFrame(df_data)
        
        return {
            "dataframe": df.to_dict(orient="records"),
            "columns": df.columns.tolist(),
            "shape": df.shape
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating DataFrame analysis: {str(e)}"
        )
