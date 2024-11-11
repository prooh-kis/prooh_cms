import React, { useState } from "react";

interface CheckboxProps {
  label?: any;
  checked?: boolean;
  textSize?: string;
  color?: string;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;  // Added disabled prop to be more specific
}

export const CheckboxInput: React.FC<CheckboxProps> = ({ disabled, color, textSize, label, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer truncate">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-[#52A2FF]"
        checked={isChecked !== undefined ? isChecked : false}
        disabled={disabled}
        onChange={handleCheckboxChange}
      />
      <span className={`text-[${color ? color : "#21394F"}] text-[${textSize ? textSize : "14px"}] truncate`}>
        {label}
        </span>
    </label>
  );
};
