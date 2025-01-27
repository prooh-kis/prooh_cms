import { message, Skeleton, Tooltip } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";
import {
  convertDataTimeToLocale,
  getCampaignEndingStatus,
} from "../../utils/dateAndTimeUtils";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import {
  campaignLogsByCampaignIdAction,
  changeCampaignStatusAction,
  editAllSubCampaignsAction,
  getAllCampaignsDetailsAction,
  getCampaignCreatedScreensDetailsAction,
  getCampaignDetailsAction,
} from "../../actions/campaignAction";
import { generateColorFromAlphabet } from "../../utils/colorUtils";
import { ScreenListMonitoringView } from "../../components/molecules/ScreenListMonitoringView";
import { confirmData } from "../../utils/champaignStatusUtils";
import {
  CAMPAIGN_STATUS_ACTIVE,
  CAMPAIGN_STATUS_DELETED,
  CAMPAIGN_STATUS_PAUSE,
  CAMPAIGN_STATUS_CHANGE_RESET,
  EDIT_ALL_SUB_CAMPAIGNS_RESET,
} from "../../constants/campaignConstants";
import { getCreativesMediaAction } from "../../actions/creativeAction";
import { EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET } from "../../constants/screenConstants";
import {
  EditCampaignCreationAndItsSubCampaigns,
  EditCreativeEndDatePopup,
  CampaignMonitoring,
  SearchInputField,
  CampaignLogsPopup,
  NoDataView,
  AllCampaignLogsPopup,
  PrimaryButton,
} from "../../components";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import {
  CAMPAIGN_CREATION_STATUS,
  FULL_CAMPAIGN_PLAN,
} from "../../constants/localStorageConstants";
import { ShowMediaFile } from "../../components/molecules/ShowMediaFIle";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { creativeTypeTab } from "../../constants/tabDataConstant";
import { MY_CREATIVES } from "../../routes/routes";

