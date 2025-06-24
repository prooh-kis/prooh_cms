import { Tooltip } from "antd";
import { formatNumber } from "../../utils/formatValue";
import React from "react";
interface LinearBarProps {
  value: any;
  colors: any;
  highest?: any;
  percent?: any;
}

export const LinearBar = ({
  percent = true,
  value,
  colors,
  highest = 100,
}: LinearBarProps) => {
  // Calculate width based on value and highest
  const widthPercentage = highest ? (value * 100) / highest : value;
  return (
    <div
      className="relative flex items-center w-full h-2 rounded group overflow-visible my-1"
      style={{ backgroundColor: colors[0] || "#00000020" }}
    >
      <Tooltip
      title={`${formatNumber(value)}
            ${percent ? "%" : ""} / ${formatNumber(highest)}
            ${percent ? "%" : ""}`}
      >
        <div
          className="border border-transparent rounded h-full"
          style={{
            width: `${widthPercentage}%`,
            backgroundColor: colors[1] || "#7AB3A8",
          }}
        >
          {/* Tooltip for percentage value on hover */}
          {/* <span
            className={`absolute hidden group-hover:inline-block bg-gray-700 text-white text-[12px] rounded px-2 py-1 z-50 pointer-events-none transition-all delay-150 ${
              widthPercentage > 50 ? "-top-7 right-0" : "-bottom-7 left-0"
            }`}
          >
            {formatNumber(value)}
            {percent ? "%" : ""} / {formatNumber(highest)}
            {percent ? "%" : ""}
          </span> */}
        </div>
      </Tooltip>

    </div>
  );
};
