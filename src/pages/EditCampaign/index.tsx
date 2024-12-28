import { CAMPAIGN_PLAN_TYPE_SCREEN_OWNER } from "../../constants/campaignConstants";
import { EnterCampaignBasicDetails } from "../../components/Segment/EnterCampaignBasicDetails";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { UploadCreatives } from "../../components/Segment/UploadCreatives";
import {
  createCampaignCreationByScreenOwnerAction,
  getFullCampaignDetailsAction,
} from "../../actions/campaignAction";
import { SIGN_IN } from "../../routes/routes";

export const EditCampaign: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const campaignId = pathname.split("/").splice(-1)[0] || undefined;
  console.log("getFullCampaignDetailsAction : ", campaignId);

  const [step, setStep] = useState<any>(1);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const createCampaignCreationByScreenOwner = useSelector(
    (state: any) => state.createCampaignCreationByScreenOwner
  );

  const editCampaignCreationByScreenOwner = useSelector(
    (state: any) => state.editCampaignCreationByScreenOwner
  );

  const {
    loading: loadingCampaignsCreations,
    error: errorCampaignsCreations,
    success: successCampaignsCreations,
    data: campaignsCreated,
  } = createCampaignCreationByScreenOwner;

  const {
    loading: loadingCampaignsEdit = false,
    error: loadingErrorResponse = "",
    data: successCampaignsEdit = false,
  } = editCampaignCreationByScreenOwner
    ? editCampaignCreationByScreenOwner
    : {};

  useEffect(() => {
    if (!userInfo) {
      navigate(SIGN_IN);
    }
    console.log("calling to get campaign detail for edit");
    dispatch(getFullCampaignDetailsAction(campaignId));
  }, [dispatch, campaignId]);

  console.log("step :", step);

  return (
    <div className="w-full h-full items-center">
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
          purpose="Edit"
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
          loadingCampaignsEdit={loadingCampaignsEdit}
          successCampaignsEdit={successCampaignsEdit}
        />
      ) : null}
    </div>
  );
};
