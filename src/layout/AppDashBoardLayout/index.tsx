import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SCREENS_LIST_FOR_SECONDARY_USER, SIGN_IN } from "../../routes/routes";

import { signout } from "../../actions/userAction";
import {
  SCREEN_ADMIN,
  SCREEN_MANAGER,
  SCREEN_MONITORING_USER,
  SCREEN_OWNER,
} from "../../constants/userConstants";
import { Header } from "../../components/header";
import { notification, Tooltip } from "antd";
import {
  menuItemsAdmin,
  menuItemsScreenManager,
  menuItemsScreenMonitoring,
  menuItemsScreenOwner,
} from "../../constants/tabDataConstant";

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
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  useEffect(() => {
    if (!userInfo) {
      navigate(SIGN_IN);
    } 

    switch (userInfo?.userRole) {
      case SCREEN_ADMIN:
        setMenuItems(menuItemsAdmin);
        break;
      case SCREEN_OWNER:
        setMenuItems(menuItemsScreenOwner);
        break;
      case SCREEN_MANAGER:
        setMenuItems(menuItemsScreenManager);
        break;
      case SCREEN_MONITORING_USER:
        setMenuItems(menuItemsScreenMonitoring);
        break;
      default:
        notification.error({
          message: "Error",
          description: "You have no access for media",
        });
        dispatch(signout());
    }
  }, [userInfo, navigate]);

  const handleMenuClick = (index: number) => {
    setCurrent(menuItems[index].option);
    navigate(menuItems[index].path);
  };

  const handleSignOut = () => {
    if (window.confirm("Do you want to log out?")) {
      dispatch(signout());
      navigate("/home");
    }
  };

  return (
    <div className="h-[100vh]  w-full bg-gray-100 overflow-y-auto no-scrollbar ">
      <Header />
      <div className="flex gap-1 h-[92vh] overflow-y-auto no-scrollbar ">
        {/* Sidebar */}
        <div
          className={`h-[92vh] min-w-[5vw] ${
            showFull ? "w-[15vw]" : "w-[5vw]"
          } mt-1 ml-0 bg-white rounded-[4px] overflow-y-auto flex flex-col`}
        >
          <div className="flex flex-col justify-between h-full pt-2 px-2">
            {/* Menu Items */}
            <div className="space-y-2">
              <div
                className="flex justify-center items-center py-2 px-4 border rounded cursor-pointer"
                onClick={() => {
                  setShowFull(!showFull);
                }}
              >
                <i className="text-md fi fi-rr-list text-gray-500 flex items-center justify-center"></i>
              </div>

              {menuItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleMenuClick(index)}
                  className={`flex justify-start items-center gap-2 py-2 px-4 rounded cursor-pointer hover:bg-[#ECF7FF] hover:text-[#129BFF80] ${
                    current === item.option
                      ? "text-[#129BFF] font-bold bg-[#ECF7FF] border-l-2 border-[#129BFF]"
                      : "text-[#8D9DA7] font-semibold"
                  }`}
                >
                  <div className={`flex items-center`}>
                    <Tooltip title={item.option}>
                      <i
                        className={`${item.icon} flex items-center justify-center`}
                      ></i>
                    </Tooltip>
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
                className={`flex truncate w-full rounded-md hover:bg-[#ECF7FF] hover:text-[#129BFF80]   ${
                  !showFull ? "border border-red-200" : "border border-red-200"
                } justify-start items-center gap-2 py-2 rounded cursor-pointer ${
                  current === "Log Out"
                    ? "text-[#129BFF] font-bold bg-[#ECF7FF] border-l-2 border-[#129BFF]"
                    : "text-[#8D9DA7] font-semibold"
                } px-4`}
              >
                <div className={`flex items-center`}>
                  <i className="fi fi-br-power flex items-center"></i>
                </div>
                {showFull && <h1 className="px-2 truncate">Log out</h1>}
              </div>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className={`overflow-y-auto no-scrollbar h-[92vh] w-full mt-1`}>
          {children}
        </div>
      </div>
    </div>
  );
};
