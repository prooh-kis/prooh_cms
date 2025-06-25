import { useState } from "react";
import { FirstCharForBrandName } from "./FirstCharForBrandName";

export function CampaignListMonitoringView({ campaign, noImages }: any) {
  const [dropdownVisible, setDropdownVisible] = useState<any>({});

  const toggleDropdown = (campaignId: string) => {
    setDropdownVisible((prev: any) => ({
      ...prev,
      [campaignId]: !prev[campaignId],
    }));
  };

  return (
    <div className="p-1" key={campaign._id}>
      <div className="flex gap-1 p-2 hover:bg-gray-100 hover:rounded">
        {!noImages && (
          <FirstCharForBrandName brandName={campaign.brandName} size={"lg"} />
        )}
        <div className="truncate">
          <h1 className="text-[16px] font-semibold truncate">
            {campaign.brandName}, (
            {campaign.creatives.standardDayTimeCreatives.length})
          </h1>
          <h1 className="text-[12px] text-gray-500 truncate">
            {campaign.name}, {campaign.creatives.creativeDuration} sec
          </h1>
        </div>
        {!noImages && (
          <i
            className="fi fi-bs-menu-dots cursor-pointer"
            onClick={() => toggleDropdown(campaign._id)}
          ></i>
        )}
      </div>
      {dropdownVisible[campaign._id] && (
        <div className="relative inline-block top-0 right-[-100px] bg-white shadow-md w-32 z-10">
          <ul className="border rounded ">
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              View Details
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">Edit</li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
