import { useDispatch, useSelector } from "react-redux";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";
import { useEffect } from "react";
import { getSiteLevelPerformanceTabWiseForPlannerDashboard } from "../../actions/dashboardAction";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { AUDIENCE_IMPRESSION } from "../../constants/tabDataConstant";
import { SectionHeaderWithSwitch } from "../../components/segments/SectionHeaderWithSwitch";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { getUserRole } from "../../utils/campaignUtils.js";

export const SiteLevelAudienceAnalysis = ({
  campaignId,
  screenLevelData,
  currentDate,
  dayTimeFilters,
  setDayTimeFilters,
  dayTimePercentView,
  setDayTimePercentView,
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

  const handleClick = ({ type, value, checked }: any) => {
    setDayTimeFilters((prev: any) => ({
      ...prev,
      dayTypes: {
        ...prev?.dayTypes,
        audience:
          type == "dayType" && checked
            ? [...prev?.dayTypes?.audience, value]
            : type == "dayType" && checked && value == "all"
            ? []
            : type == "dayType" && !checked
            ? dayTimeFilters?.dayTypes?.audience?.filter(
                (f: any) => f !== value
              )
            : dayTimeFilters?.dayTypes?.audience,
      },
      timezones: {
        ...prev?.timezones,
        audience:
          type == "timezone" && checked
            ? [...prev?.timezones?.audience, value]
            : type == "timezone" && checked && value == "all"
            ? []
            : type == "timezone" && !checked
            ? dayTimeFilters?.timezones?.audience?.filter(
                (f: any) => f !== value
              )
            : dayTimeFilters?.timezones?.audience,
      },
    }));
  };

  useEffect(() => {
    if (
      tabWiseSiteData &&
      (dayTimeFilters?.dayTypes?.audience?.length === 0 ||
        !dayTimeFilters?.dayTypes?.audience) &&
      (dayTimeFilters?.timezones?.audience?.length === 0 ||
        !dayTimeFilters?.timezones?.audience)
    ) {
      setDayTimeFilters((prev: any) => ({
        ...prev,
        dayTypes: {
          ...prev?.dayTypes,
          audience: Object.keys(tabWiseSiteData?.dayWiseData || {}),
        },
        timezones: {
          ...prev?.timezones,
          audience: Object.keys(tabWiseSiteData?.timeWiseData || {}),
        },
      }));
    }
  }, [tabWiseSiteData, dayTimeFilters, setDayTimeFilters]);

  useEffect(() => {
    dispatch(
      getSiteLevelPerformanceTabWiseForPlannerDashboard({
        campaignId: campaignId,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
        tab: AUDIENCE_IMPRESSION,
        date: new Date(currentDate).toISOString().replace("Z", "+00:00"),
        dayTypes: dayTimeFilters.dayTypes.audience?.filter(
          (f: any) => f !== "all"
        ),
        timezones: dayTimeFilters.timezones.audience?.filter(
          (f: any) => f !== "all"
        ),
      })
    );
  }, [dispatch, campaignId, currentDate, dayTimeFilters]);

  return (
    <div className="">
      {!loadingTabWiseSiteData &&
      tabWiseSiteData &&
      tabWiseSiteData.audienceTypeData &&
      Object.keys(tabWiseSiteData.audienceTypeData).length > 0 ? (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-3 p-4 border rounded-[12px] border-gray-100 bg-[#FFFFFF] shadow-sm pr-4 pt-2">
            <div className="">
              <h1 className="text-[14px] font-semibold">
                Gender Wise Impressions
              </h1>
              <div className="pt-1 w-full overflow-y-auto no-scrollbar">
                {Object.keys(tabWiseSiteData?.audienceTypeData)
                  ?.filter((t: any) => t == "all")
                  ?.map((audienceType: any, i: any) => (
                    <div
                      key={i}
                      className="grid grid-cols-5 flex items-center gap-2 pt-1"
                    >
                      <div className="col-span-1 truncate py-1">
                        <h1 className="text-[10px] truncate">
                          {audienceType.toUpperCase()}
                        </h1>
                      </div>
                      <div className="col-span-4 grid grid-cols-6 flex items-center w-full gap-2">
                        <div className="col-span-5 flex items-center w-full gap-2">
                          <MultiColorLinearBar2
                            delivered={
                              tabWiseSiteData?.audienceTypeData[audienceType]
                                ?.impressionDeliveredTotal
                            }
                            expected={
                              (tabWiseSiteData?.audienceTypeData[audienceType]
                                ?.impressionPromisedTotal *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              tabWiseSiteData?.audienceTypeData[audienceType]
                                ?.impressionPromisedTotal
                            }
                            deliveredColor="bg-[#129BFF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#DFE5FF]"
                            height="h-[5px]"
                          />
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <h1 className="text-[10px]">
                            {formatNumber(
                              Number(
                                tabWiseSiteData?.audienceTypeData[audienceType]
                                  ?.impressionDeliveredTotal
                              ).toFixed(0)
                            )}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="grid grid-cols-5 flex items-center gap-2 pt-1">
                  <div className="col-span-1 truncate py-1">
                    <h1 className="text-[10px] truncate">
                      {"Male".toUpperCase()}
                    </h1>
                  </div>
                  <div className="col-span-4 grid grid-cols-6 flex items-center w-full gap-2">
                    <div className="col-span-5 flex items-center w-full gap-2">
                      <MultiColorLinearBar2
                        delivered={
                          tabWiseSiteData?.audienceTypeData["all"]
                            ?.impressionDeliveredMale
                        }
                        expected={
                          (tabWiseSiteData?.audienceTypeData["all"]
                            ?.impressionPromisedMale *
                            (screenLevelData?.data?.durationDelivered || 1)) /
                          screenLevelData?.data?.durationPromised
                        }
                        total={
                          tabWiseSiteData?.audienceTypeData["all"]
                            ?.impressionPromisedMale
                        }
                        deliveredColor="bg-[#5864FF]"
                        expectedColor="bg-[#CFC7FF]"
                        totalColor="bg-[#DFE5FF]"
                        height="h-[5px]"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <h1 className="text-[10px]">
                        {formatNumber(
                          Number(
                            tabWiseSiteData?.audienceTypeData["all"]
                              ?.impressionDeliveredMale
                          ).toFixed(0)
                        )}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-5 flex items-center gap-2 pt-1">
                  <div className="col-span-1 truncate py-1">
                    <h1 className="text-[10px] truncate">
                      {"Female".toUpperCase()}
                    </h1>
                  </div>
                  <div className="col-span-4 grid grid-cols-6 flex items-center w-full gap-2">
                    <div className="col-span-5 flex items-center w-full gap-2">
                      <MultiColorLinearBar2
                        delivered={
                          tabWiseSiteData?.audienceTypeData["all"]
                            ?.impressionDeliveredFemale
                        }
                        expected={
                          (tabWiseSiteData?.audienceTypeData["all"]
                            ?.impressionPromisedFemale *
                            (screenLevelData?.data?.durationDelivered || 1)) /
                          screenLevelData?.data?.durationPromised
                        }
                        total={
                          tabWiseSiteData?.audienceTypeData["all"]
                            ?.impressionPromisedFemale
                        }
                        deliveredColor="bg-[#DC97FF]"
                        expectedColor="bg-[#CFC7FF]"
                        totalColor="bg-[#DFE5FF]"
                        height="h-[5px]"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <h1 className="text-[10px]">
                        {formatNumber(
                          Number(
                            tabWiseSiteData?.audienceTypeData["all"]
                              ?.impressionDeliveredFemale
                          ).toFixed(0)
                        )}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <h1 className="text-[14px] font-semibold">
                Audience Type Wise Impressions
              </h1>
              <div className="h-[90px] pt-1 w-full overflow-y-auto no-scrollbar">
                {Object.keys(tabWiseSiteData?.audienceTypeData)
                  ?.filter((t: any) => t !== "all")
                  ?.map((audienceType: any, i: any) => (
                    <div
                      key={i}
                      className="grid grid-cols-10 flex items-center gap-2 pt-1"
                    >
                      <div className="col-span-4 truncate py-1">
                        <h1 className="text-[10px] truncate">
                          {audienceType.toUpperCase()}
                        </h1>
                      </div>
                      <div className="col-span-6 grid grid-cols-6 flex items-center w-full gap-2">
                        <div className="col-span-5 flex items-center w-full gap-2">
                          <MultiColorLinearBar2
                            delivered={
                              tabWiseSiteData?.audienceTypeData[audienceType]
                                ?.impressionDeliveredMale
                            }
                            expected={
                              (tabWiseSiteData?.audienceTypeData[audienceType]
                                ?.impressionPromisedMale *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              tabWiseSiteData?.audienceTypeData[audienceType]
                                ?.impressionPromisedMale
                            }
                            deliveredColor="bg-[#5863FF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#DFE5FF]"
                            height="h-[5px]"
                          />
                          <MultiColorLinearBar2
                            delivered={
                              tabWiseSiteData?.audienceTypeData[audienceType]
                                ?.impressionDeliveredFemale
                            }
                            expected={
                              (tabWiseSiteData?.audienceTypeData[audienceType]
                                ?.impressionPromisedFemale *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              tabWiseSiteData?.audienceTypeData[audienceType]
                                ?.impressionPromisedFemale
                            }
                            deliveredColor="bg-[#DC97FF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#F9ECFF]"
                            height="h-[5px]"
                          />
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <h1 className="text-[10px]">
                            {formatNumber(
                              Number(
                                tabWiseSiteData?.audienceTypeData[audienceType]
                                  ?.impressionDeliveredTotal
                              ).toFixed(0)
                            )}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-9 h-full gap-2">
            <div className="col-span-5 bg-[#FFFFFF] h-full border rounded-[12px] border-gray-100 shadow-sm p-4">
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
                              "audience"
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
                                ?.impressionDelivered
                            }
                            expected={
                              (tabWiseSiteData?.dayWiseData[dayKey]
                                ?.impressionPromised *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              tabWiseSiteData?.dayWiseData[dayKey]
                                ?.impressionPromised
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
                              ]?.impressionDelivered.toFixed(0)
                            )}
                          </h1>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className="col-span-4 bg-[#FFFFFF] h-full border rounded-[12px] border-gray-100 shadow-sm p-4">
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
                              "audience"
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
                                ?.impressionDelivered
                            }
                            expected={
                              (tabWiseSiteData?.timeWiseData[timeKey]
                                ?.impressionPromised *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              tabWiseSiteData?.timeWiseData[timeKey]
                                ?.impressionPromised
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
                              ]?.impressionDelivered.toFixed(0)
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
