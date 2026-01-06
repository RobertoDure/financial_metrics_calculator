import React, { useState } from 'react';
import { getDefaultFormData } from '../services/financialApi';
import { Building2, DollarSign, TrendingUp, Calculator } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

const COMMON_INDUSTRIES = [
  "Technology", "Healthcare", "Financial Services", "Consumer Discretionary",
  "Consumer Staples", "Energy", "Industrials", "Materials", "Utilities",
  "Real Estate", "Telecommunication Services", "Automotive", "Manufacturing",
  "Retail", "Transportation", "Media & Entertainment", "Software & Services",
  "Pharmaceuticals", "Biotechnology", "Banking", "Insurance",
  "Food & Beverage", "Aerospace & Defense", "Construction & Engineering", "Chemicals"
].sort();

const FinancialForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState(getDefaultFormData());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleValueChange = (values, name) => {
    const { floatValue } = values;
    setFormData(prev => ({
      ...prev,
      [name]: floatValue === undefined ? 0 : floatValue
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
        { name: 'industry', label: 'Industry', type: 'select', options: COMMON_INDUSTRIES }
      ]
    },
    {
      title: "Revenue & Growth",
      icon: TrendingUp,
      fields: [
        { name: 'revenue', label: 'Current Revenue', type: 'number', formatType: 'currency' },
        { name: 'revenue_initial', label: 'Initial Revenue', type: 'number', formatType: 'currency' },
        { name: 'revenue_final', label: 'Final Revenue', type: 'number', formatType: 'currency' },
        { name: 'years', label: 'Number of Years', type: 'number', formatType: 'decimal', decimalScale: 1 }
      ]
    },
    {
      title: "Financial Statements",
      icon: DollarSign,
      fields: [
        { name: 'net_income', label: 'Net Income', type: 'number', formatType: 'currency' },
        { name: 'total_assets', label: 'Total Assets', type: 'number', formatType: 'currency' },
        { name: 'total_equity', label: 'Total Equity', type: 'number', formatType: 'currency' },
        { name: 'total_liabilities', label: 'Total Liabilities', type: 'number', formatType: 'currency' },
        { name: 'ebit', label: 'EBIT', type: 'number', formatType: 'currency' },
        { name: 'interest_expense', label: 'Interest Expense', type: 'number', formatType: 'currency' }
      ]
    },
    {
      title: "Debt & Liquidity",
      icon: Calculator,
      fields: [
        { name: 'total_debt', label: 'Total Debt', type: 'number', formatType: 'currency' },
        { name: 'current_assets', label: 'Current Assets', type: 'number', formatType: 'currency' },
        { name: 'current_liabilities', label: 'Current Liabilities', type: 'number', formatType: 'currency' },
        { name: 'free_cash_flow', label: 'Free Cash Flow', type: 'number', formatType: 'currency' }
      ]
    },
    {
      title: "Market Data",
      icon: TrendingUp,
      fields: [
        { name: 'shares_outstanding', label: 'Shares Outstanding', type: 'number', formatType: 'integer' },
        { name: 'market_price_per_share', label: 'Market Price per Share', type: 'number', formatType: 'currency' },
        { name: 'dividends', label: 'Total Dividends', type: 'number', formatType: 'currency' },
        { name: 'eps_growth_percent', label: 'EPS Growth', type: 'number', formatType: 'percent' }
      ]
    },
    {
      title: "Other Metrics",
      icon: Calculator,
      fields: [
        { name: 'depreciation', label: 'Depreciation', type: 'number', formatType: 'currency' },
        { name: 'amortization', label: 'Amortization', type: 'number', formatType: 'currency' }
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
                    {field.type === 'number' ? (
                      <NumericFormat
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onValueChange={(values) => handleValueChange(values, field.name)}
                        thousandSeparator={true}
                        prefix={field.formatType === 'currency' ? '$ ' : ''}
                        suffix={field.formatType === 'percent' ? ' %' : ''}
                        decimalScale={
                          field.formatType === 'integer' ? 0 :
                            field.decimalScale !== undefined ? field.decimalScale : 2
                        }
                        fixedDecimalScale={field.formatType === 'currency' || field.formatType === 'percent'}
                        className="form-input"
                        required
                      />
                    ) : field.type === 'select' ? (
                      <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      >
                        <option value="">Select an Industry</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        list={field.list}
                        className="form-input"
                        required
                      />
                    )}
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
