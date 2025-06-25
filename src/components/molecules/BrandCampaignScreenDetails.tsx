import { Tooltip } from "antd";
import { FirstCharForBrandName } from "./FirstCharForBrandName";

export function BrandCampaignScreenDetails({
  showIcons,
  brandName,
  campaign,
  campaignIds,
  showTimer,
  downloadedMedia,
  index,
  currentTab,
}: any) {
  const creativeNameDay =
    campaign?.creatives?.standardDayTimeCreatives?.[0]?.url.split("/")[
      campaign?.creatives?.standardDayTimeCreatives[0]?.url.split("/")?.length -
        1
    ];
  const creativeNameNight =
    campaign?.creatives?.standardNightTimeCreatives?.[0]?.url.split("/")[
      campaign?.creatives?.standardNightTimeCreatives[0]?.url.split("/")
        ?.length - 1
    ];
  const creativeNameTrigger =
    campaign?.creatives?.triggerCreatives?.[0]?.url.split("/")[
      campaign?.creatives?.triggerCreatives[0]?.url.split("/")?.length - 1
    ];

  const renderDownloadIcon = (name: string | undefined, type: string) => {
    if (!name) return null;

    const isDownloaded = downloadedMedia.includes(name);
    return (
      <Tooltip
        title={`${type} Creative ${
          isDownloaded ? "Downloaded" : "Not Downloaded"
        }`}
      >
        <i
          className={`fi fi-sr-folder-download ${
            isDownloaded ? "text-[#22C55E]" : "text-[#EF4444]"
          } flex items-center justify-center`}
        />
      </Tooltip>
    );
  };

  return (
    <div className="group relative my-1">
      <div
        className={`${
          campaignIds?.includes(campaign?._id)
            ? "border border-red-500 rounded"
            : campaign?.status === "Delivered"
            ? "border border-primary rounded"
            : ""
        } flex p-2 gap-4 hover:bg-gray-100 hover:rounded`}
      >
        <FirstCharForBrandName brandName={brandName} size={"lg"} />
        <div className="truncate flex flex-col gap-1">
          <div className="flex items-center justify-start gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-[14px] font-semibold truncate">
                {campaign?.name}
              </h1>
              {campaign?.status === "Delivered" && (
                <h1 className="text-[12px] text-primaryButton truncate">
                  {campaign?.status}
                </h1>
              )}

              {campaign?.extraDelivery && (
                <h1 className="text-[12px] text-primaryButton truncate">
                  {"Adjusted Delivery"}
                </h1>
              )}
            </div>
            {["1", "2"]?.includes(currentTab) && (
              <div className="flex items-center justify-start gap-2">
                {renderDownloadIcon(creativeNameDay, "Day")}
                {renderDownloadIcon(creativeNameNight, "Night")}
                {renderDownloadIcon(creativeNameTrigger, "Trigger")}
              </div>
            )}
          </div>

          <p className="text-[10px] truncate">{brandName}</p>
          {showTimer && (
            <div className="flex items-center">
              <i className="text-[10px] fi fi-rr-calendar-clock pr-1 flex items-center justify-center"></i>
              <p className="text-[10px] truncate">
                {campaign?.campaignDuration} days
              </p>
            </div>
          )}
          {/* group-hover:opacity-0 transition-opacity duration-300 */}
          <div className="flex gap-2 text-[12px]">
            <i className="fi fi-rr-alarm-clock flex items-center justify-center"></i>
            <h1 className=" text-gray-500 gap-4 opacity-100 ">
              {campaign?.creatives?.creativeDuration} Sec.
            </h1>

            <h1 className="text-[12px] text-gray-500 gap-4 opacity-100 ">
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
      {showIcons && (
        <div className="absolute px-2 top-1/2 right-4 transform -translate-y-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-gray-500 hover:text-red-500">
            <i className="fi fi-sr-eye"></i>
          </div>
        </div>
      )}
    </div>
  );
}
