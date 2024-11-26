import { CAMPAIGN_PLAN_TYPE_SCREEN_OWNER } from "../../constants/campaignConstants";
import { EnterCampaignBasicDetails } from "../../components/Segment/EnterCampaignBasicDetails";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { UploadCreatives } from "../../components/Segment/UploadCreatives";
import { createCampaignCreationByScreenOwnerAction, getScreenDataUploadCreativeAction } from "../../actions/campaignAction";


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
    if (!userInfo) {
      navigate("/auth");
    }
    if (campaignId && getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.currentPage === "Add Basic Details") {
      setStep(2);
    }
    if (campaignId && campaignId !== "create-campaign" && !successCampaignsCreations) {
      dispatch(
        createCampaignCreationByScreenOwnerAction({id: campaignId})
      );
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
          step={step}
        />
      ) : step === 2 ? (
        <UploadCreatives
          userInfo={userInfo}
          step={step}
          setStep={setStep}
          campaignId={campaignId}
          successCampaignsCreations={successCampaignsCreations}
          campaignsCreated={campaignsCreated}
          loadingCampaignsCreations={loadingCampaignsCreations}
        />
      ) : null}

    </div>
  );
};
