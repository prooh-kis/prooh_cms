import { signout } from "../../actions/userAction";
import React, {
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { message, Tooltip } from "antd";
import { getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";
import moment from "moment";

interface StepSliderProps {
  currentDay: number;
  currentWeek: number;
  setCurrentDay?: (day: number) => void;
  setCurrentWeek?: (week: number) => void;
  campaignId?: any;
  setPageSuccess?: any;
  allDates?: Array<{ value: string; label: string }>;
  setCurrentDate?: (date: string) => void;
  currentDate?: string;
  calendarData?: any;
  loading?: boolean;
  openSiteMapView?: any;
  openMonitoringView?: any;
  logsPopup?: any;
  monitoringPopup?: any;
  openInvoice?: any;
  viewAllLogsOpen?: any;
}

export const CalenderScaleStepper = ({
  setCurrentDay,
  setCurrentWeek,
  currentDay,
  currentWeek,
  allDates = [],
  setCurrentDate,
  currentDate,
  calendarData,
  loading,
  openSiteMapView,
  openMonitoringView,
  logsPopup,
  monitoringPopup,
  openInvoice,
  viewAllLogsOpen,
}: StepSliderProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;
  const [showTooltip, setShowTooltip] = useState<any>(false);
  const [currentWeekMinusValue, setCurrentWeekMinusValue] = useState<any>(1);

  const groupDatesByWeek = useCallback(
    (dates: Array<{ value: string; label: string }>) => {
      const weeks: { [key: string]: Array<{ value: string; label: string }> } =
        {};
      dates.forEach((date, index) => {
        const weekIndex = Math.floor(index / 7) + 1;
        const weekKey = `Week ${weekIndex}`;

        if (!weeks[weekKey]) weeks[weekKey] = [];
        weeks[weekKey].push(date);
      });
      Object.keys(weeks)?.forEach((weekKey: any) => {
        if (weekKey !== "End") {
          const dateToAdd = new Date(
            weeks[weekKey][weeks[weekKey]?.length - 1]?.value
          );
          dateToAdd.setDate(dateToAdd.getDate() + 1);

          const resultDate = dateToAdd.toISOString().split("T")[0];

          weeks[weekKey].push({
            value: resultDate,
            label: "End",
          });
        }
      });
      weeks["End"] = [];
      return Object.entries(weeks);
    },
    []
  );

  const weeks = useMemo(
    () => groupDatesByWeek(allDates),
    [allDates, groupDatesByWeek]
  );

  const getWeekPercentageValue = useCallback(
    (data: any) => {
      const formatToMDY = (dateStr: any) => {
        const date = new Date(dateStr);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      };

      const matchingDates = new Set(
        data?.[1]?.map((d: any) => formatToMDY(d?.value))
      );
      return calendarData?.reduce(
        (totals: any, entry: any) => {
          if (matchingDates.has(entry.date)) {
            totals.totalCount += entry.countDelivered;
            totals.totalCountPromised += entry.countPromised;
          }
          return totals;
        },
        { totalCount: 0, totalCountPromised: 0 }
      );
    },
    [calendarData]
  );

  const handleStepClick = useCallback(
    (input: any) => {
      if (loading) {
        message.info(
          "Fetching logs is a tedious task, please let us fetch the earlier request logs first and then continue..."
        );
        return;
      }

      if (input.type === "week") {
        const newWeek = input.step + 1;
        const targetWeek = weeks[input.step];

        // Don't allow selection of "End" week
        if (!targetWeek || targetWeek[0] === "End") return;

        setCurrentWeek?.(newWeek);

        // Ensure currentDay is within bounds of the new week
        const daysInWeek = targetWeek[1]?.length || 0;
        if (currentDay > daysInWeek) {
          const safeDay = Math.max(1, Math.min(currentDay, daysInWeek));
          setCurrentDay?.(safeDay);
          setCurrentDate?.(targetWeek[1][safeDay - 1]?.value);
        } else if (daysInWeek > 0) {
          setCurrentDate?.(targetWeek[1][currentDay - 1]?.value);
        }
      } else if (input.type === "day") {
        const targetWeek = weeks[currentWeek - 1];
        // Don't allow selection if week is invalid or "End" week
        if (!targetWeek || targetWeek[0] === "End") return;

        const targetDay = targetWeek[1]?.[input.step];
        // Don't allow selection of "End" day
        if (!targetDay || targetDay.label === "End") return;

        setCurrentDay?.(input.step + 1);
        setCurrentDate?.(targetDay.value);
      }
    },
    [
      loading,
      currentDay,
      currentWeek,
      weeks,
      setCurrentDay,
      setCurrentWeek,
      setCurrentDate,
    ]
  );

  const getPercentageValue = useCallback(
    (delivered: number, promised: number) => {
      const percentage = (delivered / promised) * 100 || 0;
      return `${percentage.toFixed(0)}%`;
    },
    []
  );

  const getCurrentTime = useCallback(() => {
    if (!weeks?.length) return 0;

    let weekDates;
    if (currentWeek === weeks.length) {
      // Handle "End" week case
      if (weeks.length > 1) {
        weekDates = weeks[currentWeek - 2]?.[1];
      } else {
        return 0;
      }
    } else {
      weekDates = weeks[currentWeek - 1]?.[1];
    }

    if (!weekDates?.length) return 0;

    const numberOfGaps = weekDates.length - 1;
    let timeMarkerPosition = 0;

    for (let i = 0; i < numberOfGaps; i++) {
      if (!weekDates[i]?.value || !weekDates[i + 1]?.value) continue;

      const start = new Date(weekDates[i].value);
      const end = new Date(weekDates[i + 1].value);
      const now = new Date();

      if (now >= start && now <= end) {
        const hoursSinceStart =
          (now.getTime() - start.getTime()) / (1000 * 60 * 60);
        const percentageOfGap = (hoursSinceStart / 24) * (100 / numberOfGaps);
        timeMarkerPosition = i * (100 / numberOfGaps) + percentageOfGap;
        break;
      }
    }
    return timeMarkerPosition;
  }, [currentWeek, weeks]);

  const getCurrentDay = useCallback(() => {
    const today = moment();
    let todayMarkerLeft = 0;

    const lastDate = new Date(allDates[allDates?.length - 1]?.value);
    if (getNumberOfDaysBetweenTwoDates(new Date(), lastDate) < 0) {
      todayMarkerLeft = 0;
      return todayMarkerLeft;
    }

    if (weeks?.length > 1) {
      const totalWeeks = weeks?.length - 1;
      weeks.forEach(([_, dates], weekIndex) => {
        const match = dates?.find((d) => moment(d?.value).isSame(today, "day"));

        if (match) {
          const dayIndex =
            dates?.indexOf(match) == 0 ? 1 : dates?.indexOf(match);
          const percentPerWeek = 100 / totalWeeks;
          const percentPerDay = percentPerWeek / 7;
          todayMarkerLeft =
            weekIndex * percentPerWeek + dayIndex * percentPerDay;
        }
      });
    }
    return todayMarkerLeft;
  }, [weeks, allDates]);

  const getCurrentTimePercentage = useCallback(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Calculate total seconds passed in the day
    const totalSecondsPassed = hours * 3600 + minutes * 60 + seconds;
    // Total seconds in a day
    const totalSecondsInDay = 24 * 3600;

    // Calculate percentage
    const percentage = (totalSecondsPassed / totalSecondsInDay) * 100;
    return percentage.toFixed(0); // Return with 1 decimal place
  }, []);

  const getCurrentWeekPercentage = useCallback(() => {
    const now = new Date();

    const currentWeekDates = weeks?.[currentWeek - 1]?.[1] || [];

    if (currentWeekDates?.length < 2) return "0.0"; // Need at least start and end dates

    const weekStart = new Date(currentWeekDates[0]?.value);
    const weekEnd = new Date(
      currentWeekDates[currentWeekDates?.length - 1]?.value
    );

    // Calculate total milliseconds in the week
    const totalWeekMs = weekEnd.getTime() - weekStart.getTime();
    const elapsedMs = now.getTime() - weekStart.getTime();

    // Calculate percentage (clamp between 0 and 100)
    const percentage = Math.min(
      100,
      Math.max(0, (elapsedMs / totalWeekMs) * 100)
    );
    return percentage.toFixed(0);
  }, [currentWeek, weeks]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(signout());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    const checkVisibility = () => {
      if (!logsPopup && componentRef.current) {
        const rect = componentRef.current.getBoundingClientRect();
        const viewportHeight =
          window.innerHeight || document.documentElement.clientHeight;

        // Check if the component is in the middle of the viewport
        const componentMiddle = rect.top + rect.height / 4;
        const viewportMiddle = viewportHeight / 2;
        const isInMiddle =
          Math.abs(componentMiddle - viewportMiddle) < viewportHeight * 0.15;
        setShowTooltip(isInMiddle);
      }
      if (logsPopup) return setShowTooltip(false);
      if (monitoringPopup) return setShowTooltip(false);
      if (openSiteMapView) return setShowTooltip(false);
      if (openMonitoringView) return setShowTooltip(false);
      if (openInvoice) return setShowTooltip(false);
      if (viewAllLogsOpen) return setShowTooltip(false);
    };

    // Initial check
    checkVisibility();

    // Add scroll event listener
    window.addEventListener("scroll", checkVisibility);
    // Cleanup
    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, [
    logsPopup,
    openInvoice,
    viewAllLogsOpen,
    openSiteMapView,
    openMonitoringView,
    monitoringPopup,
  ]);

  useEffect(() => {
    if (currentDate && allDates?.length > 0) {
      // Find the index of the currentDate in allDates
      const dateIndex = allDates.findIndex(
        (date) =>
          date?.value &&
          new Date(date.value).toDateString() ===
            new Date(currentDate).toDateString()
      );

      if (dateIndex >= 0) {
        setCurrentWeekMinusValue(1);
        // Calculate the week number (1-based)
        const weekNumber = Math.floor(dateIndex / 7) + 1;
        // Calculate the day number within the week (1-based)
        const dayNumber = (dateIndex % 7) + 1;

        setCurrentWeek?.(weekNumber);
        setCurrentDay?.(dayNumber);
      } else if (weeks?.length > 0) {
        // Handle case where date is in the "End" day
        let found = false;
        for (let i = 0; i < weeks.length; i++) {
          const week = weeks[i];
          if (week[0] === "End") continue;

          const endDay = week[1]?.find((d) => d?.label === "End");
          if (
            endDay &&
            new Date(endDay.value).toDateString() ===
              new Date(currentDate).toDateString()
          ) {
            setCurrentWeekMinusValue(1);
            setShowTooltip(false);
            setCurrentWeek?.(i + 1);
            setCurrentDay?.(week[1]?.length || 1);
            found = true;
            break;
          }
        }

        if (!found) {
          setCurrentWeekMinusValue(2);
          setShowTooltip(false);
          setCurrentWeek?.(weeks.length);
          setCurrentDay?.(weeks[weeks.length - 2]?.[1]?.length || 1);
        }
      }
    }
  }, [currentDate, allDates, setCurrentWeek, setCurrentDay, weeks]);

  // Replace the currentWeekPercentage and currentWeekPercentageColor useMemos with:

  const allWeekPercentages = useMemo(() => {
    return weeks.map((week) => {
      const weekData = getWeekPercentageValue(week);
      if (!weekData) return { percentage: 0, color: "#2A892D" };

      const percentage = (
        (weekData.totalCount * 100) /
        weekData.totalCountPromised
      ).toFixed(0);
      const color =
        weekData.totalCount / weekData.totalCountPromised > 1
          ? "#2A892D"
          : "#FF4747";

      return {
        percentage,
        color,
      };
    });
  }, [weeks, getWeekPercentageValue]);

  useEffect(() => {
    // document.documentElement.scrollTop = document.documentElement.clientHeight;
    // document.documentElement.scrollLeft = document.documentElement.clientWidth;
    // if (componentRef.current) {
    //   componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }
  }, []);

  return (
    <div className="w-full cursor-pointer" ref={componentRef}>
      <div
        className={`pt-16 ${logsPopup ? "mb-12" : "mb-20"} flex justify-center`}
      >
        <div
          className={`flex-${
            weeks?.length === 1 ? 0 : 1
          } h-1 bg-[#D1E5F7] relative mx-1`}
        >
          <div className="absolute inset-x-0 flex justify-between">
            <div
              className="absolute h-1 inset-x-0 bg-[#DC6700] rounded transition-all duration-500"
              style={{
                width: `${
                  weeks?.length === 1
                    ? 0
                    : Number((currentWeek - 1) / (weeks?.length - 1)) * 100
                }%`,
              }}
            />
            {getCurrentDay() > 0 && (
              <div
                className="absolute z-1 absolute h-1 inset-x-0 bg-[#FFD700] rounded transition-all duration-500"
                style={{
                  width: `${
                    getCurrentDay() -
                    Number((currentWeek - 1) / (weeks?.length - 1)) * 100
                  }%`,
                  left: `${
                    weeks?.length === 1
                      ? 0
                      : Number((currentWeek - 1) / (weeks?.length - 1)) * 100
                  }%`,
                }}
              >
                <div className="relative">
                  <Tooltip
                    id="1"
                    placement="bottom"
                    title={
                      <div className="">
                        <div className="flex items-center gap-2">
                          <i className="fi fi-rr-calendar-lines text-[12px] flex items-center"></i>
                          <h1 className="text-[12px]">{`${new Date().toDateString()}`}</h1>
                        </div>
                        <div className="text-center text-xs whitespace-nowrap">
                          {getCurrentWeekPercentage()}% of Week Delivered
                        </div>
                      </div>
                    }
                    open={showTooltip}
                  >
                    <div
                      className="absolute h-1 w-[2px] bg-[#FFD700] rounded-full"
                      style={{
                        left: `100%`,
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            )}
            {weeks.map(([week, dates], i) => {
              const isCurrentWeek = i === currentWeek - 1;
              const isPastWeek = i < currentWeek - 1;
              const weekColor =
                isPastWeek || isCurrentWeek
                  ? "text-[#00000090] font-semibold"
                  : "text-[#D6D2D2]";
              const bgColor =
                isPastWeek || isCurrentWeek
                  ? "bg-[#DC6700]"
                  : "border bg-[#D1E5F7]";

              // Get the percentage data for this week
              const weekPercentageData = allWeekPercentages[i];

              let labelPosition = "";
              if (i === 0 && weeks?.length !== 1) {
                labelPosition = "left-0";
              } else if (i === 0 && weeks?.length === 1) {
                labelPosition = "-left-1/2";
              } else if (i + 1 === weeks?.length) {
                labelPosition = "right-0";
              } else {
                labelPosition = "left-1/2 transform ";
              }

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (
                      (week !== "End" && !weeks[i][1][currentDay - 1]) ||
                      getNumberOfDaysBetweenTwoDates(
                        new Date(),
                        new Date(weeks[i][1][currentDay - 1]?.value)
                      ) > 0
                    ) {
                      message.info("Still to come...");
                    } else {
                      if (week !== "End") {
                        handleStepClick({ type: "week", step: i });
                      }
                    }
                  }}
                  className="relative flex flex-col items-center"
                >
                  <div
                    className={`relative w-3 h-3 rounded-full -mt-1 flex flex-col items-center ${bgColor}`}
                  >
                    <div
                      className={`absolute inset-0 rounded-full ${bgColor}`}
                    />

                    <Tooltip id="2" title={week}>
                      <div
                        className={`relative mt-[-24px] w-full flex items-center ${
                          i == 0
                            ? ""
                            : i + 1 == weeks?.length
                            ? "justify-end"
                            : "justify-center"
                        } w-full gap-1`}
                      >
                        <h1
                          className={`text-[12px] whitespace-nowrap ${labelPosition} ${weekColor}`}
                        >
                          {week}
                        </h1>
                        {(isPastWeek || isCurrentWeek) &&
                          weekPercentageData &&
                          week !== "End" && (
                            <h1
                              className={`text-[12px] font-medium whitespace-nowrap text-[${weekPercentageData.color}]`}
                            >
                              ({weekPercentageData.percentage}%)
                            </h1>
                          )}
                      </div>
                    </Tooltip>
                    {isCurrentWeek && (
                      <div className="absolute w-3 h-3 rounded-full flex flex-col items-center bg-[#DC6700] animate-ping" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={`pt-6 ${logsPopup ? "mb-6" : "mb-12"}`}>
        <div className="flex-1 h-1 bg-[#D1E5F7] relative mx-1">
          <div className="absolute inset-x-0 flex justify-between">
            <div
              className="absolute h-1 inset-x-0 bg-[#DC6700] rounded transition-all duration-500"
              style={{
                width: `${
                  (Number(currentDay - 1) /
                    (weeks?.[currentWeek - currentWeekMinusValue]?.[1]?.length -
                      1)) *
                  100
                }%`,
              }}
            />
            {getCurrentTime() > 0 && (
              <div
                className="absolute h-1 inset-x-0 bg-[#FFD700] rounded transition-all duration-500"
                style={{
                  width: `${
                    getCurrentTime() -
                    (Number(currentDay - 1) /
                      (weeks?.[currentWeek - 1]?.[1]?.length - 1)) *
                      100
                  }%`,
                  left: `${
                    (Number(currentDay - 1) /
                      (weeks?.[currentWeek - 1]?.[1]?.length - 1)) *
                    100
                  }%`,
                }}
              >
                <div className="relative">
                  <Tooltip
                    id="3"
                    placement="bottom"
                    title={
                      <div className="">
                        <div className="flex items-center justify-center gap-2">
                          <i className="fi fi-br-clock text-[12px] flex items-center"></i>
                          <h1 className="text-[12px]">
                            {moment().format("hh:mm A")}
                          </h1>
                        </div>
                        <div className="text-center text-xs whitespace-nowrap">
                          {getCurrentTimePercentage()}% of Day Delivered
                        </div>
                      </div>
                    }
                    open={showTooltip}
                  >
                    <div
                      className="absolute h-1 w-[2px] bg-[#FFD700] z-1 rounded-full"
                      style={{
                        left: `100%`,
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            )}

            {weeks?.[currentWeek - currentWeekMinusValue]?.[1]?.map(
              (dateObj, i) => {
                const isCurrentDay = i === currentDay - 1;
                const isPastDay = i < currentDay - 1;
                const dayColor =
                  isPastDay || isCurrentDay
                    ? "text-[#00000090] font-semibold"
                    : "text-[#D6D2D2]";
                const bgColor =
                  isPastDay || isCurrentDay
                    ? "bg-[#DC6700]"
                    : "border bg-[#D1E5F7]";

                const dayData = calendarData?.find(
                  (s: any) =>
                    new Date(s.date).toDateString() ===
                    new Date(dateObj?.value).toDateString()
                );
                const percentageValue = dayData
                  ? getPercentageValue(
                      dayData.countDelivered,
                      dayData.countPromised
                    )
                  : "";
                const percentageColor =
                  dayData?.countDelivered / dayData?.countPromised > 1
                    ? "#2A892D"
                    : "#FF4747";
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (
                        getNumberOfDaysBetweenTwoDates(
                          new Date(),
                          new Date(dateObj?.value)
                        ) > 0
                      ) {
                        message.info("Still to come...");
                      } else {
                        if (dateObj.label !== "End") {
                          handleStepClick({ type: "day", step: i });
                        }
                      }
                    }}
                    className="relative flex flex-col items-center justify-center"
                  >
                    <div
                      className={`relative w-3 h-3 rounded-full -mt-1 flex flex-col items-center ${bgColor}`}
                    >
                      <div
                        className={`absolute inset-0 rounded-full ${bgColor}`}
                      />

                      {isCurrentDay && (
                        <div className="absolute w-3 h-3 rounded-full flex flex-col items-center bg-[#DC6700] animate-ping" />
                      )}
                      <Tooltip id="4" title={dateObj?.value}>
                        <div className="relative mt-[-24px] w-full cursor-pointer flex items-center justify-center">
                          <div
                            className={`flex ${
                              i == 0
                                ? ""
                                : i + 1 == weeks?.[currentWeek - 1]?.[1]?.length
                                ? "justify-end"
                                : "justify-center"
                            } items-center w-full gap-1 -ml-[8px]`}
                          >
                            <h1
                              className={`text-[12px] text-nowrap ${dayColor}`}
                            >
                              {dateObj.label}
                            </h1>
                            {calendarData &&
                              new Date(dateObj?.value).getTime() <
                                new Date().getTime() &&
                              dayData &&
                              dateObj.label !== "End" && (
                                <h1
                                  className={`text-[10px] font-medium whitespace-nowrap text-[${percentageColor}]`}
                                >
                                  ({percentageValue || 0})
                                </h1>
                              )}
                          </div>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
