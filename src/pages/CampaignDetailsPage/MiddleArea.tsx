import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { convertDataTimeToLocale } from "../../utils/dateAndTimeUtils";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import {
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
} from "../../components";

export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const campaignId =
    pathname?.split("/")?.length > 2
      ? pathname?.split("/")?.splice(2)[0]
      : null;

  const [campaign, setCampaign] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [dropdownVisible, setDropdownVisible] = useState<any>({});

  const [openCreativeEndDateChangePopup, setOpenCreativeEndDateChangePopup] =
    useState<any>(false);
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

  const handelSelectScreen = (screenId: string) => {
    const data = campaignCreated?.campaigns?.find(
      (data: any) => data?.screenId == screenId
    );
    console.log(data);
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

  const handleChangeCampaignStatus = (status: string, screenId: string) => {
    if (confirm(confirmData[status])) {
      let data = campaignCreated?.campaigns
        ?.filter((campaign: any) => campaign.screenId == screenId)
        .map((campaign: any) => campaign._id);
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

  return (
    <div className="mt-6 w-full h-full py-2">
      <div className="w-full grid grid-cols-12 gap-2">
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

        {loading ? (
          <div className="col-span-8">
            <Loading />
          </div>
        ) : (
          <div className="col-span-8">
            <div className="w-full border rounded py-2 mt-2">
              <div className="flex justify-between pb-2 mx-1 border-b">
                <div className="flex">
                  <i
                    className="fi fi-sr-angle-small-left text-[#7C8E9B] px-1 flex items-center"
                    onClick={() => navigate(-1)}
                  ></i>
                  <div className="flex justify-center items-center">
                    <div
                      className={
                        campaignCreated
                          ? `rounded px-6 bg-[${generateColorFromAlphabet(
                              campaignCreated?.brandName.split("")[0],
                              0
                            )}]`
                          : `rounded px-6 bg-gray-100`
                      }
                    >
                      <h1 className="text-[40px] text-gray-400 font-black">
                        {campaignCreated?.brandName.split("")[0]}
                      </h1>
                    </div>
                  </div>
                  <div className="px-2 pb-1 flex flex-col justify-between">
                    <h1 className="text-[14px] font-semibold">
                      {campaignCreated?.campaignName}
                    </h1>
                    <h2 className="text-[12px]">
                      {campaignCreated?.brandName}, {campaignCreated?.duration}{" "}
                      days
                    </h2>
                  </div>
                </div>
                {!loadingStatusChange ? (
                  // && getNumberOfDaysBetweenTwoDates(new Date().toISOString(), campaignCreated?.endDate) >= 0
                  <div className="px-4 flex h-auto gap-4">
                    <i
                      className="fi fi-sr-file-edit text-gray-500"
                      title="Edit All"
                      onClick={() =>
                        setOpenCreateCampaignEndDateChangePopup(
                          !openCreateCampaignEndDateChangePopup
                        )
                      }
                    ></i>
                    <i
                      className="fi fi-ss-pause-circle text-gray-500"
                      title="Pause All"
                      onClick={() =>
                        handleChangeStatusAll(CAMPAIGN_STATUS_PAUSE)
                      }
                    ></i>
                    <i
                      className="fi fi-sr-play-circle text-gray-500"
                      title="Active All"
                      onClick={() =>
                        handleChangeStatusAll(CAMPAIGN_STATUS_ACTIVE)
                      }
                    ></i>
                    <i
                      className="fi fi-sr-trash text-gray-500"
                      title="Delete All"
                      onClick={() =>
                        handleChangeStatusAll(CAMPAIGN_STATUS_DELETED)
                      }
                    ></i>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-[12px] text-red-400">
                      Campaign already ended
                    </h1>
                  </div>
                )}
              </div>
              <div className="px-4 p-2">
                <div className="grid grid-cols-8 gap-4">
                  <h1 className="col-span-2 text-[12px]">Start Date</h1>
                  <h1 className="col-span-3 text-[12px]">
                    {convertDataTimeToLocale(campaignCreated?.startDate)}
                  </h1>
                </div>
                <div className="grid grid-cols-8 gap-4">
                  <h1 className="col-span-2 text-[12px]">End Date</h1>
                  <h1 className="col-span-3 text-[12px]">
                    {convertDataTimeToLocale(campaignCreated?.endDate)}
                  </h1>
                </div>
              </div>
            </div>
            <div className="border rounded my-2">
              <div className="px-4 pt-4 pb-2 flex justify-between">
                <h1 className="text-[16px] font-semibold">
                  Campaign Creatives
                </h1>
              </div>
              {campaignCreated?.creatives?.map((c: any, i: any) => (
                <div key={i}>
                  {c?.standardDayTimeCreatives?.length > 0 && (
                    <div className="p-2">
                      <h1 className="text-[12px] font-semibold p-2">
                        Standard Day Creatives
                      </h1>
                      <div className="grid grid-cols-3 gap-2">
                        {c?.standardDayTimeCreatives?.map((cs: any, j: any) => (
                          <div className="col-span-1 p-2" key={j}>
                            {cs.type.split("/")[0] === "video" ? (
                              <video className="rounded" src={cs.url} />
                            ) : cs.type.split("/")[0] === "image" ? (
                              <img
                                className="rounded"
                                src={cs.url}
                                alt={cs.type}
                              />
                            ) : (
                              <iframe className="rounded" src={cs.url} />
                            )}
                            <h1></h1>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {c?.standardNightTimeCreatives?.length > 0 && (
                    <div className="p-2">
                      <h1 className="text-[12px] font-semibold p-2">
                        Standard Night Creatives
                      </h1>
                      <div className="grid grid-cols-3 gap-2">
                        {c?.standardNightTimeCreatives?.map(
                          (cs: any, j: any) => (
                            <div className="col-span-1 p-2" key={j}>
                              {cs.type === "video" ? (
                                <video className="rounded" src={cs.url} />
                              ) : cs.type === "image" ? (
                                <img
                                  className="rounded"
                                  src={cs.url}
                                  alt={cs.type}
                                />
                              ) : (
                                <iframe className="rounded" src={cs.url} />
                              )}
                              <h1></h1>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  {c?.triggerCreatives?.length > 0 && (
                    <div className="p-2">
                      <h1 className="text-[12px] font-semibold p-2">
                        Trigger Creatives
                      </h1>
                      <div className="grid grid-cols-3 gap-2">
                        {c?.triggerCreatives?.map((cs: any, j: any) => (
                          <div className="col-span-1 p-2" key={j}>
                            {cs.type === "video" ? (
                              <video className="rounded" src={cs.url} />
                            ) : cs.type === "image" ? (
                              <img
                                className="rounded"
                                src={cs.url}
                                alt={cs.type}
                              />
                            ) : (
                              <iframe className="rounded" src={cs.url} />
                            )}
                            <h1></h1>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="border rounded my-2">
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
          <div className="col-span-4 border rounded my-2">
            <div className="px-2 pt-2">
              <h1 className="text-[14px] font-semibold">
                Playing on {campaignCreated?.screens?.length || 0} screens
              </h1>
            </div>
            <div className="flex items-center p-2">
              <PrimaryInput
                inputType="text"
                placeholder="Search"
                height="h-8"
                value={searchQuery}
                action={setSearchQuery}
              />
            </div>
            {loadingScreens ? (
              <Loading />
            ) : (
              <div>
                {screens
                  ?.filter((screen: any) =>
                    screen?.screenName?.toLowerCase().includes(searchQuery)
                  )
                  ?.map((screen: any, k: any) => (
                    <div
                      key={k}
                      className="p-0 m-0"
                      title="Click to select screen to view monitoring data"
                      onClick={() => handelSelectScreen(screen?._id)}
                    >
                      <ScreenListMonitoringView
                        handleChangeCampaignStatus={handleChangeCampaignStatus}
                        campaignCreated={campaignCreated}
                        setOpenCreativeEndDateChangePopup={
                          setOpenCreativeEndDateChangePopup
                        }
                        screen={screen}
                        noImages={false}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
