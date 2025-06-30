import { message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Loading } from "../../components/Loading";

import {
  changeCampaignStatusAction,
  convertCreativesToRespectiveBitrate,
  editAllSubCampaignsAction,
  getCampaignCreatedScreensDetailsAction,
  getCampaignDetailsAction,
} from "../../actions/campaignAction";
import { confirmData } from "../../utils/champaignStatusUtils";
import {
  CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_RESET,
  CAMPAIGN_STATUS_CHANGE_RESET,
  EDIT_ALL_SUB_CAMPAIGNS_RESET,
} from "../../constants/campaignConstants";
import { getCreativesMediaAction } from "../../actions/creativeAction";
import { EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET } from "../../constants/screenConstants";
import {
  EditCampaignCreationAndItsSubCampaigns,
  EditCreativeEndDatePopup,
  CampaignMonitoring,
  CampaignLogsPopup,
  AllCampaignLogsPopup,
} from "../../components";
import {
  CAMPAIGN_CREATION_CONVERT_CREATIVE_TO_BITRATE_CMS,
  CAMPAIGN_CREATION_EDIT_END_DATE_CMS,
  CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_CMS,
} from "../../constants/userConstants";
import CampaignCreatives from "./CampaignCreatives";
import CampaignScreenList from "./CampaignScreenList";
import { creativeTypeTab } from "../../constants/tabDataConstant";
import CampaignDetailSection from "./CampaignDetailSection";

