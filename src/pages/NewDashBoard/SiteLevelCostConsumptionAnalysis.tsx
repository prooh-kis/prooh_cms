import { SectionHeader } from "../../components/molecules/DashboardGrid";
import { SectionHeaderWithSwitch } from "../../components/segments/SectionHeaderWithSwitch";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSiteLevelPerformanceTabWiseForPlannerDashboard } from "../../actions/dashboardAction";
import { COST_CONSUMED } from "../../constants/tabDataConstant";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { DashBoardCostGraph } from "../../components/segments/DashBoardCostGraph";
import { getUserRole } from "../../utils/campaignUtils.js";

export const SiteLevelCostConsumptionAnalysis = ({
  campaignId,
  setDayTimePercentView,
  dayTimePercentView,
  screenLevelData,
  dayTimeFilters,
  setDayTimeFilters,
  currentDate,
}: any) => {
  const dispatch = useDispatch<any>();

  const {
    loading: loadingTabWiseSiteData,
    error: errorTabWiseSiteData,
    data: tabWiseSiteData,
  } = useSelector(
    (state: any) => state.siteLevelPerformanceTabWiseForPlannerDashboard
  );

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const getCostConsumptionData = () => {
    const datesArray =
      tabWiseSiteData?.costData &&
      Object.keys(tabWiseSiteData?.costData)?.length !== 0
        ? Object.keys(tabWiseSiteData?.costData)?.map((date: any) => date)
        : [];
    const countsArray =
      tabWiseSiteData?.costData &&
      Object.values(tabWiseSiteData?.costData)?.length !== 0
        ? Object.values(tabWiseSiteData?.costData)?.map((slot: any) => slot)
        : [];
    return { datesArray, countsArray };
  };

  const handleClick = ({ type, value, checked }: any) => {
    setDayTimeFilters((prev: any) => ({
      ...prev,
      dayTypes: {
        ...prev?.dayTypes,
        costConsumption:
          type == "dayType" && checked
            ? [...prev?.dayTypes?.costConsumption, value]
            : type == "dayType" && checked && value == "all"
            ? []
            : type == "dayType" && !checked
            ? dayTimeFilters?.dayTypes?.costConsumption?.filter(
                (f: any) => f !== value
              )
            : dayTimeFilters?.dayTypes?.costConsumption,
      },
      timezones: {
        ...prev?.timezones,
        costConsumption:
          type == "timezone" && checked
            ? [...prev?.timezones?.costConsumption, value]
            : type == "timezone" && checked && value == "all"
            ? []
            : type == "timezone" && !checked
            ? dayTimeFilters?.timezones?.costConsumption?.filter(
                (f: any) => f !== value
              )
            : dayTimeFilters?.timezones?.costConsumption,
      },
    }));
  };

  useEffect(() => {
    if (
      tabWiseSiteData &&
      (dayTimeFilters?.dayTypes?.costConsumption?.length === 0 ||
        !dayTimeFilters?.dayTypes?.costConsumption) &&
      (dayTimeFilters?.timezones?.costConsumption?.length === 0 ||
        !dayTimeFilters?.timezones?.costConsumption)
    ) {
      setDayTimeFilters((prev: any) => ({
        ...prev,
        dayTypes: {
          ...prev?.dayTypes,
          costConsumption: Object.keys(tabWiseSiteData?.dayWiseData || {}),
        },
        timezones: {
          ...prev?.timezones,
          costConsumption: Object.keys(tabWiseSiteData?.timeWiseData || {}),
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
        tab: COST_CONSUMED,
        date: new Date(currentDate).toISOString().replace("Z", "+00:00"),
        dayTypes: dayTimeFilters.dayTypes.costConsumption?.filter(
          (f: any) => f !== "all"
        ),
        timezones: dayTimeFilters.timezones.costConsumption?.filter(
          (f: any) => f !== "all"
        ),
      })
    );
  }, [dispatch, campaignId, currentDate, dayTimeFilters]);

  return (
    <div className="">
      {!loadingTabWiseSiteData &&
      tabWiseSiteData &&
      tabWiseSiteData.costData &&
      Object.keys(tabWiseSiteData.costData).length > 0 ? (
        <div className="grid grid-cols-5 gap-2 flex items-center">
          <div className="col-span-3 p-4 border bg-[#FFFFFF] rounded-[12px] border-gray-100 shadow-sm">
            <div className="border-b">
              <SectionHeader
                iconClass="fi-ss-sack"
                title="Cost Consumed"
                bgColor=" bg-[#6DBC48]"
                dataValue={
                  <h1 className="text-[12px] font-semibold truncate">
                    Total: &#8377;
                    {formatNumber(
                      tabWiseSiteData?.dayWiseData.all?.costConsumed?.toFixed(0)
                    )}
                    <span className="text-[#0E212E]">
                      /&#8377;
                      {formatNumber(
                        tabWiseSiteData?.dayWiseData.all?.costPromised?.toFixed(
                          0
                        )
                      )}
                    </span>
                  </h1>
                }
                subHeading={
                  "Maxima represent total cost spend for all the delivered slots"
                }
              />
            </div>
            <div className="p-2">
              <DashBoardCostGraph
                currentData={getCostConsumptionData()?.countsArray}
                labels={getCostConsumptionData()?.datesArray}
                allData={tabWiseSiteData?.costData}
              />
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-9 gap-2 h-full">
            <div className="col-span-5 bg-[#FFFFFF] h-full p-4 border rounded-[12px] border-gray-100 shadow-sm">
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
                              "costConsumption"
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
                                ?.totalSlotsDelivered
                            }
                            expected={
                              (tabWiseSiteData?.dayWiseData[dayKey]
                                ?.slotsPromised *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              tabWiseSiteData?.dayWiseData[dayKey]
                                ?.slotsPromised
                            }
                            deliveredColor="bg-[#6982FF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#DFE5FF]"
                            height="h-[5px]"
                          />
                          <h1 className="text-[10px] col-span-1">
                            {dayTimePercentView[1]
                              ? `${(
                                  (tabWiseSiteData?.dayWiseData[dayKey]
                                    ?.costConsumed *
                                    100) /
                                  tabWiseSiteData?.dayWiseData[dayKey]
                                    ?.costPromised
                                ).toFixed(0)}%`
                              : formatNumber(
                                  tabWiseSiteData?.dayWiseData[dayKey]
                                    ?.costConsumed
                                )}
                          </h1>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className="col-span-4 bg-[#FFFFFF] h-full p-4 border rounded-[12px] border-gray-100 shadow-sm">
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
                              "costConsumption"
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
                                ?.costConsumed
                            }
                            expected={
                              (tabWiseSiteData?.timeWiseData[timeKey]
                                ?.costPromised *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              tabWiseSiteData?.timeWiseData[timeKey]
                                ?.costPromised
                            }
                            deliveredColor="bg-[#6982FF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#DFE5FF]"
                            height="h-[5px]"
                          />
                          {/* <h1 className="text-[10px]">
                          {formatNumber(
                            tabWiseSiteData?.timeWiseData[
                              timeKey
                            ]?.totalSlotsDelivered.toFixed(0)
                          )}
                          
                        </h1> */}
                          <h1 className="text-[10px] col-span-1">
                            {dayTimePercentView[1]
                              ? `${(
                                  (tabWiseSiteData?.timeWiseData[timeKey]
                                    ?.costConsumed *
                                    100) /
                                  tabWiseSiteData?.timeWiseData[timeKey]
                                    ?.costPromised
                                ).toFixed(0)}%`
                              : formatNumber(
                                  tabWiseSiteData?.timeWiseData[timeKey]
                                    ?.costConsumed
                                )}
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
