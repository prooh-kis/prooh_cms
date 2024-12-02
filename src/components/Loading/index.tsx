import React, { useEffect, useRef, useState } from "react";
export const Loading = ({ grid = { cols: 3, rows: 4 }, height, width}: any) => {
  const generateColumnWidths = (cols: number) => {
    // Generate widths such that their sum equals 'w-full'
    const availableWidths = [1 / 4, 1 / 2, 1 / 4]; // Tailwind width fractions
    if (cols > availableWidths.length) {
      throw new Error("Number of columns exceeds available distinct widths");
    }
  
    // Shuffle the available widths to ensure randomness
    const shuffledWidths = [...availableWidths].sort(() => Math.random() - 0.5);
  
    // Take the first `cols` widths
    const selectedWidths = shuffledWidths.slice(0, cols);
  
    // Ensure the sum of selected widths equals 1 (w-full)
    const total = selectedWidths.reduce((sum, width) => sum + width, 0);
  
    if (total !== 1) {
      throw new Error("Widths do not sum to w-full");
    }
  
    return selectedWidths.map((width) => `w-${Math.round(width * 4)}/4`);
  };

  return (
    <div className={`grid gap-4 w-full h-full p-4`}>
      {Array.from({ length: grid.rows })?.map((_, rowIndex) => {
        const columnWidths = generateColumnWidths(grid.cols);

        return (
          <div key={`row-${rowIndex}`} className={`grid grid-cols-${grid.cols} gap-4 w-full`}>
            {Array.from({ length: grid.cols })?.map((_, colIndex) => (
              <div
                key={`col-${colIndex}`}
                className={`p-2 animate-pulse bg-[#D7D7D7] rounded h-20 ${columnWidths[colIndex]}`}
              ></div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