export const CampaignDetailsPage: React.FC = () => {
  const dispatch = useDispatch<any>();
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

  const convertCreativesToRespectiveBitrate = useSelector(
    (state: any) => state.convertCreativesToRespectiveBitrate
  );

  const {
    loading: loadingConvertCreativesToRespectiveBitrate,
    error: errorConvertCreativesToRespectiveBitrate,
    success: successConvertCreativesToRespectiveBitrate,
  } = convertCreativesToRespectiveBitrate;

  const handleEditAllSubCampaigns = (
    campaignCreationId: string,
    endDate: any
  ) => {
    dispatch(
      editAllSubCampaignsAction({
        campaignCreationId,
        endDate,
        campaignCreationIds: [campaignCreationId],
        event: CAMPAIGN_CREATION_EDIT_END_DATE_CMS,
      })
    );
  };

  const campaigns =
    screens?.length > 0
      ? campaignCreated?.campaigns
          ?.filter((camp: any) =>
            campaignCreated?.screenIds?.includes(camp.screenId)
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
      dispatch(
        getCampaignDetailsAction({
          campaignId: campaignId,
          event: CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_CMS,
        })
      );
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
          screenIds: campaignCreated?.screenIds,
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
      dispatch(
        getCampaignDetailsAction({
          campaignId: campaignId,
          event: CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_CMS,
        })
      );
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

    if (successConvertCreativesToRespectiveBitrate) {
      message.success(
        "Campaign Creatives Convertion to respective Bitrate Started . It will get reflected in 5 mins"
      );
      dispatch({
        type: CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_RESET,
      });
    }
  }, [
    dispatch,
    successStatusChange,
    errorStatusChange,
    successChange,
    successConvertCreativesToRespectiveBitrate,
  ]);

  useEffect(() => {
    // if (userInfo && !userInfo?.isMaster) {
    //   message.error("Not a screen owner!!!");
    // }
    dispatch(
      getCampaignDetailsAction({
        campaignId: campaignId,
        event: CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_CMS,
      })
    );
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

  const handleConvertCreativeToRespectiveBitrate = () => {
    if (confirm("Are you sure you want to convert creatives?")) {
      dispatch(
        convertCreativesToRespectiveBitrate({
          id: campaignCreated._id,
          event: CAMPAIGN_CREATION_CONVERT_CREATIVE_TO_BITRATE_CMS,
        })
      );
    }
  };

  const handleChangeStatusAll = (status: string, event: string) => {
    if (confirm(confirmData[status])) {
      let data = getCampaignIdsToChangeStatus();
      if (data?.length > 0) {
        dispatch(
          changeCampaignStatusAction({
            campaignIds: data,
            status: status,
            event: event,
          })
        );
      } else {
        message.error("No Campaign found!, to change status");
      }
    }
  };

  const handleChangeCampaignStatus = (
    status: string,
    campaignId: string,
    event: string
  ) => {
    if (confirm(confirmData[status])) {
      let data = campaignCreated?.campaigns
        ?.filter((campaign: any) => campaign._id == campaignId)
        ?.map((campaign: any) => campaign._id);
      if (data?.length > 0) {
        dispatch(
          changeCampaignStatusAction({
            campaignIds: data,
            status: status,
            event: event,
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

  const downloadFileFromUrl = (
    fileUrl: string,
    campaignDetails: any,
    fileName: string
  ) => {
    if (!fileUrl) {
      message.error("You can download logs from tomorrow");
      return;
    }

    const campaignEndDate = campaignDetails?.endDate
      ? new Date(campaignDetails.endDate)
      : null;

    if (campaignEndDate && new Date() > campaignEndDate) {
      message.info("Downloading all logs, please wait for some time...");
    } else {
      message.info(
        "Logs till yesterday will be downloaded as the campaign is still live today..."
      );
    }

    // Create a hidden <a> tag and trigger the download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShowLogReport = (campaignId: string) => {
    const campaign = campaigns?.find((camp: any) => camp._id === campaignId);

    if (!campaign) {
      message.error("Campaign not found!");
      return;
    }

    downloadFileFromUrl(
      campaign.logUrl,
      campaign,
      `${campaign.screenName}_${campaign.brandName}`
    );
  };

  const handleToggleOpenAllCampaignLogsPopup = useCallback(() => {
    setOpenAllCampaignLogsPopup((pre: boolean) => !pre);
  }, [openAllCampaignLogsPopup]);

  const getAllCreatives = (campaigns: any) => {
    return {
      standardDayTimeCreatives: campaigns?.flatMap(
        (item: any) => item.standardDayTimeCreatives || []
      ),
      standardNightTimeCreatives: campaigns?.flatMap(
        (item: any) => item.standardNightTimeCreatives || []
      ),
      triggerCreatives: campaigns?.flatMap(
        (item: any) => item.triggerCreatives || []
      ),
    };
  };

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
          <CampaignDetailSection
            userInfo={userInfo}
            loadingStatusChange={loadingStatusChange}
            handleToggleOpenAllCampaignLogsPopup={
              handleToggleOpenAllCampaignLogsPopup
            }
            campaignId={campaignId}
            setOpenCreateCampaignEndDateChangePopup={
              setOpenCreateCampaignEndDateChangePopup
            }
            handleChangeStatusAll={handleChangeStatusAll}
            openCreateCampaignEndDateChangePopup={
              openCreateCampaignEndDateChangePopup
            }
            handleConvertCreativeToRespectiveBitrate={
              handleConvertCreativeToRespectiveBitrate
            }
            campaignCreated={campaignCreated}
          />
          <CampaignCreatives
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            creativeTypeTab={creativeTypeTab}
            getAllCreatives={getAllCreatives}
            campaignCreated={campaignCreated}
          />
          {/* <div className="border rounded my-1">
            <CampaignMonitoring
              campaign={campaign}
              screenId={campaign?.screenId}
            />
          </div> */}
        </div>
      )}
      {loading ? (
        <div className="col-span-4">
          <Loading />
        </div>
      ) : (
        <CampaignScreenList
          campaignCreated={campaignCreated}
          loadingScreens={loadingScreens}
          campaigns={campaigns}
          handelSelectScreen={handelSelectScreen}
          handleChangeCampaignStatus={handleChangeCampaignStatus}
          setOpenCreativeEndDateChangePopup={setOpenCreativeEndDateChangePopup}
          screens={screens}
          handleShowLogReport={handleShowLogReport}
        />
      )}
    </div>
  );
};
