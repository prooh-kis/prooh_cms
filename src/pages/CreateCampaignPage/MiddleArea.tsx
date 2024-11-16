import { CAMPAIGN_PLAN_TYPE_SCREEN_OWNER, CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET } from "../../constants/campaignConstants";
import { EnterCampaignBasicDetails } from "../../components/Segment/EnterCampaignBasicDetails";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { UploadCreatives } from "../../components/Segment/UplaodCreatives";
import { createCampaignCreationByScreenOwnerAction } from "../../actions/campaignAction";
import { message } from "antd";


export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const {pathname} = useLocation();
  const campaignId = pathname.split("/").splice(-1)[0] || undefined;

  const [step, setStep] = useState<any>(1);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const createCampaignCreationByScreenOwner = useSelector(
    (state: any) => state.createCampaignCreationByScreenOwner
  );
  const {
    loading: loadingCampaignsCreations,
    error: errorCampaignsCreations,
    success: successCampaignsCreations,
    data: campaignsCreated,
  } = createCampaignCreationByScreenOwner;

  useEffect(() => {
    if (campaignId && getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.currentPage === "Add Basic Details") {
      setStep(2);
    }

    if (successCampaignsCreations) {
      dispatch({
        type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET,
      })
      message.success("Campaign initiated successfully");
    }

    if (campaignId !== "create-campaign") {
      dispatch(
        createCampaignCreationByScreenOwnerAction({id: campaignId})
      );
    } else {
      // dispatch({
      //   type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET,
      // });
    }
  },[dispatch, campaignId]);
  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      {step === 1 ? (
        <EnterCampaignBasicDetails 
          userInfo={userInfo}
          campaignId={campaignId}
          campaignType={CAMPAIGN_PLAN_TYPE_SCREEN_OWNER}
          loadingCampaignsCreations={loadingCampaignsCreations}
          successCampaignsCreations={successCampaignsCreations}
          errorCampaignsCreations={errorCampaignsCreations}
          campaignsCreated={campaignsCreated}
          setStep={setStep}
        />
      ) : step === 2 ? (
        <UploadCreatives
          userInfo={userInfo}
          step={step}
          setStep={setStep}
          campaignId={campaignId}
        />
      ) : null}

    </div>
  );
};
