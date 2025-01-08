import React from 'react';
export const CardHeader = ({ children, className = '', ...props }) => {
    return (
      <div 
        className={`px-6 py-4 border-b border-gray-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };