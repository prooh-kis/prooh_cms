import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ShowMediaPopup } from "../../components/popup/ShowMediaPopup";
import { BudgetApprovalPage } from "./BudgetApprovalPage";
import { CreativeApprovalPage } from "./CreativeApprovalPage";

export const CampaignRequestDetailsPage = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const index = pathname.split("/")[3];

  const [openShowMediaPopup, setOpenShowMediaPopup] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<any>({
    screenName: "",
    screenId: "",
    creatives: [],
  });

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  return (
    <div className="w-full h-auto">
      <ShowMediaPopup
        showDelete={false}
        openShowMedia={openShowMediaPopup}
        onClose={() => {
          setOpenShowMediaPopup(false);
          setCurrentScreen({ screenName: "", screenId: "", creatives: [] });
        }}
        screenName={currentScreen?.screenName}
        media={[
          ...(currentScreen?.creatives.standardDayTimeCreatives || []),
          ...(currentScreen?.creatives.standardNightTimeCreatives || []),
          ...(currentScreen?.creatives.triggerCreatives || []),
        ]}
      />
      <div className="flex flex-row justify-between rounded p-4 mb-1 w-full bg-white">
        <div className="flex gap-4 items-center">
          <i
            className="fi fi-br-arrow-left flex items-center justify-center text-[#8B5CF680]"
            onClick={() => navigate(-1)}
          ></i>
          <h1 className="text-[16px] font-semibold">
            {index === "1"
              ? `Campaign Budget Request`
              : `Campaign Creative Request`}
          </h1>
        </div>
      </div>

      {/* <div className="flex flex-row justify-between rounded p-4 mb-1 w-full bg-white">
        <div className="flex gap-2 items-center">
          <div className="h-6 w-6 rounded-full bg-[#129BFF] flex items-center justify-center text-white">
            1
          </div>
          <h1 className="text-[14x] font-semibold">Campaign Approval</h1>
          <div className="border w-10 bg-[#D9D9D9]"></div>
          <div className="h-6 w-6 rounded-full bg-[#129BFF] flex items-center justify-center text-white">
            2
          </div>
          <h1 className="text-[14x] font-semibold">Creative Approval</h1>
        </div>
      </div> */}

      {index === "1" ? (
        <BudgetApprovalPage />
      ) : (
        <CreativeApprovalPage
          setOpenShowMediaPopup={() =>
            setOpenShowMediaPopup((pre: boolean) => !pre)
          }
          setCurrentScreen={setCurrentScreen}
        />
      )}
    </div>
  );
};
