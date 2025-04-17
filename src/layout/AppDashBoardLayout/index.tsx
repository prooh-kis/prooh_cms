import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CAMPAIGNS_LIST,
  MY_COUPONS,
  MY_CREATIVES,
  MY_REQUESTS,
  SCREEN_CAMPAIGN_MONITORING,
  SCREENS_LIST,
  SCREENS_LIST_FOR_SECONDARY_USER,
  SIGN_IN,
  USERS,
} from "../../routes/routes";

import { signout } from "../../actions/userAction";
import { SCREEN_MONITORING_USER } from "../../constants/userConstants";
import { Header } from "../../components/header";

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
  const [showFull, setShowFull] = useState<any>(false);

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
      value: "Coupons",
      path: MY_COUPONS,
      icon: "fi fi-bs-ticket",
      option: "Coupons",
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
    <div className="h-auto border border w-full bg-gray-100 ">
      <Header />
      <div className="flex gap-1 h-full">
        {/* Sidebar */}
        <div
          className={`h-[92vh] min-w-[5vw] ${
            showFull ? "w-[15vw]" : "w-[5vw]"
          } mt-1 ml-0 bg-white rounded-[4px] overflow-y-auto flex flex-col`}
        >
          <div className="flex flex-col justify-between h-full pt-2 px-2">
            {/* Menu Items */}
            <div className="space-y-4">
              {!showFull && (
                <div
                  className="flex justify-center items-center py-2 px-4 border rounded cursor-pointer"
                  onClick={() => {
                    setShowFull(!showFull);
                  }}
                >
                  <i className="text-md fi fi-rr-list text-gray-500 flex items-center justify-center"></i>
                </div>
              )}

              {menuItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleMenuClick(index)}
                  className={`flex justify-start items-center gap-2 py-2 px-4 rounded cursor-pointer ${
                    current === item.option
                      ? "text-[#129BFF] font-bold bg-[#ECF7FF] border-l-2 border-[#129BFF]"
                      : "text-[#8D9DA7] font-semibold"
                  }`}
                >
                  <div className={`flex items-center`}>
                    <i
                      className={`${item.icon} flex items-center justify-center`}
                    ></i>
                  </div>
                  {showFull && (
                    <span className="px-2 truncate">{item.option}</span>
                  )}
                </div>
              ))}
            </div>
            {/* Logout */}
            <div className="py-12 flex justify-between truncate">
              <div
                onClick={handleSignOut}
                className={`flex truncate ${
                  !showFull ? "border border-red-200" : "border border-red-200"
                } justify-start items-center gap-2 py-2 rounded cursor-pointer ${
                  current === "Log Out"
                    ? "text-[#129BFF] font-bold bg-[#ECF7FF] border-l-2 border-[#129BFF]"
                    : "text-[#8D9DA7] font-semibold"
                } px-4`}
              >
                <div className={`flex items-center`}>
                  <i className="fi fi-br-power flex items-center justify-center"></i>
                </div>
                {showFull && <h1 className="px-2 truncate">Log out</h1>}
              </div>
              {showFull && (
                <div
                  className="flex items-center px-1"
                  onClick={() => {
                    setShowFull(!showFull);
                  }}
                >
                  <i className="fi fi-rr-arrow-left-from-line text-gray-500 flex items-center justify-center"></i>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Content */}
        <div className={`h-full w-full mt-1`}>{children}</div>
      </div>
    </div>
  );
};
