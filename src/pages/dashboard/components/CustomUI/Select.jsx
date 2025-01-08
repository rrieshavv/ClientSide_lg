import React from "react";
export const Select = React.forwardRef(
  ({ children, className = "", error, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`
          w-full px-3 py-2 rounded-md border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          bg-white
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
    );
  }
);
