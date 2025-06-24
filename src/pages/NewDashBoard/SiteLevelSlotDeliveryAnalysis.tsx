import { SectionHeader } from "../../components/molecules/DashboardGrid";
import { SectionHeaderWithSwitch } from "../../components/segments/SectionHeaderWithSwitch";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSiteLevelPerformanceTabWiseForPlannerDashboard } from "../../actions/dashboardAction";
import { SPOT_DELIVERY } from "../../constants/tabDataConstant";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { DashBoardSlotGraph } from "../../components/segments/DashBoardSlotGraph";
import { Tooltip } from "antd";
import { getUserRole } from "../../utils/campaignUtils.js";

export const SiteLevelSlotDeliveryAnalysis = ({
  campaignId,
  setDayTimePercentView,
  dayTimePercentView,
  screenLevelData,
  dayTimeFilters,
  setDayTimeFilters,
  currentDate,
  campaignDetails,
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

  const getSlotDeliveryData = () => {
    const datesArray =
      tabWiseSiteData?.spotDeliveryData &&
      Object.keys(tabWiseSiteData?.spotDeliveryData)?.length !== 0
        ? Object.keys(tabWiseSiteData?.spotDeliveryData)?.map(
            (date: any) => date
          )
        : [];
    const countsArray =
      tabWiseSiteData?.spotDeliveryData &&
      Object.values(tabWiseSiteData?.spotDeliveryData)?.length !== 0
        ? Object.values(tabWiseSiteData?.spotDeliveryData)?.map(
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
        spotDelivery:
          type == "dayType" && checked
            ? [...prev?.dayTypes?.spotDelivery, value]
            : type == "dayType" && checked && value == "all"
            ? []
            : type == "dayType" && !checked
            ? dayTimeFilters?.dayTypes?.spotDelivery?.filter(
                (f: any) => f !== value
              )
            : dayTimeFilters?.dayTypes?.spotDelivery,
      },
      timezones: {
        ...prev?.timezones,
        spotDelivery:
          type == "timezone" && checked
            ? [...prev?.timezones?.spotDelivery, value]
            : type == "timezone" && checked && value == "all"
            ? []
            : type == "timezone" && !checked
            ? dayTimeFilters?.timezones?.spotDelivery?.filter(
                (f: any) => f !== value
              )
            : dayTimeFilters?.timezones?.spotDelivery,
      },
    }));
  };

  useEffect(() => {
    if (
      tabWiseSiteData &&
      (dayTimeFilters?.dayTypes?.spotDelivery?.length === 0 ||
        !dayTimeFilters?.dayTypes?.spotDelivery) &&
      (dayTimeFilters?.timezones?.spotDelivery?.length === 0 ||
        !dayTimeFilters?.timezones?.spotDelivery)
    ) {
      setDayTimeFilters((prev: any) => ({
        ...prev,
        dayTypes: {
          ...prev?.dayTypes,
          spotDelivery: Object.keys(tabWiseSiteData?.dayWiseData || {}),
        },
        timezones: {
          ...prev?.timezones,
          spotDelivery: Object.keys(tabWiseSiteData?.timeWiseData || {}),
        },
      }));
    }
  }, [tabWiseSiteData, dayTimeFilters, setDayTimeFilters]);

  useEffect(() => {
    if (!dayTimeFilters) return; // safety

    dispatch(
      getSiteLevelPerformanceTabWiseForPlannerDashboard({
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
        campaignId: campaignId,
        tab: SPOT_DELIVERY,
        date: new Date(currentDate).toISOString().replace("Z", "+00:00"),
        dayTypes: dayTimeFilters.dayTypes.spotDelivery?.filter(
          (f: any) => f !== "all"
        ),
        timezones: dayTimeFilters.timezones.spotDelivery?.filter(
          (f: any) => f !== "all"
        ),
      })
    );
  }, [dispatch, campaignId, currentDate, dayTimeFilters]);

  return (
    <div className="">
      {!loadingTabWiseSiteData &&
      tabWiseSiteData &&
      tabWiseSiteData.spotDeliveryData &&
      Object.keys(tabWiseSiteData.spotDeliveryData).length > 0 ? (
        <div className="grid grid-cols-5 gap-2 flex items-center">
          {/* <div className="col-span-3 flex items-center p-4 border bg-[#FFFFFF] rounded-[12px] border-gray-100 shadow-sm">
            <DashBoardSlotGraph
              currentData={getSlotDeliveryData()?.countsArray}
              labels={getSlotDeliveryData()?.datesArray}
              allData={tabWiseSiteData?.spotDeliveryData}
            />
          </div> */}
          <div className="col-span-3 p-4 border bg-[#FFFFFF] rounded-[12px] border-gray-100 shadow-sm">
            <div className="border-b">
              <SectionHeader
                iconClass="fi-ss-screen"
                title="Spot Delivery"
                bgColor=" bg-[#77BFEF]"
                dataValue={
                  <Tooltip
                    title={`Slot delivered till now / slot promised till today`}
                  >
                    <h1 className="text-[12px] font-semibold truncate">
                      Total:{" "}
                      <span
                        className={`${
                          tabWiseSiteData?.dayWiseData.all
                            ?.totalSlotsDelivered >
                          tabWiseSiteData?.dayWiseData.all
                            ?.slotsPromisedTillDate
                            ? "text-[#4DB37E]"
                            : "text-[#EF4444]"
                        }`}
                      >
                        {formatNumber(
                          tabWiseSiteData?.dayWiseData.all?.totalSlotsDelivered?.toFixed(
                            0
                          )
                        )}
                      </span>
                      <span className="text-[#0E212E]">
                        /
                        {formatNumber(
                          tabWiseSiteData?.dayWiseData.all?.slotsPromisedTillDate?.toFixed(
                            0
                          )
                        )}
                      </span>
                    </h1>
                  </Tooltip>
                }
                subHeading={
                  "Maxima represent total spots delivered along with extra slots delivered"
                }
              />
            </div>
            <div className="p-2">
              <DashBoardSlotGraph
                currentData={getSlotDeliveryData()?.countsArray}
                labels={getSlotDeliveryData()?.datesArray}
                allData={tabWiseSiteData?.spotDeliveryData}
                campaignDetails={campaignDetails}
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
                              "spotDelivery"
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
                                    ?.totalSlotsDelivered *
                                    100) /
                                  tabWiseSiteData?.dayWiseData[dayKey]
                                    ?.slotsPromised
                                ).toFixed(0)}%`
                              : formatNumber(
                                  tabWiseSiteData?.dayWiseData[dayKey]
                                    ?.totalSlotsDelivered
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
                              "spotDelivery"
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
                                ?.totalSlotsDelivered
                            }
                            expected={
                              (tabWiseSiteData?.timeWiseData[timeKey]
                                ?.slotsPromised *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              tabWiseSiteData?.timeWiseData[timeKey]
                                ?.slotsPromised
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
                                    ?.totalSlotsDelivered *
                                    100) /
                                  tabWiseSiteData?.timeWiseData[timeKey]
                                    ?.slotsPromised
                                ).toFixed(0)}%`
                              : formatNumber(
                                  tabWiseSiteData?.timeWiseData[timeKey]
                                    ?.totalSlotsDelivered
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
