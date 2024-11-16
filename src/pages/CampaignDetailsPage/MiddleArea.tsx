import { message } from "antd";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { useLocation, useNavigate } from "react-router-dom";
import { ScreenListThumbnail } from "../../components/molecules/ScreenListThumbnail";
import { Loading } from "../../components/Loading";
import { convertDataTimeToLocale, getNumberOfDaysBetweenTwoDates, getTimeDifferenceInMin } from "../../utils/dateAndTimeUtils";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { LoopSettingPopup } from "../../components/popup/LoopSettingPopup";
import { BrandCampaignScreenDetails } from "../../components/molecules/BrandCampaignScreenDetails";
import { getCampaignDetailsAction } from "../../actions/campaignAction";
import { generateColorFromAlphabet } from "../../utils/colorUtils";

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
  const campaignId = pathname?.split("/")?.length > 2
  ? pathname?.split("/")?.splice(2)[0]
  : null;

  const [currentTab, setCurrentTab] = useState<any>("1");
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [openLoopSetting, setOpenLoopSetting] = useState<any>(false);


  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const campaignDetailsGet = useSelector((state: any) => state.campaignDetailsGet);
  const {
    loading, error, data: campaignCreated
  } = campaignDetailsGet;

  
  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!")
    }
    dispatch(getCampaignDetailsAction({campaignId: campaignId}));
    // dispatch(getScreenCampaignsDetailsAction({
    //   screenId: screenId,
    //   status: ["Active", "Pause"]
    // }));
  },[dispatch, userInfo]);

  const getScreenClassName = (campaign: any) => {
    // if (screen?.screenCode) {
    //   if (getTimeDifferenceInMin(screen?.lastActive) < 10)
    //     return "border w-3 h-3 bg-green-500 rounded-full justify-end";
    //   else return "border w-3 h-3 bg-yellow-500 rounded-full justify-end";
    // } else return "border w-3 h-3 bg-red-500 rounded-full justify-end";
  };

  return (
    <div className="mt-6 w-full h-full py-2">
      <div className="w-full grid grid-cols-12 gap-2">
        {loading ? (
          <div className="col-span-8">
            <Loading />
          </div>
        ) : (
          <div className="col-span-8">
            <div className="w-full border rounded py-2 mt-2">
              <div className="flex justify-between pb-2 mx-1 border-b">
                <div className="flex">
                  <i
                    className="fi fi-sr-angle-small-left text-[#7C8E9B] px-1 flex items-center"
                    onClick={() => navigate(-1)}
                  ></i>
                  <div className="flex justify-center items-center">
                    <div className={
                      campaignCreated 
                        ? `rounded px-6 bg-[${generateColorFromAlphabet(campaignCreated?.brandName.split("")[0], 0)}]`
                        : `rounded px-6 bg-gray-100`
                      }>
                      <h1 className="text-[40px] text-gray-400 font-black">{campaignCreated?.brandName.split("")[0]}</h1>
                    </div>
                  </div>
                  <div className="px-2 pb-1 flex flex-col justify-between">
                    <h1 className="text-[14px] font-semibold">{campaignCreated?.campaignName}</h1>
                    <h2 className="text-[12px]">{campaignCreated?.brandName}, {campaignCreated?.duration} secs</h2>
                  </div>
                </div>
                <div className="px-4 flex h-auto gap-8">
                  <i className="fi fi-br-refresh text-gray-500"></i>
                  <i className="fi fi-sr-eye text-gray-500"></i>
                </div>   
              </div>
              <div className="px-4 p-2">
                <div className="grid grid-cols-8 gap-4">
                  <h1 className="col-span-2 text-[12px]">Start Date</h1>
                  <h1 className="col-span-3 text-[12px]">{convertDataTimeToLocale(campaignCreated?.startDate)}</h1>
                </div>
                <div className="grid grid-cols-8 gap-4">
                  <h1 className="col-span-2 text-[12px]">End Date</h1>
                  <h1 className="col-span-3 text-[12px]">{convertDataTimeToLocale(campaignCreated?.endDate)}</h1>
                </div>
              </div>
            </div>
            <div className="border rounded my-2">
              <div className="px-4 pt-4 pb-2 flex justify-between">
                <h1 className="text-[16px] font-semibold">Campaign Creatives</h1>
              </div>
              

            </div>
          </div>
        )}
        {loading ? (
          <div className="col-span-4">
            <Loading />
          </div>
        ) : (
          <div className="col-span-4 border rounded my-2">
            <div className="px-2 pt-2">
              <h1 className="text-[14px] font-semibold">Playing on {campaignCreated.screens.length} screens</h1>
            </div>
            <div className="flex items-center p-2">
              <PrimaryInput
                inputType="text"
                placeholder="Search"
                height="h-8"
                value={searchQuery}
                action={setSearchQuery}
              />
            </div>
          </div>
        )}

        

      </div>

    </div>
  );
};
