import { SectionHeader } from "../../components/molecules/DashboardGrid";
import { SectionHeaderWithSwitch } from "../../components/segments/SectionHeaderWithSwitch";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";
import { DashBoardHardwarePerformanceGraph } from "../../components/segments/DashBoardHardwarePerformanceGraph";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSiteLevelPerformanceTabWiseForPlannerDashboard } from "../../actions/dashboardAction";
import { HARDWARE_PERFORMANCE } from "../../constants/tabDataConstant";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { getUserRole } from "../../utils/campaignUtils.js";

export const SiteLevelHardwarePerformanceAnalysis = ({
  campaignId,
  setDayTimePercentView,
  dayTimePercentView,
  screenLevelData,
  dayTimeFilters,
  setDayTimeFilters,
  currentDate,
}: any) => {
  const dispatch = useDispatch<any>();
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const {
    loading: loadingTabWiseSiteData,
    error: errorTabWiseSiteData,
    data: tabWiseSiteData,
  } = useSelector(
    (state: any) => state.siteLevelPerformanceTabWiseForPlannerDashboard
  );

  const getHardwarePerformanceData = () => {
    const datesArray =
      tabWiseSiteData?.hardwarePerformanceData &&
      Object.keys(tabWiseSiteData?.hardwarePerformanceData)?.length !== 0
        ? Object.keys(tabWiseSiteData?.hardwarePerformanceData)?.map(
            (date: any) => date
          )
        : [];
    const countsArray =
      tabWiseSiteData?.hardwarePerformanceData &&
      Object.values(tabWiseSiteData?.hardwarePerformanceData)?.length !== 0
        ? Object.values(tabWiseSiteData?.hardwarePerformanceData)?.map(
            (slot: any) => slot
          )
        : [];
    return { datesArray, countsArray };
  };

  const handleClick = ({ type, value, checked }: any) => {
    setDayTimeFilters((prev: any) => ({
      ...prev,
      dayTypes: {
        ...prev?.dayTypes,
        screenPerformance:
          type == "dayType" && checked
            ? [...prev?.dayTypes?.screenPerformance, value]
            : type == "dayType" && checked && value == "all"
            ? []
            : type == "dayType" && !checked
            ? dayTimeFilters?.dayTypes?.screenPerformance?.filter(
                (f: any) => f !== value
              )
            : dayTimeFilters?.dayTypes?.screenPerformance,
      },
      timezones: {
        ...prev?.timezones,
        screenPerformance:
          type == "timezone" && checked
            ? [...prev?.timezones?.screenPerformance, value]
            : type == "timezone" && checked && value == "all"
            ? []
            : type == "timezone" && !checked
            ? dayTimeFilters?.timezones?.screenPerformance?.filter(
                (f: any) => f !== value
              )
            : dayTimeFilters?.timezones?.screenPerformance,
      },
    }));
  };

  useEffect(() => {
    if (
      tabWiseSiteData &&
      (dayTimeFilters?.dayTypes?.screenPerformance?.length === 0 ||
        !dayTimeFilters?.dayTypes?.screenPerformance) &&
      (dayTimeFilters?.timezones?.screenPerformance?.length === 0 ||
        !dayTimeFilters?.timezones?.screenPerformance)
    ) {
      setDayTimeFilters((prev: any) => ({
        ...prev,
        dayTypes: {
          ...prev?.dayTypes,
          screenPerformance: Object.keys(tabWiseSiteData?.dayWiseData || {}),
        },
        timezones: {
          ...prev?.timezones,
          screenPerformance: Object.keys(tabWiseSiteData?.timeWiseData || {}),
        },
      }));
    }
  }, [tabWiseSiteData, dayTimeFilters, setDayTimeFilters]);

  useEffect(() => {
    if (!dayTimeFilters) return; // safety

    dispatch(
      getSiteLevelPerformanceTabWiseForPlannerDashboard({
        campaignId: campaignId,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
        tab: HARDWARE_PERFORMANCE,
        date: new Date(currentDate).toISOString().replace("Z", "+00:00"),
        dayTypes: dayTimeFilters.dayTypes.screenPerformance?.filter(
          (f: any) => f !== "all"
        ),
        timezones: dayTimeFilters.timezones.screenPerformance?.filter(
          (f: any) => f !== "all"
        ),
      })
    );
  }, [dispatch, campaignId, currentDate, dayTimeFilters]);

  return (
    <div className="">
      {!loadingTabWiseSiteData &&
      tabWiseSiteData &&
      tabWiseSiteData.hardwarePerformanceData &&
      Object.keys(tabWiseSiteData.hardwarePerformanceData).length > 0 ? (
        <div className="grid grid-cols-5 gap-2 flex items-center">
          <div className="col-span-3  border rounded-[12px] bg-[#FFFFFF] border-gray-100 shadow-sm p-4">
            <div className="border-b">
              <SectionHeader
                iconClass="fi-ss-screen"
                title="Screen Performance"
                bgColor=" bg-[#6982FF]"
                dataValue={
                  <h1 className="text-[12px] font-semibold truncate">
                    Total:{" "}
                    {tabWiseSiteData?.dayWiseData.all?.hardwarePerformanceDelivered?.toFixed(
                      0
                    )}
                    %
                    <span className="text-[#0E212E]">
                      /
                      {tabWiseSiteData?.dayWiseData.all?.hardwarePerformancePromised?.toFixed(
                        0
                      )}
                      %
                    </span>
                  </h1>
                }
                subHeading={"Maxima represent 100% screen performance "}
              />
            </div>
            <div className="p-2">
              <DashBoardHardwarePerformanceGraph
                currentData={getHardwarePerformanceData()?.countsArray}
                labels={getHardwarePerformanceData()?.datesArray}
                allData={tabWiseSiteData?.hardwarePerformanceData}
              />
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-9 gap-2 h-full">
            <div className="col-span-5 bg-[#FFFFFF] h-full p-4 border rounded-[12px] border-gray-100 shadow-sm ">
              <div className="border-b">
                <SectionHeaderWithSwitch
                  iconClass="fi-sr-computer"
                  title="Day Type"
                  bgColor=" bg-[#6982FF]"
                  showPercent={dayTimePercentView?.[1]}
                  setShowPercent={() => {
                    setDayTimePercentView((pre: any) => {
                      return {
                        ...pre,
                        1: !dayTimePercentView?.[1],
                      };
                    });
                  }}
                  switchShow={false}
                />
              </div>
              <div className="py-2">
                {tabWiseSiteData?.dayWiseData &&
                  Object.keys(tabWiseSiteData?.dayWiseData)?.map(
                    (dayKey: any, i: any) => (
                      <div key={i} className="flex items-center gap-2 pt-1">
                        <div>
                          <CheckboxInput
                            disabled={false}
                            label={dayKey.toUpperCase()}
                            checked={dayTimeFilters.dayTypes[
                              "screenPerformance"
                            ]?.includes(dayKey)}
                            textSize={"10px"}
                            color={"#0E212E"}
                            onChange={(checked) =>
                              handleClick({
                                type: "dayType",
                                value: dayKey,
                                checked: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center w-full gap-2">
                          <MultiColorLinearBar2
                            delivered={
                              tabWiseSiteData?.dayWiseData[dayKey]
                                ?.hardwarePerformanceDelivered
                            }
                            expected={
                              (tabWiseSiteData?.dayWiseData[dayKey]
                                ?.hardwarePerformancePromised *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              tabWiseSiteData?.dayWiseData[dayKey]
                                ?.hardwarePerformancePromised
                            }
                            deliveredColor="bg-[#6982FF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#DFE5FF]"
                            height="h-[5px]"
                          />
                          <h1 className="text-[10px]">
                            {formatNumber(
                              tabWiseSiteData?.dayWiseData[
                                dayKey
                              ]?.hardwarePerformanceDelivered?.toFixed(0)
                            )}
                            %
                          </h1>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className="col-span-4 bg-[#FFFFFF] h-full p-4 border rounded-[12px] border-gray-100 shadow-sm ">
              <div className="border-b">
                <SectionHeaderWithSwitch
                  iconClass="fi-sr-computer"
                  title="Time Zone"
                  bgColor=" bg-[#6982FF]"
                  showPercent={dayTimePercentView?.[2]}
                  setShowPercent={() => {
                    setDayTimePercentView((pre: any) => {
                      return {
                        ...pre,
                        2: !dayTimePercentView?.[2],
                      };
                    });
                  }}
                  switchShow={false}
                />
              </div>
              <div className="py-2">
                {tabWiseSiteData?.timeWiseData &&
                  Object.keys(tabWiseSiteData?.timeWiseData)?.map(
                    (timeKey: any, i: any) => (
                      <div key={i} className="flex items-center gap-2 pt-1">
                        <div>
                          <CheckboxInput
                            disabled={false}
                            label={timeKey.toUpperCase()}
                            checked={dayTimeFilters?.timezones[
                              "screenPerformance"
                            ]?.includes(timeKey)}
                            textSize={"10px"}
                            color={"#0E212E"}
                            onChange={(checked) =>
                              handleClick({
                                type: "timezone",
                                value: timeKey,
                                checked: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center w-full gap-2">
                          <MultiColorLinearBar2
                            delivered={
                              tabWiseSiteData?.timeWiseData[timeKey]
                                ?.hardwarePerformanceDelivered
                            }
                            expected={
                              (tabWiseSiteData?.timeWiseData[timeKey]
                                ?.hardwarePerformancePromised *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              tabWiseSiteData?.timeWiseData[timeKey]
                                ?.hardwarePerformancePromised
                            }
                            deliveredColor="bg-[#6982FF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#DFE5FF]"
                            height="h-[5px]"
                          />
                          <h1 className="text-[10px]">
                            {formatNumber(
                              tabWiseSiteData?.timeWiseData[
                                timeKey
                              ]?.hardwarePerformanceDelivered?.toFixed(0)
                            )}
                            %
                          </h1>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#FFFFFF] h-[200px] rounded-[12px]">
          <LoadingScreen />
        </div>
      )}
    </div>
  );
};
