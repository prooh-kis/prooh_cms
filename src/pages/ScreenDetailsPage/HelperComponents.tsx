import { PrimaryButton } from "../../components/index";
import { SwitchInputCenter } from "../../components/atoms/SwitchInput";
import { ShowMediaFile } from "../../components/molecules/ShowMediaFIle";
import {
  convertIntoDateAndTime,
  getTimeDifferenceInMin,
} from "../../utils/dateAndTimeUtils";
import { Tooltip } from "antd";
import { BrandCampaignScreenDetails } from "../../components/molecules/BrandCampaignScreenDetails";
import { ScreenPlayListProps } from "../../types/ScreenPlayList";
import {
  CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_CMS,
  CAMPAIGN_STATUS_CHANGED_TO_PAUSED_CMS,
} from "../../constants/userConstants";

interface Campaign {
  _id: string;
  name: string;
  brandName: string;
  // Add other campaign properties as needed
}

interface Screen {
  id: string;
  downloadedMedia?: any[];
  // Add other screen properties as needed
}

const getScreenClassName = (screen: any) => {
  if (screen?.screenCode) {
    if (getTimeDifferenceInMin(screen?.lastActive) < 10)
      return "border w-3 h-3 bg-[#348730] rounded-full justify-end";
    else return "border w-3 h-3 bg-yellow-500 rounded-full justify-end";
  } else return "border w-3 h-3 bg-red-500 rounded-full justify-end";
};

export const ScreenHeader = ({
  screen,
  onBack,
  onRefresh,
  onUpdateRedis,
  onViewLogs,
  onPlayHoldCampaigns,
  isDefaultIncluded,
  changeDefaultIncludedAction,
}: any) => (
  <div className="w-full bg-white rounded-[4px] flex justify-between py-8">
    <div className="flex gap-1">
      <i
        className="fi fi-sr-angle-small-left text-[#7C8E9B] px-1 flex items-center cursor-pointer"
        onClick={onBack}
      />
      <div className="flex justify-center items-center">
        <img
          className="h-16 rounded"
          src={screen?.images[0]}
          alt={screen?._id}
        />
        <div className="h-full flex justify-end items-end ml-[-8px]">
          <div className={getScreenClassName(screen)} />
        </div>
      </div>
      <div className="px-2 pb-1 flex flex-col justify-between">
        <h1 className="text-[20px] font-semibold">{screen?.screenName}</h1>
        <h2 className="text-[12px]">
          {screen?.location}, {screen?.city}
        </h2>
        <p className="text-[12px]">
          Last Active: {getTimeDifferenceInMin(screen?.lastActive)} minutes ago{" "}
          {", "}
          {convertIntoDateAndTime(screen?.lastActive) || "Not available"}
        </p>
      </div>
    </div>
    <div>
      <div className="px-4 flex h-auto gap-4">
        <Tooltip title="Refresh Data">
          <i
            className="fi fi-br-refresh text-gray-500 cursor-pointer"
            onClick={onRefresh}
          />
        </Tooltip>
        <Tooltip title="Update screen playlist database">
          <i
            className="fi fi-rr-back-up text-gray-500 cursor-pointer"
            onClick={onUpdateRedis}
          />
        </Tooltip>
        <Tooltip title="View Screen logs">
          <i
            className="fi fi-rr-file-medical-alt text-gray-500 cursor-pointer"
            onClick={onViewLogs}
          />
        </Tooltip>
        <Tooltip title="Play Hold Campaigns">
          <i
            className="fi fi-tr-play-circle cursor-pointer"
            onClick={onPlayHoldCampaigns}
          />
        </Tooltip>
      </div>
      <h1 className="flex justify-center items-bottom text-[12px] text-gray-500">
        {screen?.screenCode}
      </h1>
      <div className="mt-4" title="Change Default Video Included Status">
        <SwitchInputCenter
          isEnabled={isDefaultIncluded}
          onToggle={changeDefaultIncludedAction}
          onColor="bg-[#348730]"
          offColor="bg-red-500"
        />
      </div>
    </div>
  </div>
);

