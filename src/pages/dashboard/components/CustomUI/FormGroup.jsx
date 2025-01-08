import React from "react";
export const FormGroup = ({
  children,
  className = "",
  error,
  helpText,
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helpText && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
};
