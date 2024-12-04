import { message } from "antd";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { ChangeScreenCodePopup } from "../../components/popup/ChangeScreenCodePopup";
import { AddDefaultMediaPopup } from "../../components/popup/AddDefaultMediaPopup";

export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [openScreenCodePopup, setOpenScreenCodePopup] = useState<any>(false);
  const [openAddDefaultMediaPopup, setOpenAddDefaultMediaPopup] =
    useState<any>(false);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!");
    }
  }, [dispatch, userInfo]);
  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      <ChangeScreenCodePopup
        setOpenScreenCodePopup={setOpenScreenCodePopup}
        openScreenCodePopup={openScreenCodePopup}
      />

      <AddDefaultMediaPopup
        setOpenAddDefaultMediaPopup={setOpenAddDefaultMediaPopup}
        openAddDefaultMediaPopup={openAddDefaultMediaPopup}
        userInfo={userInfo}
      />

      <div className="pt-8 px-8">
        <h1 className="text-2xl font-bold">
          Only Campaign managers can access this feature...
        </h1>
        <p className="text-md">
          Please contact support or create a new user with {"Campaign Manager"}{" "}
          role!!!
        </p>
        <div className="flex justify-center gap-2">
          <PrimaryButton
            loading={false}
            loadingText="Signup..."
            title="Create Campaign"
            action={() => navigate("/create-campaign")}
          />
          <PrimaryButton
            loading={false}
            loadingText="Signup..."
            title="Edit Screen Code"
            action={() => setOpenScreenCodePopup(true)}
          />
          <PrimaryButton
            loading={false}
            loadingText="Signup..."
            title="Add Default Media"
            action={() => setOpenAddDefaultMediaPopup(true)}
          />
        </div>
      </div>
    </div>
  );
};
