import React, { useState } from "react";

interface SuggestionInputProps {
  suggestions: string[];
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}

export const SuggestionInput: React.FC<SuggestionInputProps> = ({
  suggestions,
  onChange,
  placeholder,
  value,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.trim() !== "") {
      const filtered = suggestions?.filter((suggestion) =>
        suggestion?.toLowerCase()?.includes(inputValue?.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion); // Update the parent state with the clicked suggestion
    setShowSuggestions(false); // Close the suggestions dropdown
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Allow time for suggestion clicks to register before hiding the list
    setTimeout(() => setShowSuggestions(false), 100);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={() => value && setShowSuggestions(true)}
        placeholder={placeholder}
        className="w-full h-12 px-4 py-2 border  focus:outline-none focus:ring focus:ring-indigo-300"
      />
      {showSuggestions && filteredSuggestions?.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300  shadow-md mt-1 max-h-36 overflow-y-auto z-50">
          {filteredSuggestions?.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-indigo-100 border-b last:border-b-0"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
