import React from 'react';
import MetricCard from './MetricCard';
import {
  TrendingUp, DollarSign, PieChart, Activity,
  Target, Percent, Calculator, BarChart3
} from 'lucide-react';

const AnalysisResults = ({ results }) => {
  const {
    company_name,
    industry,
    market_valuation_metrics,
    growth_metrics,
    profitability_metrics,
    liquidity_metrics,
    leverage_metrics
  } = results;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Financial Analysis Results
        </h1>
        <p className="text-lg text-gray-600">
          {company_name} - {industry}
        </p>
      </div>

      {/* Market Valuation Metrics */}
      <div>
        <div className="flex items-center mb-4">
          <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Market Valuation Metrics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="P/E Ratio"
            value={market_valuation_metrics.pe_ratio}
            icon={Target}
            color="blue"
            format="ratio"
            description="Price-to-Earnings ratio"
          />
          <MetricCard
            title="P/B Ratio"
            value={market_valuation_metrics.pb_ratio}
            icon={BarChart3}
            color="blue"
            format="ratio"
            description="Price-to-Book ratio"
          />
          <MetricCard
            title="Dividend Yield"
            value={market_valuation_metrics.dividend_yield}
            icon={Percent}
            color="green"
            format="percentage"
            description="Annual dividend yield"
          />
          <MetricCard
            title="EV/EBITDA"
            value={market_valuation_metrics.ev_ebitda_ratio}
            icon={Calculator}
            color="purple"
            format="ratio"
            description="Enterprise Value to EBITDA"
          />
        </div>
      </div>

      {/* Growth Metrics */}
      <div>
        <div className="flex items-center mb-4">
          <Activity className="h-6 w-6 text-green-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Growth Metrics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Revenue CAGR"
            value={growth_metrics.revenue_cagr}
            icon={TrendingUp}
            color="green"
            format="percentage"
            description="Compound Annual Growth Rate"
          />
          <MetricCard
            title="Net Income CAGR"
            value={growth_metrics.net_income_cagr}
            icon={DollarSign}
            color="green"
            format="percentage"
            description="Net income growth rate"
          />
          <MetricCard
            title="Dividend Growth"
            value={growth_metrics.dividend_growth_rate}
            icon={Percent}
            color="blue"
            format="percentage"
            description="Annual dividend growth"
          />
          <MetricCard
            title="EBITDA Growth"
            value={growth_metrics.ebitda_growth_rate}
            icon={BarChart3}
            color="purple"
            format="percentage"
            description="EBITDA growth rate"
          />
        </div>
      </div>

      {/* Profitability Metrics */}
      <div>
        <div className="flex items-center mb-4">
          <DollarSign className="h-6 w-6 text-yellow-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Profitability Metrics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="ROA"
            value={profitability_metrics.roa}
            icon={Target}
            color="yellow"
            format="percentage"
            description="Return on Assets"
          />
          <MetricCard
            title="ROE"
            value={profitability_metrics.roe}
            icon={TrendingUp}
            color="yellow"
            format="percentage"
            description="Return on Equity"
          />
          <MetricCard
            title="Net Profit Margin"
            value={profitability_metrics.net_profit_margin}
            icon={Percent}
            color="green"
            format="percentage"
            description="Net profit as % of revenue"
          />
          <MetricCard
            title="ROIC"
            value={profitability_metrics.roic}
            icon={Calculator}
            color="purple"
            format="percentage"
            description="Return on Invested Capital"
          />
        </div>
      </div>

      {/* Liquidity Metrics */}
      <div>
        <div className="flex items-center mb-4">
          <PieChart className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Liquidity Metrics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Current Ratio"
            value={liquidity_metrics.current_ratio}
            icon={BarChart3}
            color="blue"
            format="ratio"
            description="Current assets / Current liabilities"
          />
          <MetricCard
            title="Quick Ratio"
            value={liquidity_metrics.quick_ratio}
            icon={Activity}
            color="blue"
            format="ratio"
            description="Acid-test ratio"
          />
          <MetricCard
            title="Cash Ratio"
            value={liquidity_metrics.cash_ratio}
            icon={DollarSign}
            color="green"
            format="ratio"
            description="Cash / Current liabilities"
          />
        </div>
      </div>

      {/* Leverage Metrics */}
      <div>
        <div className="flex items-center mb-4">
          <Calculator className="h-6 w-6 text-red-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Leverage Metrics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Debt-to-Equity"
            value={leverage_metrics.net_debt_to_equity}
            icon={BarChart3}
            color="red"
            format="ratio"
            description="Net debt to equity ratio"
          />
          <MetricCard
            title="Debt-to-Assets"
            value={leverage_metrics.debt_to_assets}
            icon={PieChart}
            color="red"
            format="ratio"
            description="Total debt to assets ratio"
          />
          <MetricCard
            title="Debt-to-EBITDA"
            value={leverage_metrics.debt_to_ebitda}
            icon={Calculator}
            color="red"
            format="ratio"
            description="Debt coverage ratio"
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
