import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { useDispatch, useSelector } from "react-redux";
import { ShowCampaignLogsPopup } from "../popup/ShowCampaignLogsPopup";
import {
  calculateDaysPlayed,
  convertIntoDateAndTime,
  getTimeDifferenceInMin,
} from "../../utils/dateAndTimeUtils";
import { message, Tooltip } from "antd";
import { downloadExcel2 } from "../../utils/ExcelUtils";
import axios from "axios";
import { LinearBar } from "../molecules/linearbar";
import SiteLevelComponent from "../../pages/NewDashBoard/SiteLevelComponent";
import { ShowMonitoringPicPopup } from "../popup/ShowMonitoringPicPopup";
import { getSiteBasedDataOnLogsPageAction } from "../../actions/dashboardAction";
import { getUserRole } from "../../utils/campaignUtils";

const analyticsV1 = `${process.env.REACT_APP_PROOH_SERVER}/api/v1/analytics`;

interface CostSummaryTableProps {
  filteredScreenLevelData?: any;
  campaignDetails?: any;
  screenLevelData?: any;
  setFilters?: any;
  filters?: any;
  setCurrentDay?: any;
  currentDay?: any;
  setCurrentWeek?: any;
  currentWeek?: any;
  setCurrentDate?: any;
  currentDate?: any;
  setCalendarData?: any;
  calendarData?: any;
  showPercent?: any;
  setShowPercent?: any;
  allDates?: any;
  openSiteLevelLogsPopup?: any;
  setOpenSiteLevelLogsPopup?: any;
  openSiteLevelMonitoringPicsPopup?: any;
  setOpenSiteLevelMonitoringPicsPopup?: any;
}

interface PercentageDisplayProps {
  delivered: number;
  promised: number;
  options?: {
    isTillDate?: boolean;
    campaignDays?: number;
    totalDays?: number;
  };
  className?: string;
}

export const calculatePercentageDifference = (
  delivered: number,
  promised: number,
  options?: {
    isTillDate?: boolean;
    campaignDays?: number;
    totalDays?: number;
  }
): { value: number; isPositive: boolean } => {
  if (promised === 0) return { value: 0, isPositive: false };

  // const effectiveDelivered = options?.isTillDate
  //   ? delivered / (options.campaignDays || 1)
  //   : delivered;

  // const effectivePromised = options?.isTillDate
  //   ? promised / (options.totalDays || 1)
  //   : promised;

  const difference = delivered - promised;
  const percentage = Number(((difference / promised) * 100).toFixed(2));

  return {
    value: percentage,
    isPositive: percentage > 0,
  };
};

const PercentageDisplay: React.FC<PercentageDisplayProps> = ({
  delivered,
  promised,
  options,
  className = "",
}) => {
  const { value, isPositive } = calculatePercentageDifference(
    delivered,
    promised,
    options
  );

  return (
    <p
      className={`text-[10px] ${
        isPositive ? "text-[#2A892D]" : "text-[#CC0000]"
      } ${className}`}
    >
      {`(${value}%)`}
      <i className={`fi fi-rr-arrow-${isPositive ? "up" : "down"}`}></i>
    </p>
  );
};

const getScreenClassName = (lastActive: any) => {
  if (lastActive) {
    if (getTimeDifferenceInMin(lastActive) < 15)
      return "border w-4 h-4 bg-[#348730] rounded-full justify-end";
    else return "border w-4 h-4 bg-[#ffec33] rounded-full justify-end";
  } else return "border w-4 h-4 bg-[#ff3333] rounded-full justify-end";
};

const getScreenStatus = (lastActive: any) => {
  if (lastActive) {
    if (getTimeDifferenceInMin(lastActive) < 15) return "Active";
    else return "Close";
  } else return "Close";
};

