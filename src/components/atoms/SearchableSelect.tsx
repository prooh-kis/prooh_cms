import React, { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
};

export const SearchableSelect: React.FC<{
  options: Option[];
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}> = ({ options, onChange, placeholder, value }) => {
  console.log("value", value)
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>(value || "");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions =
    searchTerm.length === 0
      ? []
      : options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleOptionClick = (selectedValue: string) => {
    setSearchTerm(options?.find((o) => o.value === selectedValue)?.label || "");
    onChange(selectedValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    setSearchTerm(options?.find((o) => o.value === value)?.label || "");
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value, options]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) setIsOpen(true);
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredOptions.length) {
          handleOptionClick(filteredOptions[selectedIndex].value);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };
  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value.toUpperCase());
          setSelectedIndex(-1);
          if (!isOpen) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder={value || placeholder}
        className="border h-[48px] w-full pl-5 py-2 pr-4 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-gray-100 active:bg-blue-100 transition-colors"
      />

      {isOpen && (
        <div className="absolute z-10 w-full bg-white border shadow-md max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${
                  index === selectedIndex ? "bg-indigo-200" : ""
                }`}
              >
                {option.label}
              </div>
            ))
          ) : searchTerm.length > 0 ? (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};