export const CampaignDetailsPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState<string>(
    "standardDayTimeCreatives"
  );
  const campaignId =
    pathname?.split("/")?.length > 2
      ? pathname?.split("/")?.splice(2)[0]
      : null;
  const [campaign, setCampaign] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [dropdownVisible, setDropdownVisible] = useState<any>({});

  const [openAllCampaignLogsPopup, setOpenAllCampaignLogsPopup] =
    useState<any>(false);

  const [openCreativeEndDateChangePopup, setOpenCreativeEndDateChangePopup] =
    useState<any>(false);
  const [openCampaignLogPopup, setOpenCampaignLogPopup] = useState<any>(false);
  const [
    openCreateCampaignEndDateChangePopup,
    setOpenCreateCampaignEndDateChangePopup,
  ] = useState<any>(false);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [screenCreativeUpload, setScreenCreativeUpload] = useState<any>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const campaignDetailsGet = useSelector(
    (state: any) => state.campaignDetailsGet
  );
  const { loading, error, data: campaignCreated } = campaignDetailsGet;

  const campaignCreatedScreensDetailsGet = useSelector(
    (state: any) => state.campaignCreatedScreensDetailsGet
  );
  const {
    loading: loadingScreens,
    error: errorScreens,
    data: screens,
  } = campaignCreatedScreensDetailsGet;

  const campaignStatusChange = useSelector(
    (state: any) => state.campaignStatusChange
  );
  const {
    loading: loadingStatusChange,
    error: errorStatusChange,
    success: successStatusChange,
  } = campaignStatusChange;

  const screenDataUploadCreativeGet = useSelector(
    (state: any) => state.screenDataUploadCreativeGet
  );
  const {
    loading: loadingCreativeData,
    error: errorCreativeData,
    data: screenDataUploadCreative,
  } = screenDataUploadCreativeGet;

  const editAllSubCampaigns = useSelector(
    (state: any) => state.editAllSubCampaigns
  );
  const {
    loading: loadingEditAllSubCampaigns,
    error: errorEditAllSubCampaigns,
    data: successEditAllSubCampaigns,
  } = editAllSubCampaigns;

  const campaignLogsByCampaignId = useSelector(
    (state: any) => state.campaignLogsByCampaignId
  );
  const {
    loading: loadingCampaignLogsByCampaignId,
    error: errorCampaignLogsByCampaignId,
    data: successCampaignLogsByCampaignId,
  } = campaignLogsByCampaignId;

  const changeCampaignCreativeEndDate = useSelector(
    (state: any) => state.changeCampaignCreativeEndDate
  );
  const {
    loading: loadingChange,
    error: errorChange,
    success: successChange,
  } = changeCampaignCreativeEndDate;

  const handleEditAllSubCampaigns = (
    campaignCreationId: string,
    endDate: any
  ) => {
    dispatch(editAllSubCampaignsAction({ campaignCreationId, endDate }));
  };

  const campaigns =
    screens?.length > 0
      ? campaignCreated?.campaigns
          ?.filter((camp: any) =>
            campaignCreated?.screens?.includes(camp.screenId)
          )
          ?.filter((camp: any) =>
            camp?.screenName
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase())
          )
      : [];

  useEffect(() => {
    if (successEditAllSubCampaigns) {
      message.success("Campaign updated successfully!");
      dispatch({
        type: EDIT_ALL_SUB_CAMPAIGNS_RESET,
      });
      setOpenCreateCampaignEndDateChangePopup(false);
      dispatch(getCampaignDetailsAction({ campaignId: campaignId }));
    }
    if (errorEditAllSubCampaigns) {
      message.error(errorEditAllSubCampaigns);
      dispatch({
        type: EDIT_ALL_SUB_CAMPAIGNS_RESET,
      });
      setOpenCreateCampaignEndDateChangePopup(false);
    }
  }, [successEditAllSubCampaigns, dispatch, errorEditAllSubCampaigns]);

  useEffect(() => {
    if (campaignCreated) {
      dispatch(
        getCampaignCreatedScreensDetailsAction({
          screenIds: campaignCreated.screens,
        })
      );
    }
    if (screenDataUploadCreative) {
      setScreenCreativeUpload(screenDataUploadCreative);
    }
  }, [campaignCreated, dispatch, screenDataUploadCreative]);

  useEffect(() => {
    if (successStatusChange) {
      message.success("Campaign Status Changed");
      dispatch({
        type: CAMPAIGN_STATUS_CHANGE_RESET,
      });
      dispatch(getCampaignDetailsAction({ campaignId: campaignId }));
    }
    if (errorStatusChange) {
      message.error(errorStatusChange);
      dispatch({
        type: CAMPAIGN_STATUS_CHANGE_RESET,
      });
    }
    if (successChange) {
      message.success("Campaign Creative/End Date Changed");
      dispatch({
        type: EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET,
      });
      window.location.reload();
    }
  }, [dispatch, successStatusChange, errorStatusChange, successChange]);

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!");
    }
    dispatch(getCampaignDetailsAction({ campaignId: campaignId }));
    dispatch(getCreativesMediaAction({ userId: userInfo?._id }));
  }, [campaignId, dispatch, userInfo]);

  const toggleDropdown = (screenId: string) => {
    setDropdownVisible((prev: any) => ({
      ...prev,
      [screenId]: !prev[screenId],
    }));
  };

  const handelSelectScreen = (campaignId: string) => {
    const data = campaignCreated?.campaigns?.find(
      (data: any) => data?._id == campaignId
    );
    setCampaign(data);
  };

  const getCampaignIdsToChangeStatus = () => {
    return campaignCreated?.campaigns?.map((campaign: any) => campaign._id);
  };

  const handleChangeStatusAll = (status: string) => {
    if (confirm(confirmData[status])) {
      let data = getCampaignIdsToChangeStatus();
      if (data?.length > 0) {
        dispatch(
          changeCampaignStatusAction({
            campaignIds: data,
            status: status,
          })
        );
      } else {
        message.error("No Campaign found!, to change status");
      }
    }
  };

  const handleChangeCampaignStatus = (status: string, campaignId: string) => {
    if (confirm(confirmData[status])) {
      let data = campaignCreated?.campaigns
        ?.filter((campaign: any) => campaign._id == campaignId)
        ?.map((campaign: any) => campaign._id);
      if (data?.length > 0) {
        dispatch(
          changeCampaignStatusAction({
            campaignIds: data,
            status: status,
          })
        );
      } else {
        message.error("No Campaign found!, to change status");
      }
    }
  };

  const handleOpenCloseCampaignLogPopup = useCallback(() => {
    setOpenCampaignLogPopup((pre: boolean) => !pre);
  }, [openCampaignLogPopup]);

  const handleShowLogReport = (campaignId: string) => {
    if (campaignId) {
      dispatch(campaignLogsByCampaignIdAction(campaignId));
      handleOpenCloseCampaignLogPopup();
    } else {
      message.error("No creative added!");
    }
  };
  // ?.filter((camp: any) => camp?.screenName?.includes(searchQuery))

  const handleToggleOpenAllCampaignLogsPopup = useCallback(() => {
    setOpenAllCampaignLogsPopup((pre: boolean) => !pre);
  }, [openAllCampaignLogsPopup]);

  return (
    <div className="w-full grid grid-cols-12 gap-1">
      {openCreativeEndDateChangePopup && (
        <EditCreativeEndDatePopup
          onClose={() => setOpenCreativeEndDateChangePopup(false)}
          selectedScreens={screens}
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
          campaign={campaign}
          screenData={screenCreativeUpload}
        />
      )}
      {openCreateCampaignEndDateChangePopup && (
        <EditCampaignCreationAndItsSubCampaigns
          onClose={() => setOpenCreateCampaignEndDateChangePopup(false)}
          openShowMedia={openCreateCampaignEndDateChangePopup}
          campaignCreation={campaignCreated}
          isLoading={loadingEditAllSubCampaigns}
          handleNext={handleEditAllSubCampaigns}
        />
      )}
      {openAllCampaignLogsPopup && (
        <AllCampaignLogsPopup
          campaigns={campaignCreated?.campaigns}
          screens={screens}
          loadingScreens={loadingScreens}
          open={openAllCampaignLogsPopup}
          onClose={handleToggleOpenAllCampaignLogsPopup}
          campaignCreated={campaignCreated}
        />
      )}
      {openCampaignLogPopup && (
        <CampaignLogsPopup
          logs={successCampaignLogsByCampaignId}
          loading={loadingCampaignLogsByCampaignId}
          open={openCampaignLogPopup}
          onClose={handleOpenCloseCampaignLogPopup}
        />
      )}

      {loading ? (
        <div className="col-span-8">
          <Loading />
        </div>
      ) : (
        <div className="col-span-8">
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
                      ? `rounded  bg-[${generateColorFromAlphabet(
                          campaignCreated?.brandName.split("")[0],
                          0
                        )}]`
                      : `rounded bg-gray-100`
                  }
                >
                  <h1 className="text-[40px] text-gray-400 font-bold bg-gray-100 px-4">
                    {campaignCreated?.brandName.split("")[0]}
                  </h1>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-[18px] font-semibold">
                    {campaignCreated?.campaignName || "Campaign Name"}
                  </h1>
                  <h1 className="text-[12px]">
                    {campaignCreated?.brandName}, {campaignCreated?.duration}{" "}
                    days
                  </h1>
                </div>
              </div>
              {userInfo?.userRole === "primary" && (
                <div className="flex flex-col px-4 justify-center">
                  {loadingStatusChange ? (
                    <Skeleton active paragraph={{ rows: 1 }} />
                  ) : (
                    <div className=" flex h-auto gap-4">
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
                            saveDataOnLocalStorage(
                              CAMPAIGN_CREATION_STATUS,
                              "edit"
                            );
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
                            handleChangeStatusAll(CAMPAIGN_STATUS_PAUSE)
                          }
                        ></i>
                      </Tooltip>
                      <Tooltip title="Activate for all screens">
                        <i
                          className="fi fi-sr-play-circle text-gray-500"
                          title="Active All"
                          onClick={() =>
                            handleChangeStatusAll(CAMPAIGN_STATUS_ACTIVE)
                          }
                        ></i>
                      </Tooltip>
                      <Tooltip title="Delete for all screens">
                        <i
                          className="fi fi-sr-trash text-gray-500"
                          title="Delete All"
                          onClick={() =>
                            handleChangeStatusAll(CAMPAIGN_STATUS_DELETED)
                          }
                        ></i>
                      </Tooltip>
                    </div>
                  )}
                  <h1
                    className={`text-[12px] ${
                      getCampaignEndingStatus(
                        campaignCreated?.endDate
                      ).includes("Already")
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
                  {convertDataTimeToLocale(campaignCreated?.startDate)}
                </h1>
                <h1 className="text-[12px]">
                  {convertDataTimeToLocale(campaignCreated?.endDate)}
                </h1>
              </div>
            </div>
          </div>
          <div className="border rounded my-1 p-4 bg-white">
            <div className="flex justify-between">
              <h1 className="text-[#092A41] text-[16px] font-semibold mt-2 px-1">
                Campaign Creatives
              </h1>
              <PrimaryButton
                action={() => navigate(MY_CREATIVES)}
                title="+ Creatives"
                rounded="rounded-full"
                height="h-10"
                width="w-28"
                textSize="text-[12px] font-semibold"
                reverse={true}
                loading={false}
                loadingText="Saving..."
              />
            </div>
            <div className="border-b">
              <TabWithoutIcon
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                tabData={creativeTypeTab}
              />
            </div>
            <div className="h-[40vh] overflow-y-auto no-scrollbar pr-2">
              {campaignCreated?.creatives?.map((c: any, i: any) => (
                <div key={i}>
                  {c?.[currentTab]?.length > 0 && (
                    <div className="py-4">
                      <div className="grid grid-cols-3 gap-1 ">
                        {c?.[currentTab]?.map((cs: any, j: any) => (
                          <div className="col-span-1 " key={j}>
                            <ShowMediaFile
                              url={cs.url}
                              mediaType={cs.type.split("/")[0]}
                            />

                            <Tooltip
                              title={`${
                                cs.url?.split("_")[
                                  cs.url?.split("_")?.length - 1
                                ]
                              }`}
                            >
                              <h1 className="text-[12px] text-gray-500 truncate">
                                {
                                  cs.url?.split("_")[
                                    cs.url?.split("_")?.length - 1
                                  ]
                                }
                              </h1>
                            </Tooltip>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="border rounded my-1">
            <CampaignMonitoring
              campaign={campaign}
              screenId={campaign?.screenId}
            />
          </div>
        </div>
      )}
      {loading ? (
        <div className="col-span-4">
          <Loading />
        </div>
      ) : (
        <div className="col-span-4 border rounded bg-white p-4">
          <h1 className="text-[16px] font-semibold p-1 py-2">
            Screens Play{" "}
            <span className="text-[14px]">
              ({campaignCreated?.screens?.length || 0})
            </span>
          </h1>

          <div className="my-2 ">
            <SearchInputField
              placeholder="Search screens by name"
              height="h-8"
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          {loadingScreens ? (
            <Loading />
          ) : (
            <div className="h-[79vh] overflow-y-auto no-scrollbar py-2  flex flex-col gap-4">
              {campaigns?.length === 0 && <NoDataView />}
              {campaigns?.map((camp: any, k: any) => (
                <div
                  key={k}
                  className="p-0 m-0"
                  onClick={() => handelSelectScreen(camp?._id)}
                  onDoubleClick={() =>
                    navigate(`/screens-details/${camp?.screenId}`)
                  }
                >
                  <ScreenListMonitoringView
                    handleChangeCampaignStatus={handleChangeCampaignStatus}
                    campaignCreated={campaignCreated}
                    setOpenCreativeEndDateChangePopup={
                      setOpenCreativeEndDateChangePopup
                    }
                    screen={screens?.find(
                      (screen: any) => screen?.screenId == camp?.screenId
                    )}
                    campaign={camp}
                    noImages={false}
                    showOption={true}
                    handleGetCampaignLog={handleShowLogReport}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
