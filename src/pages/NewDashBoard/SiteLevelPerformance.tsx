import React, { useState } from "react";
import { CampaignDashboardTable } from "../../components/tables/CampaignDashboardTable";
import { EnhancedSelect } from "../../components/atoms/EnhancedSelect";
import ButtonInput from "../../components/atoms/ButtonInput";
import { useSelector } from "react-redux";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { ViewAllLogsPopup } from "./ViewAllLogsPopup";

interface SiteData {
  city?: string;
  touchPoint?: string;
  screenType?: string;
  [key: string]: any;
}

interface SiteLevelPerformanceProps {
  campaignId?: any;
  siteLevelData?: SiteData[];
  campaignDetails?: any;
  screenLevelData?: any;
  loadingSiteLevel?: any;
  setCurrentDay?: any;
  currentDay?: any;
  setCurrentWeek?: any;
  currentWeek?: any;
  setCurrentDate?: any;
  currentDate?: any;
  setCalendarData?: any;
  calendarData?: any;
  allDates?: any;
  openSiteLevelLogsPopup?: any;
  setOpenSiteLevelLogsPopup?: any;
  openSiteLevelMonitoringPicsPopup?: any;
  setOpenSiteLevelMonitoringPicsPopup?: any;
  viewAllLogsOpen?: any;
  setViewAllLogsOpen?: any;
  setCurrentScreen?: any;
  currentScreen?: any;
}

export const SiteLevelPerformance: React.FC<SiteLevelPerformanceProps> = ({
  campaignId,
  siteLevelData = [],
  campaignDetails,
  screenLevelData,
  loadingSiteLevel,
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
  viewAllLogsOpen,
  setViewAllLogsOpen,
  currentScreen,
  setCurrentScreen,
}) => {
  const [siteLevelFilters, setSiteLevelFilters] = useState({
    city: "",
    touchPoint: "",
    screenType: "",
  });

  const getUniqueOptions = (key: keyof SiteData) => {
    const uniqueValues = Array.from(
      new Set(
        siteLevelData
          ?.map((item: any) => item?.[key])
          ?.filter((value: any): value is string => Boolean(value))
      )
    );
    return uniqueValues.map((value) => ({ label: value, value }));
  };

  const getUniqueOptions1 = (key: keyof SiteData) => {
    const uniqueValues = Array.from(
      new Set(
        siteLevelData
          ?.map((item: any) => item?.[key])
          ?.filter((value: any): value is string => Boolean(value))
      )
    );
    return uniqueValues.map((value) => ({
      label:
        value === "Spectacular"
          ? "Iconic"
          : value === "Large"
          ? "Big"
          : "Small",
      value,
    }));
  };

  const handleFilterChange = (
    key: keyof typeof siteLevelFilters,
    value: string
  ) => {
    setSiteLevelFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSiteLevelFilters({
      city: "",
      touchPoint: "",
      screenType: "",
    });
  };

  const filteredResults = siteLevelData?.filter((item: any) => {
    return (
      (!siteLevelFilters.city || item.city === siteLevelFilters.city) &&
      (!siteLevelFilters.touchPoint ||
        item.touchPoint === siteLevelFilters.touchPoint) &&
      (!siteLevelFilters.screenType ||
        item.screenType === siteLevelFilters.screenType)
    );
  });

  const handleCancel = () => {
    setViewAllLogsOpen(false);
  };

  return (
    <div className="mt-2 w-full flex justify-between">
      <ViewAllLogsPopup
        campaignId={campaignId}
        handleCancel={handleCancel}
        open={viewAllLogsOpen}
        setCurrentDay={setCurrentDay}
        currentDay={currentDay}
        setCurrentWeek={setCurrentWeek}
        currentWeek={currentWeek}
        allDates={allDates}
        setCurrentDate={setCurrentDate}
        currentDate={currentDate}
        calendarData={calendarData}
        campaignDetails={campaignDetails}
        //  loading=
      />
      <div className="w-full pb-4">
        <div className="flex justify-between items-center bg-white border-t border-x border-gray-100 rounded-t-xl px-2">
          <h1 className="text-base py-4 px-2 font-semibold leading-5 text-gray-900">
            Site Level Performance
          </h1>
          <div className="flex gap-4 items-center">
            <EnhancedSelect
              options={getUniqueOptions("city") as any}
              onChange={(val) => handleFilterChange("city", val)}
              placeholder="Filter by city"
              value={siteLevelFilters.city}
              size="sm"
            />
            <EnhancedSelect
              options={getUniqueOptions("touchPoint") as any}
              onChange={(val) => handleFilterChange("touchPoint", val)}
              placeholder="Filter by touchPoint"
              value={siteLevelFilters.touchPoint}
              size="sm"
            />
            <EnhancedSelect
              options={getUniqueOptions1("screenType") as any}
              onChange={(val) => handleFilterChange("screenType", val)}
              placeholder="Filter by Screen Type"
              value={siteLevelFilters.screenType}
              size="sm"
            />
            <ButtonInput variant="outline" size="small" onClick={resetFilters}>
              Reset
            </ButtonInput>
            <ButtonInput
              variant="outline"
              size="small"
              onClick={() => setViewAllLogsOpen(!viewAllLogsOpen)}
            >
              View All Logs
            </ButtonInput>
          </div>
        </div>
        {loadingSiteLevel ? (
          <div>
            <LoadingScreen />
          </div>
        ) : (
          <CampaignDashboardTable
            campaignDetails={campaignDetails}
            filteredScreenLevelData={filteredResults}
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
          />
        )}
      </div>
    </div>
  );
};
