import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  changeDefaultIncludedAction,
  editCampaignCreativesEndDateAction,
  getScreenCampaignsDetailsAction,
  getScreenDetailsAction,
  getScreenLogsAction,
  playHoldCampaignsAction,
  screenDataUpdateRedisAction,
  screenRefreshAction,
} from "../../actions/screenAction";
import { Loading } from "../../components/Loading";
import { LoopSettingPopup } from "../../components/popup/LoopSettingPopup";
import {
  changeCampaignStatusAction,
  convertCreativesToRespectiveBitrateForScreen,
  getScreenDataUploadCreativeAction,
} from "../../actions/campaignAction";
import {
  CAMPAIGN_STATUS_CHANGE_RESET,
  CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_RESET,
} from "../../constants/campaignConstants";
import {
  EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET,
  PLAY_HOLD_CAMPAIGNS_RESET,
  SET_CAMPAIGNS_LOOP_FOR_SCREEN_RESET,
} from "../../constants/screenConstants";
import { EditCreativeEndDatePopup } from "../../components/popup/EditCreativeEndDatePopup";
import { getCreativesMediaAction } from "../../actions/creativeAction";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { UPLOAD_CREATIVE_SCREEN_DATA } from "../../constants/localStorageConstants";
import { ScreenLogReportPopup } from "../../components/popup/ScreenLogReportPopup";
import { campaignTypeTabs } from "../../constants/tabDataConstant";
import {
  CAMPAIGN_CHANGE_DATE_AND_CREATIVE_CMS,
  SCREEN_CHANGE_DEFAULT_INCLUDED_STATUS_CMS,
  SCREEN_GET_SCREEN_CAMPAIGN_DETAILS_CMS,
  SCREEN_GET_SCREEN_DETAILS_CMS,
  SCREEN_GET_UPLOAD_CREATIVE_DETAILS_CMS,
  SCREEN_PLAY_HOLD_CAMPAIGNS_CMS,
  SCREEN_REDIS_UPDATE_CMS,
  SCREEN_RESTARTED_CMS,
} from "../../constants/userConstants";
import { ScreenHeader } from "./HelperComponents";
import ScreenPlayList from "./ScreenPlayList";
import CampaignCreativeList from "./CampaignCreativeList";

