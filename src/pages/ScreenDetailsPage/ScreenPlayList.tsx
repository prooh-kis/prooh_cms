import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchInputField } from "../../components";
import { changeAutoLoopAction } from "../../actions/screenAction";
import {
  AutoLoopSwitch,
  CampaignActions,
  CampaignItem,
  changeCampaignStatus,
  DurationCounter,
  LoopSettingButton,
} from "./HelperComponents";
import {
  CAMPAIGN_STATUS_CHANGED_TO_DELETED_CMS,
  SCREEN_CHANGE_AUTO_LOOP_VALUE_CMS,
  SCREEN_MONITORING_USER,
} from "../../constants/userConstants";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { Loading } from "../../components/Loading";
import {
  ScreenPlayListCampaign,
  ScreenPlayListProps,
} from "../../types/ScreenPlayList";

const ScreenPlayList: React.FC<ScreenPlayListProps> = ({
  campaigns,
  currentTab,
  getDurationCount,
  autoLoopValue,
  handleLoopSettingClick,
  setAutoLoopValue,
  screenId,
  campaignIds,
  changeCampaignStatusHandler,
  loadingCampaigns,
  handleGetCampaignByStatus,
  campaignTypeTabs,
  setCurrentCampaign,
  setSelectedCampaign,
  setCampaignIds,
  screen,
  userRole
}) => {
  const dispatch = useDispatch<any>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleAutoLoopToggle = () => {
    if (confirm("Do you want to give permission to give auto loop setting?")) {
      dispatch(
        changeAutoLoopAction({
          id: screenId,
          autoLoop: !autoLoopValue,
          screenIds: [screenId],
          event: SCREEN_CHANGE_AUTO_LOOP_VALUE_CMS,
        })
      );
      setAutoLoopValue(!autoLoopValue);
    }
  };

  const handleCampaignClick = (campaign: ScreenPlayListCampaign) => {
    setSelectedCampaign(campaign._id);
    setCurrentCampaign(campaign);
  };

  const handleCampaignDoubleClick = (campaignId: string) => {
    setCampaignIds((prev) =>
      prev.includes(campaignId)
        ? prev.filter((id) => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const filteredCampaigns = campaigns?.filter(
    (campaign) =>
      campaign?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      campaign?.brandName?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const showDurationCounter = ["1", "2"].includes(currentTab);
  const isActiveTab = currentTab === "1";
  const showTimer = currentTab !== "7";

  return (
    <div className="my-1 bg-white rounded-[4px]">
      {/* Header Section */}
      <div className="px-4 pt-4 pb-2 flex justify-between">
        <div className="flex gap-4 items-center">
          <h1 className="text-[16px] font-semibold">
            Campaigns{" "}
            <span className="text-[14px] text-secondaryText">
              ({campaigns?.length})
            </span>
          </h1>

          {showDurationCounter && (
            <DurationCounter duration={getDurationCount()} />
          )}
        </div>

        {userRole !== SCREEN_MONITORING_USER && <div className="flex gap-4 items-center">
          {isActiveTab && !autoLoopValue && (
            <LoopSettingButton onClick={handleLoopSettingClick} />
          )}

          {isActiveTab && (
            <AutoLoopSwitch
              isEnabled={autoLoopValue}
              onToggle={handleAutoLoopToggle}
            />
          )}

          <CampaignActions
            campaignIds={campaignIds}
            currentTab={currentTab}
            onPause={() =>
              changeCampaignStatus(
                currentTab,
                campaignIds,
                changeCampaignStatusHandler
              )
            }
            onDelete={() =>
              changeCampaignStatusHandler({
                campaignIds,
                status: "Deleted",
                event: CAMPAIGN_STATUS_CHANGED_TO_DELETED_CMS,
              })
            }
            onHold={() =>
              changeCampaignStatusHandler({
                campaignIds,
                status: "Hold",
                event: CAMPAIGN_STATUS_CHANGED_TO_DELETED_CMS,
              })
            }
          />
        </div>}
      </div>

      {/* Tab Section */}
      <div className="flex items-center justify-between px-2 border-b">
        {loadingCampaigns ? (
          <div className="p-2 animate-pulse bg-[#D7D7D7] rounded h-8 w-full" />
        ) : (
          <TabWithoutIcon
            currentTab={currentTab}
            setCurrentTab={handleGetCampaignByStatus}
            tabData={campaignTypeTabs}
          />
        )}
      </div>

      {/* Search Section */}
      <div className="flex items-center p-4">
        <SearchInputField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by campaign name or brand"
        />
      </div>

      {/* campaign List Section */}
      {loadingCampaigns ? (
        <Loading />
      ) : (
        <div className="w-full h-[50vh] overflow-y-auto no-scrollbar mb-2">
          {filteredCampaigns?.map((campaign, index) => (
            <CampaignItem
              key={campaign._id}
              campaign={campaign}
              index={index}
              campaignIds={campaignIds}
              currentTab={currentTab}
              downloadedMedia={screen?.downloadedMedia}
              campaigns={campaigns}
              showTimer={showTimer}
              onClick={() => handleCampaignClick(campaign)}
              onDoubleClick={() => handleCampaignDoubleClick(campaign._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScreenPlayList;
