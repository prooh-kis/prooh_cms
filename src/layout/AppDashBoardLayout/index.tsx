import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CAMPAIGNS_LIST,
  CREATE_CAMPAIGN,
  MY_CREATIVES,
  MY_REQUESTS,
  SCREEN_CAMPAIGN_MONITORING,
  SCREENS_LIST,
  SCREENS_LIST_FOR_SECONDARY_USER,
  SIGN_IN,
  USERS,
} from "../../routes/routes";
import userImage from "../../assets/userImage.png";
import { Menu } from "../../components/header/Menu";
import { signout } from "../../actions/userAction";
import { SCREEN_MONITORING_USER } from "../../constants/userConstants";
import { message } from "antd";
import { Header } from "../../components/header";
import { ConformationModel } from "../../components/popup/ConformationModel";

interface AppDashBoardLayoutProps {
  children: React.ReactNode;
  value: string;
}

export const AppDashBoardLayout: React.FC<AppDashBoardLayoutProps> = ({
  children,
  value,
}) => {
  const dispatch = useDispatch<any>();
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;
  const navigate = useNavigate();
  const [current, setCurrent] = useState<string>(value);

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  useEffect(() => {
    if (!userInfo) {
      navigate(SIGN_IN);
    } else if (userInfo?.userRole === SCREEN_MONITORING_USER) {
      navigate(SCREENS_LIST_FOR_SECONDARY_USER);
    }
  }, [userInfo, navigate]);

  const menuItems = [
    {
      value: "My Screens",
      path: SCREENS_LIST,
      icon: "fi fi-sr-screen ",
      option: "Screens",
    },
    {
      value: "Campaigns",
      path: CAMPAIGNS_LIST,
      icon: "fi fi-sr-megaphone ",
      option: "Campaigns",
    },
    {
      value: "Creatives",
      path: MY_CREATIVES,
      icon: "fi fi-sr-photo-video ",
      option: "Creatives",
    },
    {
      value: "Monitoring",
      path: SCREEN_CAMPAIGN_MONITORING,
      icon: "fi fi-br-camera-movie ",
      option: "Monitoring",
    },
    {
      value: "Requests",
      path: MY_REQUESTS,
      icon: "fi fi-ss-bell-notification-social-media",
      option: "Requests",
    },
    {
      value: "Users",
      path: USERS,
      icon: "fi fi-sr-users-alt ",
      option: "Users",
    },
  ];

  const handleMenuClick = (index: number) => {
    setCurrent(menuItems[index].option);
    navigate(menuItems[index].path);
  };

  const handleSignOut = () => {
    if (window.confirm("Do you want to log out?")) {
      dispatch(signout());
      navigate(SIGN_IN);
    }
  };

  return (
    <div className="h-full border border w-full bg-gray-100 ">
      <Header />
      <div className="flex mt-1 gap-1 ml-2 h-auto">
        {/* Sidebar */}
        <div className="h-auto w-[15vw] bg-white rounded-[4px] overflow-y-auto flex flex-col">
          <div className="flex flex-col justify-between h-full pt-2 px-2">
            {/* Menu Items */}
            <div className="space-y-4">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleMenuClick(index)}
                  className={`flex items-center gap-2 px-2 rounded-lg text-md  py-2 cursor-pointer ${
                    current === item.option
                      ? "text-[#129BFF] font-bold bg-[#ECF7FF]"
                      : "text-[#8D9DA7] font-semibold"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div
                      className={`h-6 w-[3px] ${
                        current === item.option ? "bg-[#129BFF]" : ""
                      }`}
                    ></div>
                    <i className={item.icon}></i>
                  </div>
                  <span>{item.option}</span>
                </div>
              ))}
            </div>
            {/* Logout */}
            <div
              onClick={handleSignOut}
              className={`flex items-center gap-4 px-2 py-4 rounded-lg text-md cursor-pointer ${
                current === "Log out"
                  ? "text-[#129BFF] font-bold bg-[#ECF7FF]"
                  : "text-[#8D9DA7] font-semibold"
              }`}
            >
              <div className="flex items-center gap-6">
                <div
                  className={`h-6 w-[3px] ${
                    current === "Log out" ? "bg-[#129BFF]" : ""
                  }`}
                ></div>
                <i className="fi fi-br-power flex items-center justify-center"></i>
              </div>
              <h1>Log out</h1>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="h-auto w-[85vw]">{children}</div>
      </div>
    </div>
  );
};
