import { message, Skeleton, Tooltip } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  formatDateForLogs,
  getCampaignDurationFromStartAndEndDate,
  getTimeFromDate,
  transformToAmPm,
} from "../../utils/dateAndTimeUtils";
import { NoDataView } from "../molecules/NoDataView";
import { CalenderScaleStepper } from "../molecules/CalenderScale2";
import { useDispatch, useSelector } from "react-redux";
import { GetCampaignLogsAction } from "../../actions/campaignAction";
import { downloadExcel2 } from "../../utils/ExcelUtils";
import { MetricCard, SiteInfoHeader } from "./SiteMapViewDetailsPopup";
import { TIME_ZONES } from "../../constants/helperConstants";
import moment from "moment";

export const ShowCampaignLogsPopup = ({
  open,
  onClose,
  logs,
  siteBasedDataOnLogs,
  loading,
  calendarData,
  campaignDetails,
  setCurrentDay,
  setCurrentWeek,
  currentDay,
  currentWeek,
  allDates,
  setCurrentDate,
  currentDate,
  screenCampaignData,
}: any) => {
  const dispatch = useDispatch<any>();
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const newData = useMemo(() => {
    if (logs && logs.length > 0) {
      return logs?.reduce((accum: any, current: any) => {
        const key: any = formatDateForLogs(current?.logTime)?.logDate;
        if (!accum[key]) {
          accum[key] = [];
        }
        accum[key].push({
          time: getTimeFromDate(current?.logTime),
          creativeName: current?.mediaId?.split("_")[1] || "Unknown",
          status: current?.screenStatus,
        });
        return accum;
      }, {});
    } else {
      return [];
    }
  }, [logs]);

  const newCombinedData = useMemo(() => {
    let hrWiseLogs: any;

    if (newData && logs && logs.length > 0) {
      hrWiseLogs = logs?.reduce((result: any, item: any) => {
        const date: any = formatDateForLogs(item?.logTime)?.logDate; // Assuming today's date
        const [time, period] = item?.logTime?.split(" ");
        let [hour, minute, second] = time?.split("T")[1]?.split(":");

        if (period === "PM" && hour !== "12") {
          hour = String(Number(hour) + 12);
        } else if (period === "AM" && hour === "12") {
          hour = "00";
        }

        if (!result[date]) {
          result[date] = {};
        }

        if (!result[date][hour]) {
          result[date][hour] = [];
        }

        result[date][hour].push(item);
        return result;
      }, {});
    }

    return { hrWiseLogs: hrWiseLogs };
  }, [logs, newData]);

  const calculateAvgTimeGap = (entries: any) => {
    if (entries.length < 2) return "N/A"; // Not enough data to calculate gap

    // Sort entries by time
    const sortedEntries = [...entries].sort((a, b) => a.sortTime - b.sortTime);

    // Compute total time gap
    let totalGap = 0;
    for (let i = 1; i < sortedEntries.length; i++) {
      totalGap += sortedEntries[i].sortTime - sortedEntries[i - 1].sortTime;
    }

    // Calculate average gap in milliseconds
    const avgGapMs = totalGap / (sortedEntries.length - 1);

    // Convert to minutes and seconds
    const minutes = Math.floor(avgGapMs / 60000);
    const seconds = ((avgGapMs % 60000) / 1000).toFixed(0);

    return minutes > 0 ? `${minutes} m ${seconds} sec` : `${seconds} sec`;
  };

  useEffect(() => {
    if (screenCampaignData?.campaignId) {
      dispatch(
        GetCampaignLogsAction({
          campaignId: screenCampaignData?.campaignId,
          date:
            getCampaignDurationFromStartAndEndDate(
              currentDate,
              campaignDetails?.endDate
            ) < 0
              ? formatDateForLogs(
                  moment(
                    Math.min(
                      moment(currentDate).valueOf(),
                      moment(campaignDetails.endDate).valueOf()
                    )
                  ).format("YYYY-MM-DD hh:mm:ss")
                ).apiDate
              : formatDateForLogs(
                  moment(currentDate).format("YYYY-MM-DD hh:mm:ss")
                ).apiDate,
          // date: "13/03/2025"
        })
      );
    }
  }, [
    dispatch,
    currentDate,
    screenCampaignData?.campaignId,
    campaignDetails.endDate,
  ]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const handelDownloadLogs = () => {
    downloadExcel2({ campaign: campaignDetails, campaignLog: logs });
  };

  const metrics = [
    {
      id: "1",
      label: "Spots Delivery",
      delivered: siteBasedDataOnLogs?.slotsDelivered || 0,
      promised: siteBasedDataOnLogs?.slotsPromisedTillDate || 1,
      colors: ["#EDEDED", "#FFAC26"],
    },
    {
      id: "2",
      label: "Hardware Performance",
      delivered:
        siteBasedDataOnLogs?.hardwarePerformanceDelivered?.toFixed(2) || 0,
      promised:
        siteBasedDataOnLogs?.hardwarePerformancePromisedTillDate?.toFixed(2) ||
        1,
      colors: ["#EDEDED", "#6982FF"],
      inPercentage: true,
    },
    {
      id: "3",
      label: "Impressions",
      delivered: siteBasedDataOnLogs?.impressionsDelivered || 0,
      promised: siteBasedDataOnLogs?.impressionsPromisedTillDate || 1,
      colors: ["#EDEDED", "#129BFF"],
    },
    {
      id: "4",
      label: "Cost Consumed",
      delivered: siteBasedDataOnLogs?.costConsumed || 0,
      promised: siteBasedDataOnLogs?.costTakenTillDate || 1,
      colors: ["#EDEDED", "#01A227"],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 mt-16">
      <div
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-full max-w-full relative overflow-auto max-h-auto "
        style={{ height: "90vh", width: "95vw" }}
      >
        <div className="flex justify-end">
          <i className="fi fi-br-cross" onClick={() => onClose()}></i>
        </div>
        <div className="flex justify-between p-2">
          <div>
            <h1 className="font-semibold text-[20px] text-[#0E212E] leading-[19.36px]">
              Log Report
            </h1>
            {/* <h1>{campaign?.screenName}</h1> */}
            <h1 className="text-[14px] text-[#5B7180] leading-[16.94px] py-1">
              {campaignDetails?.name}
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            {!loading && logs?.length > 0 && (
              <button
                title="s"
                className="border border-1 py-2 px-4 rounded-lg bg-blue text-[#FFFFFF] text-[12px] font-custom font-semibold hover:bg-[#129BFF] text-center"
                onClick={handelDownloadLogs}
              >
                <i className="fi fi-sr-file-download pr-4"></i>
                Download Current Logs
              </button>
            )}
          </div>
        </div>
        <div className="">
          <CalenderScaleStepper
            setCurrentDay={setCurrentDay}
            setCurrentWeek={setCurrentWeek}
            currentDay={currentDay}
            currentWeek={currentWeek}
            allDates={allDates}
            setCurrentDate={setCurrentDate}
            currentDate={currentDate}
            calendarData={calendarData}
            loading={loading}
            openSiteMapView={false}
            openMonitoringView={false}
            logsPopup={open}
          />
        </div>
        {loading ? (
          <div className="pt-12">
            <Skeleton active paragraph={{ rows: 12 }} />
          </div>
        ) : logs?.length > 0 ? (
          <div className="p-1">
            <div className="bg-white rounded py-4">
              <h1 className="font-semibold text-[16px] text-[#0E212E] leading-[19.36px]">
                Hourly Based Logs{" "}
              </h1>
            </div>
            <div className="grid grid-cols-12 bg-[#129BFF] rounded-t-[12px]">
              <div className="col-span-4 py-1 flex items-center justify-center">
                <h2 className="text-sm font-semibold text-white">
                  {"Screen Details"}
                </h2>
              </div>
              <div className="col-span-8 grid grid-cols-9">
                <div className="col-span-6 grid grid-cols-12">
                  <div className="col-span-1 py-1 flex items-center justify-center">
                    <h2 className="text-sm font-semibold text-white">
                      {"Spot"}
                    </h2>
                  </div>
                  <div className="col-span-2 py-1 flex items-center justify-center">
                    <h2 className="text-sm font-semibold text-white">
                      {"Time"}
                    </h2>
                  </div>
                  <div className="col-span-4 py-1 flex items-center justify-center">
                    <h2 className="text-sm font-semibold text-white">
                      {"Creative"}
                    </h2>
                  </div>
                  <div className="col-span-3 py-1 flex items-center justify-center">
                    <h2 className="text-sm font-semibold text-white">
                      {"Brand"}
                    </h2>
                  </div>
                  <div className="col-span-2 py-1 flex justify-center">
                    <i className="fi fi-br-wifi text-[#FFFFFF] flex items-center justify-center"></i>
                  </div>
                </div>
                <div className="col-span-3 border-b grid grid-cols-3">
                  <div className="col-span-1 py-1 flex items-center justify-center">
                    <h2 className="text-sm font-semibold text-white">
                      {"Delivered"}
                    </h2>
                  </div>
                  <div className="col-span-1 py-1 flex items-center justify-center">
                    <h2 className="text-sm font-semibold text-white">
                      {"Promised"}
                    </h2>
                  </div>
                  <div className="col-span-1 py-1 flex items-center justify-center">
                    <h2 className="text-sm font-semibold text-white">
                      {"Av. Loop Time"}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-12">
              <div className="col-span-4 border border-gray-100 rounded-bl-[12px] border-gray-100">
                <SiteInfoHeader
                  screenName={siteBasedDataOnLogs?.screenName}
                  address={siteBasedDataOnLogs?.address}
                  lastActive={siteBasedDataOnLogs?.lastActive}
                  onClose={() => {}}
                  images={siteBasedDataOnLogs?.images}
                  showCloseIcon={false}
                />
                <div className="flex flex-col mt-4 p-2">
                  {metrics.map((metric, i: any) => (
                    <MetricCard
                      key={i}
                      label={metric.label}
                      delivered={metric.delivered}
                      promised={metric.promised}
                      colors={metric?.colors}
                      inPercentage={metric?.inPercentage}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-8 border-b rounded-br-[12px] border-gray-100">
                {Object.entries(newCombinedData?.hrWiseLogs).map(
                  ([date, hours]: any) => (
                    <div key={date}>
                      {formatDateForLogs(`${date} 00:00:00 GMT`).apiDate !==
                        formatDateForLogs(`${currentDate} 00:00:00 GMT`)
                          .apiDate && (
                        <div className="flex items-center gap-2 py-2">
                          <h1 className="font-custom text-[12px] px-2">
                            Logs from previous day being saved on this day{" "}
                            {moment(date).format("DD/MM/YYYY")}
                          </h1>
                          <Tooltip title="If the screen is switched of without saving the last logs on the server, the date is saved next day when the device is online after being started again...">
                            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                          </Tooltip>
                        </div>
                      )}
                      <div className="overflow-scroll no-scrollbar h-[75vh] border-r border-gray-100 rounded-br-[12px]">
                        {Object.keys(hours)
                          .sort((a, b) => Number(a) - Number(b))
                          .map((key) => [key, hours[key]])
                          .map(([hour, entries]: any, i: any) => (
                            <div key={hour} className="grid grid-cols-9 ">
                              <div
                                className="col-span-6 overflow-scroll no-scrollbar h-[75vh] border-b"
                                ref={(el) => (scrollRefs.current[hour] = el)}
                              >
                                <table className="min-w-full bg-white">
                                  <tbody>
                                    {entries.map((entry: any, index: any) => (
                                      <tr
                                        key={index}
                                        className={`
                                          grid grid-cols-12 border-b border-gray-100 hover:bg-gray-50 text-gray-700 p-1
                                          ${
                                            TIME_ZONES?.["t1"].includes(
                                              Number(hour)
                                            )
                                              ? "bg-[#F9E39650]"
                                              : TIME_ZONES?.["t2"].includes(
                                                  Number(hour)
                                                )
                                              ? "bg-[#BCFFA650]"
                                              : TIME_ZONES?.["t3"].includes(
                                                  Number(hour)
                                                )
                                              ? "bg-[#D2CAFF50]"
                                              : TIME_ZONES?.["t4"].includes(
                                                  Number(hour)
                                                )
                                              ? "bg-[#EBFAFF50]"
                                              : "bg-[#00A0FA10]"
                                          }
                                        `}
                                      >
                                        <td className="col-span-1 py-2 flex items-center justify-center">
                                          <h1 className="text-[12px]">
                                            {index + 1}
                                          </h1>
                                        </td>
                                        <td className="col-span-2 py-2 flex items-center justify-center">
                                          <h1 className="text-[12px]">
                                            {new Date(
                                              entry.logTime
                                            ).toLocaleTimeString()}
                                          </h1>
                                        </td>
                                        <td className="col-span-4 py-2 flex items-center justify-center">
                                          <h1 className="text-[12px]">
                                            {entry.mediaId.split("_")[1]}
                                          </h1>
                                        </td>
                                        <td className="col-span-3 py-2 flex items-center justify-center">
                                          <h1 className="text-[12px]">
                                            {entry.brandName}
                                          </h1>
                                        </td>
                                        <td
                                          className={`col-span-2 py-2 flex items-center justify-center ${
                                            entry.screenStatus === "online"
                                              ? "text-[#59A237]"
                                              : "text-gray-500"
                                          }`}
                                        >
                                          <h1 className="text-[12px]">
                                            {entry.screenStatus.toUpperCase()}
                                          </h1>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <div
                                className={`
                                col-span-3 h-auto border-b border-l border-gray-100 grid grid-cols-3 bg-[#FFFFFF]
                              `}
                              >
                                <div className="col-span-1 flex justify-center items-center gap-2 p-2">
                                  <h1
                                    className={
                                      entries.length /
                                        (17 * campaignDetails?.sov) >=
                                      1
                                        ? "text-[#2A892D] text-[12px]"
                                        : "text-[#CC0000] text-[12px]"
                                    }
                                  >
                                    {entries.length}
                                  </h1>
                                  <p
                                    className={
                                      entries.length /
                                        (17 * campaignDetails?.sov) >=
                                      1
                                        ? "text-[#2A892D] text-[12px]"
                                        : "text-[#CC0000] text-[12px]"
                                    }
                                  >
                                    {entries.length /
                                      (17 * campaignDetails?.sov) >
                                    1
                                      ? `(+${Number(
                                          (entries.length /
                                            (17 * campaignDetails?.sov)) *
                                            100
                                        ).toFixed(0)}%)`
                                      : entries.length /
                                          (17 * campaignDetails?.sov) <
                                        1
                                      ? `(-${Number(
                                          100 -
                                            (entries.length /
                                              (17 * campaignDetails?.sov)) *
                                              100
                                        ).toFixed(0)}%)`
                                      : `✔`}
                                  </p>
                                </div>
                                <div className="col-span-1 border-x border-gray-100 flex justify-center items-center p-2">
                                  <h1 className="text-[12px]">
                                    {17 * campaignDetails?.sov}
                                  </h1>
                                </div>
                                <div className="col-span-1 flex justify-center items-center p-2">
                                  <h1 className="text-[12px]">
                                    {calculateAvgTimeGap(entries) === "N/A"
                                      ? "--"
                                      : calculateAvgTimeGap(entries)}
                                  </h1>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-8 pt-4 flex items-center gap-4">
                <div className="flex items-center justify-start gap-2">
                  <div className="h-4 w-4 bg-[#F9E396] rounded-full" />
                  <h1 className="text-[12px]">T1 (2:00 AM to 10:59 AM)</h1>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="h-4 w-4 bg-[#BCFFA6] rounded-full" />
                  <h1 className="text-[12px]">T2 (11:00 AM to 3:59 PM)</h1>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="h-4 w-4 bg-[#D2CAFF] rounded-full" />
                  <h1 className="text-[12px]">T3 (04:00 PM to 08:59 PM)</h1>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="h-4 w-4 bg-[#EBFAFF] rounded-full" />
                  <h1 className="text-[12px]">T4 (09:00 PM to 01:59 AM)</h1>
                </div>
              </div>
              <div className="col-span-4 pt-4 flex items-center justify-end gap-4">
                <div className="flex items-center justify-start gap-2">
                  <div className="h-4 w-4 bg-[#59A237] rounded-full" />
                  <h1 className="text-[12px]">Online</h1>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="h-4 w-4 bg-[#EFEFEF] rounded-full" />
                  <h1 className="text-[12px]">Offline</h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center pt-12">
            <NoDataView />
          </div>
        )}
      </div>
    </div>
  );
};
