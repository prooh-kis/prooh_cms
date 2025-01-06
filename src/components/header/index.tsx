import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "./Menu";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
// import { ADD_SCREEN_CODE_RESET } from "../../../constants/screenDataConstant";
import userImage from "../../assets/userImage.png";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { SIGN_IN } from "../../routes/routes";
import { ConformationModel } from "../../components/popup/ConformationModel";

// import { getCreatives } from "../../../actions/creativeAction";
// import { USER_ROLE_PRIMARY } from "../../../constants/userConstants";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const [open, setOpen] = useState<boolean>(false);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full h-16 bg-white flex items-center justify-between z-50">
      <div className="flex items-center mx-10">
        <ToastContainer />
        <ConformationModel open={open} onClose={toggleOpen} />

        <div
          className="flex flex-col mb-2 -space-y-1 pt-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl font-black">PROOH.AI</h1>
        </div>
      </div>
      {userInfo ? (
        <div className="flex gap-4 items-center justify-end pr-10">
          <button
            onClick={toggleOpen}
            className="w-full h-8 text-[12px] font-semibold hover:bg-[#129BFF] text-[#129BFF] border-2 border-[#129BFF] rounded-full hover:text-white px-4 cursor-pointer">
            Quick Upload
          </button>
          <div className="h-10 w-full flex items-center space-x-2 ">
            <div className="h-10 flex items-center gap-1">
              <img src={userImage} alt="userImage" className="h-8" />
              <div className="justify-center w-full truncate">
                <h3 className="text-lg pr-2">{userInfo.name}</h3>
                <p className="text-xs font-semibold text-gray-700">
                  {userInfo.isBrand && "Campaign Planner"}
                </p>
              </div>
              <div>
                <Menu userInfo={userInfo} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
