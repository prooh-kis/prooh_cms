import React, { useCallback, useEffect, useRef, useState } from "react";
import { DashboardGrid } from "../../components/molecules/DashboardGrid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashBoardMenu } from "./DashBoardMenu";
import { FirstCharForBrandName } from "../../components/molecules/FirstCharForBrandName";
import { SiteLevelPerformance } from "./SiteLevelPerformance";
import { SlotSegment } from "./SlotSegment";
import { CostSegment } from "./CostSegment";
import { AudienceSegment } from "./AudienceSegment";
import { DurationSegment } from "./DurationSegment";
import { HardwarePerformanceSegment } from "./HardwarePerformanceSegment";
import { SiteMonitoringPicDashboardComponent } from "./SiteMonitoringPicDashboardComponent";
import {
  getAudienceDataForPlannerDashboard,
  getCostDataForPlannerDashboard,
  getHardwarePerformanceDataForPlannerDashboard,
  getSiteLevelPerformanceForPlannerDashboard,
  getSpotDeliveryDataForPlannerDashboard,
} from "../../actions/dashboardAction";
import { getUserRole } from "../../utils/campaignUtils.js";
import { useSelector } from "react-redux";

interface GridItem {
  id: string;
  type: "duration" | "audience" | "screen" | "spot" | "cost";
  campaignDetails?: {
    startDate: string;
    endDate: string;
  };
  screenLevelData?: any; // You should replace 'any' with a proper interface
}

