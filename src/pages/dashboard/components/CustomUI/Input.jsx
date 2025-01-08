import React from "react";
export const Input = React.forwardRef(
  ({ className = "", type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`
          w-full px-3 py-2 rounded-md border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          placeholder:text-gray-400
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
        ref={ref}
        {...props}
      />
    );
  }
);
