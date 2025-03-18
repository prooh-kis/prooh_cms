import { message, Tooltip } from "antd";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  changeAutoLoopAction,
  changeDefaultIncludedAction,
  getScreenCampaignsDetailsAction,
  getScreenDetailsAction,
  getScreenLogsAction,
  playHoldCampaignsAction,
  screenDataUpdateRedisAction,
  screenRefreshAction,
} from "../../actions/screenAction";
import { Loading } from "../../components/Loading";
import {
  convertIntoDateAndTime,
  getCampaignEndingStatus,
  getTimeDifferenceInMin,
} from "../../utils/dateAndTimeUtils";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { LoopSettingPopup } from "../../components/popup/LoopSettingPopup";
import { BrandCampaignScreenDetails } from "../../components/molecules/BrandCampaignScreenDetails";
import {
  changeCampaignStatusAction,
  getScreenDataUploadCreativeAction,
} from "../../actions/campaignAction";
import { CAMPAIGN_STATUS_CHANGE_RESET } from "../../constants/campaignConstants";
import {
  CHANGE_AUTO_LOOP_VALUE_RESET,
  EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET,
  PLAY_HOLD_CAMPAIGNS_RESET,
  SET_CAMPAIGNS_LOOP_FOR_SCREEN_RESET,
} from "../../constants/screenConstants";
import { EditCreativeEndDatePopup } from "../../components/popup/EditCreativeEndDatePopup";
import { getCreativesMediaAction } from "../../actions/creativeAction";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { UPLOAD_CREATIVE_SCREEN_DATA } from "../../constants/localStorageConstants";
import { ShowMediaFile } from "../../components/molecules/ShowMediaFIle";
import { ScreenLogReportPopup } from "../../components/popup/ScreenLogReportPopup";
import SearchInputField from "../../components/molecules/SearchInputField";
import { CampaignMonitoring, SwitchInput } from "../../components/index";
import { campaignTypeTabs } from "../../constants/tabDataConstant";
import { SwitchInputCenter } from "../../components/atoms/SwitchInput";
import {
  CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_CMS,
  CAMPAIGN_STATUS_CHANGED_TO_DELETED_CMS,
  CAMPAIGN_STATUS_CHANGED_TO_PAUSED_CMS,
  SCREEN_CHANGE_AUTO_LOOP_VALUE_CMS,
  SCREEN_CHANGE_DEFAULT_INCLUDED_STATUS_CMS,
  SCREEN_GET_SCREEN_CAMPAIGN_DETAILS_CMS,
  SCREEN_GET_SCREEN_DETAILS_CMS,
  SCREEN_GET_UPLOAD_CREATIVE_DETAILS_CMS,
  SCREEN_PLAY_HOLD_CAMPAIGNS_CMS,
  SCREEN_REDIS_UPDATE_CMS,
  SCREEN_RESTARTED_CMS,
} from "../../constants/userConstants";

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
  const [searchQuery, setSearchQuery] = useState<any>("");
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

  const screenCampaignsDetailsGet = useSelector(
    (state: any) => state.screenCampaignsDetailsGet
  );
  const {
    loading: loadingCampaigns,
    error: errorCampaigns,
    data: campaigns,
  } = screenCampaignsDetailsGet;

  const campaignStatusChange = useSelector(
    (state: any) => state.campaignStatusChange
  );
  const {
    loading: loadingStatusChange,
    error: errorStatusChange,
    success: successStatusChange,
  } = campaignStatusChange;

  const setCampaignsLoopForScreen = useSelector(
    (state: any) => state.setCampaignsLoopForScreen
  );
  const {
    loading: loadingLoopSetting,
    error: errorLoopSetting,
    success: successLoopSetting,
  } = setCampaignsLoopForScreen;

  const screenDataUploadCreativeGet = useSelector(
    (state: any) => state.screenDataUploadCreativeGet
  );
  const {
    loading: loadingCreativeData,
    error: errorCreativeData,
    data: screenDataUploadCreative,
  } = screenDataUploadCreativeGet;

  const changeCampaignCreativeEndDate = useSelector(
    (state: any) => state.changeCampaignCreativeEndDate
  );
  const {
    loading: loadingChange,
    error: errorChange,
    success: successChange,
  } = changeCampaignCreativeEndDate;

  const screenRefresh = useSelector((state: any) => state.screenRefresh);
  const {
    loading: loadingScreenRefresh,
    error: errorScreenRefresh,
    success: successScreenRefresh,
  } = screenRefresh;

  const changeDefaultIncluded = useSelector(
    (state: any) => state.changeDefaultIncluded
  );
  const {
    loading: loadingChangeDefaultIncluded,
    error: errorChangeDefaultIncluded,
    success: successChangeDefaultIncluded,
  } = changeDefaultIncluded;

  const changeAutoLoop = useSelector((state: any) => state.changeAutoLoop);

  const {
    loading: loadingChangeAutoLoop,
    error: errorChangeAutoLoop,
    success: successChangeAutoLoop,
  } = changeAutoLoop;

  const screenDataUpdateRedis = useSelector(
    (state: any) => state.screenDataUpdateRedis
  );
  const {
    loading: loadingScreenDataUpdateRedis,
    error: errorScreenDataUpdateRedis,
    success: successScreenDataUpdateRedis,
  } = screenDataUpdateRedis;

  const playHoldCampaigns = useSelector(
    (state: any) => state.playHoldCampaigns
  )

  const {
    loading: loadPlayHoldCampaigns,
    error: errorPlayHoldCampaigns,
    success: successPlayHoldCampaigns
  } = playHoldCampaigns;

  const screenLogsGet = useSelector((state: any) => state.screenLogsGet);
  const {
    loading: loadingScreenLogs,
    error: errorScreenLogs,
    data: screenLogs,
  } = screenLogsGet;

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
      dispatch({ type: PLAY_HOLD_CAMPAIGNS_RESET })
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

    dispatch(getScreenDetailsAction({
      screenId: screenId,
      event: SCREEN_GET_SCREEN_DETAILS_CMS
    }));
    dispatch(
      getScreenCampaignsDetailsAction({
        screenId: screenId,
        status: campaignTypeTabs?.find((tab: any) => tab.id === currentTab)
          ?.value,
        event: SCREEN_GET_SCREEN_CAMPAIGN_DETAILS_CMS
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

  const getScreenClassName = (screen: any) => {
    if (screen?.screenCode) {
      if (getTimeDifferenceInMin(screen?.lastActive) < 10)
        return "border w-3 h-3 bg-[#348730] rounded-full justify-end";
      else return "border w-3 h-3 bg-yellow-500 rounded-full justify-end";
    } else return "border w-3 h-3 bg-red-500 rounded-full justify-end";
  };

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
        [campaigns?.filter((c: any) => c._id === selectedCampaign)[0]
          ?.campaignCreationId]: campaigns?.filter(
            (c: any) => c._id === selectedCampaign
          )[0].creatives.standardDayTimeCreatives,
      });
      dispatch(
        getScreenDataUploadCreativeAction({
          id: campaigns?.filter((c: any) => c._id === selectedCampaign)[0]
            ?.campaignCreationId,
          event : SCREEN_GET_UPLOAD_CREATIVE_DETAILS_CMS
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
        event: SCREEN_GET_SCREEN_CAMPAIGN_DETAILS_CMS
      })
    );
  };

  const getDurationCount = () => {
    return campaigns?.reduce((total: number, campaign: any) => {
      return (
        total +
        (campaign?.creatives?.creativeDuration || 10) *
        (campaign?.atIndex?.length || 1)
      );
    }, 0);
  };

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
              campaign={
                campaigns?.filter((c: any) => c._id === selectedCampaign)[0]
              }
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
              <div className="w-full bg-white rounded-[4px] flex justify-between py-8 ">
                <div className="flex gap-1">
                  <i
                    className="fi fi-sr-angle-small-left text-[#7C8E9B] px-1 flex items-center"
                    onClick={() => navigate(-1)}
                  ></i>
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
                    <h1 className="text-[20px] font-semibold">
                      {screen?.screenName}
                    </h1>
                    <h2 className="text-[12px]">
                      {screen?.location}, {screen?.city}
                    </h2>
                    <p className="text-[12px]">
                      Last Active: {getTimeDifferenceInMin(screen?.lastActive)}{" "}
                      minutes ago {", "}
                      {convertIntoDateAndTime(screen?.lastActive) ||
                        "Not available"}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="px-4 flex h-auto gap-4">
                    <div
                      title="Refresh Data"
                      className="flex justify-center items-top"
                      onClick={() => {
                        if (confirm(`Do you want to refresh your screen???`)) {
                          dispatch(
                            screenRefreshAction({
                              id: screenId,
                              screenIds: [screenId],
                              event: SCREEN_RESTARTED_CMS,
                            })
                          );
                        }
                      }}
                    >
                      <i className="fi fi-br-refresh text-gray-500"></i>
                    </div>
                    <div
                      title="Update screen playlist database"
                      className="flex justify-center items-top"
                      onClick={() => {
                        if (
                          confirm(
                            `Do you want to update screen playlist database???`
                          )
                        ) {
                          dispatch(
                            screenDataUpdateRedisAction({
                              ids: [screenId],
                              screenIds: [screenId],
                              event: SCREEN_REDIS_UPDATE_CMS,
                            })
                          );
                        }
                      }}
                    >
                      <i className="fi fi-rr-back-up text-gray-500"></i>
                    </div>
                    <div
                      title="View Screen logs"
                      className="flex justify-center items-top"
                      onClick={() => {
                        // if (confirm(``)) {
                        dispatch(
                          getScreenLogsAction({
                            screenId: screenId,
                            start: 0,
                            limit: 240,
                          })
                        );
                        setIsScreenLogReportOpen(true);
                        // }
                      }}
                    >
                      <i className="fi fi-rr-file-medical-alt text-gray-500"></i>
                    </div>
                    <div
                      title="Play Hold Campaigns"
                      className="flex justify-center items-top"
                      onClick={() => {
                        if (
                          confirm(
                            `Do you want to play hold campaigns ?`
                          )
                        ) {
                          dispatch(
                            playHoldCampaignsAction({
                              screenId: screenId,
                              event : SCREEN_PLAY_HOLD_CAMPAIGNS_CMS
                            })
                          );
                        }
                      }}
                    >
                      <i className="fi fi-tr-play-circle"></i>
                    </div>
                  </div>
                  <h1 className="flex  justify-center items-bottom text-[12px] text-gray-500">
                    {screen?.screenCode}
                  </h1>
                  <div
                    className="mt-4"
                    title="Change Default Video Included Status"
                  >
                    <SwitchInputCenter
                      isEnabled={isDefaultIncluded}
                      onToggle={() => {
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
                      onColor="bg-[#348730]"
                      offColor="bg-red-500"
                    />
                  </div>
                </div>
              </div>
              <div className=" my-1 bg-white rounded-[4px]">
                <div className="px-4 pt-4 pb-2 flex justify-between">
                  <div className="flex gap-4 items-center">
                    <h1 className="text-[16px] font-semibold">
                      Campaigns{" "}
                      <span className="text-[14px] text-secondaryText">
                        ({campaigns?.length})
                      </span>
                    </h1>
                    {["1","2"].includes(currentTab) && (
                      <div className="flex gap-2 text-[14px] items-center justify-center">
                        <i className="fi fi-rr-alarm-clock flex items-center justify-center"></i>
                        <h1
                          className={`${getDurationCount() > 180
                            ? `text-[#FF0000]`
                            : `text-[#24990C]`
                            } gap-4 opacity-100 `}
                        >
                          {getDurationCount()} Sec.
                        </h1>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 items-center">
                    {currentTab === "1" && !autoLoopValue && (
                      <PrimaryButton
                        action={handleLoopSettingClick}
                        title="Set Loop"
                        rounded="rounded-full"
                        height="h-8"
                        width="w-24"
                        textSize="text-[12px]"
                        reverse={true}
                        loading={false}
                        loadingText="Saving..."
                      />
                    )}
                    {currentTab === "1" && (
                      <div
                        className="flex items-center pr-4"
                        title="Allow auto loop setting"
                      >
                        <SwitchInputCenter
                          isEnabled={autoLoopValue}
                          onToggle={() => {
                            if (
                              confirm(
                                `Do you want to give permission to give auto loop setting?`
                              )
                            ) {
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
                          }}
                          onColor="bg-[#348730]"
                          offColor="bg-red-500"
                        />
                      </div>
                    )}
                    {campaignIds?.length > 0 && (
                      <div className="flex items-center gap-4">
                        <div
                          className="text-gray-500 hover:text-[#129BFF]"
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want ${campaignIds?.length
                                } campaigns status to ${currentTab === "1" || currentTab === "2"
                                  ? "Pause"
                                  : "Active"
                                }???`
                              )
                            ) {
                              changeCampaignStatusHandler({
                                campaignIds: campaignIds,
                                status:
                                  currentTab === "1" || currentTab === "2"
                                    ? "Pause"
                                    : "Active",
                                event:
                                  currentTab === "1" || currentTab === "2"
                                    ? CAMPAIGN_STATUS_CHANGED_TO_PAUSED_CMS
                                    : CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_CMS,
                              });
                            }
                          }}
                        >
                          {currentTab === "1" || currentTab === "2" ? (
                            <Tooltip title="Pause Campaign">
                              <i className="fi fi-sr-pause-circle"></i>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Active Campaign">
                              <i className="fi fi-sr-play-circle"></i>
                            </Tooltip>
                          )}
                        </div>
                        <div
                          className="text-gray-500 hover:text-[#348730]"
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want ${campaignIds?.length
                                } campaigns status to Deleted`
                              )
                            ) {
                              changeCampaignStatusHandler({
                                campaignIds: campaignIds,
                                status: "Deleted",
                                event: CAMPAIGN_STATUS_CHANGED_TO_DELETED_CMS,
                              });
                            }
                          }}
                        >
                          <Tooltip title="Delete Campaign">
                            <i className="fi fi-sr-trash"></i>
                          </Tooltip>
                        </div>
                        <div
                          className="text-gray-500 hover:text-[#348730]"
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want ${campaignIds?.length
                                } campaigns status to Hold`
                              )
                            ) {
                              changeCampaignStatusHandler({
                                campaignIds: campaignIds,
                                status: "Hold",
                                event: CAMPAIGN_STATUS_CHANGED_TO_DELETED_CMS,
                              });
                            }
                          }}
                        >
                          <Tooltip title="Hold Campaign">
                            <i className="fi fi-rr-megaphone"></i>
                          </Tooltip>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 border-b">
                  {loadingCampaigns ? (
                    <div
                      className={`p-2 animate-pulse bg-[#D7D7D7] rounded h-8 w-full`}
                    ></div>
                  ) : (
                    <TabWithoutIcon
                      currentTab={currentTab}
                      setCurrentTab={handleGetCampaignByStatus}
                      tabData={campaignTypeTabs}
                    />
                  )}
                </div>
                <div className="flex items-center p-4">
                  <SearchInputField
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search by campaign name or brand"
                  />
                </div>
                {loadingCampaigns ? (
                  <div className="">
                    <Loading />
                  </div>
                ) : (
                  <div className="w-full h-[30vh] overflow-y-auto no-scrollbar mb-2">
                    {campaigns &&
                      campaigns
                        ?.filter(
                          (campaign: any) =>
                            campaign?.name
                              .toLowerCase()
                              .includes(searchQuery?.toLowerCase()) ||
                            campaign?.brandName
                              .toLowerCase()
                              .includes(searchQuery?.toLowerCase())
                        )
                        ?.map((campaign: any, index: any) => (
                          <div
                            key={index}
                            className={`px-2`}
                            onClick={() => {
                              setSelectedCampaign(campaign._id);
                              setCurrentCampaign(campaign);
                            }}
                            onDoubleClick={() => {
                              setCampaignIds((prev: any) => {
                                const campaignId = campaign?._id;
                                if (campaignIds.includes(campaignId)) {
                                  return prev.filter(
                                    (id: any) => id !== campaignId
                                  );
                                } else {
                                  return [...prev, campaignId];
                                }
                              });
                            }}
                          >
                            <BrandCampaignScreenDetails
                              campaignIds={campaignIds}
                              brandName={campaign.brandName}
                              campaign={campaign}
                              campaigns={campaigns}
                              showIcons={true}
                              showTimer={currentTab === "7" ? false : true}
                              downloadedMedia={screen?.downloadedMedia}
                              index={index}
                              currentTab={currentTab}
                            />
                          </div>
                        ))}
                  </div>
                )}
              </div>
              <div className="my-1">
                <CampaignMonitoring
                  campaign={currentCampaign}
                  screenId={screenId}
                />
              </div>
            </div>
          {loadingCampaigns ? (
            <div className="">
              <Loading />
            </div>
          ) : campaigns && selectedCampaign ? (
            <div className="col-span-4 bg-white p-4 rounded-[4px] mr-2">
              <div className="border-b-2 pb-10">
                <div className="flex justify-between items-center">
                  <h1 className="text-[16px] font-semibold mt-4">
                    {
                      campaigns?.filter((c: any) => c._id === selectedCampaign)[0]
                        ?.name
                    }
                  </h1>
                  <div className="flex gap-1">
                    <div
                      className="text-gray-500 hover:text-[#348730]"
                      onClick={() => {
                        if (
                          confirm(`Are you sure you want to edit the campaign???`)
                        ) {
                          saveDataOnLocalStorage(UPLOAD_CREATIVE_SCREEN_DATA, {
                            [campaigns?.filter(
                              (c: any) => c._id === selectedCampaign
                            )[0]?.campaignCreationId]: campaigns?.filter(
                              (c: any) => c._id === selectedCampaign
                            )[0].creatives.standardDayTimeCreatives,
                          });
                          dispatch(
                            getScreenDataUploadCreativeAction({
                              id: campaigns?.filter(
                                (c: any) => c._id === selectedCampaign
                              )[0]?.campaignCreationId,
                              event : SCREEN_GET_UPLOAD_CREATIVE_DETAILS_CMS
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
                          if (
                            confirm(
                              `Are you sure you want delete the campaign???`
                            )
                          ) {
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
                            `/campaigns-details/${campaigns?.filter(
                              (c: any) => c._id === selectedCampaign
                            )[0]?.campaignCreationId
                            }`
                          )
                        }
                      >
                        <i className="fi fi-sr-eye"></i>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h1 className="text-[14px] mt-1">
                    {
                      campaigns?.filter((c: any) => c._id === selectedCampaign)[0]
                        ?.brandName
                    }
                  </h1>
                  <h1 className="text-[12px] mt-1">
                    {getCampaignEndingStatus(
                      campaigns?.filter((c: any) => c._id === selectedCampaign)[0]
                        ?.endDate
                    )}
                  </h1>
                </div>
              </div>
              <div className="bg-white h-[73vh] overflow-y-auto no-scrollbar mt-2">
                <h1 className="text-[16px] font-semibold">Creatives</h1>
                {campaigns?.filter((c: any) => c._id === selectedCampaign)[0]
                  ?.creatives?.standardDayTimeCreatives?.length === 0 &&
                  campaigns?.filter((c: any) => c._id === selectedCampaign)[0]
                    ?.creatives?.standardNightTimeCreatives?.length === 0 &&
                  campaigns?.filter((c: any) => c._id === selectedCampaign)[0]
                    ?.creatives?.triggerCreatives?.length === 0 && (
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
                <div className="border-b py-1">
                  <h1 className="text-[12px] mt-1 font-bold">Day Creatives</h1>

                  {campaigns
                    ?.filter((c: any) => c._id === selectedCampaign)[0]
                    ?.creatives.standardDayTimeCreatives?.map(
                      (creative: any, j: any) => (
                        <div key={j} className="p-1">
                          <ShowMediaFile
                            url={creative?.url}
                            mediaType={
                              creative.type != null
                                ? creative?.type.split("/")[0]
                                : creative.fileType
                            }
                            key={j}
                            height="h-full"
                            width="w-full"
                          />
                          <h1 className="text-[14px] truncate">
                            {
                              creative?.url?.split("_")[
                              creative?.url?.split("_")?.length - 1
                              ]
                            }
                          </h1>
                          <p className="text-[12px]">
                            {creative?.type?.split("/")[0] === "image" &&
                              campaigns?.filter(
                                (c: any) => c._id === selectedCampaign
                              )[0]?.creatives.creativeDuration}{" "}
                            {creative?.type?.split("/")[0] === "image" &&
                              "seconds, "}{" "}
                            {creative?.type}
                          </p>
                        </div>
                      )
                    )}
                </div>
                <div className="border-b py-1">
                  <h1 className="text-[12px] mt-1 font-bold">Night Creatives</h1>
                  {campaigns
                    ?.filter((c: any) => c._id === selectedCampaign)[0]
                    ?.creatives.standardNightTimeCreatives?.map(
                      (creative: any, j: any) => (
                        <div key={j} className="p-1">
                          <ShowMediaFile
                            url={creative?.url}
                            mediaType={
                              creative.type != null
                                ? creative?.type.split("/")[0]
                                : creative.fileType
                            }
                            key={j}
                            height="h-full"
                            width="w-full"
                          />
                          <h1 className="text-[14px] truncate">
                            {
                              creative?.url?.split("_")[
                              creative?.url?.split("_")?.length - 1
                              ]
                            }
                          </h1>
                          <p className="text-[12px]">
                            {creative?.type?.split("/")[0] === "image" &&
                              campaigns?.filter(
                                (c: any) => c._id === selectedCampaign
                              )[0]?.creatives.creativeDuration}{" "}
                            {creative?.type?.split("/")[0] === "image" &&
                              "seconds, "}{" "}
                            {creative?.type}
                          </p>
                        </div>
                      )
                    )}
                </div>
                <div className="border-b py-1">
                  <h1 className="text-[12px] mt-1 font-bold">
                    Trigger Creatives
                  </h1>
                  {campaigns
                    ?.filter((c: any) => c._id === selectedCampaign)[0]
                    ?.creatives.triggerCreatives?.map((creative: any, j: any) => (
                      <div key={j} className="p-1">
                        <ShowMediaFile
                          url={creative?.url}
                          mediaType={
                            creative.type != null
                              ? creative?.type.split("/")[0]
                              : creative.fileType
                          }
                          key={j}
                          height="h-full"
                          width="w-full"
                        />
                        <h1 className="text-[14px] truncate">
                          {
                            creative?.url?.split("_")[
                            creative?.url?.split("_")?.length - 1
                            ]
                          }
                        </h1>
                        <p className="text-[12px]">
                          {creative?.type?.split("/")[0] === "image" &&
                            campaigns?.filter(
                              (c: any) => c._id === selectedCampaign
                            )[0]?.creatives.creativeDuration}{" "}
                          {creative?.type?.split("/")[0] === "image" &&
                            "seconds, "}{" "}
                          {creative?.type}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        )}
    </div>
  );
};
