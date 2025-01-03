import { Tooltip } from "antd";
import { generateColorFromAlphabet } from "../../utils/colorUtils";

export function BrandCampaignScreenDetails({
  showIcons,
  brandName,
  campaign,
  campaignIds,
}: any) {
  return (
    <div className="group relative my-1">
      <div
        className={`${
          campaignIds?.includes(campaign?._id)
            ? "border border-red-500 rounded"
            : ""
        } flex p-2 gap-4 hover:bg-gray-100 hover:rounded`}
      >
        <div
          className={`border rounded flex justify-center items-center w-20 bg-gray-100`}
        >
          <h1 className="text-[32px] text-gray-400 font-black">
            {brandName.split("")[0]}
          </h1>
        </div>
        <div className="truncate flex flex-col gap-1">
          <h1 className="text-[14px] font-semibold truncate">
            {campaign?.name}
          </h1>
          <p className="text-[10px] truncate">{brandName}</p>
          <p className="text-[10px] truncate">
            <Tooltip title="Campaign duration">
              <i className="fi fi-rr-calendar-clock pr-1"></i>
            </Tooltip>
            {campaign?.campaignDuration} days
          </p>
        </div>
      </div>
      {showIcons && (
        <div className="absolute px-2 top-1/2 right-4 transform -translate-y-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-gray-500 hover:text-red-500">
            <i className="fi fi-sr-eye"></i>
          </div>
        </div>
      )}
      <div className="absolute px-2 top-1/2 right-4 transform -translate-y-1/2 flex gap-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <div className="text-gray-500 hover:text-red-500">
          <h1 className="text-[12px]">
            {" "}
            {`@ `}
            {campaign?.atIndex?.map((i: any) => {
              if (i === 0) {
                return null;
              } else {
                return `${i},`;
              }
            })}
          </h1>
        </div>
      </div>
    </div>
  );
}
