import { VendorConfirmationBasicTable } from "../../components/tables";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  getCampaignCreationDetailsForScreenVendor,
  approveCampaignBudgetScreenVendor,
} from "../../actions/campaignAction";
import {
  APPROVE_CAMPAIGN_BUDGET_SCREEN_VENDOR_RESET,
  CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_ACCEPTED,
  CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_REJECTED,
  GET_CAMPAIGN_REQUEST_BUDGET_DETAILS_FOR_SCREEN_VENDOR_RESET,
} from "../../constants/campaignConstants";
import { CAMPAIGN_CREATION_APPROVE_CAMPAIGN_BUDGET_CMS } from "../../constants/userConstants";
import { VendorConfirmationScreensTable } from "../../components/tables/VendorConfirmationScreensTable";
import ButtonInput from "../../components/atoms/ButtonInput";
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

export const BudgetApprovalPage = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const campaignId = pathname.split("/")[2] || "";
  const index = pathname.split("/")[3];

  const [screenList, setScreenList] = useState<ScreenItem[]>([]);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const campaignCreationDetailsForScreenVendor = useSelector(
    (state: any) => state.campaignCreationDetailsForScreenVendor
  );
  const {
    loading: loadingCampaignDetails,
    error: errorCampaignDetails,
    data: campaignDetails,
  } = campaignCreationDetailsForScreenVendor;

  const approveCampaignBudgetScreenWise = useSelector(
    (state: any) => state.approveCampaignBudgetScreenWise
  );
  const {
    loading: loadingApproveCampaignBudget,
    error: errorApproveCampaignBudget,
    data: approveCampaignBudget,
    success: successCampaignBudget,
  } = approveCampaignBudgetScreenWise;

  useEffect(() => {
    if (errorApproveCampaignBudget) {
      message.error(errorApproveCampaignBudget);
      dispatch({ type: APPROVE_CAMPAIGN_BUDGET_SCREEN_VENDOR_RESET });
    }
    if (successCampaignBudget) {
      message.success("Successfully approved budget of campaign screen wise");
      dispatch({ type: APPROVE_CAMPAIGN_BUDGET_SCREEN_VENDOR_RESET });
      navigate(-1);
    }
  }, [errorApproveCampaignBudget, successCampaignBudget]);

  useEffect(() => {
    if (errorCampaignDetails) {
      message.error(errorCampaignDetails);
      dispatch({
        type: GET_CAMPAIGN_REQUEST_BUDGET_DETAILS_FOR_SCREEN_VENDOR_RESET,
      });
    }
    if (campaignDetails && campaignDetails?.screenWiseSlotDetails?.length > 0) {
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

  const getRequestBody = () => {
    let requestBody: any = [];
    requestBody = screenList.map((screen: ScreenItem) => ({
      screenId: screen.screenId,
      campaignStatus:
        screen.status === "Approved"
          ? CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_ACCEPTED
          : CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_REJECTED, // default to Approved if undefined
    }));

    return requestBody;
  };

  const handleApprovedClicked = () => {
    let data: any = getRequestBody();
    console.log("requestBody  : ", screenList, data);
    if (
      window.confirm(
        "Do you want to approve budget for this campaign screen wise?"
      )
    )
      dispatch(
        approveCampaignBudgetScreenVendor({
          id: campaignId,
          data,
          event: CAMPAIGN_CREATION_APPROVE_CAMPAIGN_BUDGET_CMS,
        })
      );
  };

  useEffect(() => {
    dispatch(
      getCampaignCreationDetailsForScreenVendor({
        id: campaignId,
        event: "campaignCreationGetCampaignDetailsCms",
      })
    );
  }, []);
  return (
    <div>
      <Header campaignDetails={campaignDetails} />
      <VendorConfirmationBasicTable vendorConfirmationData={campaignDetails} />
      <VendorConfirmationScreensTable
        screenList={screenList}
        setScreenList={setScreenList}
      />
      <div className="flex flex-row justify-end gap-4 rounded p-4  w-full bg-white">
        <ButtonInput
          variant="outline"
          onClick={handleApprovedClicked}
          loading={loadingApproveCampaignBudget}
        >
          Approve
        </ButtonInput>
      </div>
    </div>
  );
};
