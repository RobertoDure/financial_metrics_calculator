import React, { useState } from 'react';
import { getDefaultFormData } from '../services/financialApi';
import { Building2, DollarSign, TrendingUp, Calculator } from 'lucide-react';

const FinancialForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState(getDefaultFormData());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'company_name' || name === 'industry' ? value : parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const loadSampleData = () => {
    setFormData(getDefaultFormData());
  };

  const clearForm = () => {
    setFormData({
      company_name: '',
      industry: '',
      revenue: 0,
      revenue_initial: 0,
      revenue_final: 0,
      years: 0,
      net_income: 0,
      total_assets: 0,
      total_equity: 0,
      total_liabilities: 0,
      ebit: 0,
      interest_expense: 0,
      total_debt: 0,
      current_assets: 0,
      current_liabilities: 0,
      shares_outstanding: 0,
      market_price_per_share: 0,
      dividends: 0,
      free_cash_flow: 0,
      eps_growth_percent: 0,
      depreciation: 0,
      amortization: 0
    });
  };

  const formSections = [
    {
      title: "Company Information",
      icon: Building2,
      fields: [
        { name: 'company_name', label: 'Company Name', type: 'text' },
        { name: 'industry', label: 'Industry', type: 'text' }
      ]
    },
    {
      title: "Revenue & Growth",
      icon: TrendingUp,
      fields: [
        { name: 'revenue', label: 'Current Revenue ($)', type: 'number', step: '0.01' },
        { name: 'revenue_initial', label: 'Initial Revenue ($)', type: 'number', step: '0.01' },
        { name: 'revenue_final', label: 'Final Revenue ($)', type: 'number', step: '0.01' },
        { name: 'years', label: 'Number of Years', type: 'number', step: '0.1' }
      ]
    },
    {
      title: "Financial Statements",
      icon: DollarSign,
      fields: [
        { name: 'net_income', label: 'Net Income ($)', type: 'number', step: '0.01' },
        { name: 'total_assets', label: 'Total Assets ($)', type: 'number', step: '0.01' },
        { name: 'total_equity', label: 'Total Equity ($)', type: 'number', step: '0.01' },
        { name: 'total_liabilities', label: 'Total Liabilities ($)', type: 'number', step: '0.01' },
        { name: 'ebit', label: 'EBIT ($)', type: 'number', step: '0.01' },
        { name: 'interest_expense', label: 'Interest Expense ($)', type: 'number', step: '0.01' }
      ]
    },
    {
      title: "Debt & Liquidity",
      icon: Calculator,
      fields: [
        { name: 'total_debt', label: 'Total Debt ($)', type: 'number', step: '0.01' },
        { name: 'current_assets', label: 'Current Assets ($)', type: 'number', step: '0.01' },
        { name: 'current_liabilities', label: 'Current Liabilities ($)', type: 'number', step: '0.01' },
        { name: 'free_cash_flow', label: 'Free Cash Flow ($)', type: 'number', step: '0.01' }
      ]
    },
    {
      title: "Market Data",
      icon: TrendingUp,
      fields: [
        { name: 'shares_outstanding', label: 'Shares Outstanding', type: 'number', step: '1' },
        { name: 'market_price_per_share', label: 'Market Price per Share ($)', type: 'number', step: '0.01' },
        { name: 'dividends', label: 'Total Dividends ($)', type: 'number', step: '0.01' },
        { name: 'eps_growth_percent', label: 'EPS Growth (%)', type: 'number', step: '0.01' }
      ]
    },
    {
      title: "Other Metrics",
      icon: Calculator,
      fields: [
        { name: 'depreciation', label: 'Depreciation ($)', type: 'number', step: '0.01' },
        { name: 'amortization', label: 'Amortization ($)', type: 'number', step: '0.01' }
      ]
    }
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Company Financial Data</h2>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={loadSampleData}
            className="btn-secondary"
          >
            Load Sample Data
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="btn-secondary"
          >
            Clear Form
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {formSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <div key={section.title} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <IconComponent className="h-5 w-5 text-primary-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.fields.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      step={field.step}
                      className="form-input"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Analyzing...' : 'Analyze Financial Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialForm;
