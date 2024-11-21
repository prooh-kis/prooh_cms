import { message } from "antd";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { useNavigate } from "react-router-dom";
import { getAllScreensDetailsAction, getScreenCampaignsDetailsAction } from "../../actions/screenAction";
import { ScreenListThumbnail } from "../../components/molecules/ScreenListThumbnail";
import { Loading } from "../../components/Loading";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_SCREENS_LIST } from "../../constants/localStorageConstants";
import { convertDataTimeToLocale, getAllDatesBetween, getTimeDifferenceInMin } from "../../utils/dateAndTimeUtils";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { ScreenListMonitoringView } from "../../components/molecules/ScreenListMonitoringView";
import { CampaignListMonitoringView } from "../../components/molecules/CampaignListMonitoringView";
import { CalendarPopup } from "../../components/popup/CalendarPopup";

export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const [allDates, setAllDates] = useState<any>([])
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [monitoringScreen, setMonitoringScreen] = useState<any>(null);
  const [monitoringCampaign, setMonitoringCampaign] = useState<any>(null);
  const [monitoringDate, setMonitoringDate] = useState<any>(new Date().toLocaleDateString());

  const [openCalendarPopup, setOpenCalendarPopup] = useState<any>(false);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allScreensDataGet = useSelector((state: any) => state.allScreensDataGet);
  const {
    loading, error, data: allScreens
  } = allScreensDataGet;

  const screenCampaignsDetailsGet = useSelector((state: any) => state.screenCampaignsDetailsGet);
  const {
    loading: loadingCampaigns, error: errorCampaigns, data: campaigns
  } = screenCampaignsDetailsGet;


  
  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!")
    }
    dispatch(getAllScreensDetailsAction({userId: userInfo._id}));
  },[dispatch, userInfo]);

  const handleScreenClick = ({screen}: any) => {
    setMonitoringScreen(screen);
    dispatch(getScreenCampaignsDetailsAction({
      screenId: screen._id,
      status: ["Active", "Pause"]
    }));
  }

  const handleCampaignClick = ({campaign}: any) => {
    setMonitoringCampaign(campaign);
    console.log(getAllDatesBetween(campaign.startDate, campaign.endDate))
    setAllDates(() => {
      return getAllDatesBetween(campaign.startDate, campaign.endDate)
    });
  }

  console.log(allDates);
  
  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      {openCalendarPopup && (
        <div className="p-1 overflow-scroll">
          <CalendarPopup
            onClose={() => setOpenCalendarPopup(false)}
            dates={allDates}
            monitoringDate={monitoringDate}
            setMonitoringDate={setMonitoringDate}
            openCalendarPopup={openCalendarPopup}
          />
        </div>

      )}
      <div className="w-full h-full py-1">
        <div className="border rounded p-4 w-full">
          <h1 className="text-[16px] font-semibold">
            Campaign Monitoring
          </h1>
        </div>
        <div className="grid grid-cols-12 gap-2 py-2">
          <div className="col-span-3 border rounded">
            <div className="w-full p-2">
              <PrimaryInput
                inputType="text"
                placeholder="Screen Name"
                value={searchQuery}
                action={setSearchQuery}
                height="h-8"
              />
            </div>
            {loading ? (
              <Loading />
            ) : (
              <div className="p-1 overflow-scroll h-[75vh]">
                {getDataFromLocalStorage(ALL_SCREENS_LIST)?.list?.map((data: any, index: any) => (
                  <div key={index} onClick={() => handleScreenClick({screen: data})}>
                    <ScreenListMonitoringView screen={data} noImages={true} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-3 border rounded">
            <div className="w-full p-2">
              <PrimaryInput
                inputType="text"
                placeholder="Brand Name"
                value={searchQuery}
                action={setSearchQuery}
                height="h-8"
              />
            </div>
            {loadingCampaigns ? (
              <Loading />
            ) : (
              <div className="p-1 overflow-scroll h-[75vh]">
                {campaigns && Object.keys(campaigns).length > 0 ? Object.keys(campaigns?.["Active"])?.map((brandName: any, index: any) => (
                  <div key={index} className="px-2" onClick={() => {
                    console.log(campaigns?.["Active"]?.[brandName]);
                    handleCampaignClick({campaign: campaigns?.["Active"]?.[brandName]})
                    
                  }}>
                    <CampaignListMonitoringView
                      campaign={campaigns?.["Active"]?.[brandName]}
                      noImages={true}
                    />
                  </div>
                )) : (
                  <div className="p-4 text-[12px]">
                    No Campaigns Found
                  </div>
                )}
                
              </div>
            )}
          </div>
          <div className="col-span-6 border rounded">
            <div className="flex justify-between items-center border-b">
              <div className="p-4 flex items-end gap-1">
                <h1 className="text-[12px]">{monitoringScreen ? monitoringScreen?.screenName : "Screen "}{">"}</h1>
                <h1 className="text-[12px] font-semibold">{monitoringCampaign ? ` ${monitoringCampaign?.brandName}` : "Brand"}</h1>
              </div>
              <div className="flex gap-2 items-center p-4" onClick={() => setOpenCalendarPopup(true)}>
                <i className="fi fi-sr-calendar-lines text-[12px] flex items-center"></i>
                <h1 className="text-[12px]">{allDates.length} Days</h1>
              </div>
            </div>
            <div className="border-b p-2 flex justify-between items-center">
              <h1 className="text-[12px] font-semibold">{monitoringDate}</h1>
              <PrimaryButton
                title="Save"
                height="h-8"
                width="w-auto"
                textSize="text-[12px]"
                rounded="rounded-full"
              />
            </div>
            <div className="h-auto">
              <div className="p-2">
                <h1 className="text-[12px] font-semibold">Upload Day Pictures</h1>
                <div className="grid grid-cols-4 gap-4 my-2">
                  <div className="col-span-1">
                    <div className="border border-dotted bg-gray-100 rounded h-24">

                    </div>
                    <h1 className="text-[10px] text-gray-500 m-1">Video</h1>
                  </div>
                  <div className="col-span-1">
                    <div className="border border-dotted bg-gray-100 rounded h-24">

                    </div>
                    <h1 className="text-[10px] text-gray-500 m-1">Image</h1>
                  </div>
                  <div className="col-span-1">
                    <div className="border border-dotted bg-gray-100 rounded h-24">

                    </div>
                    <h1 className="text-[10px] text-gray-500 m-1">Geotag</h1>
                  </div>
                  <div className="col-span-1">
                    <div className="border border-dotted bg-gray-100 rounded h-24">
                    </div>
                    <h1 className="text-[10px] text-gray-500 m-1">Newpaper</h1>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <h1 className="text-[12px] font-semibold">Upload Day Pictures</h1>
                <div className="grid grid-cols-4 gap-4 my-2">
                  <div className="col-span-1">
                    <div className="border border-dotted bg-gray-100 rounded h-24">

                    </div>
                    <h1 className="text-[10px] text-gray-500 m-1">Video</h1>
                  </div>
                  <div className="col-span-1">
                    <div className="border border-dotted bg-gray-100 rounded h-24">

                    </div>
                    <h1 className="text-[10px] text-gray-500 m-1">Image</h1>
                  </div>
                  <div className="col-span-1">
                    <div className="border border-dotted bg-gray-100 rounded h-24">

                    </div>
                    <h1 className="text-[10px] text-gray-500 m-1">Geotag</h1>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <h1 className="text-[12px] font-semibold">Miscelleneous Pictures</h1>
                <div className="grid grid-cols-4 gap-4 my-2">
                  <div className="col-span-1">
                    <div className="border border-dotted bg-gray-100 rounded h-24">

                    </div>
                    <h1 className="text-[10px] text-gray-500 m-1">Video</h1>
                  </div>
                  <div className="col-span-1">
                    <div className="border border-dotted bg-gray-100 rounded h-24">

                    </div>
                    <h1 className="text-[10px] text-gray-500 m-1">Image</h1>
                  </div>
                  <div className="col-span-1">
                    <div className="border border-dotted bg-gray-100 rounded h-24">

                    </div>
                    <h1 className="text-[10px] text-gray-500 m-1">Geotag</h1>
                  </div>
                  <div className="col-span-1">
                    <div className="border border-dotted bg-gray-100 rounded h-24">
                    </div>
                    <h1 className="text-[10px] text-gray-500 m-1">Newpaper</h1>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

        </div>
        
      </div>
    </div>
  );
};
