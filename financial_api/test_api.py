#!/usr/bin/env python3
"""
Test script for Financial Analysis API
"""

import requests
import json


def test_api():
    """Test the Financial Analysis API"""
    base_url = "http://localhost:8000"
    
    print("Testing Financial Analysis API")
    print("=" * 50)
    
    # Test health check
    print("\n1. Testing health check...")
    try:
        response = requests.get(f"{base_url}/health")
        print(f"Health Check Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except requests.exceptions.ConnectionError:
        print("❌ API is not running. Please start the server first.")
        print("Run: python run.py")
        return
    
    # Get sample data
    print("\n2. Getting sample data...")
    response = requests.get(f"{base_url}/api/v1/sample-data")
    if response.status_code == 200:
        sample_data = response.json()
        print("✅ Sample data retrieved successfully")
        print(f"Company: {sample_data['company_name']}")
        print(f"Industry: {sample_data['industry']}")
    else:
        print(f"❌ Failed to get sample data: {response.status_code}")
        return
    
    # Test complete analysis
    print("\n3. Testing complete financial analysis...")
    response = requests.post(f"{base_url}/api/v1/analyze", json=sample_data)
    if response.status_code == 200:
        analysis = response.json()
        print("✅ Complete analysis successful")
        print(f"P/E Ratio: {analysis['market_valuation_metrics']['pe_ratio']}")
        print(f"ROE: {analysis['profitability_metrics']['roe']:.4f}")
        print(f"Current Ratio: {analysis['liquidity_metrics']['current_ratio']:.2f}")
    else:
        print(f"❌ Complete analysis failed: {response.status_code}")
        print(response.text)
    
    # Test market valuation metrics only
    print("\n4. Testing market valuation metrics...")
    response = requests.post(f"{base_url}/api/v1/analyze/market-valuation", json=sample_data)
    if response.status_code == 200:
        metrics = response.json()
        print("✅ Market valuation metrics successful")
        print(f"P/E Ratio: {metrics['pe_ratio']}")
        print(f"P/B Ratio: {metrics['pb_ratio']:.2f}")
        print(f"Dividend Yield: {metrics['dividend_yield']:.4f}")
    else:
        print(f"❌ Market valuation metrics failed: {response.status_code}")
    
    # Test DataFrame endpoint
    print("\n5. Testing DataFrame analysis...")
    response = requests.post(f"{base_url}/api/v1/analyze/dataframe", json=sample_data)
    if response.status_code == 200:
        df_result = response.json()
        print("✅ DataFrame analysis successful")
        print(f"DataFrame shape: {df_result['shape']}")
        print(f"Columns: {df_result['columns']}")
    else:
        print(f"❌ DataFrame analysis failed: {response.status_code}")
    
    print("\n" + "=" * 50)
    print("API testing completed!")
    print("Visit http://localhost:8000/docs for interactive documentation")


if __name__ == "__main__":
    test_api()
