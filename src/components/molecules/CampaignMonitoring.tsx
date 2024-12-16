import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import {
  CalendarPopup,
  MonitoringPictures,
  NoDataView,
} from "../../components";
import { getAllDatesBetween } from "../../utils/dateAndTimeUtils";
import { TabWithoutIcon } from "./TabWithoutIcon";
import { campaignMonitoringTab } from "../../constants/tabDataConstant";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getScreenCampaignsMonitoringAction } from "../../actions/screenAction";

export const CampaignMonitoring = (props: any) => {
  const dispatch = useDispatch<any>();
  const { campaign, screenId } = props;
  const [isShow, setShow] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [openCalendarPopup, setOpenCalendarPopup] = useState<any>(false);
  const [monitoringDate, setMonitoringDate] = useState<Date>(new Date());
  const [allDates, setAllDates] = useState<any>([]);
  const [monitoringTime, setMonitoringTime] = useState<any>("day");

  const getScreenCampaignMonitoring = useSelector(
    (state: any) => state.getScreenCampaignMonitoring
  );
  const {
    loading: loadingGetScreenCampaignMonitoring,
    error: errorGetScreenCampaignMonitoring,
    success: successGetScreenCampaignMonitoring,
    data: screenCampaignMonitoring,
  } = getScreenCampaignMonitoring;

  const handleCampaignClick = () => {
    setAllDates(() => {
      return getAllDatesBetween(campaign.startDate, campaign.endDate);
    });
  };

  const handleSetCurrentTab = (id: string) => {
    setCurrentTab(id);
    switch (id) {
      case "1":
        setMonitoringTime("day");
        break;
      case "2":
        setMonitoringTime("night");
        break;
      case "3":
        setMonitoringTime("misc");
        break;
      default:
        setMonitoringTime("day");
        break;
    }
  };

  const handleCallGetScreenCampaignMonitoring = useCallback(() => {
    if (campaign?._id && screenId) {
      dispatch(
        getScreenCampaignsMonitoringAction({
          screenId,
          campaignId: campaign?._id,
          date: monitoringDate,
        })
      );
    }
  }, [campaign, screenId]);

  const handleClick = useCallback(
    (value: boolean) => {
      setShow(value);
    },
    [isShow]
  );

  useEffect(() => {
    if (campaign && screenId) {
      handleCallGetScreenCampaignMonitoring();
      handleCampaignClick();
    }
  }, [props]);

  const handleDateChange = (date: Date) => {
    setMonitoringDate(date);
    dispatch(
      getScreenCampaignsMonitoringAction({
        screenId,
        campaignId: campaign?._id,
        date: date,
      })
    );
  };

  return (
    <div className="w-full p-4">
      {openCalendarPopup && (
        <div className="p-1 overflow-scroll no-scrollbar">
          <CalendarPopup
            onClose={() => setOpenCalendarPopup(false)}
            dates={allDates}
            monitoringDate={monitoringDate}
            setMonitoringDate={handleDateChange}
            openCalendarPopup={openCalendarPopup}
          />
        </div>
      )}
      <div className="flex justify-between">
        <h1 className="text-[16px] font-semibold">Campaign Monitoring</h1>
        {isShow ? (
          <i
            className="fi fi-br-angle-small-down"
            onClick={() => handleClick(false)}
          ></i>
        ) : (
          <i
            className="fi fi-rr-angle-small-up"
            onClick={() => handleClick(true)}
          ></i>
        )}
      </div>
      {isShow && (
        <div>
          <div className="flex justify-end ">
            <div
              className="border border-1 py-2 px-4 text-blue-500 text-[14px] cursor-pointer flex gap-2 items-center rounded-md"
              title="click to change date"
              onClick={() => setOpenCalendarPopup(true)}
            >
              <i className="fi fi-rr-calendar-lines-pen"></i>
              {moment(monitoringDate).format("DD-MM-YYYY")}
            </div>
          </div>

          {loadingGetScreenCampaignMonitoring ? (
            <h1 className="w-full py-1 px-4 border border-1 border-yellow-500 bg-yellow-100 text-[#000000] rounded-md mt-2">
              Loading Data...., please wait
            </h1>
          ) : !screenCampaignMonitoring ? (
            <NoDataView />
          ) : (
            <div>
              <TabWithoutIcon
                currentTab={currentTab}
                setCurrentTab={handleSetCurrentTab}
                tabData={campaignMonitoringTab}
              />
              <div className="h-auto pt-2">
                <div className="w-full">
                  <MonitoringPictures
                    isUsedForShow={true}
                    handleUploadClick={() => {}}
                    time={monitoringTime}
                    setMonitoringMedia={() => {}}
                    setMonitoringTime={() => {}}
                    monitoringData={screenCampaignMonitoring}
                    screenId={screenCampaignMonitoring?.screenId}
                    campaignId={screenCampaignMonitoring?.campaignId}
                    setFileType={() => {}}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
