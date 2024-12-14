import React, { useState } from "react";

type Option = {
  label: string;
  value: string;
};

export const SearchableSelect: React.FC<{
  options: Option[];
  onChange: (value: string) => void;
  placeholder: string;
}> = ({ options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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

  return (
    <div className="relative w-full">
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
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
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
