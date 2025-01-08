import React from "react";
export const Label = React.forwardRef(
  ({ children, className = "", error, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`block text-sm font-medium text-gray-700 mb-1 
          ${error ? "text-red-500" : ""} 
          ${className}`}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  }
);
