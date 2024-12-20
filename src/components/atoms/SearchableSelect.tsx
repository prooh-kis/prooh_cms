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
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(value);

  const filteredOptions =
    searchTerm?.length == 0
      ? []
      : options?.filter((option) =>
          option.value.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    onChange(value);
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        value={
          selectedOption
            ? options?.find((o) => o.value === selectedOption)?.label
            : searchTerm
        }
        onChange={(e) => {
          setSearchTerm(e.target.value?.toUpperCase());
          setSelectedOption(null); // Clear selected option if typing
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className=" border rounded-lg h-[48px] w-full pl-5 py-2 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 active:bg-blue-100 transition-colors"
      />

      {isOpen && (
        <div className="absolute z-10 w-full bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto">
          {filteredOptions?.length > 0 ? (
            filteredOptions?.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
              >
                {option.label}
              </div>
            ))
          ) : searchTerm?.length > 0 ? (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};
