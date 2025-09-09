import React from 'react';

const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  color = 'blue',
  format = 'number'
}) => {
  const formatValue = (val) => {
    if (typeof val === 'string') return val;
    if (val === null || val === undefined) return 'N/A';
    
    switch (format) {
      case 'percentage':
        return `${val.toFixed(2)}%`;
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(val);
      case 'ratio':
        return val.toFixed(2);
      default:
        return val.toLocaleString();
    }
  };

  const getColorClasses = () => {
    const colors = {
      blue: 'border-blue-200 bg-blue-50 text-blue-600',
      green: 'border-green-200 bg-green-50 text-green-600',
      yellow: 'border-yellow-200 bg-yellow-50 text-yellow-600',
      red: 'border-red-200 bg-red-50 text-red-600',
      purple: 'border-purple-200 bg-purple-50 text-purple-600',
    };
    return colors[color];
  };

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${getColorClasses()}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 mb-1">
          {formatValue(value)}
        </p>
        <p className="text-sm font-medium text-gray-600 mb-1">
          {title}
        </p>
        {description && (
          <p className="text-xs text-gray-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
