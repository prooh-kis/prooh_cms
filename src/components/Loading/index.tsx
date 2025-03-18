import React, { useEffect, useRef, useState } from "react";
export const Loading = ({}: any) => {
  return (
    <div className="w-full h-full bg-gray-300 rounded">
      <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100  animate-pulse rounded">
        <div className="animate-spin rounded-full h-16 w-16 sm:h-6 sm:w-6 border-4 border-[#129BFF] my-8 border-t-transparent"></div>
        {/* <h1 className="text-[#129BFF] font-semibold lg:text-[20px] md:text-[14px] pt-4 mb-8">
          Loading, please wait...
        </h1> */}
      </div>
    </div>
  );
};