export const CampaignActions = ({
  campaignIds,
  currentTab,
  onPause,
  onDelete,
  onHold,
}: any) => (
  <div className="flex items-center gap-4">
    <Tooltip
      title={
        currentTab === "1" || currentTab === "2"
          ? "Pause Campaign"
          : "Active Campaign"
      }
    >
      <i
        className={`fi ${
          currentTab === "1" || currentTab === "2"
            ? "fi-sr-pause-circle"
            : "fi-sr-play-circle"
        } text-gray-500 hover:text-[#129BFF] cursor-pointer`}
        onClick={onPause}
      />
    </Tooltip>
    <Tooltip title="Delete Campaign">
      <i
        className="fi fi-sr-trash text-gray-500 hover:text-[#348730] cursor-pointer"
        onClick={onDelete}
      />
    </Tooltip>
    <Tooltip title="Hold Campaign">
      <i
        className="fi fi-rr-megaphone text-gray-500 hover:text-[#348730] cursor-pointer"
        onClick={onHold}
      />
    </Tooltip>
  </div>
);

export const CreativeSection = ({
  title,
  creatives,
  campaign,
  handleDelete,
  showIcons = false,
}: any) => (
  <div className="border-b py-1">
    <h1 className="text-[12px] mt-1 font-bold">{title}</h1>
    {creatives?.map((creative: any, j: number) => (
      <div key={j} className="hover:border border-[#129BFF] p-1 rounded-md">
        <ShowMediaFile
          url={creative?.url}
          mediaType={creative.type?.split("/")[0] || creative.fileType}
          height="h-full"
          width="w-full"
        />
        <div className="flex justify-between items-center pt-2">
          <h1 className="text-[14px] truncate">
            {creative?.url?.split("_")?.pop()}
          </h1>
          {showIcons && (
            <div
              className="flex gap-1 text-[#A96767] text-[12px] cursor-pointer hover:text-[#FF0B55]"
              onClick={() => {
                handleDelete(creative);
              }}
            >
              <i className="fi fi-rs-trash"></i>
              <h1>Remove</h1>
            </div>
          )}
        </div>

        <p className="text-[12px]">
          {creative?.type?.split("/")[0] === "image" &&
            campaign?.creatives.creativeDuration}
          {creative?.type?.split("/")[0] === "image" && "seconds, "}
          {creative?.type}
        </p>
      </div>
    ))}
  </div>
);

// Helper Components for better readability
export const DurationCounter: React.FC<{ duration: number }> = ({
  duration,
}) => (
  <div className="flex gap-2 text-[14px] items-center justify-center">
    <i className="fi fi-rr-alarm-clock flex items-center justify-center" />
    <h1 className={duration > 180 ? "text-[#FF0000]" : "text-[#24990C]"}>
      {duration} Sec.
    </h1>
  </div>
);

export const LoopSettingButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => (
  <PrimaryButton
    action={onClick}
    title="Set Loop"
    rounded="rounded-full"
    height="h-8"
    width="w-24"
    textSize="text-[12px]"
    reverse={true}
    loading={false}
    loadingText="Saving..."
  />
);

export const AutoLoopSwitch: React.FC<{
  isEnabled: boolean;
  onToggle: () => void;
}> = ({ isEnabled, onToggle }) => (
  <div className="flex items-center pr-4" title="Allow auto loop setting">
    <SwitchInputCenter
      isEnabled={isEnabled}
      onToggle={onToggle}
      onColor="bg-[#348730]"
      offColor="bg-red-500"
    />
  </div>
);

export const CampaignItem: React.FC<{
  campaign: Campaign;
  index: number;
  campaignIds: string[];
  currentTab: string;
  downloadedMedia?: any[];
  campaigns: Campaign[];
  showTimer: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
}> = ({
  campaign,
  index,
  campaignIds,
  currentTab,
  downloadedMedia,
  campaigns,
  showTimer,
  onClick,
  onDoubleClick,
}) => (
  <div className="px-2" onClick={onClick} onDoubleClick={onDoubleClick}>
    <BrandCampaignScreenDetails
      campaignIds={campaignIds}
      brandName={campaign.brandName}
      campaign={campaign}
      campaigns={campaigns}
      showIcons={true}
      showTimer={showTimer}
      downloadedMedia={downloadedMedia}
      index={index}
      currentTab={currentTab}
    />
  </div>
);

// Helper function for status change
export const changeCampaignStatus = (
  currentTab: string,
  campaignIds: string[],
  handler: ScreenPlayListProps["changeCampaignStatusHandler"]
) => {
  const isActiveOrPausedTab = currentTab === "1" || currentTab === "2";

  handler({
    campaignIds,
    status: isActiveOrPausedTab ? "Pause" : "Active",
    event: isActiveOrPausedTab
      ? CAMPAIGN_STATUS_CHANGED_TO_PAUSED_CMS
      : CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_CMS,
  });
};
