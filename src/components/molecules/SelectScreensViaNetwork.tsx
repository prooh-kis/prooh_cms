import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_PACKAGE_LIST } from "../../constants/localStorageConstants";
import React, { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
};

// networkWithScreens = { "abc" : [{label : "sreenName" , values : "screenId"},{}......], "sasa" : [{label : "sreenName" , values : "screenId"},{}......]}

export const SelectScreensViaNetwork: React.FC<{
  screenList: Option[];
  setSelectedOptions: any;
  selectedOptions: any[];
  placeHolder: string;
  networkWithScreens: any;
}> = ({
  screenList,
  setSelectedOptions,
  selectedOptions,
  placeHolder,
  networkWithScreens,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [option, setOption] = useState<string>("Individual");
  const [index, setIndex] = useState<number>(-1);
  const [selectedNetwork, setSelectedNetwork] = useState<string[]>([]);

  console.log("selectedOptions : ", selectedOptions, selectedNetwork);

  const toggleOption = (value: string) => {
    const newValue = selectedOptions.includes(value)
      ? selectedOptions?.filter((option: string) => option !== value)
      : [...selectedOptions, value];
    setSelectedOptions(newValue);
  };

  const selectAllScreensUnderThisNetwork = (network: string) => {
    let data = new Set([...selectedOptions]);
  };

  const toggleNetworkOption = (value: string) => {
    console.log("value : ", value);
    let newValue;
    if (selectedNetwork.includes(value)) {
      // here i am updating selected network list
      newValue = selectedNetwork?.filter((option: string) => option !== value);

      //------
      let allScreenIds = networkWithScreens[value]?.map(
        (data: any) => data.value
      );
      console.log("if allScreenIds ", allScreenIds);

      let newScreenIds = selectedOptions?.filter(
        (screenId: string) => !allScreenIds.includes(screenId)
      );
      console.log("data: ", newScreenIds);

      setSelectedOptions(newScreenIds);
    } else {
      newValue = [...selectedNetwork, value];
      let allScreenIds = networkWithScreens[value]?.map(
        (data: any) => data.value
      );
      console.log("else allScreenIds ", allScreenIds);
      console.log(
        "data: ",
        Array.from(new Set([...selectedOptions, ...allScreenIds]))
      );

      setSelectedOptions((pre: any) =>
        Array.from(new Set([...pre, ...allScreenIds]))
      );
    }
    setSelectedNetwork(newValue);
  };

  const filterOptionsForScreens = screenList?.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterOptionsForNetwork = Object.keys(networkWithScreens)?.filter(
    (option) => option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAllSelected =
    filterOptionsForScreens?.length > 0 &&
    filterOptionsForScreens.every((option) =>
      selectedOptions.includes(option.value)
    );

  const toggleSelectAll = () => {
    if (isAllSelected) {
      const remaining = selectedOptions?.filter(
        (value) =>
          !filterOptionsForScreens?.map((opt) => opt.value).includes(value)
      );
      setSelectedOptions(remaining);
    } else {
      const combined = new Set([
        ...selectedOptions,
        ...filterOptionsForScreens?.map((opt) => opt.value),
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
          <div className="p-2">
            <div className="flex gap-8 items-center p-2">
              <div className="flex items-center">
                <input
                  checked={option === "Individual" ? true : false}
                  id="Individual"
                  type="radio"
                  name="option"
                  onClick={() => setOption("Individual")}
                  // className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="Individual"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Individual
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked={option != "Individual" ? true : false}
                  id="Select Network"
                  type="radio"
                  name="option"
                  onClick={() => setOption("Select Network")}
                  // className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="Select Network"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Select Network
                </label>
              </div>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          {option === "Individual" ? (
            <ul className="max-h-60 overflow-y-auto">
              {filterOptionsForScreens?.length > 0 && (
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

              {filterOptionsForScreens?.length > 0 ? (
                filterOptionsForScreens?.map((option) => (
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
                <li className="p-2 text-gray-500">No screenList found</li>
              )}
            </ul>
          ) : (
            <ul>
              {filterOptionsForNetwork.length > 0 ? (
                filterOptionsForNetwork
                  .map((data: string) => {
                    return { label: data, value: data };
                  })
                  ?.map((option: any, i: number) => (
                    <li key={option.value} className="p-2">
                      <div className="flex justify-between text-sm">
                        <label className="flex items-center space-x-2 ">
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={selectedNetwork.includes(option.value)}
                            onChange={() => toggleNetworkOption(option.value)}
                            className="form-checkbox rounded"
                          />
                          <span>{option.label}</span>
                        </label>
                        {index == i ? (
                          <i
                            className="fi fi-br-angle-up"
                            onClick={() => setIndex(-1)}
                          ></i>
                        ) : (
                          <i
                            className="fi fi-br-angle-down"
                            onClick={() => setIndex(i)}
                          ></i>
                        )}
                      </div>
                      {index === i &&
                        networkWithScreens[option.value]?.map(
                          (option: Option) => (
                            <li key={option.value} className="p-2">
                              <label className="flex items-center space-x-2 text-sm">
                                <input
                                  type="checkbox"
                                  value={option.value}
                                  checked={selectedOptions.includes(
                                    option.value
                                  )}
                                  onChange={() => toggleOption(option.value)}
                                  className="form-checkbox rounded"
                                />
                                <span>{option.label}</span>
                              </label>
                            </li>
                          )
                        )}
                    </li>
                  ))
              ) : (
                <li className="p-2 text-gray-500">No Network List found</li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
