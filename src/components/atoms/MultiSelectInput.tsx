import React, { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
};

export const MultiSelectInput: React.FC<{
  options: Option[];
  setSelectedOptions: any;
  selectedOptions: any[];
  placeHolder: string;
}> = ({ options, setSelectedOptions, selectedOptions, placeHolder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOption = (value: string) => {
    const newValue = selectedOptions.includes(value)
      ? selectedOptions.filter((option: string) => option !== value)
      : [...selectedOptions, value];
    setSelectedOptions(newValue);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAllSelected =
    filteredOptions.length > 0 &&
    filteredOptions.every((option) => selectedOptions.includes(option.value));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      const remaining = selectedOptions.filter(
        (value) => !filteredOptions.map((opt) => opt.value).includes(value)
      );
      setSelectedOptions(remaining);
    } else {
      const combined = new Set([
        ...selectedOptions,
        ...filteredOptions.map((opt) => opt.value),
      ]);
      setSelectedOptions(Array.from(combined));
    }
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
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
      >
        {placeHolder}
        <i className="fi fi-rs-angle-small-down float-right"></i>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white border rounded-lg shadow-md max-h-80 overflow-y-auto">
          {/* Search Box */}
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Options List */}
          <ul className="max-h-60 overflow-y-auto">
            {/* Select All Checkbox */}
            {filteredOptions.length > 0 && (
              <li className="p-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="form-checkbox rounded"
                  />
                  <span>Select All</span>
                </label>
              </li>
            )}

            {/* Individual Options */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option.value} className="p-2">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedOptions.includes(option.value)}
                      onChange={() => toggleOption(option.value)}
                      className="form-checkbox rounded"
                    />
                    <span>{option.label}</span>
                  </label>
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
