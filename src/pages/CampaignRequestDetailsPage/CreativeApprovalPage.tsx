import { VendorConfirmationBasicTable } from "../../components/tables";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  approveCampaignCreativeScreenVendor,
  getCampaignRequestCreativeDetailsForScreenVendor,
} from "../../actions/campaignAction";
import {
  APPROVE_CAMPAIGN_CREATIVE_SCREEN_VENDOR_RESET,
  CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_ACCEPTED,
  CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_REJECTED,
  GET_CAMPAIGN_REQUEST_CREATIVE_DETAILS_FOR_SCREEN_VENDOR_RESET,
} from "../../constants/campaignConstants";
import {
  CAMPAIGN_CREATION_APPROVE_CAMPAIGN_CREATIVE_CMS,
  CAMPAIGN_CREATION_GET_CREATIVE_REQUEST_DETAILS_VENDOR_CMS,
} from "../../constants/userConstants";
import ButtonInput from "../../components/atoms/ButtonInput";
import { VendorConfirmationScreensLevelCreativeTable } from "../../components/tables/VendorConfirmationScreensLevelCreativeTable";
import { Header } from "./HelperComponentsForCampaignApproval";

interface ScreenItem {
  screenId: string;
  screenName: string;
  address: string;
  cost: number;
  slotAvailable: number;
  status?: "Approved" | "Rejected" | null;
  creatives?: any;
}

export const CreativeApprovalPage = ({
  setOpenShowMediaPopup,
  setCurrentScreen,
}: any) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const campaignId = pathname.split("/")[2] || "";
  const [screenList, setScreenList] = useState<ScreenItem[]>([]);

  const approveCampaignCreativeScreenWise = useSelector(
    (state: any) => state.approveCampaignCreativeScreenWise
  );
  const {
    loading: loadingApproveCampaignCreative,
    error: errorApproveCampaignCreative,
    data: approveCampaignCreative,
    success: successCampaignCreative,
  } = approveCampaignCreativeScreenWise;

  const campaignRequestCreativeDetailsForScreenVendor = useSelector(
    (state: any) => state.campaignRequestCreativeDetailsForScreenVendor
  );
  const {
    loading: loadingCreativeDetails,
    error: errorCampaignDetails,
    data: campaignDetails,
  } = campaignRequestCreativeDetailsForScreenVendor;

  useEffect(() => {
    if (errorApproveCampaignCreative) {
      message.error(errorApproveCampaignCreative);
      dispatch({ type: APPROVE_CAMPAIGN_CREATIVE_SCREEN_VENDOR_RESET });
    }

    if (successCampaignCreative) {
      message.success("Successfully approved creative of campaign screen wise");
      dispatch({ type: APPROVE_CAMPAIGN_CREATIVE_SCREEN_VENDOR_RESET });
      navigate(-1);
    }
  }, [
    errorApproveCampaignCreative,
    successCampaignCreative,
    dispatch,
    navigate,
  ]);

  useEffect(() => {
    if (errorCampaignDetails) {
      message.error(errorCampaignDetails);
      dispatch({
        type: GET_CAMPAIGN_REQUEST_CREATIVE_DETAILS_FOR_SCREEN_VENDOR_RESET,
      });
    }
    if (campaignDetails && campaignDetails?.screenWiseSlotDetails?.length > 0) {
      console.log("campaignDetails : ", campaignDetails?.screenWiseSlotDetails);
      setScreenList(
        campaignDetails?.screenWiseSlotDetails?.map((data: any) => {
          return {
            ...data,
            status: "Approved",
          };
        })
      );
    }
  }, [errorCampaignDetails, campaignDetails]);

  const handleShowMedia = useCallback(
    (data: any) => {
      setOpenShowMediaPopup((pre: boolean) => !pre);
      setCurrentScreen(data);
    },
    [setOpenShowMediaPopup, setCurrentScreen]
  );

  const getRequestBody = useCallback(() => {
    return screenList.map((screen: ScreenItem) => ({
      screenId: screen.screenId,
      campaignStatus:
        screen.status === "Approved"
          ? CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_ACCEPTED
          : CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_REJECTED,
    }));
  }, [screenList]);

  const handleApprovedClicked = () => {
    let data: any = getRequestBody();
    if (
      window.confirm(
        "Do you want to approve creative for this campaign screen wise?"
      )
    )
      dispatch(
        approveCampaignCreativeScreenVendor({
          id: campaignId,
          data,
          event: CAMPAIGN_CREATION_APPROVE_CAMPAIGN_CREATIVE_CMS,
        })
      );
  };

  useEffect(() => {
    dispatch(
      getCampaignRequestCreativeDetailsForScreenVendor({
        id: campaignId,
        event: CAMPAIGN_CREATION_GET_CREATIVE_REQUEST_DETAILS_VENDOR_CMS,
      })
    );
  }, [dispatch, campaignId]);
  return (
    <div>
      <Header campaignDetails={campaignDetails} />
      <VendorConfirmationBasicTable vendorConfirmationData={campaignDetails} />
      <VendorConfirmationScreensLevelCreativeTable
        screenList={screenList}
        setScreenList={setScreenList}
        handleOpenCreationModel={handleShowMedia}
      />
      <div className="flex flex-row justify-end gap-4 rounded p-4  w-full bg-white">
        <ButtonInput
          variant="outline"
          onClick={handleApprovedClicked}
          loading={loadingApproveCampaignCreative}
        >
          Approve
        </ButtonInput>
      </div>
    </div>
  );
};