export const CampaignDashboard = ({
  pathname,
  loading,
  campaignDetails,
  screenLevelData,
  filters,
  setFilters,
  sitesDataMapViewData,
  siteLevelData,
  loadingSiteLevel,
  setOpenInvoice,
  openInvoice,
}: any) => {
  const dropdownRef = useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const clickedTab = pathname.split("/")[3] || "1";

  const parentComponentRef = useRef<HTMLDivElement>(null);
  const aComponentRef = useRef<HTMLDivElement>(null);

  const [clicked, setClicked] = useState<any>("1");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [calendarData, setCalendarData] = useState<any>({});
  const [currentWeek, setCurrentWeek] = useState<any>(1);
  const [currentDay, setCurrentDay] = useState<any>(1);
  const [currentDate, setCurrentDate] = useState<any>(
    new Date().toISOString().split("T")[0]
  );

  const [openSiteLevelLogsPopup, setOpenSiteLevelLogsPopup] =
    useState<any>(false);
  const [
    openSiteLevelMonitoringPicsPopup,
    setOpenSiteLevelMonitoringPicsPopup,
  ] = useState<any>(false);

  const [showPercent, setShowPercent] = useState<any>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const [openSiteMapView, setOpenSiteMapView] = useState<boolean>(false);
  const [openMonitoringView, setOpenMonitoringView] = useState<boolean>(false);
  const [viewAllLogsOpen, setViewAllLogsOpen] = useState<boolean>(false);

  const gridItems: GridItem[] = [
    {
      id: "1",
      type: "duration",
      campaignDetails: screenLevelData?.campaignCreation,
      screenLevelData: screenLevelData?.data,
    },

    {
      id: "3",
      type: "screen",
      campaignDetails: screenLevelData?.campaignCreation,
      screenLevelData: screenLevelData?.data,
    },
    {
      id: "4",
      type: "spot",
      campaignDetails: screenLevelData?.campaignCreation,
      screenLevelData: screenLevelData?.data,
    },
    {
      id: "5",
      type: "cost",
      campaignDetails: screenLevelData?.campaignCreation,
      screenLevelData: screenLevelData?.data,
    },
    {
      id: "2",
      type: "audience",
      campaignDetails: screenLevelData?.campaignCreation,
      screenLevelData: screenLevelData?.data,
    },
  ];

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const commonClasses =
    "cursor-pointer rounded-[12px] shadow-sm col-span-1 bg-white p-4 h-auto ";

  useEffect(() => {
    setCalendarData(screenLevelData?.slotDataDateWiseArray);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [screenLevelData?.slotDataDateWiseArray, setCalendarData]);

  const handleToggleMenu = useCallback(() => {
    setShowMenu((pre: boolean) => !pre);
  }, []);

  const getAllDates = ({ startDate, endDate }: any) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    // Normalize to LOCAL midnight (ignore timezones for calendar dates)
    currentDate.setHours(0, 0, 0, 0);
    lastDate.setHours(0, 0, 0, 0);

    while (currentDate <= lastDate) {
      // Format date in LOCAL time (YYYY-MM-DD)
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      dates.push({
        value: dateString, // Local date, no timezone shifts
        label: currentDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        }),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const allDates: any = getAllDates({
    startDate: campaignDetails?.startDate,
    endDate: campaignDetails?.endDate,
  });

  // Fetch all dashboard data
  const fetchDashboardData = useCallback(() => {
    const commonParams = { id: campaignDetails?._id };
    dispatch(
      getAudienceDataForPlannerDashboard({
        ...commonParams,
        cities: filters.cities.audience?.filter((f: any) => f !== "all"),
        touchPoints: filters.touchPoints.audience?.filter(
          (f: any) => f !== "all"
        ),
        screenTypes: filters.screenTypes.audience?.filter(
          (f: any) => f !== "all"
        ),
        dayTypes: filters.dayTypes.audience?.filter((f: any) => f !== "all"),
        timezones: filters.timezones.audience?.filter((f: any) => f !== "all"),
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
      })
    );
    dispatch(
      getHardwarePerformanceDataForPlannerDashboard({
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
        ...commonParams,
        cities: filters.cities.screenPerformance?.filter(
          (f: any) => f !== "all"
        ),
        touchPoints: filters.touchPoints.screenPerformance?.filter(
          (f: any) => f !== "all"
        ),
        screenTypes: filters.screenTypes.screenPerformance?.filter(
          (f: any) => f !== "all"
        ),
        dayTypes: filters.dayTypes.screenPerformance?.filter(
          (f: any) => f !== "all"
        ),
        timezones: filters.timezones.screenPerformance?.filter(
          (f: any) => f !== "all"
        ),
      })
    );
    dispatch(
      getSpotDeliveryDataForPlannerDashboard({
        ...commonParams,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
        cities: filters.cities.spotDelivery?.filter((f: any) => f !== "all"),
        touchPoints: filters.touchPoints.spotDelivery?.filter(
          (f: any) => f !== "all"
        ),
        screenTypes: filters.screenTypes.spotDelivery?.filter(
          (f: any) => f !== "all"
        ),
        dayTypes: filters.dayTypes.spotDelivery?.filter(
          (f: any) => f !== "all"
        ),
        timezones: filters.timezones.spotDelivery?.filter(
          (f: any) => f !== "all"
        ),
      })
    );
    dispatch(
      getCostDataForPlannerDashboard({
        ...commonParams,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
        cities: filters.cities.costConsumption?.filter((f: any) => f !== "all"),
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
    dispatch(
      getSiteLevelPerformanceForPlannerDashboard({
        ...commonParams,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
        cities: filters.cities.siteLevel,
        touchPoints: filters.touchPoints.siteLevel,
        screenTypes: filters.screenTypes.siteLevel,
        // dayTypes: filters.dayTypes.audience?.filter((f: any) => f !== "all"),
        // timezones: filters.timezones.audience?.filter((f: any) => f !== "all")
      })
    );
  }, [campaignDetails, dispatch, filters]);

  useEffect(() => {
    if (Number(clickedTab) !== 1) {
      setClicked(clickedTab);
    }

    if (campaignDetails?._id) {
      fetchDashboardData();
    }

    if (aComponentRef.current) {
      aComponentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [fetchDashboardData, campaignDetails?._id]);
  return (
    <div className="w-full bg-[#F2F4F7] flex flex-col gap-2 font-custom relative">
      <div className="bg-[#FFFFFF] py-4 px-2 pr-14 mt-1 flex justify-between shadow-sm w-full sticky top-0 z-10">
        {/* Added sticky and z-10 */}
        <div className="px-2 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex gap-4 items-center ">
              <i
                className="fi fi-br-arrow-left text-[#6f7f8e] cursor-pointer"
                onClick={() => navigate(-1)}
              ></i>
              <FirstCharForBrandName brandName={campaignDetails?.brandName} />
            </div>
            <div className="w-full relative flex flex-col justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-[20px] font-semibold leading-[19.36px] text-[#0E212E]">
                  {campaignDetails?.name?.toUpperCase()}
                </h1>
                <i
                  className={`${
                    !showMenu ? "fi fi-br-angle-down" : "fi fi-br-angle-up"
                  } text-[#6f7f8e] cursor-pointer`}
                  onClick={handleToggleMenu}
                ></i>
              </div>
              <p className="text-[14px] text-[#5B7180] leading-[100%]">
                {campaignDetails?.brandName}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 ">
          <div
            className="border border-gray-300 rounded-lg flex justify-center items-center h-[38px] w-[38px] cursor-pointer"
            onClick={() => navigate(`/campaignDetails/${campaignDetails?._id}`)}
          >
            <i className="fi fi-sr-file-edit text-[14px] flex items-center justify-center text-[#129BFF]"></i>
          </div>
          <div
            className="px-4 border border-gray-300 rounded-lg flex justify-center gap-2 items-center h-[38px] cursor-pointer"
            onClick={() => {
              setOpenInvoice(true);
            }}
          >
            <i className="fi fi-rs-calculator-bill text-[14px] flex items-center justify-center text-[#129BFF]"></i>
            <p className="text-[16px] text-[#0E212E]">Invoice</p>
          </div>
        </div>
      </div>
      <div className="absolute top-20 left-2 z-50 w-[300px]">
        {showMenu && <DashBoardMenu campaignDetails={campaignDetails} />}
      </div>
      <div className="px-10 bg-[#F2F4F7] h-[78vh] overflow-y-auto scrollbar-minimal pr-4">
        {/* campaign dashboard grid view */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {gridItems.map((item) => (
            <div
              key={item.id}
              className={`${commonClasses}
              ${
                clicked === item.id
                  ? "border border-[#129BFF] border-2"
                  : "border border-gray-100 "
              }`}
              onClick={() => {
                navigate(
                  `${pathname.split("/").splice(0, 3).join("/")}/${item.id}`
                );
                setClicked(item.id);
              }}
            >
              <DashboardGrid
                type={item.type}
                campaignDetails={item.campaignDetails}
                screenLevelData={item.screenLevelData}
              />
            </div>
          ))}
        </div>
        <div className="mt-2">
          {clicked === "1" ? (
            <DurationSegment
              campaignId={campaignDetails?._id}
              calendarData={calendarData}
              setCurrentWeek={setCurrentWeek}
              currentWeek={currentWeek}
              setCurrentDay={setCurrentDay}
              currentDay={currentDay}
              setCurrentDate={setCurrentDate}
              currentDate={currentDate}
              allDates={allDates}
              loading={loading}
              openSiteMapView={openSiteMapView}
              openMonitoringView={openMonitoringView}
              openInvoice={openInvoice}
              logsPopup={openSiteLevelLogsPopup}
              monitoringPopup={openSiteLevelMonitoringPicsPopup}
              viewAllLogsOpen={viewAllLogsOpen}
            />
          ) : clicked === "2" ? (
            <AudienceSegment
              campaignId={campaignDetails?._id}
              screenLevelData={screenLevelData}
              showPercent={showPercent}
              setShowPercent={setShowPercent}
              filters={filters}
              setFilters={setFilters}
            />
          ) : clicked === "3" ? (
            <HardwarePerformanceSegment
              campaignId={campaignDetails?._id}
              screenLevelData={screenLevelData}
              showPercent={showPercent}
              setShowPercent={setShowPercent}
              filters={filters}
              setFilters={setFilters}
              dataToShow={
                gridItems?.find((item: any) => item.id === "3")?.screenLevelData
              }
            />
          ) : clicked === "4" ? (
            <SlotSegment
              campaignId={campaignDetails?._id}
              screenLevelData={screenLevelData}
              showPercent={showPercent}
              setShowPercent={setShowPercent}
              filters={filters}
              setFilters={setFilters}
              dataToShow={
                gridItems?.find((item: any) => item.id === "4")?.screenLevelData
              }
              campaignDetails={campaignDetails}
            />
          ) : clicked === "5" ? (
            <CostSegment
              campaignId={campaignDetails?._id}
              screenLevelData={screenLevelData}
              showPercent={showPercent}
              setShowPercent={setShowPercent}
              filters={filters}
              setFilters={setFilters}
              dataToShow={
                gridItems?.find((item: any) => item.id === "5")?.screenLevelData
              }
            />
          ) : null}
        </div>
        <SiteMonitoringPicDashboardComponent
          sitesDataMapViewData={sitesDataMapViewData}
          openSiteMapView={openSiteMapView}
          setOpenSiteMapView={setOpenSiteMapView}
          openMonitoringView={openMonitoringView}
          setOpenMonitoringView={setOpenMonitoringView}
          campaignId={campaignDetails?._id}
        />
        <SiteLevelPerformance
          campaignId={campaignDetails?._id}
          loadingSiteLevel={loadingSiteLevel}
          siteLevelData={siteLevelData}
          campaignDetails={campaignDetails}
          screenLevelData={screenLevelData}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          setCurrentWeek={setCurrentWeek}
          currentWeek={currentWeek}
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
          setCalendarData={setCalendarData}
          calendarData={calendarData}
          allDates={allDates}
          openSiteLevelLogsPopup={openSiteLevelLogsPopup}
          setOpenSiteLevelLogsPopup={setOpenSiteLevelLogsPopup}
          openSiteLevelMonitoringPicsPopup={openSiteLevelMonitoringPicsPopup}
          setOpenSiteLevelMonitoringPicsPopup={
            setOpenSiteLevelMonitoringPicsPopup
          }
          viewAllLogsOpen={viewAllLogsOpen}
          setViewAllLogsOpen={setViewAllLogsOpen}
        />
      </div>
    </div>
  );
};
