import {
  convertDataTimeToLocale,
  getCampaignEndingStatus,
} from "../../utils/dateAndTimeUtils";
import { generateColorFromAlphabet } from "../../utils/colorUtils";
import clsx from "clsx";

export const CampaignsListModel = ({ data, index }: any) => {
  const getBgColors = (index: any) => {
    const colors = ["bg-[#EF444450]", "bg-[#F59E0B50]", "bg-[#EAB30850]", "bg-[#22C55E50]", "bg-[#06B6D450]", "bg-[#3B82F650]", "bg-[#6366F150]", "bg-[#8B5CF650]", "bg-[#78DCCA50]", "bg-[#FF77E950]", "bg-[#3AB7BF50]", "bg-[#3F3CBB50]", "bg-[#22C55E50]", "bg-[#06B6D450]", "bg-[#3B82F650]", "bg-[#6366F150]", "bg-[#EF444450]", "bg-[#F59E0B50]" ];
    return colors[index];
  }
  return (
    <div className="flex items-center justify-between w-full rounded-[4px] bg-white p-4 mb-1">
      <div className="flex items-top gap-4">
        <div
          className={clsx(
            `rounded-[4px] flex justify-center items-center w-24 border border-[#D7D7D750] ${getBgColors(index)}`
          )}
        >
          <h1 className="text-[40px] text-white font-black">
            {data?.brandName?.split("")[0]}
          </h1>
        </div>
        <div>
          <h1 className="text-[16px] text-[#092A41]">{data?.name}</h1>
          <div className="flex gap-2 items-center my-1">
            <div className="bg-[#FF5D2710] px-2 py-1 rounded-[8px]">
              <h1 className="text-[#FF5D27] text-[12px] truncate">
                {data?.brandName}
              </h1>
            </div>
            <div className="bg-[#7A6EC110] px-2 py-1 rounded-[8px]">
              <h1 className="text-[#7A6EC1] text-[12px] truncate">
                {data?.clientName}
              </h1>
            </div>
            <div className="bg-[#129BFF10] px-2 py-1 rounded-[8px]">
              <h1 className="text-[#129BFF] text-[12px] truncate">
                {data?.campaignType}
              </h1>
            </div>
          </div>
          <h1 className="text-[14px] text-[#276F41] font-semibold">
            &#8377;{data?.totalCampaignBudget?.toFixed(0)}
          </h1>
          <h1 className="text-[12px] text-[#276F41] font-semibold">
            On {data?.screenIds?.length} Screens
          </h1>

          {/* <div className="flex items-center mt-1">
            <h1 className="text-[12px] font-semibold">Status-15</h1>
            <h1 className="text-[12px] text-[#68879C]">/45 Screens Approved</h1>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center justify-start">
          <i className="fi fi-br-hourglass-start text-[#22C55E] text-[12px] flex items-center"></i>
          <h1 className="text-[12px] text-[#68879C]">
            : {convertDataTimeToLocale(data?.startDate)}
          </h1>
        </div>
        <div className="flex gap-1 items-center justify-start">
          <i className="fi fi-br-hourglass-end text-[#EF4444] text-[12px] flex items-center"></i>
          <h1 className="text-[12px] text-[#68879C]">
            : {convertDataTimeToLocale(data?.endDate)}
          </h1>
        </div>
        <div className="flex gap-1 items-center justify-start">
          <i className="fi fi-sr-pending text-[#06B6D4] text-[12px] flex items-center"></i>
          <h1 className="text-[12px] text-[#06B6D4]">
            : {getCampaignEndingStatus(data?.endDate)}
          </h1>
        </div>
      </div>
    </div>
  );
};
