import React from "react";
// Variants.ts
const selectVariants = {
  primary: "border-gray-100 focus:ring-blue-500 focus:border-blue-500",
  secondary: "border-purple-300 focus:ring-purple-500 focus:border-purple-500",
  danger: "border-red-300 focus:ring-red-500 focus:border-red-500",
  success: "border-green-300 focus:ring-green-500 focus:border-green-500",
};

const selectSizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

interface EnhancedSelectProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  variant?: keyof typeof selectVariants;
  size?: keyof typeof selectSizes;
  icon?: React.ReactNode;
}
export const EnhancedSelect = ({
  options,
  value,
  onChange,
  className = "",
  disabled = false,
  placeholder = "Select an option",
  variant = "primary",
  size = "md",
  icon,
}: EnhancedSelectProps) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
      )}
      <select
        title="Select"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`block w-full ${selectSizes[size]} ${
          icon ? "pl-10" : "pl-3"
        } pr-10 text-gray-700 bg-white border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          selectVariants[variant]
        } ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } appearance-none`} // Added appearance-none here
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};
