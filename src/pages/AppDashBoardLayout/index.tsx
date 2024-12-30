import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CAMPAIGNS_LIST,
  CREATE_CAMPAIGN,
  MY_CREATIVES,
  SCREEN_CAMPAIGN_MONITORING,
  SCREENS_LIST,
  SCREENS_LIST_FOR_SECONDARY_USER,
  SIGN_IN,
  USERS,
} from "../../routes/routes";
import userImage from "../../assets/userImage.png";
import { Menu } from "../../components/header/Menu";
import { useDispatch } from "react-redux";
import { signout } from "../../actions/userAction";
import { USER_ROLE_PRIMARY } from "../../constants/userConstants";
import { message } from "antd";

export const AppDashBoardLayout = (props: any) => {
  const { children } = props;
  const dispatch = useDispatch<any>();
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;
  const navigate = useNavigate();
  const [current, setCurrent] = useState("Dashboard");

  useEffect(() => {
    if (!userInfo) {
      navigate(SIGN_IN);
    } else if (userInfo?.userRole !== USER_ROLE_PRIMARY) {
      message.error("You have no access");
      navigate(SCREENS_LIST_FOR_SECONDARY_USER);
    }
  }, []);

  const data = [
    { value: "Dashboard", path: "/", icon: "fi fi-sr-apps text-xl" },
    {
      value: "My Screens",
      path: SCREENS_LIST,
      icon: "fi fi-sr-screen text-xl",
    },
    {
      value: "Campaigns",
      path: CAMPAIGNS_LIST,
      icon: "fi fi-sr-megaphone text-xl",
    },
    {
      value: "Creatives",
      path: MY_CREATIVES,
      icon: "fi fi-sr-photo-video text-xl",
    },
    {
      value: "Monitoring",
      path: SCREEN_CAMPAIGN_MONITORING,
      icon: "fi fi-br-camera-movie text-xl",
    },
    {
      value: "Users",
      path: USERS,
      icon: "fi fi-sr-users-alt text-xl",
    },
  ];

  const handleClick = (index: number) => {
    setCurrent(data[index].value);
    navigate(data[index].path);
  };
  const signOutHandler = () => {
    dispatch(signout());
    navigate(SIGN_IN);
  };

  return (
    <div className="h-[100vh] w-[100vw] p-0 m-0 flex">
      {/* sidebar */}
      <div className="h-[100vh] w-[15vw] overflow-scroll no-scrollbar flex flex-col  ">
        <h1 className="px-4 py-2 font-bold text-[24px] text-[#092A41]">
          PROOH.AI
        </h1>
        <div></div>
        <div className="flex gap-4 items-center text-[#B6C4CE] font-semibold w-[14vw] px-2 py-1">
          <div className="flex items-center gap-6">
            <div
              className={
                current === "-1"
                  ? "h-[24px] w-[3px] bg-[#129BFF]"
                  : "h-[24px] w-[3px]"
              }
            ></div>
            <button
              onClick={() => navigate(CREATE_CAMPAIGN)}
              className="bg-[#ffffff] text-[#129BFF] border rounded-[24px]  border-[#129BFF] py-1  w-36 hover:bg-[#129BFF] hover:text-white"
            >
              + Create
            </button>
          </div>
        </div>
        <div className="flex flex-col pt-8 justify-between h-[60vh]">
          <div className="flex flex-col gap-4">
            {data?.map((d: any, index: number) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={
                  current === d.value
                    ? "flex gap-4 items-center text-[#129BFF] font-bold bg-[#ECF7FF]  w-[14vw] rounded-md px-2 py-1"
                    : "flex gap-4 items-center text-[#B6C4CE] font-semibold w-[14vw] px-2 py-1"
                }
              >
                <div className="flex items-center gap-6">
                  <div
                    className={
                      current === d.value
                        ? "h-[24px] w-[3px] bg-[#129BFF]"
                        : "h-[24px] w-[3px]"
                    }
                  ></div>
                  <i className={d.icon}></i>
                </div>
                <h1 className="text-[14px]">{d.value}</h1>
              </div>
            ))}
          </div>
          <div
            onClick={signOutHandler}
            className={
              current === "logOut"
                ? "flex gap-4 items-center text-[#129BFF] font-bold bg-[#ECF7FF]  w-[14vw] rounded-md px-2 py-1"
                : "flex gap-4 items-center text-[#B6C4CE] font-semibold w-[14vw] px-2 py-1"
            }
          >
            <div className="flex items-center gap-6">
              <div
                className={
                  current === "logOut"
                    ? "h-[24px] w-[3px] bg-[#129BFF]"
                    : "h-[24px] w-[3px]"
                }
              ></div>
              <i className="fi fi-br-power text-xl"></i>
            </div>
            <h1 className="text-[14px]">Log out</h1>
          </div>
        </div>
      </div>
      {/* container */}
      <div className="h-[100vh] w-[85vw]">
        {/* header */}
        <div className="h-[6vh] w-[85vw] bg-white flex items-center justify-end">
          <div className="h-10 w-auto flex items-center flex-end space-x-2 pr-10">
            <div className="h-10 flex items-center gap-2">
              <img src={userImage} alt="userImage" className="h-10" />
              <div className="justify-center w-30 truncate">
                <h3 className="text-lg">{userInfo?.name}</h3>
                <p className="text-xs font-semibold text-gray-700">
                  {userInfo?.isBrand && "Campaign Planner"}
                </p>
              </div>
              <div>
                <Menu userInfo={userInfo} />
              </div>
            </div>
          </div>
        </div>
        {/* Main container */}
        <div className="h-[92vh] w-[85vw] bg-gray-100">{children}</div>
      </div>
    </div>
  );
};
