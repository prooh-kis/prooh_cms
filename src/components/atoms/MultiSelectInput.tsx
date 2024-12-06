import React, { useState } from "react";

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

  const toggleOption = (value: string) => {
    const newValue = selectedOptions?.includes(value)
      ? selectedOptions?.filter((option: string) => option !== value)
      : [...selectedOptions, value];
    setSelectedOptions(newValue);
  };

  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border rounded-lg  focus:outline-none focus:ring focus:ring-indigo-300"
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
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option.value} className="p-2">
                  <label className={"flex items-center space-x-2 text-sm"}>
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedOptions.includes(option.value)}
                      onChange={() => toggleOption(option.value)}
                      className="form-checkbox rounded "
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
