import { message } from "antd";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { useLocation, useNavigate } from "react-router-dom";
import { getAllScreensDetailsAction, getScreenCampaignsDetailsAction, getScreenDetailsAction } from "../../actions/screenAction";
import { ScreenListThumbnail } from "../../components/molecules/ScreenListThumbnail";
import { Loading } from "../../components/Loading";
import { convertDataTimeToLocale, getNumberOfDaysBetweenTwoDates, getTimeDifferenceInMin } from "../../utils/dateAndTimeUtils";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { LoopSettingPopup } from "../../components/popup/LoopSettingPopup";
import { BrandCampaignScreenDetails } from "../../components/molecules/BrandCampaignScreenDetails";

const allTabs = [{
  id: "1",
  label: "Active",
  value: "Active"
},{
  id: "2",
  label: "Upcoming",
  value: "Pending"

},{
  id: "3",
  label: "Paused",
  value: "Pause"

},{
  id: "4",
  label: "Completed",
  value: "Completed"

},{
  id: "5",
  label: "Deleted",
  value: "Deleted"

}];


export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const {pathname} = useLocation();
  const screenId = pathname?.split("/")?.length > 2
  ? pathname?.split("/")?.splice(2)[0]
  : null;

  const [currentTab, setCurrentTab] = useState<any>("1");
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [openLoopSetting, setOpenLoopSetting] = useState<any>(false);


  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const screenDetailsGet = useSelector((state: any) => state.screenDetailsGet);
  const {
    loading, error, data: screen
  } = screenDetailsGet;

  const screenCampaignsDetailsGet = useSelector((state: any) => state.screenCampaignsDetailsGet);
  const {
    loading: loadingCampaigns, error: errorCampaigns, data: campaigns
  } = screenCampaignsDetailsGet;

  
  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!")
    }
    dispatch(getScreenDetailsAction({screenId: screenId}));
    dispatch(getScreenCampaignsDetailsAction({
      screenId: screenId,
      status: ["Active", "Pause"]
    }));
  },[dispatch, userInfo]);

  const getScreenClassName = (screen: any) => {
    if (screen?.screenCode) {
      if (getTimeDifferenceInMin(screen?.lastActive) < 10)
        return "border w-3 h-3 bg-green-500 rounded-full justify-end";
      else return "border w-3 h-3 bg-yellow-500 rounded-full justify-end";
    } else return "border w-3 h-3 bg-red-500 rounded-full justify-end";
  };

  const handleLoopSettingClick = () => {
    setOpenLoopSetting(!openLoopSetting);
  };

  return (
    <div className="mt-6 w-full h-full py-2">
      <div className="w-full grid grid-cols-12 gap-2">
        {openLoopSetting && loading ? (
          <Loading />
        ) : (
          <LoopSettingPopup allTabs={allTabs} openLoopSetting={openLoopSetting} campaigns={campaigns}/>
        )}
        {loading ? (
          <div className="">
            <Loading />
          </div>
        ) : (
          <div className="col-span-8">
            <div className="w-full border rounded flex justify-between py-2 mt-2">
              <div className="flex">
                <i
                  className="fi fi-sr-angle-small-left text-[#7C8E9B] px-1 flex items-center"
                  onClick={() => navigate(-1)}
                ></i>
                <div className="flex justify-center items-center">
                  <img className="h-16 rounded" src={screen?.images[0]} alt={screen?._id} />
                  <div className="h-full flex justify-end items-end ml-[-8px]">
                    <div className={getScreenClassName(screen)} />
                  </div>
                </div>
                <div className="px-2 pb-1 flex flex-col justify-between">
                  <h1 className="text-[14px] font-semibold">{screen?.screenName}</h1>
                  <h2 className="text-[12px]">{screen?.location}, {screen?.city}</h2>
                  <p className="text-[12px]">Last Active {getTimeDifferenceInMin(screen?.lastActive)} minutes ago</p>
                </div>
              </div>
              <div className="px-4 flex h-auto gap-8">
                <i className="fi fi-br-refresh text-gray-500"></i>
                <i className="fi fi-sr-eye text-gray-500"></i>
              </div>        
            </div>
            <div className="border rounded my-2">
              <div className="px-4 pt-4 pb-2 flex justify-between">
                <h1 className="text-[16px] font-semibold">Campaigns</h1>
                <PrimaryButton action={handleLoopSettingClick} title="Set Loop" rounded="rounded-full" textSize=""height="h-8" width="h-16" reverse={true}/>
              </div>
              <div className="flex items-center px-4">
                <TabWithoutIcon
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                  tabData={allTabs}
                />
              </div>
              <div className="flex items-center p-4">
                <PrimaryInput
                  inputType="text"
                  placeholder="Search"
                  height="h-8"
                  value={searchQuery}
                  action={setSearchQuery}
                />
              </div>
              {loadingCampaigns ? (
                <Loading />
              ) : (
              <div className="w-full">
                {campaigns
                  && campaigns?.[allTabs?.filter((t: any) => t.id === currentTab)[0]?.value]
                  && Object.keys(campaigns?.[allTabs?.filter((t: any) => t.id === currentTab)[0]?.value])?.map((brandName: any, index: any) => (
                  <div key={index} className="px-2" onClick={() => setSelectedCampaign(brandName)}>
                    <BrandCampaignScreenDetails
                      brandName={brandName}
                      campaigns={campaigns}
                      allTabs={allTabs}
                      currentTab={currentTab}
                      showIcons={true}
                    />
                  </div>
                ))}
              </div> 
              )}

            </div>
          </div>
        )}
        {loadingCampaigns ? (
          <Loading />
        ) : campaigns && selectedCampaign ? (
          <div className="col-span-4 border rounded my-2">
            <div className="border-b p-2">
              <div className="flex justify-between items-center">
                <h1 className="text-[16px] font-semibold">{campaigns?.[allTabs?.filter((t: any) => t.id === currentTab)[0]?.value][selectedCampaign]?.[0]?.name}</h1>
                <div className="flex gap-2">
                  <div className="text-gray-500 hover:text-green-500">
                    <i className="fi fi-sr-trash"></i>
                  </div>
                  <div className="text-gray-500 hover:text-red-500">
                    <i className="fi fi-sr-eye"></i>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-[14px]">{campaigns?.[allTabs?.filter((t: any) => t.id === currentTab)[0]?.value][selectedCampaign]?.brandName}</h1>
                <h1 className="text-[12px]">Ends in: {getNumberOfDaysBetweenTwoDates(new Date(), campaigns?.[allTabs?.filter((t: any) => t.id === currentTab)[0]?.value][selectedCampaign]?.endDate) <= 0 ? "Already Ended" : `${getNumberOfDaysBetweenTwoDates(new Date(), campaigns?.[allTabs?.filter((t: any) => t.id === currentTab)[0]?.value][selectedCampaign]?.endDate)} days`} </h1>
              </div>
            </div>
            <div className="p-2">
              <h1 className="text-[16px] font-semibold">Creatives</h1>
   
                {campaigns?.[allTabs?.filter((t: any) => t.id === currentTab)[0]?.value][selectedCampaign]?.creatives.standardDayTimeCreatives?.map((creative: any, j: any) => (
                  <div key={j} className="p-1 relative">
                    <div className="absolute top-0 right-1 flex justify-end mt-[20px]">
                      <div className="flex justify-end rounded p-1 w-16 gap-4 bg-[#D7D7D750]">
                        <div className="text-white hover:text-green-500">
                          <i className="fi fi-sr-file-edit"></i>
                        </div>
                        <div className="text-white hover:text-green-500">
                          <i className="fi fi-sr-trash"></i>
                        </div>
                      </div>
                    </div>

                    <img className="rounded my-2" src={creative.url} alt="" />
                    <h1 className="text-[14px]">{campaigns?.[allTabs?.filter((t: any) => t.id === currentTab)[0]?.value][selectedCampaign]?.name}</h1>
                    <p className="text-[12px]">{campaigns?.[allTabs?.filter((t: any) => t.id === currentTab)[0]?.value][selectedCampaign]?.creatives.creativeDuration} seconds, {creative.type}</p>
                  </div>
                ))}
            </div>
          </div>
        ): null}
      </div>

    </div>
  );
};