export const CampaignDashboardTable = ({
  filteredScreenLevelData,
  campaignDetails,
  screenLevelData,
  setCurrentDay,
  currentDay,
  setCurrentWeek,
  currentWeek,
  setCurrentDate,
  currentDate,
  setCalendarData,
  calendarData,
  allDates,
  openSiteLevelLogsPopup,
  setOpenSiteLevelLogsPopup,
  openSiteLevelMonitoringPicsPopup,
  setOpenSiteLevelMonitoringPicsPopup,
}: CostSummaryTableProps) => {
  const dispatch = useDispatch<any>();
  const [isDownLoad, setIsDownload] = useState<string>("");

  const [currentIndex, setCurrentIndex] = useState<any>(null);
  const [key, setKey] = useState<any>(-1);
  const [currentScreen, setCurrentScreen] = useState<any>(null);

  const {
    loading: loadingLogs,
    error: errorLogs,
    data: logs,
  } = useSelector((state: any) => state.campaignLogsGet);

  const {
    loading: loadingSiteBasedDataOnLogs,
    error: errorSiteBasedDataOnLogs,
    data: siteBasedData,
  } = useSelector((state: any) => state.siteBasedDataOnLogsPage);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    if (campaignDetails?.startDate && campaignDetails?.endDate) {
      const start = new Date(campaignDetails.startDate);
      const today = new Date();

      if (today < start) {
        setCurrentDay(1);
        setCurrentWeek(1);
      } else {
        const daysPassed =
          Math.floor(
            (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
          ) + 1;
        setCurrentDay(daysPassed % 7);
        setCurrentWeek(Math.ceil(daysPassed / 7));
      }
    }
    if (currentIndex === null) {
      setKey(-1);
    }
  }, [campaignDetails, setCurrentDay, setCurrentWeek, currentIndex]);

  const onClose = () => {
    setOpenSiteLevelLogsPopup(false);
    setOpenSiteLevelMonitoringPicsPopup(false);
    setCurrentScreen(null);
  };

  const downloadLogs = async (campaignId: string) => {
    try {
      message.info("Start fetching data, it will take some time");
      setIsDownload(campaignId);
      const { data } = await axios.get(
        `${analyticsV1}/downloadAllCampaignLogs?campaignId=${campaignId}`
      );
      await downloadExcel2({
        campaign: data?.campaign,
        campaignLog: data?.logs,
      });
      message.success("Downloaded success full!");
      setIsDownload("");
    } catch (error: any) {
      message.error(error.message);
      setIsDownload("");
    }
  };

  const downloadFileFromUrl = (fileUrl: string, fileName: string) => {
    if (!fileUrl) {
      message.error("You can download logs from tomorrow");
      return;
    }

    const campaignEndDate = campaignDetails?.endDate
      ? new Date(campaignDetails.endDate)
      : null;

    if (campaignEndDate && new Date() > campaignEndDate) {
      message.info("Downloading all logs, please wait for some time...");
    } else {
      message.info(
        "Logs till yesterday will be downloaded as the campaign is still live today..."
      );
    }

    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const campaignDays =
    calculateDaysPlayed(campaignDetails?.startDate, campaignDetails?.endDate) ||
    1;
  const totalDays = campaignDetails?.duration || 1;

  return (
    <div>
      <ShowMonitoringPicPopup
        onClose={onClose}
        open={openSiteLevelMonitoringPicsPopup}
        currentSite={currentScreen || []}
      />
      <ShowCampaignLogsPopup
        logs={logs}
        siteBasedDataOnLogs={siteBasedData}
        loading={loadingLogs || loadingSiteBasedDataOnLogs}
        open={openSiteLevelLogsPopup}
        onClose={onClose}
        calendarData={calendarData}
        campaignDetails={campaignDetails}
        screenCampaignData={currentScreen}
        setCurrentDay={setCurrentDay}
        setCurrentWeek={setCurrentWeek}
        currentDay={currentDay}
        currentWeek={currentWeek}
        allDates={allDates}
        setCurrentDate={setCurrentDate}
        currentDate={currentDate}
        isDownLoad={isDownLoad}
        downloadLogs={downloadLogs}
      />
      <table className="table-auto w-full">
        <thead className="bg-[#EFF9FF] text-[#707070] font-medium rounded-[6px] w-full flex justify-between items-center border-x border-gray-100">
          <tr className="overflow-auto no-scrollbar flex grid grid-cols-12 w-full items-center h-[40px] truncate">
            <th className="w-full flex items-center justify-center truncate col-span-3 truncate">
              <h1 className="text-[14px] truncate">Screen Name</h1>
            </th>
            <th className="w-full flex items-center justify-center col-span-1 truncate">
              <h1 className="text-[14px] truncate">Location</h1>
            </th>
            <th className="w-full flex items-center justify-center col-span-2 truncate">
              <h1 className="text-[14px] truncate">Touch point</h1>
            </th>
            <th className="w-full flex items-center justify-center col-span-1 truncate">
              <h1 className="text-[14px] truncate">Slots Played</h1>
            </th>
            <th className="w-full flex items-center justify-center col-span-1 truncate">
              <h1 className="text-[14px] truncate">Impressions</h1>
            </th>
            <th className="w-full flex items-center justify-center col-span-1 truncate">
              <h1 className="text-[14px] truncate">Cost</h1>
            </th>
            <th className="w-full flex items-center justify-center col-span-1 truncate">
              <h1 className="text-[14px] truncate">Delivery</h1>
            </th>
            <th className="w-full flex items-center justify-center col-span-2 truncate">
              <h1 className="text-[14px] truncate">Action</h1>
            </th>
          </tr>
        </thead>
        <tbody className="max-h-[250px] overflow-scroll">
          {filteredScreenLevelData.map((screenData: any, index: number) => (
            <React.Fragment key={index}>
              <tr
                key={screenData}
                className={`grid grid-cols-12 bg-[#FFFFFF] flex w-full h-[40px] hover:bg-gray-50 hover:rounded-[12px] border-b border-x border-gray-100 shadow-sm text-[#0E212E] truncate cursor-pointer
                  ${
                    index == filteredScreenLevelData.length - 1 || index === key
                      ? "rounded-b-[12px]"
                      : currentIndex !== null && index === key + 1
                      ? "rounded-t-[12px]"
                      : ""
                  }
                  `}
              >
                <td className="w-full flex items-center justify-start gap-4 col-span-3 grid grid-cols-8 pl-4 truncate">
                  <p className="text-[12px] col-span-1">
                    {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                  </p>

                  <Tooltip
                    title={`${getScreenStatus(
                      screenData?.lastActive
                    )}, ${convertIntoDateAndTime(screenData?.lastActive)} `}
                  >
                    <div
                      className={`${getScreenClassName(
                        screenData?.lastActive
                      )} col-span-1`}
                    />
                  </Tooltip>
                  <p className="text-[12px] truncate px-1 col-span-6">
                    {screenData?.screenName}
                  </p>
                </td>

                <td className="w-full flex items-center justify-center truncate col-span-1 truncate">
                  <p className="text-[12px] truncate">{screenData?.location}</p>
                </td>
                <td className="w-full flex items-center justify-center truncate col-span-2 truncate">
                  <p className="text-[12px] truncate">
                    {screenData?.touchPoint}
                  </p>
                </td>
                <td className="w-full flex items-center justify-center col-span-1 truncate">
                  <div className="flex flex-row justify-center items-center gap-1 truncate">
                    <p className="text-[12px] truncate">
                      {formatNumber(screenData?.slotsDelivered)}
                    </p>
                    <PercentageDisplay
                      delivered={screenData?.slotsDelivered}
                      promised={screenData?.slotsPromisedTillDate}
                      options={{
                        isTillDate: true,
                        campaignDays,
                        totalDays,
                      }}
                    />
                  </div>
                </td>
                <td className="w-full flex items-center justify-center col-span-1 truncate">
                  <div className="flex flex-row justify-center items-center gap-1 truncate">
                    <p className="text-[12px] truncate">
                      {formatNumber(
                        screenData?.impressionsDelivered?.toFixed(0)
                      )}
                    </p>
                    <PercentageDisplay
                      delivered={screenData?.impressionsDelivered}
                      promised={screenData?.impressionsPromisedTillDate}
                      options={{
                        isTillDate: true,
                        campaignDays,
                        totalDays,
                      }}
                    />
                  </div>
                </td>
                <td className="w-full flex items-center justify-center col-span-1 truncate">
                  <div className="flex flex-row justify-center items-center gap-1 truncate">
                    <p className="text-[12px] truncate">
                      {formatNumber(screenData?.costConsumed?.toFixed(0))}
                    </p>
                    <PercentageDisplay
                      delivered={screenData?.costConsumed}
                      promised={screenData?.costTakenTillDate}
                      options={{
                        isTillDate: true,
                        campaignDays,
                        totalDays,
                      }}
                    />
                  </div>
                </td>
                <td className="w-full flex items-center justify-center gap-1 col-span-1 truncate">
                  <div className="w-[28px]">
                    <LinearBar
                      value={
                        (screenData?.slotsDelivered * 100) /
                        screenData?.slotsPromised
                      }
                      colors={["#D9D9D9", "#2A892D"]}
                      highest={100}
                      percent={false}
                    />
                  </div>
                  <p className="text-[12px] truncate">
                    {(
                      (screenData?.slotsDelivered * 100) /
                      screenData?.slotsPromised
                    )?.toFixed(0)}
                    %
                  </p>
                </td>
                <td className="w-full flex items-center justify-center col-span-2 truncate">
                  <div className="flex gap-4">
                    <Tooltip title="Show site level analysis">
                      <i
                        className="fi fi-rs-chart-histogram text-[12px] text-[#129BFF]"
                        title="Analytic"
                        onClick={() => {
                          setKey(index);
                          setCurrentIndex(
                            currentIndex === screenData?.campaignId
                              ? null
                              : screenData?.campaignId
                          );
                        }}
                      ></i>
                    </Tooltip>
                    <Tooltip title="View Monitoring Pics">
                      <i
                        className="fi fi-sr-picture text-[12px] text-[#129BFF]"
                        onClick={() => {
                          setCurrentScreen(screenData);
                          setOpenSiteLevelMonitoringPicsPopup(true);
                        }}
                      ></i>
                    </Tooltip>
                    <Tooltip title="View Logs">
                      <i
                        className={`fi fi-sr-eye text-[12px] text-[#129BFF]`}
                        onClick={() => {
                          setCurrentScreen(screenData);
                          setCalendarData(screenData.slotDataDateWise);
                          dispatch(
                            getSiteBasedDataOnLogsPageAction({
                              campaignId: screenData?.campaignId,
                              userRole: getUserRole(userInfo?.userRole),
                              userId: userInfo?._id,
                            })
                          );
                          setOpenSiteLevelLogsPopup(true);
                        }}
                      ></i>
                    </Tooltip>
                    <Tooltip title="Download logs in one click">
                      <i
                        className={`fi fi-sr-download text-[12px] ${
                          isDownLoad == screenData?.campaignId
                            ? "text-gray-400"
                            : "text-[#129BFF]"
                        }`}
                        onClick={() => {
                          downloadFileFromUrl(
                            screenData.logUrl,
                            `${screenData?.screenName}`
                          );
                        }}
                      ></i>
                    </Tooltip>
                  </div>
                </td>
              </tr>
              {currentIndex === screenData?.campaignId && (
                <tr className="">
                  <td className="w-full">
                    <SiteLevelComponent
                      screenData={screenData}
                      screenLevelData={screenLevelData}
                      currentDate={currentDate}
                      handleCancel={() => {
                        setCurrentIndex(
                          currentIndex === screenData?.campaignId
                            ? null
                            : screenData?.campaignId
                        );
                      }}
                      campaignDetails={campaignDetails}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
