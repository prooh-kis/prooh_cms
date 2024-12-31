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
import { Header } from "../../components/header";
import { ConformationModel } from "../../components/popup/ConformationModel";

export const AppDashBoardLayout = (props: any) => {
  const { children } = props;
  const dispatch = useDispatch<any>();
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;
  const navigate = useNavigate();
  const [current, setCurrent] = useState(props.value);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (!userInfo) {
      navigate(SIGN_IN);
    } else if (userInfo?.userRole !== USER_ROLE_PRIMARY) {
      // message.error("You have no access");
      navigate(SCREENS_LIST_FOR_SECONDARY_USER);
    }
  }, []);

  const data = [
    {
      value: "My Screens",
      path: SCREENS_LIST,
      icon: "fi fi-sr-screen text-xl",
      option: "Screens",
    },
    {
      value: "Campaigns",
      path: CAMPAIGNS_LIST,
      icon: "fi fi-sr-megaphone text-xl",
      option: "Campaigns",
    },
    {
      value: "Creatives",
      path: MY_CREATIVES,
      icon: "fi fi-sr-photo-video text-xl",
      option: "Creatives",
    },
    {
      value: "Monitoring",
      path: SCREEN_CAMPAIGN_MONITORING,
      icon: "fi fi-br-camera-movie text-xl",
      option: "Monitoring",
    },
    {
      value: "Users",
      path: USERS,
      icon: "fi fi-sr-users-alt text-xl",
      option: "Users",
    },
  ];

  const handleClick = (index: number) => {
    setCurrent(data[index].option);
    navigate(data[index].path);
  };
  const signOutHandler = () => {
    dispatch(signout());
    navigate(SIGN_IN);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="h-[100vh] w-[100vw] p-0 m-0 bg-gray-100">
      <Header />
      <ConformationModel open={open} onClose={toggleOpen} />
      <div className="flex gap-1 mt-1">
        <div className="h-[92vh] w-[15vw] overflow-scroll no-scrollbar flex flex-col bg-white">
          <div className="flex gap-4 items-center text-[#8D9DA7] font-semibold w-[14vw] px-2 py-1"></div>
          <div className="flex flex-col pt-8 justify-between h-[90vh] px-2">
            <div className="flex flex-col gap-4">
              <div
                onClick={() => {
                  setCurrent("Dashboard");
                  toggleOpen();
                }}
                className={
                  current === "Dashboard"
                    ? "flex gap-4 items-center text-[#129BFF] font-bold bg-[#ECF7FF]  w-[14vw]  px-2 py-1"
                    : "flex gap-4 items-center text-[#8D9DA7] font-semibold w-[14vw] px-2 py-1"
                }
              >
                <div className="flex items-center gap-6">
                  <div
                    className={
                      current === "Dashboard"
                        ? "h-[24px] w-[3px] bg-[#129BFF]"
                        : "h-[24px] w-[3px]"
                    }
                  ></div>
                  <i className="fi fi-sr-time-fast text-xl"></i>
                </div>
                <h1 className="text-[14px]">Quick Upload</h1>
              </div>
              {data?.map((d: any, index: number) => (
                <div
                  key={index}
                  onClick={() => handleClick(index)}
                  className={
                    current === d.option
                      ? "flex gap-4 items-center text-[#129BFF] font-bold bg-[#ECF7FF]  w-[14vw]  px-2 py-1"
                      : "flex gap-4 items-center text-[#8D9DA7] font-semibold w-[14vw] px-2 py-1"
                  }
                >
                  <div className="flex items-center gap-6">
                    <div
                      className={
                        current === d.option
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
                  ? "flex gap-4 items-center text-[#129BFF] font-bold bg-[#ECF7FF]  w-[14vw]  px-2 py-1"
                  : "flex gap-4 items-center text-[#8D9DA7] font-semibold w-[14vw] px-2 py-1"
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
        <div className="h-[92vh] w-[85vw]">{children}</div>
      </div>
    </div>
  );
};
