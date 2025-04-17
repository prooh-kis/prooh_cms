import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "small" | "medium" | "large";
  rounded?: "none" | "small" | "medium" | "large" | "full";
  fullWidth?: boolean;
  className?: string;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const ButtonInput: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "medium",
  rounded = "medium",
  fullWidth = false,
  className = "",
  loadingText = "Please Wait...",
  icon,
  iconPosition = "left",
}) => {
  // Base classes
  const baseClasses = `font-semibold transition flex items-center justify-center ${
    fullWidth ? "w-full" : ""
  } ${disabled || loading ? "cursor-not-allowed" : "cursor-pointer"}`;

  // Size classes
  const sizeClasses = {
    small: `text-sm ${icon ? "pl-3 pr-3" : "px-3"} py-1.5 gap-1.5`,
    medium: `text-base ${icon ? "pl-5 pr-5" : "px-5"} py-2 gap-2`,
    large: `text-lg ${icon ? "pl-7 pr-7" : "px-7"} py-3 gap-3`,
  };

  // Rounded classes
  const roundedClasses = {
    none: "rounded-none",
    small: "rounded-sm",
    medium: "rounded-md",
    large: "rounded-lg",
    full: "rounded-full",
  };

  // Variant classes
  const variantClasses = {
    primary: `text-white bg-[#129BFF] hover:bg-[#107ACC] ${
      disabled || loading ? "bg-blue-300" : ""
    }`,
    secondary: `text-white bg-gray-600 hover:bg-gray-700 ${
      disabled || loading ? "bg-gray-400" : ""
    }`,
    outline: `border bg-transparent ${
      disabled || loading
        ? "border-gray-300 text-gray-400"
        : "border-[#129BFF] text-[#129BFF] hover:bg-[#129BFF] hover:text-white"
    }`,
    ghost: `bg-transparent ${
      disabled || loading ? "text-gray-400" : "text-[#129BFF] hover:bg-blue-50"
    }`,
    danger: `text-white bg-red-500 hover:bg-red-600 ${
      disabled || loading ? "bg-red-300" : ""
    }`,
  };

  // Icon size classes
  const iconSizeClasses = {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6",
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={disabled || loading}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(e as any);
        }
      }}
      className={`${baseClasses} ${sizeClasses[size]} ${roundedClasses[rounded]} ${variantClasses[variant]} ${className}`}
    >
      {loading ? (
        <>
          <svg
            className={`animate-spin ${iconSizeClasses[size]} mr-2`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {loadingText}
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className={iconSizeClasses[size]}>{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className={iconSizeClasses[size]}>{icon}</span>
          )}
        </>
      )}
    </div>
  );
};

export default ButtonInput;
