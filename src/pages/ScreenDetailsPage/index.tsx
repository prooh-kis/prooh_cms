import { message } from "antd";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  changeDefaultIncludedAction,
  getScreenCampaignsDetailsAction,
  getScreenDetailsAction,
  getScreenLogsAction,
  screenDataUpdateRedisAction,
  screenRefreshAction,
} from "../../actions/screenAction";
import { Loading } from "../../components/Loading";
import {
  getNumberOfDaysBetweenTwoDates,
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
  EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET,
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

export const ScreenDetailsPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const screenId =
    pathname?.split("/")?.length > 2
      ? pathname?.split("/")?.splice(2)[0]
      : null;

  const [currentTab, setCurrentTab] = useState<any>("1");
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [currentCampaign, setCurrentCampaign] = useState<any>(null);
  const [openLoopSetting, setOpenLoopSetting] = useState<any>(false);
  const [isDefaultIncluded, setIsDefaultIncluded] = useState<boolean>(true);

  const [campaignIds, setCampaignIds] = useState<any>([]);

  const [openCreativeEndDateChangePopup, setOpenCreativeEndDateChangePopup] =
    useState<any>(false);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [screenCreativeUpload, setScreenCreativeUpload] = useState<any>(null);

  const [isScreenLogReportOpen, setIsScreenLogReportOpen] =
    useState<any>(false);

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

  const screenDataUpdateRedis = useSelector(
    (state: any) => state.screenDataUpdateRedis
  );
  const {
    loading: loadingScreenDataUpdateRedis,
    error: errorScreenDataUpdateRedis,
    success: successScreenDataUpdateRedis,
  } = screenDataUpdateRedis;

  const screenLogsGet = useSelector((state: any) => state.screenLogsGet);
  const {
    loading: loadingScreenLogs,
    error: errorScreenLogs,
    data: screenLogs,
  } = screenLogsGet;

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!");
    }

    if (successScreenDataUpdateRedis) {
      message.success("Screen DB updated successfully...");
    }

    if (successChangeDefaultIncluded) {
      message.success(
        "Default Included Value updated Successfully. Click On Update Redis Button to reflect changes..."
      );
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

    dispatch(getScreenDetailsAction({ screenId: screenId }));
    dispatch(
      getScreenCampaignsDetailsAction({
        screenId: screenId,
        status: "Active",
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
    successChangeDefaultIncluded,
  ]);

  useEffect(() => {
    if (screenDataUploadCreative) {
      setScreenCreativeUpload(screenDataUploadCreative);
    }

    if (successGetScreenDetails) {
      setIsDefaultIncluded(screen.defaultIncluded);
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

  const changeCampaignStatusHandler = ({ campaignIds, status }: any) => {
    if (confirm(`${campaignIds?.length} campaigns are being ${status}`)) {
      dispatch(
        changeCampaignStatusAction({
          campaignIds: campaignIds,
          status: status,
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
      })
    );
  };

  return (
    <div className="">
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
            screenData={screenCreativeUpload}
          />
        )}
        {openLoopSetting && loading ? (
          <Loading />
        ) : (
          <LoopSettingPopup
            screenId={screenId}
            openLoopSetting={openLoopSetting}
            campaigns={campaigns}
            onClose={setOpenLoopSetting}
          />
        )}
        {loading ? (
          <div className="">
            <Loading />
          </div>
        ) : (
          <div className="col-span-8">
            <div className="w-full bg-white flex justify-between py-8 ">
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
                  <h1 className="text-[14px] font-semibold">
                    {screen?.screenName}
                  </h1>
                  <h2 className="text-[12px]">
                    {screen?.location}, {screen?.city}
                  </h2>
                  <p className="text-[12px]">
                    Last Active {getTimeDifferenceInMin(screen?.lastActive)}{" "}
                    minutes ago
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
                        dispatch(screenRefreshAction({ id: screenId }));
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
                          screenDataUpdateRedisAction({ ids: [screenId] })
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
                </div>
                <h1 className="flex  justify-center items-bottom text-[12px] text-gray-500">
                  {screen?.screenCode}
                </h1>
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
            <div className=" my-1 bg-white">
              <div className="px-4 pt-4 pb-2 flex justify-between">
                <h1 className="text-[16px] font-semibold">Campaigns</h1>
                <div className="flex gap-4 items-center">
                  <PrimaryButton
                    action={handleLoopSettingClick}
                    title="Set Loop"
                    rounded="rounded-full"
                    height="h-8"
                    width="w-32"
                    textSize="text-[12px]"
                    reverse={true}
                    loading={false}
                    loadingText="Saving..."
                  />
                  {campaignIds?.length > 0 && (
                    <div className="flex items-center gap-4">
                      <div
                        className="text-gray-500 hover:text-[#129BFF]"
                        onClick={() => {
                          if (
                            confirm(
                              `Are you sure you want ${
                                campaignIds?.length
                              } campaigns status to ${
                                currentTab === "1" ? "Pause" : "Active"
                              }???`
                            )
                          ) {
                            changeCampaignStatusHandler({
                              campaignIds: campaignIds,
                              status: currentTab === "1" ? "Pause" : "Active",
                            });
                          }
                        }}
                      >
                        {currentTab === "1" ? (
                          <i className="fi fi-sr-pause-circle"></i>
                        ) : (
                          <i className="fi fi-sr-play-circle"></i>
                        )}
                      </div>
                      <div
                        className="text-gray-500 hover:text-[#348730]"
                        onClick={() => {
                          if (
                            confirm(
                              `Are you sure you want ${
                                campaignIds?.length
                              } campaigns status to ${
                                currentTab === "1" ? "Pause" : "Active"
                              }???`
                            )
                          ) {
                            changeCampaignStatusHandler({
                              campaignIds: campaignIds,
                              status: "Deleted",
                            });
                          }
                        }}
                      >
                        <i className="fi fi-sr-trash"></i>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between px-4">
                <TabWithoutIcon
                  currentTab={currentTab}
                  setCurrentTab={handleGetCampaignByStatus}
                  tabData={campaignTypeTabs}
                />

                <h1 className="text-[10px] truncate">
                  {campaigns?.length} campaigns
                </h1>
              </div>
              <div className="flex items-center p-4">
                <SearchInputField
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by campaign name or brand"
                />
              </div>
              {loadingCampaigns ? (
                <Loading />
              ) : (
                <div className="w-full h-[30vh] overflow-scroll no-scrollbar mb-2">
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
        )}
        {loadingCampaigns ? (
          <Loading />
        ) : campaigns && selectedCampaign ? (
          <div className="col-span-4  bg-white p-4 ">
            <div className="">
              <div className="flex justify-between items-center">
                <h1 className="text-[16px] font-semibold">
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
                          })
                        );
                        setOpenCreativeEndDateChangePopup(true);
                      }
                    }}
                  >
                    <i className="fi fi-sr-file-edit"></i>
                  </div>
                  <div
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => {
                      if (
                        confirm(`Are you sure you want delete the campaign???`)
                      ) {
                        changeCampaignStatusHandler({
                          campaignIds: campaignIds,
                          status: "Deleted",
                        });
                      }
                    }}
                  >
                    <i className="fi fi-sr-trash"></i>
                  </div>
                  <div
                    className="text-gray-500 hover:text-[#348730]"
                    onClick={() =>
                      navigate(
                        `/campaigns-details/${
                          campaigns?.filter(
                            (c: any) => c._id === selectedCampaign
                          )[0]?.campaignCreationId
                        }`
                      )
                    }
                  >
                    <i className="fi fi-sr-eye"></i>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-[14px]">
                  {
                    campaigns?.filter((c: any) => c._id === selectedCampaign)[0]
                      ?.brandName
                  }
                </h1>
                <h1 className="text-[12px]">
                  Ends in:{" "}
                  {getNumberOfDaysBetweenTwoDates(
                    new Date(),
                    campaigns?.filter((c: any) => c._id === selectedCampaign)[0]
                      ?.endDate
                  ) < 0
                    ? "Already Ended"
                    : getNumberOfDaysBetweenTwoDates(
                        new Date(),
                        campaigns?.filter(
                          (c: any) => c._id === selectedCampaign
                        )[0]?.endDate
                      ) === 0
                    ? "Ending Today"
                    : `${getNumberOfDaysBetweenTwoDates(
                        new Date(),
                        campaigns?.filter(
                          (c: any) => c._id === selectedCampaign
                        )[0]?.endDate
                      )} days`}{" "}
                </h1>
              </div>
            </div>
            <div className="bg-white h-[80vh] overflow-scroll no-scrollbar mt-2">
              <h1 className="text-[16px] font-semibold">Creatives</h1>
              {campaigns?.filter((c: any) => c._id === selectedCampaign)[0]
                ?.creatives?.standardDayTimeCreatives?.length === 0 && (
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
              {campaigns
                ?.filter((c: any) => c._id === selectedCampaign)[0]
                ?.creatives.standardDayTimeCreatives?.map(
                  (creative: any, j: any) => (
                    <div key={j} className="p-1">
                      <ShowMediaFile
                        url={creative?.url}
                        mediaType={creative?.type.split("/")[0]}
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
          </div>
        ) : null}
      </div>
    </div>
  );
};
