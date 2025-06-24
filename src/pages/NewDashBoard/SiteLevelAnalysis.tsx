import { SiteLevelDurationGraphAnalysis } from './SiteLevelDurationGraphAnalysis'
import { SiteLevelAudienceAnalysis } from './SiteLevelAudienceAnalysis'
import { useState } from 'react';
import { SiteLevelHardwarePerformanceAnalysis } from './SiteLevelHardwarePerformanceAnalysis';
import { SiteLevelSlotDeliveryAnalysis } from './SiteLevelSlotDeliveryAnalysis';
import { SiteLevelCostConsumptionAnalysis } from './SiteLevelCostConsumptionAnalysis';

export function SiteLevelAnalysis({
  screenLevelData,
  currentAnalysisTab,
  screenData,
  siteAnalysisTabData,
  currentDate,
  campaignDetails,
}: any) {


  const [dayTimePercentView, setDayTimePercentView] = useState<any>({
    1: false,
    2: false,
  });
  const [dayTimeFilters, setDayTimeFilters] = useState<any>({
    dayTypes: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
    },
    timezones: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
    },
  });
  return (
    <div className="w-full">
      {currentAnalysisTab == "1" ? (
        <SiteLevelDurationGraphAnalysis
          campaignId={screenData?.campaignId}
          currentDate={currentDate}
        />
      ) : currentAnalysisTab == "2" ? (
        <SiteLevelAudienceAnalysis
          screenLevelData={screenLevelData}
          campaignId={screenData?.campaignId}
          currentDate={currentDate}
          dayTimeFilters={dayTimeFilters}
          setDayTimeFilters={setDayTimeFilters}
        />
      ) : currentAnalysisTab == "3" ? (
          <SiteLevelHardwarePerformanceAnalysis
            campaignId={screenData?.campaignId}
            setDayTimePercentView={setDayTimePercentView}
            dayTimePercentView={dayTimePercentView}
            screenLevelData={screenLevelData}
            dayTimeFilters={dayTimeFilters}
            setDayTimeFilters={setDayTimeFilters}
            currentDate={currentDate}
          />
      ) : currentAnalysisTab == "4" ? (
          <SiteLevelSlotDeliveryAnalysis
            campaignId={screenData?.campaignId}
            setDayTimePercentView={setDayTimePercentView}
            dayTimePercentView={dayTimePercentView}
            screenLevelData={screenLevelData}
            dayTimeFilters={dayTimeFilters}
            setDayTimeFilters={setDayTimeFilters}
            currentDate={currentDate}
            campaignDetails={campaignDetails}
          />
      ) : currentAnalysisTab == "5" ? (
        <SiteLevelCostConsumptionAnalysis
          campaignId={screenData?.campaignId}
          setDayTimePercentView={setDayTimePercentView}
          dayTimePercentView={dayTimePercentView}
          screenLevelData={screenLevelData}
          dayTimeFilters={dayTimeFilters}
          setDayTimeFilters={setDayTimeFilters}
          currentDate={currentDate}
        />

      ) : null}
    </div>
  )
}
