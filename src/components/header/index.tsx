import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "./Menu";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeDataFromLocalStorage } from "../../utils/localStorageUtils";
import userImage from "../../assets/userImage.png";
import { ConformationModel } from "../../components/popup/ConformationModel";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { GET_FULL_CAMPAIGN_DATA_RESET } from "../../constants/campaignConstants";
import ButtonInput from "../../components/atoms/ButtonInput";
import { SIGN_IN } from "../../routes/routes";
import { Fly } from "../../assets";

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

  const handleClick = () => {
    if (userInfo) {
      navigate("/");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="w-full h-16 bg-white flex items-center justify-between z-50">
      <div className="flex items-center mx-10">
        <ToastContainer />
        <ConformationModel open={open} onClose={toggleOpen} />

        <div className="flex items-center gap-2" onClick={handleClick}>
          {/* <h1 className="text-xl font-black">PROOH.AI</h1> */}
          <img src={Fly} className="h-8 w-8" alt="Media owner" />
          <div className="">
            <h1 className="text-[16px] text-[#1E376E] font-black">Fly</h1>
            <p className="text-[10px] text-[#6F7F8E]">
              powered by <span className="italic">PROOH.AI</span>
            </p>
          </div>
        </div>
      </div>
      {userInfo ? (
        <div className="flex gap-4 items-center justify-end pr-10">
          <button
            type="button"
            onClick={() => {
              dispatch({
                type: GET_FULL_CAMPAIGN_DATA_RESET,
              });
              removeDataFromLocalStorage(FULL_CAMPAIGN_PLAN);
              toggleOpen();
            }}
            className="w-full h-8 text-[12px] font-semibold hover:bg-[#129BFF] text-[#129BFF] border-2 border-[#129BFF] rounded-full hover:text-white px-4 cursor-pointer"
          >
            Quick Upload
          </button>
          <div className="h-10 w-full flex items-center space-x-2 ">
            <div className="h-10 flex items-center gap-1">
              <img src={userImage} alt="userImage" className="h-8" />
              <div className="justify-center w-full truncate">
                <h3 className="text-lg pr-2">{userInfo.name}</h3>
                <p className="text-xs font-semibold text-gray-700">
                  {userInfo.userRole}
                </p>
              </div>
              <div>
                <Menu userInfo={userInfo} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center  pr-16">
          <ButtonInput onClick={() => navigate(SIGN_IN)} rounded="full">
            Login
          </ButtonInput>
        </div>
      )}
    </div>
  );
};
