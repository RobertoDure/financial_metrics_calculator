import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = '#3b82f6' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${sizeClasses[size]}`}
        style={{ borderTopColor: color }}
      />
    </div>
  );
};

export default LoadingSpinner;
