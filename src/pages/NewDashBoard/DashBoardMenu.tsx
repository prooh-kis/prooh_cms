import { convertIntoDateAndTime } from "../../utils/dateAndTimeUtils";
import React from "react";

export const DashBoardMenu = ({ campaignDetails }: any) => {
  return (
    <div className="absolute top-full left-0 z-100 w-[426px] h-[323px] bg-white border border-[#E0E0E0] shadow-md overflow-y-auto scrollbar-minimal mt-2 p-4 rounded-[17px]">
      <h1 className="text-[14px] text-[#ADADAD] leading-[16.94px]">
        Campaign Details
      </h1>

      <div className="flex mt-4">
        {/* Labels Column */}
        <div className="flex flex-col w-1/2">
          {[
            "Campaign Name",
            "Brand Name",
            "Agency Name",
            "Planner Name",
            "Total Screens",
            "Campaign Type",
            "Start Date",
            "End Date",
          ].map((label, index) => (
            <p
              key={index}
              className="text-[14px] text-[#0E212E] font-medium leading-[16.94px] border-b border-[#ECECEC] last:border-b-0 py-2"
            >
              {label}
            </p>
          ))}
        </div>

        {/* Values Column */}
        <div className="flex flex-col w-1/2">
          {[
            campaignDetails?.name,
            campaignDetails?.brandName,
            campaignDetails?.clientName,
            campaignDetails?.campaignPlannerName,
            campaignDetails?.screenIds?.length,
            campaignDetails?.campaignType?.split(/(?=[A-Z])/).join(" "),
            convertIntoDateAndTime(campaignDetails?.startDate),
            convertIntoDateAndTime(campaignDetails?.endDate),
          ].map((value, index) => (
            <p
              key={index}
              className={`text-[14px] truncate ${
                index === 6 ? "text-[#9B1402]" : "text-gray-700"
              } leading-[16.94px] border-b border-[#ECECEC] last:border-b-0 py-2`}
            >
              {value || "-"}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
