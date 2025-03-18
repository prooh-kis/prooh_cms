import React, { useEffect, useRef, useState } from "react";
export const Loading = ({}: any) => {
  return (
    <div className="w-full h-full bg-gray-300 rounded">
      <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100  animate-pulse rounded">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#129BFF] mt-8 border-t-transparent"></div>
        <h1 className="text-[#129BFF] font-semibold text-[20px] pt-4 mb-8">
          Loading, please wait...
        </h1>
      </div>
    </div>
  );
};
