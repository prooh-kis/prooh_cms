import React from "react";

interface CustomRadioProps {
  checked: boolean;
  onChange: () => void;
  borderColor?: string;
}

export const CustomRadio: React.FC<CustomRadioProps> = ({
  checked,
  onChange,
  borderColor = "#129BFF",
}) => {
  const radioStyle = {
    borderColor: checked ? borderColor : "#d9d9d9",
    backgroundColor: checked ? borderColor : "#FFFFFF",
  };

  const hoverStyle = {
    "--hover-border-color": borderColor,
  } as React.CSSProperties;

  return (
    <div
      onClick={onChange}
      style={{ ...radioStyle, ...hoverStyle }}
      className={`flex items-center justify-center h-4 w-4 p-2 rounded-full border hover:border-[var(--hover-border-color)] cursor-pointer transition-colors duration-200 relative`}
    >
      {checked && (
        <div
          className="absolute h-1.5 w-1.5 rounded-full bg-white"
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
        ></div>
      )}
    </div>
  );
};
