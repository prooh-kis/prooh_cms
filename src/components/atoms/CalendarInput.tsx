import { useEffect, useRef } from "react";

interface CalenderInputProps {
  placeholder: string;
  value: string;
  action: any; // Updated action type to be more specific
  disabled: boolean;
  minDate: Date;
}

export const CalendarInput = ({
  placeholder,
  value,
  action,
  disabled = false,
  minDate = new Date(),
}: CalenderInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Automatically focus the input when rendered
    }
  }, []);

  const getMinDateTime = (): string => {
    const currentDate = new Date(minDate);
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset()
    ); // Adjust for local timezone
    return currentDate.toISOString().slice(0, 16); // Format 'YYYY-MM-DDTHH:MM'
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        title="calendar_input"
        type="datetime-local"
        disabled={disabled}
        value={value}
        onChange={(e) => action(e.target.value)}
        className="text-[14px] h-[48px] w-full border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 active:bg-blue-100 transition-colors"
        min={getMinDateTime()}
        placeholder={placeholder}
      />
    </div>
  );
};
