import { SectionHeader } from "../../components/molecules/DashboardGrid";
import { SectionHeaderWithSwitch } from "../../components/segments/SectionHeaderWithSwitch";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";
import { DashBoardCostGraph } from "../../components/segments/DashBoardCostGraph";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCostDataForPlannerDashboard } from "../../actions/dashboardAction";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { getUserRole } from "../../utils/campaignUtils.js";

export const CostSegment = ({
  campaignId,
  setShowPercent,
  showPercent,
  screenLevelData,
  filters,
  setFilters,
  dataToShow,
}: any) => {
  const dispatch = useDispatch<any>();

  const { loading: loadingCostData, data: costData } = useSelector(
    (state: any) => state.costDataForPlannerDashboard
  );
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const getCostData = () => {
    const datesArray = Object.keys(costData?.costData)?.map(
      (date: any) => date
    );
    const countsArray = Object.values(costData?.costData).map(
      (slot: any) => slot
    );
    return { datesArray, countsArray };
  };

  const handleClick = ({ type, value, checked }: any) => {
    setFilters((prev: any) => ({
      ...prev,
      cities: {
        ...prev.cities,
        costConsumption:
          type == "city" && checked
            ? [...prev.cities.costConsumption, value]
            : type == "city" && checked && value == "all"
            ? []
            : type == "city" && !checked
            ? filters.cities.costConsumption.filter((f: any) => f !== value)
            : filters.cities.costConsumption,
      },
      touchPoints: {
        ...prev.touchPoints,
        costConsumption:
          type == "touchpoint" && checked
            ? [...prev.touchPoints.costConsumption, value]
            : type == "touchpoint" && checked && value == "all"
            ? []
            : type == "touchpoint" && !checked
            ? filters.touchPoints.costConsumption.filter(
                (f: any) => f !== value
              )
            : filters.touchPoints.costConsumption,
      },
      screenTypes: {
        ...prev.screenTypes,
        costConsumption:
          type == "screenType" && checked
            ? [...prev.screenTypes.costConsumption, value]
            : type == "screenType" && checked && value == "all"
            ? []
            : type == "screenType" && !checked
            ? filters.screenTypes.costConsumption.filter(
                (f: any) => f !== value
              )
            : filters.screenTypes.costConsumption,
      },
      dayTypes: {
        ...prev.dayTypes,
        costConsumption:
          type == "dayType" && checked
            ? [...prev.dayTypes.costConsumption, value]
            : type == "dayType" && checked && value == "all"
            ? []
            : type == "dayType" && !checked
            ? filters.dayTypes.costConsumption.filter((f: any) => f !== value)
            : filters.dayTypes.costConsumption,
      },
      timezones: {
        ...prev.timezones,
        costConsumption:
          type == "timezone" && checked
            ? [...prev.timezones.costConsumption, value]
            : type == "timezone" && checked && value == "all"
            ? []
            : type == "timezone" && !checked
            ? filters.timezones.costConsumption.filter((f: any) => f !== value)
            : filters.timezone.costConsumption,
      },
    }));
  };
  // Initialize filters based on spot data
  useEffect(() => {
    if (
      costData &&
      (filters.cities.costConsumption.length == 0 ||
        filters.touchPoints.costConsumption.length == 0 ||
        filters.screenTypes.costConsumption.length == 0)
    ) {
      setFilters((prev: any) => ({
        ...prev,
        cities: {
          ...prev.cities,
          costConsumption: Object.keys(costData.cityWiseData),
        },
        touchPoints: {
          ...prev.touchPoints,
          costConsumption: Object.keys(costData.touchPointWiseData),
        },
        screenTypes: {
          ...prev.screenTypes,
          costConsumption: Object.keys(costData.screenTypeWiseData),
        },
        dayTypes: {
          ...prev.dayTypes,
          costConsumption: Object.keys(costData.dayWiseData),
        },
        timezones: {
          ...prev.timezones,
          costConsumption: Object.keys(costData.timeWiseData),
        },
      }));
    }
  }, [costData, filters, setFilters]);

  useEffect(() => {
    if (filters && campaignId && !costData) {
      dispatch(
        getCostDataForPlannerDashboard({
          id: campaignId,
          userRole: getUserRole(userInfo?.userRole),
          userId: userInfo?._id,
          cities: filters.cities.costConsumption?.filter(
            (f: any) => f !== "all"
          ),
          touchPoints: filters.touchPoints.costConsumption?.filter(
            (f: any) => f !== "all"
          ),
          screenTypes: filters.screenTypes.costConsumption?.filter(
            (f: any) => f !== "all"
          ),
          dayTypes: filters.dayTypes.costConsumption?.filter(
            (f: any) => f !== "all"
          ),
          timezones: filters.timezones.costConsumption?.filter(
            (f: any) => f !== "all"
          ),
        })
      );
    }
  }, [dispatch, campaignId, filters, costData]);

  return (
    <div className="h-full w-full">
      {loadingCostData && (
        <div className="h-[240px] bg-[#FFFFFF] border border-gray-100 rounded-[12px] shadow-sm">
          <LoadingScreen />
        </div>
      )}
      {costData && (
        <div className="w-full">
          <div className="w-full bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
            <div className="border-b">
              <SectionHeader
                iconClass="fi-ss-sack"
                title="Cost Consumed"
                bgColor=" bg-[#6DBC48]"
                dataValue={
                  <h1 className="text-[12px] font-semibold truncate">
                    Total: &#8377;
                    {formatNumber(dataToShow.costConsumed.toFixed(0))}
                    <span className="text-[#0E212E]">
                      /&#8377;
                      {formatNumber(dataToShow.costTakenTillDate.toFixed(0))}
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
                allData={costData?.costData}
                currentData={getCostData().countsArray}
                labels={getCostData().datesArray}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 pt-2">
            <div className="col-span-2 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
              <div className="border-b">
                <SectionHeaderWithSwitch
                  iconClass="fi-sr-marker"
                  title="Cities"
                  bgColor=" bg-[#6DBC48]"
                  showPercent={showPercent?.[1]}
                  setShowPercent={() => {
                    setShowPercent((pre: any) => {
                      return {
                        ...pre,
                        1: !showPercent?.[1],
                      };
                    });
                  }}
                />
              </div>
              <div className="py-2">
                {Object.keys(costData.cityWiseData)?.map(
                  (cityKey: any, i: any) => (
                    <div key={i} className="flex items-center gap-2 pt-1">
                      <div>
                        <CheckboxInput
                          disabled={false}
                          label={cityKey.toUpperCase()}
                          checked={filters.cities["costConsumption"]?.includes(
                            cityKey
                          )}
                          textSize={"10px"}
                          color={"#0E212E"}
                          onChange={(checked) =>
                            handleClick({
                              type: "city",
                              value: cityKey,
                              checked: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center w-full gap-2">
                        <MultiColorLinearBar2
                          delivered={
                            costData.cityWiseData[cityKey]?.costConsumed
                          }
                          expected={
                            (costData.cityWiseData[cityKey]?.costPromised *
                              (screenLevelData?.data?.durationDelivered || 1)) /
                            screenLevelData?.data?.durationPromised
                          }
                          total={costData.cityWiseData[cityKey]?.costPromised}
                          deliveredColor="bg-[#64AB42]"
                          expectedColor="bg-[#CFC7FF]"
                          totalColor="bg-[#E1FFD3]"
                          height="h-[5px]"
                        />
                        <h1 className="text-[10px]">
                          {showPercent[1]
                            ? `${(
                                (costData.cityWiseData[cityKey]?.costConsumed *
                                  100) /
                                costData.cityWiseData[cityKey]?.costPromised
                              ).toFixed(0)}%`
                            : formatNumber(
                                costData.cityWiseData[cityKey]?.costConsumed
                              )}
                        </h1>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="col-span-3 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
              <div className="border-b">
                <SectionHeaderWithSwitch
                  iconClass="fi-sr-land-location"
                  title="Touchpoints"
                  bgColor=" bg-[#6DBC48]"
                  showPercent={showPercent?.[2]}
                  setShowPercent={() => {
                    setShowPercent((pre: any) => {
                      return {
                        ...pre,
                        2: !showPercent?.[2],
                      };
                    });
                  }}
                />
              </div>
              <div className="py-2">
                {Object.keys(costData.touchPointWiseData)?.map(
                  (tpKey: any, i: any) => (
                    <div key={i} className="flex items-center gap-2 pt-1">
                      <div>
                        <CheckboxInput
                          disabled={false}
                          label={tpKey.toUpperCase()}
                          checked={filters.touchPoints[
                            "costConsumption"
                          ]?.includes(tpKey)}
                          textSize={"10px"}
                          color={"#0E212E"}
                          onChange={(checked) =>
                            handleClick({
                              type: "touchpoint",
                              value: tpKey,
                              checked: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center w-full gap-2">
                        <MultiColorLinearBar2
                          delivered={
                            costData.touchPointWiseData[tpKey]?.costConsumed
                          }
                          expected={
                            (costData.touchPointWiseData[tpKey]?.costPromised *
                              (screenLevelData?.data?.durationDelivered || 1)) /
                            screenLevelData?.data?.durationPromised
                          }
                          total={
                            costData.touchPointWiseData[tpKey]?.costPromised
                          }
                          deliveredColor="bg-[#64AB42]"
                          expectedColor="bg-[#CFC7FF]"
                          totalColor="bg-[#E1FFD3]"
                          height="h-[5px]"
                        />
                        <h1 className="text-[10px]">
                          {showPercent[2]
                            ? `${(
                                (costData.touchPointWiseData[tpKey]
                                  ?.costConsumed *
                                  100) /
                                costData.touchPointWiseData[tpKey]?.costPromised
                              ).toFixed(0)}%`
                            : formatNumber(
                                costData.touchPointWiseData[tpKey]?.costConsumed
                              )}
                        </h1>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="col-span-2 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
              <div className="border-b">
                <SectionHeaderWithSwitch
                  iconClass="fi-sr-land-location"
                  title="Touchpoints"
                  bgColor=" bg-[#6DBC48]"
                  showPercent={showPercent?.[3]}
                  setShowPercent={() => {
                    setShowPercent((pre: any) => {
                      return {
                        ...pre,
                        3: !showPercent?.[3],
                      };
                    });
                  }}
                />
              </div>
              <div className="py-2">
                {Object.keys(costData.screenTypeWiseData)?.map(
                  (stKey: any, i: any) => (
                    <div key={i} className="flex items-center gap-2 pt-1">
                      <div>
                        <CheckboxInput
                          disabled={false}
                          label={stKey.toUpperCase()}
                          checked={filters.screenTypes[
                            "costConsumption"
                          ]?.includes(stKey)}
                          textSize={"10px"}
                          color={"#0E212E"}
                          onChange={(checked) =>
                            handleClick({
                              type: "screenType",
                              value: stKey,
                              checked: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center w-full gap-2">
                        <MultiColorLinearBar2
                          delivered={
                            costData.screenTypeWiseData[stKey]?.costConsumed
                          }
                          expected={
                            (costData.screenTypeWiseData[stKey]?.costPromised *
                              (screenLevelData?.data?.durationDelivered || 1)) /
                            screenLevelData?.data?.durationPromised
                          }
                          total={
                            costData.screenTypeWiseData[stKey]?.costPromised
                          }
                          deliveredColor="bg-[#64AB42]"
                          expectedColor="bg-[#CFC7FF]"
                          totalColor="bg-[#E1FFD3]"
                          height="h-[5px]"
                        />
                        <h1 className="text-[10px]">
                          {showPercent[3]
                            ? `${(
                                (costData.screenTypeWiseData[stKey]
                                  ?.costConsumed *
                                  100) /
                                costData.screenTypeWiseData[stKey]?.costPromised
                              ).toFixed(0)}%`
                            : formatNumber(
                                costData.screenTypeWiseData[stKey]?.costConsumed
                              )}
                        </h1>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="col-span-3 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
              <div className="border-b">
                <SectionHeaderWithSwitch
                  iconClass="fi-sr-land-location"
                  title="Day Types"
                  bgColor="bg-[#6DBC48]"
                  showPercent={showPercent?.[4]}
                  setShowPercent={() => {
                    setShowPercent((pre: any) => {
                      return {
                        ...pre,
                        4: !showPercent?.[4],
                      };
                    });
                  }}
                />
              </div>
              <div className="py-2">
                {Object.keys(costData.dayWiseData)?.map(
                  (dayKey: any, i: any) => (
                    <div key={i} className="flex items-center gap-2 pt-1">
                      <div>
                        <CheckboxInput
                          disabled={false}
                          label={dayKey.toUpperCase()}
                          checked={filters.dayTypes[
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
                          delivered={costData.dayWiseData[dayKey]?.costConsumed}
                          expected={
                            (costData.dayWiseData[dayKey]?.costPromised *
                              (screenLevelData?.data?.durationDelivered || 1)) /
                            screenLevelData?.data?.durationPromised
                          }
                          total={costData.dayWiseData[dayKey]?.costPromised}
                          deliveredColor="bg-[#64AB42]"
                          expectedColor="bg-[#CFC7FF]"
                          totalColor="bg-[#E1FFD3]"
                          height="h-[5px]"
                        />
                        <h1 className="text-[10px]">
                          {showPercent[4]
                            ? `${(
                                (costData.dayWiseData[dayKey]?.costConsumed *
                                  100) /
                                costData.dayWiseData[dayKey]?.costPromised
                              ).toFixed(0)}%`
                            : formatNumber(
                                costData.dayWiseData[dayKey]?.costConsumed
                              )}
                        </h1>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="col-span-2 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
              <div className="border-b">
                <SectionHeaderWithSwitch
                  iconClass="fi-sr-land-location"
                  title="Time Zones"
                  bgColor=" bg-[#6DBC48]"
                  showPercent={showPercent?.[5]}
                  setShowPercent={() => {
                    setShowPercent((pre: any) => {
                      return {
                        ...pre,
                        5: !showPercent?.[5],
                      };
                    });
                  }}
                />
              </div>
              <div className="py-2">
                {Object.keys(costData.timeWiseData)?.map(
                  (timeKey: any, i: any) => (
                    <div key={i} className="flex items-center gap-2 pt-1">
                      <div>
                        <CheckboxInput
                          disabled={false}
                          label={timeKey.toUpperCase()}
                          checked={filters.timezones[
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
                            costData.timeWiseData[timeKey]?.costConsumed
                          }
                          expected={
                            (costData.timeWiseData[timeKey]?.costPromised *
                              (screenLevelData?.data?.durationDelivered || 1)) /
                            screenLevelData?.data?.durationPromised
                          }
                          total={costData.timeWiseData[timeKey]?.costPromised}
                          deliveredColor="bg-[#64AB42]"
                          expectedColor="bg-[#CFC7FF]"
                          totalColor="bg-[#E1FFD3]"
                          height="h-[5px]"
                        />
                        <h1 className="text-[10px]">
                          {showPercent[5]
                            ? `${(
                                (costData.timeWiseData[timeKey]?.costConsumed *
                                  100) /
                                costData.timeWiseData[timeKey]?.costPromised
                              ).toFixed(0)}%`
                            : formatNumber(
                                costData.timeWiseData[timeKey]?.costConsumed
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
      )}
    </div>
  );
};
