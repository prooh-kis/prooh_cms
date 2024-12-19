import React from "react";

export const NoDataView = () => {
  return (
    <div className="flex flex-col justify-center border border-1 bg-gray-100 border-gray-200 p-4 w-full h-[70px] items-center rounded-md mt-4">
      <i className="fi fi-rr-folder-open text-[24px] text-gray-400"></i>
      <h1 className="text-[14px] text-gray-500">No Data</h1>
    </div>
  );
};
