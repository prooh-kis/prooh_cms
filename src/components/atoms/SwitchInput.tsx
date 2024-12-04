import React, { useState } from "react";

type SwitchProps = {
  isEnabled: boolean;
  onToggle: (isEnabled: boolean) => void;
  onColor?: string;
  offColor?: string;
};

export const SwitchInput: React.FC<SwitchProps> = ({
  isEnabled,
  onToggle,
  onColor = "bg-green-500",
  offColor = "bg-gray-300",
}) => {
  return (
    <button
      onClick={() => onToggle(!isEnabled)}
      className={`relative inline-flex items-center w-11 h-5 rounded-full transition-colors focus:outline-none ${
        isEnabled ? onColor : offColor
      }`}
    >
      <span
        className={`w-4 h-4 transform bg-white rounded-full shadow transition-transform ${
          isEnabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};