import React, { useState, useEffect, useRef } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "knowMore"
    | "custom";
  size?: "small" | "medium" | "large";
  rounded?: "none" | "small" | "medium" | "large" | "full";
  fullWidth?: boolean;
  className?: string;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  textColor?: string;
  custom?: any;
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
  textColor,
  custom,
}) => {
  // Base classes
  const baseClasses = `font-semibold transition flex items-center justify-center ${
    fullWidth ? "w-full" : ""
  } ${disabled || loading ? "cursor-not-allowed" : "cursor-pointer"}`;

  // Size classes
  const sizeClasses = {
    small: `text-[12px] ${icon ? "pl-3 pr-3" : "px-3"} py-1 gap-1.5`,
    medium: `text-[16px] ${icon ? "pl-5 pr-5" : "px-5"} py-2 gap-2`,
    large: `text-[20px] ${icon ? "pl-7 pr-7" : "px-7"} py-3 gap-3`,
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
    outline: `border-2 bg-transparent ${
      disabled || loading
        ? "border-gray-300 text-gray-400"
        : "border-[#129BFF] text-[#129BFF] hover:bg-[#129BFF] hover:text-white"
    }`,
    ghost: `bg-transparent ${
      disabled || loading ? "text-gray-400" : "text-[#129BFF] hover:bg-blue-50"
    }`,
    danger: `hover:bg-[#ef4444] bg-[#FFFFFF] hover:text-[#FFFFFF] text-[#ef4444] border-[#ef4444] border-2 ${
      disabled || loading ? "bg-red-300" : ""
    }`,
    knowMore: `bg-white hover:bg-gray-100`,
    custom: custom,
  };

  // Icon size classes
  const iconSizeClasses = {
    small: "h-4 w-4 p-1 flex items-center",
    medium: "h-5 w-5 p-1 flex items-center",
    large: "h-6 w-6 p-1 flex items-center",
  };

  const [showOnlyIcon, setShowOnlyIcon] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !icon) {
      return;
    }

    const checkWidth = () => {
      if (!containerRef.current || !contentRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = contentRef.current.scrollWidth;

      // Add some padding to prevent text from being cut off too early
      setShowOnlyIcon(containerWidth < contentWidth + 24);
    };

    // Initial check
    checkWidth();

    // Store the current ref in a variable to use in cleanup
    const currentContainer = containerRef.current;
    const resizeObserver = new ResizeObserver(checkWidth);

    if (currentContainer) {
      resizeObserver.observe(currentContainer);
    }

    // Cleanup
    return () => {
      if (currentContainer) {
        resizeObserver.unobserve(currentContainer);
      }
      resizeObserver.disconnect();
    };
  }, [children, icon]);

  const handleClick = (e: React.MouseEvent) => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-disabled={disabled || loading}
      aria-label={
        showOnlyIcon && typeof children === "string" ? children : undefined
      }
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(e as any);
        }
      }}
      className={`${baseClasses} ${sizeClasses[size]} ${roundedClasses[rounded]} ${variantClasses[variant]} ${className} overflow-hidden`}
    >
      {loading ? (
        <div className="flex items-center gap-2 px-1 truncate">
          {/* <svg
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
          </svg> */}
          <i
            className={`fi fi-br-spinner animate-spin ${iconSizeClasses[size]} flex items-center justify-center`}
          ></i>

          {loadingText}
        </div>
      ) : (
        <div className={`flex items-center gap-2 ${textColor}`}>
          {icon && (iconPosition === "left" || showOnlyIcon) && (
            <span className={iconSizeClasses[size]}>{icon}</span>
          )}
          {!showOnlyIcon && (
            <div ref={contentRef} className="whitespace-nowrap">
              {children}
            </div>
          )}
          {icon && iconPosition === "right" && !showOnlyIcon && (
            <span className={iconSizeClasses[size]}>{icon}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ButtonInput;
