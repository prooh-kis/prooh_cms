import { Skeleton, Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_CMS,
  CAMPAIGN_STATUS_CHANGED_TO_DELETED_CMS,
  CAMPAIGN_STATUS_CHANGED_TO_PAUSED_CMS,
  SCREEN_ADMIN,
  SCREEN_MANAGER,
  SCREEN_OWNER,
} from "../../constants/userConstants";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { CAMPAIGN_CREATION_STATUS } from "../../constants/localStorageConstants";
import {
  CAMPAIGN_STATUS_ACTIVE,
  CAMPAIGN_STATUS_DELETED,
  CAMPAIGN_STATUS_PAUSE,
} from "../../constants/campaignConstants";
import {
  convertIntoDateAndTime,
  getCampaignEndingStatus,
} from "../../utils/dateAndTimeUtils";
import { useDispatch } from "react-redux";

const CampaignDetailSection = ({
  campaignCreated,
  getBgColors,
  userInfo,
  loadingStatusChange,
  handleToggleOpenAllCampaignLogsPopup,
  campaignId,
  setOpenCreateCampaignEndDateChangePopup,
  handleChangeStatusAll,
  handleConvertCreativeToRespectiveBitrate,
  openCreateCampaignEndDateChangePopup,
}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="w-full border rounded py-4 bg-white">
      <div className="flex justify-between pb-2 mx-1 border-b">
        <div className="flex items-center gap-4">
          <i
            className="fi fi-sr-angle-small-left text-[#7C8E9B] flex items-center"
            onClick={() => navigate(-1)}
          ></i>
          <div
            className={
              campaignCreated
                ? `rounded  ${getBgColors(
                    campaignCreated?.brandName?.split(" ")[0]?.split("").length
                  )}`
                : `rounded bg-gray-100`
            }
          >
            <h1 className="text-[40px] text-white font-bold px-4">
              {campaignCreated?.brandName.split("")[0]}
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <Tooltip title="View Dashboard">
              <h1
                className="text-[18px] font-semibold cursor-pointer"
                onClick={() =>
                  navigate(`/campaignDashboard/${campaignCreated?._id}`)
                }
              >
                {campaignCreated?.name || "Campaign Name"}
              </h1>
            </Tooltip>
            <h1 className="text-[12px]">
              {campaignCreated?.brandName}, {campaignCreated?.duration} days
            </h1>
          </div>
        </div>
        {(userInfo?.userRole === SCREEN_ADMIN ||
          userInfo?.userRole === SCREEN_OWNER ||
          userInfo?.userRole === SCREEN_MANAGER) && (
          <div className="flex flex-col px-4 justify-center">
            {loadingStatusChange ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <div className=" flex h-auto gap-4">
                <Tooltip title="Change Creatives According To Bitrate">
                  <i
                    className="fi fi-rr-replace text-gray-500"
                    onClick={() => handleConvertCreativeToRespectiveBitrate()}
                  ></i>
                </Tooltip>
                <Tooltip title="Get all campaigns logs">
                  <i
                    className="fi fi-rr-document text-gray-500"
                    onClick={handleToggleOpenAllCampaignLogsPopup}
                  ></i>
                </Tooltip>
                <Tooltip title="Edit creatives for all screens">
                  <i
                    className="fi fi-ss-pen-circle text-gray-500"
                    title="Edit Creatives"
                    onClick={() => {
                      saveDataOnLocalStorage(CAMPAIGN_CREATION_STATUS, "edit");
                      navigate(`/edit-campaign/${campaignId}`);
                    }}
                  ></i>
                </Tooltip>
                <Tooltip title="Edit end date for all screens">
                  <i
                    className="fi fi-sr-file-edit text-gray-500"
                    title="Edit End Date"
                    onClick={() =>
                      setOpenCreateCampaignEndDateChangePopup(
                        !openCreateCampaignEndDateChangePopup
                      )
                    }
                  ></i>
                </Tooltip>
                <Tooltip title="Pause for all screens">
                  <i
                    className="fi fi-ss-pause-circle text-gray-500"
                    title="Pause All"
                    onClick={() =>
                      handleChangeStatusAll(
                        CAMPAIGN_STATUS_PAUSE,
                        CAMPAIGN_STATUS_CHANGED_TO_PAUSED_CMS
                      )
                    }
                  ></i>
                </Tooltip>
                <Tooltip title="Activate for all screens">
                  <i
                    className="fi fi-sr-play-circle text-gray-500"
                    title="Active All"
                    onClick={() =>
                      handleChangeStatusAll(
                        CAMPAIGN_STATUS_ACTIVE,
                        CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_CMS
                      )
                    }
                  ></i>
                </Tooltip>
                <Tooltip title="Delete for all screens">
                  <i
                    className="fi fi-sr-trash text-gray-500"
                    title="Delete All"
                    onClick={() =>
                      handleChangeStatusAll(
                        CAMPAIGN_STATUS_DELETED,
                        CAMPAIGN_STATUS_CHANGED_TO_DELETED_CMS
                      )
                    }
                  ></i>
                </Tooltip>
              </div>
            )}
            <h1
              className={`text-[12px] ${
                getCampaignEndingStatus(campaignCreated?.endDate).includes(
                  "Already"
                )
                  ? "text-[#EF4444]"
                  : "text-[#22C55E]"
              }`}
            >
              {getCampaignEndingStatus(campaignCreated?.endDate)}
            </h1>
          </div>
        )}
      </div>
      <h1 className="px-9 text-[#092A41] text-[15px] font-normal mt-2">
        Basic Details
      </h1>
      <div className="px-9 p-2 flex gap-8">
        <div className="flex flex-col gap-2">
          <h1 className=" text-[12px]">Start Date</h1>
          <h1 className=" text-[12px]">End Date</h1>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className=" text-[12px]">
            {convertIntoDateAndTime(campaignCreated?.startDate)}
          </h1>
          <h1 className="text-[12px]">
            {convertIntoDateAndTime(campaignCreated?.endDate)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailSection;
