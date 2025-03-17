import React, { useEffect, useRef, useState } from "react";
export const Loading = ({}: any) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 mt-4 py-8">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#129BFF] border-t-transparent"></div>
        <h1 className="text-[#129BFF] font-semibold text-[20px] pt-4">
          Loading, please wait...
        </h1>
      </div>
    </div>
  );
};
