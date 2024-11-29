import React from "react";

export const SearchInputField = ({ value, onChange, placeholder }: any) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <div className="absolute left-3 top-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M16.5 10.5A6 6 0 1110.5 4.5 6 6 0 0116.5 10.5z"
          />
        </svg>
      </div>
      <div className="absolute right-3 top-2">
        {value && (
          <i className="fi fi-rs-circle-xmark" onClick={() => onChange("")}></i>
        )}
      </div>
    </div>
  );
};

export default SearchInputField;
