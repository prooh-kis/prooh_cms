import { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, notification, Skeleton, Tooltip } from "antd";
import { CalenderScaleStepper } from "../../components/molecules/CalenderScale2";
import { NoDataView } from "../../components";
import { getFiltersAndDataForAllLogsPopupAction } from "../../actions/dashboardAction";
import { GetCampaignLogsAction } from "../../actions/campaignAction";
import {
  formatDateForLogs,
  getCampaignDurationFromStartAndEndDate,
  getTimeFromDate,
} from "../../utils/dateAndTimeUtils";
import { TIME_ZONES } from "../../constants/helperConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import ButtonInput from "../../components/atoms/ButtonInput";
import moment from "moment";
import { getUserRole } from "../../utils/campaignUtils.js";

interface HeaderProps {
  icon: string;
  title: string;
}

const Header = ({ icon, title }: HeaderProps) => {
  return (
    <div className="bg-[#FAFAFA] rounded-[12px] text-gray-800 text-[16px] font-medium font-inter p-2 flex items-center gap-2 px-2 truncate">
      <div className="h-[26px] w-[26px] rounded-full bg-[#129BFF] flex items-center justify-center">
        <i className={`fi ${icon} text-white text-[16px] flex items-center`} />
      </div>
      <h1 className="truncate">{title}</h1>
    </div>
  );
};

interface Props {
  handleCancel: () => void;
  campaignId?: string;
  open: string;
  setCurrentDay?: any;
  currentDay?: any;
  setCurrentWeek?: any;
  currentWeek?: any;
  allDates?: any;
  setCurrentDate?: any;
  currentDate?: any;
  calendarData?: any;
  loading?: any;
  campaignDetails?: any;
}