export const ScreenDetailsPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const screenId =
    pathname?.split("/")?.length > 2
      ? pathname?.split("/")?.splice(2)[0]
      : null;
  // State variables with appropriate types
  const [currentTab, setCurrentTab] = useState<string>("1");
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [currentCampaign, setCurrentCampaign] = useState<any>(null);
  const [openLoopSetting, setOpenLoopSetting] = useState<any>(false);
  const [isDefaultIncluded, setIsDefaultIncluded] = useState<boolean>(true);
  const [autoLoopValue, setAutoLoopValue] = useState<boolean>(true);
  const [campaignIds, setCampaignIds] = useState<any>([]);
  const [openCreativeEndDateChangePopup, setOpenCreativeEndDateChangePopup] =
    useState<any>(false);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [screenCreativeUpload, setScreenCreativeUpload] = useState<any>(null);
  const [isScreenLogReportOpen, setIsScreenLogReportOpen] =
    useState<any>(false);

  // Redux selectors
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const screenDetailsGet = useSelector((state: any) => state.screenDetailsGet);
  const {
    loading,
    error,
    data: screen,
    success: successGetScreenDetails,
  } = screenDetailsGet;

  const {
    loading: loadingCampaigns,
    error: errorCampaigns,
    data: campaigns,
  } = useSelector((state: any) => state.screenCampaignsDetailsGet);

  const {
    loading: loadingStatusChange,
    error: errorStatusChange,
    success: successStatusChange,
  } = useSelector((state: any) => state.campaignStatusChange);

  const {
    loading: loadingLoopSetting,
    error: errorLoopSetting,
    success: successLoopSetting,
  } = useSelector((state: any) => state.setCampaignsLoopForScreen);

  const {
    loading: loadingCreativeData,
    error: errorCreativeData,
    data: screenDataUploadCreative,
  } = useSelector((state: any) => state.screenDataUploadCreativeGet);

  const {
    loading: loadingChange,
    error: errorChange,
    success: successChange,
  } = useSelector((state: any) => state.changeCampaignCreativeEndDate);

  const {
    loading: loadingScreenRefresh,
    error: errorScreenRefresh,
    success: successScreenRefresh,
  } = useSelector((state: any) => state.screenRefresh);

  const {
    loading: loadingChangeDefaultIncluded,
    error: errorChangeDefaultIncluded,
    success: successChangeDefaultIncluded,
  } = useSelector((state: any) => state.changeDefaultIncluded);

  const {
    loading: loadingChangeAutoLoop,
    error: errorChangeAutoLoop,
    success: successChangeAutoLoop,
  } = useSelector((state: any) => state.changeAutoLoop);

  const {
    loading: loadingScreenDataUpdateRedis,
    error: errorScreenDataUpdateRedis,
    success: successScreenDataUpdateRedis,
  } = useSelector((state: any) => state.screenDataUpdateRedis);

  const {
    loading: loadPlayHoldCampaigns,
    error: errorPlayHoldCampaigns,
    success: successPlayHoldCampaigns,
  } = useSelector((state: any) => state.playHoldCampaigns);

  const {
    loading: loadingScreenLogs,
    error: errorScreenLogs,
    data: screenLogs,
  } = useSelector((state: any) => state.screenLogsGet);

  const {
    loading: loadingConvertCreativesToRespectiveBitrate,
    error: errorConvertCreativesToRespectiveBitrate,
    success: successConvertCreativesToRespectiveBitrate,
  } = useSelector(
    (state: any) => state.convertCreativesToRespectiveBitrateForCampaignV2
  );

  useEffect(() => {
    if (errorConvertCreativesToRespectiveBitrate) {
      message.error(errorConvertCreativesToRespectiveBitrate);
      return;
    }
    if (successConvertCreativesToRespectiveBitrate) {
      message.success("Successfully Reduce creative size and auto assigned");
      dispatch({ type: CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_RESET });
    }
  }, [
    successConvertCreativesToRespectiveBitrate,
    errorConvertCreativesToRespectiveBitrate,
  ]);

  useEffect(() => {
    if (campaigns && campaigns?.length > 0) {
      setSelectedCampaign(campaigns[0]._id);
      setCurrentCampaign(campaigns[0]);
    }
  }, [campaigns]);

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      // message.error("Not a screen owner!!!");
    }

    if (successScreenDataUpdateRedis) {
      message.success("Screen DB updated successfully...");
    }

    if (successPlayHoldCampaigns) {
      message.success("Hold Campaigns Started Playing ....");
      dispatch({ type: PLAY_HOLD_CAMPAIGNS_RESET });
    }

    if (successChangeDefaultIncluded) {
      message.success(
        "Default Included Value updated Successfully. Click On Update Redis Button to reflect changes..."
      );
    }

    if (successChangeAutoLoop) {
      message.success("Auto Loop Value updated Successfully.");
    }

    if (successScreenRefresh) {
      message.success("Screen refreshed...");
    }

    if (successStatusChange) {
      message.success("Campaign Status Changed");
      dispatch({
        type: CAMPAIGN_STATUS_CHANGE_RESET,
      });
    }

    if (successLoopSetting) {
      message.success("Loop Setting Successfully");
      dispatch({
        type: SET_CAMPAIGNS_LOOP_FOR_SCREEN_RESET,
      });
    }

    if (successChange) {
      message.success("Campaign Creative/End Date Changed");
      dispatch({
        type: EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET,
      });
      window.location.reload();
    }

    dispatch(
      getScreenDetailsAction({
        screenId: screenId,
        event: SCREEN_GET_SCREEN_DETAILS_CMS,
      })
    );
    dispatch(
      getScreenCampaignsDetailsAction({
        screenId: screenId,
        status: campaignTypeTabs?.find((tab: any) => tab.id === currentTab)
          ?.value,
        event: SCREEN_GET_SCREEN_CAMPAIGN_DETAILS_CMS,
      })
    );
    dispatch(getCreativesMediaAction({ userId: userInfo?._id }));
  }, [
    dispatch,
    userInfo,
    screenId,
    successStatusChange,
    successLoopSetting,
    successChange,
    successScreenRefresh,
    successScreenDataUpdateRedis,
    successPlayHoldCampaigns,
    successChangeDefaultIncluded,
    successChangeAutoLoop,
  ]);

  useEffect(() => {
    if (screenDataUploadCreative) {
      setScreenCreativeUpload(screenDataUploadCreative);
    }

    if (successGetScreenDetails) {
      setIsDefaultIncluded(screen.defaultIncluded);
      setAutoLoopValue(screen.autoLoop);
    }
  }, [screenDataUploadCreative, successGetScreenDetails]);

  const handleLoopSettingClick = () => {
    setOpenLoopSetting(!openLoopSetting);
  };

  const changeCampaignStatusHandler = ({ campaignIds, status, event }: any) => {
    if (confirm(`${campaignIds?.length} campaigns are being ${status}`)) {
      dispatch(
        changeCampaignStatusAction({
          campaignIds: campaignIds,
          status: status,
          event: event,
        })
      );
    }
  };

  const handleCreativeEdit = () => {
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
  };

  const handleGetCampaignByStatus = (status: any) => {
    setCampaignIds([]);
    setSelectedCampaign(null);
    setCurrentTab(status);
    dispatch(
      getScreenCampaignsDetailsAction({
        screenId: screenId,
        status: campaignTypeTabs?.filter((tab: any) => tab.id === status)[0]
          .value,
        event: SCREEN_GET_SCREEN_CAMPAIGN_DETAILS_CMS,
      })
    );
  };

  const getDurationCount = () => {
    return campaigns
      ?.reduce((total: number, campaign: any) => {
        return (
          total +
          (campaign?.creatives?.creativeDuration || 10) *
            (campaign?.atIndex?.length || 1)
        );
      }, 0)
      .toFixed(2);
  };

  const handleDeleteCreative = (input: any) => {
    let campaign = currentCampaign;
    const creatives = {
      ...campaign?.creatives,
      standardDayTimeCreatives:
        campaign?.creatives.standardDayTimeCreatives?.filter(
          (creative: any) => input?._id !== creative?._id
        ),
    };

    if (creatives?.standardDayTimeCreatives?.length === 0) {
      message.error("Sorry we can't delete, Only one creative left");
      return;
    }

    if (confirm("Do you really want to remove creative?")) {
      dispatch(
        editCampaignCreativesEndDateAction({
          campaignId: campaign._id,
          endDate: new Date(campaign.endDate).toISOString(),
          duration: campaign?.creatives?.creativeDuration,
          creatives: creatives,
          event: CAMPAIGN_CHANGE_DATE_AND_CREATIVE_CMS,
        })
      );
      message.info("Started removing,it will take some time, please wait");
    }
  };

  const convertCreativesToRespectiveBitrate = (campaignV2Id: string) => {
    dispatch(
      convertCreativesToRespectiveBitrateForScreen({ id: campaignV2Id })
    );
    message.info("Sending request to reduce creative size..., please wait");
  };

  // console.log("screen : ", JSON.stringify(screen?.operationalDuration));

  return (
    <div className="">
      {loading ? (
        <div className="">
          <Loading />
        </div>
      ) : (
        <div className="w-full grid grid-cols-12 gap-1">
          {isScreenLogReportOpen && (
            <ScreenLogReportPopup
              isOpen={isScreenLogReportOpen}
              onClose={() => setIsScreenLogReportOpen(false)}
              screenLogs={screenLogs}
              screenName={screen?.screenName}
              allCampaigns={campaigns}
              loading={loadingScreenLogs}
            />
          )}

          {openCreativeEndDateChangePopup && screen && (
            <EditCreativeEndDatePopup
              onClose={() => setOpenCreativeEndDateChangePopup(false)}
              selectedScreens={[screen]}
              mediaFiles={mediaFiles}
              setMediaFiles={setMediaFiles}
              campaign={currentCampaign}
              campaignType={currentTab === "8" ? "Default" : "None"}
              screenData={screenCreativeUpload}
            />
          )}
          {openLoopSetting && loading ? (
            <div className="">
              <Loading />
            </div>
          ) : (
            <LoopSettingPopup
              screenId={screenId}
              openLoopSetting={openLoopSetting}
              campaigns={campaigns}
              onClose={setOpenLoopSetting}
            />
          )}

          <div className="col-span-8">
            <ScreenHeader
              userRole={userInfo?.userRole}
              screen={screen}
              onBack={() => navigate(-1)}
              isDefaultIncluded={isDefaultIncluded}
              onRefresh={() =>
                confirm(`Do you want to refresh your screen???`) &&
                dispatch(
                  screenRefreshAction({
                    id: screenId,
                    screenIds: [screenId],
                    event: SCREEN_RESTARTED_CMS,
                  })
                )
              }
              onUpdateRedis={() =>
                confirm(`Do you want to update screen playlist database???`) &&
                dispatch(
                  screenDataUpdateRedisAction({
                    ids: [screenId],
                    screenIds: [screenId],
                    event: SCREEN_REDIS_UPDATE_CMS,
                  })
                )
              }
              onViewLogs={() => {
                dispatch(
                  getScreenLogsAction({ screenId, start: 0, limit: 240 })
                );
                setIsScreenLogReportOpen(true);
              }}
              onPlayHoldCampaigns={() =>
                confirm(`Do you want to play hold campaigns ?`) &&
                dispatch(
                  playHoldCampaignsAction({
                    screenId,
                    event: SCREEN_PLAY_HOLD_CAMPAIGNS_CMS,
                  })
                )
              }
              changeDefaultIncludedAction={() => {
                if (
                  confirm(
                    `Do you want to change the default video included value?`
                  )
                ) {
                  dispatch(
                    changeDefaultIncludedAction({
                      id: screenId,
                      defaultIncluded: !isDefaultIncluded,
                      screenIds: [screenId],
                      event: SCREEN_CHANGE_DEFAULT_INCLUDED_STATUS_CMS,
                    })
                  );
                  setIsDefaultIncluded(!isDefaultIncluded);
                }
              }}
            />
            <ScreenPlayList
              campaigns={campaigns}
              currentTab={currentTab}
              getDurationCount={getDurationCount}
              autoLoopValue={autoLoopValue}
              handleLoopSettingClick={handleLoopSettingClick}
              setAutoLoopValue={setAutoLoopValue}
              screenId={screenId || ""}
              campaignIds={campaignIds}
              changeCampaignStatusHandler={changeCampaignStatusHandler}
              loadingCampaigns={loadingCampaigns}
              handleGetCampaignByStatus={handleGetCampaignByStatus}
              campaignTypeTabs={campaignTypeTabs}
              setCurrentCampaign={setCurrentCampaign}
              setSelectedCampaign={setSelectedCampaign}
              setCampaignIds={setCampaignIds}
              screen={screen}
              userRole={userInfo?.userRole}
            />
          </div>
          {loadingCampaigns ? (
            <div className="col-span-4 border rounded">
              <Loading />
            </div>
          ) : campaigns && selectedCampaign ? (
            <CampaignCreativeList
              currentCampaign={currentCampaign}
              setOpenCreativeEndDateChangePopup={
                setOpenCreativeEndDateChangePopup
              }
              currentTab={currentTab}
              changeCampaignStatusHandler={changeCampaignStatusHandler}
              campaignIds={campaignIds}
              handleDeleteCreative={handleDeleteCreative}
              handleCreativeEdit={handleCreativeEdit}
              downloadedMedia={screen?.downloadedMedia}
              userRole={userInfo?.userRole}
              convertCreativesToRespectiveBitrate={
                convertCreativesToRespectiveBitrate
              }
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
