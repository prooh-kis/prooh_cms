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
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.trim() !== "") {
      const filtered = suggestions?.filter((suggestion) =>
        suggestion?.toLowerCase()?.includes(inputValue?.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(filteredSuggestions[highlightedIndex]);
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => value && setShowSuggestions(true)}
        placeholder={placeholder}
        className="w-full h-12 px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-gray-100 active:bg-[#F4F9FF]"
      />
      {showSuggestions && filteredSuggestions?.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300  shadow-md mt-1 max-h-36 overflow-y-auto z-50">
          {filteredSuggestions?.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking
              onClick={() => handleSuggestionClick(suggestion)}
              className={
                  `px-4 py-2 cursor-pointer border-b last:border-b-0 ${
                  index === highlightedIndex ? "bg-[#129BFF10]" : "hover:bg-[#129BFF10]"
                }`
              }
              
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};