export const ViewAllLogsPopup = ({
  open,
  handleCancel,
  campaignId,
  setCurrentDay,
  currentDay,
  setCurrentWeek,
  currentWeek,
  allDates,
  setCurrentDate,
  currentDate,
  calendarData,
  campaignDetails,
}: Props) => {
  const dispatch = useDispatch<any>();
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [selectedCities, setSelectedCities] = useState<any>([]);
  const [selectedTouchPoints, setSelectedTouchPoints] = useState<any>([]);
  const [selectedScreenTypes, setSelectedScreenTypes] = useState<any>([]);
  const [zipGeneration, setZipGeneration] = useState(false);

  const [currentScreenName, setCurrentScreenName] = useState<string>("");
  const [currentScreenCampaignId, setCurrentScreenCampaignId] =
    useState<any>(null);

  const {
    loading: loadingLogs,
    error: errorLogs,
    data: logs,
  } = useSelector((state: any) => state.campaignLogsGet);

  const {
    loading: loadingAllLogs,
    error: errorAllLogs,
    data: allLogsData,
  } = useSelector((state: any) => state.getFiltersAndDataForAllLogsPopup);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

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
    let hrWiseLogs: any = {};

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

  // Toggle all cities
  const toggleAllCities = (checked: boolean) => {
    const allCities = Object.keys(allLogsData?.cityWiseData || {}).filter(
      (c) => c !== "all"
    );
    setSelectedCities(checked ? allCities : []);
  };

  // Toggle all touch points
  const toggleAllTouchPoints = (checked: boolean) => {
    const allTouchPoints = Object.keys(
      allLogsData?.touchPointWiseData || {}
    ).filter((t) => t !== "all");
    setSelectedTouchPoints(checked ? allTouchPoints : []);
  };

  // Toggle all screen types
  const toggleAllScreenTypes = (checked: boolean) => {
    const allScreenTypes = Object.keys(
      allLogsData?.screenTypeWiseData || {}
    ).filter((s) => s !== "all");
    setSelectedScreenTypes(checked ? allScreenTypes : []);
  };

  // Handle city selection
  const handleCityChange = (city: string, checked: boolean) => {
    if (checked) {
      setSelectedCities([...selectedCities, city]);
    } else {
      setSelectedCities(selectedCities.filter((c: any) => c !== city));
    }
  };

  // Handle touch point selection
  const handleTouchPointChange = (touchPoint: string, checked: boolean) => {
    if (checked) {
      setSelectedTouchPoints([...selectedTouchPoints, touchPoint]);
    } else {
      setSelectedTouchPoints(
        selectedTouchPoints.filter((t: any) => t !== touchPoint)
      );
    }
  };

  const handleDownloadZip = async () => {
    setZipGeneration(true);
    try {
      const res = await fetch(
        `https://api.justmonad.com/api/v2/monitoring/downlaodMonitoringLogsZip?id=${campaignId}`
      );
      if (!res.ok) throw new Error("Failed to download");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "monitoring_logs.zip"; // optional: dynamic name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Please try again.");
      setZipGeneration(false);
    } finally {
      setZipGeneration(false);
    }
  };

  // Handle screen type selection
  const handleScreenTypeChange = (screenType: string, checked: boolean) => {
    if (checked) {
      setSelectedScreenTypes([...selectedScreenTypes, screenType]);
    } else {
      setSelectedScreenTypes(
        selectedScreenTypes.filter((s: any) => s !== screenType)
      );
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(
      getFiltersAndDataForAllLogsPopupAction({
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
        cities: selectedCities,
        touchPoints: selectedTouchPoints,
        screenTypes: selectedScreenTypes,
        id: campaignId,
      })
    );

    if (campaignDetails && currentScreenCampaignId !== null) {
      dispatch(
        GetCampaignLogsAction({
          campaignId: currentScreenCampaignId,
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
    campaignId,
    selectedCities,
    selectedTouchPoints,
    selectedScreenTypes,
    currentDate,
    currentScreenCampaignId,
    campaignDetails,
  ]);

  // Dispatch action with updated filters
  useEffect(() => {
    if (allLogsData && !logs && currentScreenCampaignId === null) {
      setCurrentScreenName(() => {
        return Object.keys(allLogsData?.screenWiseData || {})?.filter(
          (l: any) => l !== "all"
        )[0];
      });
      setCurrentScreenCampaignId(() => {
        return allLogsData?.screenWiseData[
          Object.keys(allLogsData?.screenWiseData || {})?.filter(
            (l: any) => l !== "all"
          )[0]
        ]?.campaignId;
      });

      setSelectedCities(Object.keys(allLogsData?.cityWiseData || {}));
      setSelectedTouchPoints(
        Object.keys(allLogsData?.touchPointWiseData || {})
      );
    }
  }, [allLogsData, logs, currentScreenCampaignId]);

  useEffect(() => {
    if (errorLogs) notification.error(errorLogs);
    if (errorAllLogs) notification.error(errorAllLogs);
  }, [errorLogs, errorAllLogs]);

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 mt-16">
      {zipGeneration && (
        <div className="absolute inset-0 bg-white bg-opacity-70 z-20 flex items-center justify-center rounded-[10px]">
          <LoadingScreen title={"Generating Zip , Please Wait..."} />
        </div>
      )}
      <div
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-full max-w-full relative overflow-auto max-h-auto "
        style={{ height: "90vh", width: "95vw" }}
      >
        <div className="relative inset-0 flex items-center justify-between gap-4 py-2 pr-5">
          <div className="flex gap-2 items-center">
            <h1 className="text-[#0E212E] font-semibold text-[20px]">
              All Log Report
              <span className="text-[#B0B0B0] text-[14px] ml-2">
                {/* ({data?.monitoringData?.length || 0} Screens) */}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ButtonInput
              onClick={handleDownloadZip}
              icon={
                <i className="fi fi-sr-folder-download text-[16px] flex items-center" />
              }
            >
              Download All Logs
            </ButtonInput>

            <i
              className="fi fi-br-cross text-[14px] cursor-pointer"
              onClick={handleCancel}
            />
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
            loading={loadingAllLogs}
            openSiteMapView={false}
            openMonitoringView={false}
            logsPopup={open}
          />
        </div>
        {loadingAllLogs ? (
          <div className="pt-12">
            <Skeleton active paragraph={{ rows: 12 }} />
          </div>
        ) : allLogsData ? (
          <div className="p-1">
            <div className="mx-auto grid grid-cols-12 gap-1">
              <div className="col-span-5 grid grid-cols-6 flex gap-1 rounded-bl-[12px] border-gray-100">
                {/* Cities Filter */}
                <div className="border border-gray-100 rounded-[12px] col-span-1">
                  <Header title={"City"} icon="fi-sr-marker" />
                  <div className="max-h-[65vh] overflow-auto">
                    <div className="px-2 py-2 flex flex-col">
                      <div className="grid grid-cols-4 items-center">
                        <Checkbox
                          indeterminate={
                            selectedCities.length > 0 &&
                            selectedCities.length <
                              Object.keys(allLogsData?.cityWiseData || {})
                                .length
                          }
                          onChange={(e) => toggleAllCities(e.target.checked)}
                          checked={
                            selectedCities.length ===
                            Object.keys(allLogsData?.cityWiseData || {}).length
                          }
                          className="col-span-3 truncate"
                        >
                          All
                        </Checkbox>
                        <div className="col-span-1"></div>
                      </div>

                      {Object.keys(allLogsData?.cityWiseData || {})
                        .filter((city) => city !== "all")
                        .map((city: string) => (
                          <div
                            className="grid grid-cols-4 items-center py-1"
                            key={city}
                          >
                            <Checkbox
                              checked={selectedCities.includes(city)}
                              onChange={(e) =>
                                handleCityChange(city, e.target.checked)
                              }
                              className="col-span-3 truncate"
                            >
                              {city}
                            </Checkbox>
                            <div className="col-span-1"></div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Touch Points Filter */}
                <div className="border border-gray-100 rounded-[12px] col-span-2">
                  <Header title={"Touch points"} icon="fi-sr-land-location" />
                  <div className="max-h-[65vh] overflow-auto">
                    <div className="px-2 py-2 flex flex-col">
                      <div className="grid grid-cols-4 items-center">
                        <Checkbox
                          indeterminate={
                            selectedTouchPoints.length > 0 &&
                            selectedTouchPoints.length <
                              Object.keys(allLogsData?.touchPointWiseData || {})
                                .length
                          }
                          onChange={(e) =>
                            toggleAllTouchPoints(e.target.checked)
                          }
                          defaultChecked={
                            selectedTouchPoints.length ===
                            Object.keys(allLogsData?.touchPointWiseData || {})
                              .length
                          }
                          className="col-span-3 truncate"
                        >
                          All
                        </Checkbox>
                        <div className="col-span-1"></div>
                      </div>

                      {Object.keys(allLogsData?.touchPointWiseData || {})
                        .filter((tp) => tp !== "all")
                        .map((tp: string) => (
                          <div
                            className="grid grid-cols-4 items-center py-1"
                            key={tp}
                          >
                            <Checkbox
                              checked={selectedTouchPoints.includes(tp)}
                              onChange={(e) =>
                                handleTouchPointChange(tp, e.target.checked)
                              }
                              className="col-span-3 truncate"
                            >
                              {tp}
                            </Checkbox>
                            <div className="col-span-1"></div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Screen List */}
                <div className="border border-gray-100 rounded-[12px] col-span-3">
                  <Header title={"Screens"} icon="fi-sr-screen" />
                  <div className="max-h-[65vh] overflow-auto">
                    <div className="px-2 py-2 flex flex-col">
                      {Object.keys(allLogsData?.screenWiseData || {})
                        .filter((screen) => screen !== "all")
                        .map((screenName: string) => (
                          <div
                            className="grid grid-cols-4 items-center py-1"
                            key={screenName}
                          >
                            <Checkbox
                              checked={currentScreenName === screenName}
                              onChange={(e) => {
                                setCurrentScreenName(screenName);
                                setCurrentScreenCampaignId(
                                  allLogsData?.screenWiseData[screenName]
                                    .campaignId
                                );
                              }}
                              className="col-span-3 truncate"
                            >
                              {screenName}
                            </Checkbox>
                            <div className="col-span-1"></div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-7 border border-gray-100 rounded-[12px]">
                <div className="grid grid-cols-9 bg-[#129BFF] rounded-t-[12px]">
                  <div className="col-span-6 grid grid-cols-12">
                    <div className="col-span-1 py-1 flex items-center justify-center">
                      <h2 className="text-sm font-semibold text-white truncate">
                        {"Spot"}
                      </h2>
                    </div>
                    <div className="col-span-2 py-1 flex items-center justify-center">
                      <h2 className="text-sm font-semibold text-white truncate">
                        {"Time"}
                      </h2>
                    </div>
                    <div className="col-span-4 py-1 flex items-center justify-center">
                      <h2 className="text-sm font-semibold text-white truncate">
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
                      <h2 className="text-sm font-semibold text-white truncate">
                        {"Delivered"}
                      </h2>
                    </div>
                    <div className="col-span-1 py-1 flex items-center justify-center">
                      <h2 className="text-sm font-semibold text-white truncate">
                        {"Promised"}
                      </h2>
                    </div>
                    <div className="col-span-1 py-1 flex items-center justify-center">
                      <h2 className="text-sm font-semibold text-white truncate">
                        {"Av. Loop Time"}
                      </h2>
                    </div>
                  </div>
                </div>
                {loadingLogs && (
                  <div className="pt-12">
                    <Skeleton active paragraph={{ rows: 12 }} />
                  </div>
                )}
                {logs &&
                  Object.entries(newCombinedData?.hrWiseLogs).map(
                    ([date, hours]: any) => (
                      <div key={date}>
                        {formatDateForLogs(`${date} 00:00:00 GMT`).apiDate !==
                          formatDateForLogs(`${currentDate} 00:00:00 GMT`)
                            .apiDate && (
                          <div className="flex items-center gap-2 p-2">
                            <h1 className="font-custom text-[16px]">
                              Logs from previous day being saved on this day
                            </h1>
                            <Tooltip title="If the screen is switched of without saving the last logs on the server, the date is saved next day when the device is online after being started again...">
                              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                            </Tooltip>
                          </div>
                        )}
                        <div className="overflow-scroll no-scrollbar h-[60vh] border-r border-gray-100 rounded-br-[12px]">
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
