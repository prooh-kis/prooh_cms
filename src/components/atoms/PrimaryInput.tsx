import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface PrimaryInputProps {
  placeholder?: string;
  value?: string;
  inputType?: string; // Updated inputType to be more specific
  action: (value: string) => void; // Updated action type to be more specific
  prefix?: any;
  suffix?: any;
  rounded?: any;
  height?: any;
  width?: any;
}

export const PrimaryInput = ({
  height,
  width,
  placeholder,
  rounded,
  prefix,
  suffix,
  value,
  action,
  inputType,
}: PrimaryInputProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => e.preventDefault();

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="relative w-full">
      {prefix}
      <input
        title="input_box"
        ref={inputRef}
        type={inputType}
        value={value}
        placeholder={placeholder || "Type to input"}
        onChange={(e) => action(e.target.value)}
        className={`${height ? height : "h-[48px]"} ${
          width ? width : "w-full"
        } border ${
          rounded ? rounded : ""
        } pl-5 py-2 pr-4 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-gray-100 active:bg-blue-100 transition-colors`}
      />
      {suffix}
    </div>
  );
};
