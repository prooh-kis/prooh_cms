import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { getScreenDataUploadCreativeAction } from "../../actions/campaignAction";
import { UPLOAD_CREATIVE_SCREEN_DATA } from "../../constants/localStorageConstants";
import {
  CAMPAIGN_STATUS_CHANGED_TO_DELETED_CMS,
  SCREEN_GET_UPLOAD_CREATIVE_DETAILS_CMS,
  SCREEN_MONITORING_USER,
} from "../../constants/userConstants";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreativeSection } from "./HelperComponents";
import { getCampaignEndingStatus } from "../../utils/dateAndTimeUtils";

const CampaignCreativeList = ({
  currentCampaign,
  setOpenCreativeEndDateChangePopup,
  currentTab,
  changeCampaignStatusHandler,
  campaignIds,
  handleDeleteCreative,
  handleCreativeEdit,
  downloadedMedia,
  userRole
}: any) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  return (
    <div className="col-span-4 bg-white p-4 rounded-[4px] mr-2">
      <div className="border-b-2 pb-10">
        <div className="flex justify-between items-center">
          <h1 className="text-[16px] font-semibold mt-4">
            {currentCampaign?.name}
          </h1>
          {userRole !== SCREEN_MONITORING_USER && <div className="flex gap-1">
            <div
              className="text-gray-500 hover:text-[#348730]"
              onClick={() => {
                if (confirm(`Are you sure you want to edit the campaign???`)) {
                  saveDataOnLocalStorage(UPLOAD_CREATIVE_SCREEN_DATA, {
                    [currentCampaign?.campaignCreationId]:
                      currentCampaign.creatives.standardDayTimeCreatives,
                  });
                  dispatch(
                    getScreenDataUploadCreativeAction({
                      id: currentCampaign?.campaignCreationId,
                      event: SCREEN_GET_UPLOAD_CREATIVE_DETAILS_CMS,
                    })
                  );
                  setOpenCreativeEndDateChangePopup(true);
                }
              }}
            >
              <i className="fi fi-sr-file-edit"></i>
            </div>
            {currentTab != "7" && (
              <div
                className="text-gray-500 hover:text-red-500"
                onClick={() => {
                  if (confirm(`Are you sure you want delete the campaign???`)) {
                    changeCampaignStatusHandler({
                      campaignIds: campaignIds,
                      status: "Deleted",
                      event: CAMPAIGN_STATUS_CHANGED_TO_DELETED_CMS,
                    });
                  }
                }}
              >
                <i className="fi fi-sr-trash"></i>
              </div>
            )}
            {currentTab != "7" && (
              <div
                className="text-gray-500 hover:text-[#348730]"
                onClick={() =>
                  navigate(
                    `/campaigns-details/${currentCampaign?.campaignCreationId}`
                  )
                }
              >
                <i className="fi fi-sr-eye"></i>
              </div>
            )}
          </div>}
        </div>
        <div>
          <h1 className="text-[14px] mt-1">{currentCampaign?.brandName}</h1>
          <h1 className="text-[12px] mt-1">
            {getCampaignEndingStatus(currentCampaign?.endDate)}
          </h1>
        </div>
      </div>
      <div className="bg-white h-[73vh] overflow-y-auto no-scrollbar mt-2">
        <h1 className="text-[16px] font-semibold">Creatives</h1>
        {currentCampaign?.creatives?.standardDayTimeCreatives?.length === 0 &&
          currentCampaign?.creatives?.standardNightTimeCreatives?.length ===
          0 &&
          currentCampaign?.creatives?.triggerCreatives?.length === 0 && (
            <div className="p-1 relative  h-32 z-100">
              <div className="absolute top-0 right-1 flex justify-end mt-[20px]">
                <div className="flex justify-end  p-1 w-16 gap-4 bg-[#D7D7D750]">
                  <div
                    className="text-white hover:text-[#348730]"
                    onClick={handleCreativeEdit}
                  >
                    <i className="fi fi-sr-file-edit"></i>
                  </div>
                  <div className="text-white hover:text-[#348730]">
                    <i className="fi fi-sr-trash"></i>
                  </div>
                </div>
              </div>
            </div>
          )}
        <CreativeSection
          title="Day Creatives"
          creatives={currentCampaign?.creatives.standardDayTimeCreatives}
          campaign={currentCampaign}
          showIcons={userRole !== SCREEN_MONITORING_USER}
          handleDelete={handleDeleteCreative}
          downloadedMedia={downloadedMedia}
        />

        <CreativeSection
          title="Night Creatives"
          creatives={currentCampaign?.creatives.standardNightTimeCreatives}
          campaign={currentCampaign}
          downloadedMedia={downloadedMedia}
          showIcons={userRole !== SCREEN_MONITORING_USER}
          handleDelete={handleDeleteCreative}
        />

        <CreativeSection
          title="Trigger Creatives"
          creatives={currentCampaign?.creatives.triggerCreatives}
          campaign={currentCampaign}
          downloadedMedia={downloadedMedia}
          showIcons={userRole !== SCREEN_MONITORING_USER}
          handleDelete={handleDeleteCreative}
        />
      </div>
    </div>
  );
};

export default CampaignCreativeList;
