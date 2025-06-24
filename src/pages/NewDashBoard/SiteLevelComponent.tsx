import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import React, { useState } from "react";
import { siteLevelPerformanceTabData } from "../../constants/tabDataConstant";
import { SiteLevelAnalysis } from "./SiteLevelAnalysis";
import { useDispatch } from "react-redux";
import { GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_RESET } from "../../constants/dashboardConstant";

const SiteLevelComponent = ({
  screenData,
  screenLevelData,
  currentDate,
  handleCancel,
  campaignDetails,
}: any) => {
  const dispatch = useDispatch<any>();

  const [currentAnalysisTab, setCurrentAnalysisTab] = useState<string>("1");

  return (
    <div className="w-full h-full truncate">
      {/* <div className="w-full">
        <TabWithoutIcon
          tabData={siteLevelAnalysisTabData}
          currentTab={currentTab1}
          setCurrentTab={setCurrentTab1}
          textSize="text-[14px]"
        />
      </div>

      {currentTab1 == "1" ? ( */}
      <div className="w-full">
        <div className="rounded-[12px] bg-[#FFFFFF] border border-gray-100 shadow-sm px-4 pt-4 mt-2">
          <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-semibold font-inter text-[#0E212E] pb-2">
              {screenData?.screenName}
            </h1>
            <i
              className="fi fi-br-cross text-[10px] cursor-pointer"
              title="Close"
              onClick={handleCancel}
            />
          </div>

          <TabWithoutIcon
            tabData={siteLevelPerformanceTabData}
            currentTab={currentAnalysisTab}
            setCurrentTab={(e: any) => {
              dispatch({
                type: GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_RESET,
              });
              setCurrentAnalysisTab(e);
            }}
            textSize="text-[14px]"
          />
        </div>
        <div className="w-full my-2">
          <SiteLevelAnalysis
            currentAnalysisTab={currentAnalysisTab}
            screenLevelData={screenLevelData}
            screenData={screenData}
            currentDate={currentDate}
            siteAnalysisTabData={siteLevelPerformanceTabData}
            campaignDetails={campaignDetails}
          />
        </div>
      </div>
      {/* ) : currentTab1 == "2" ? (
        <div className="w-full">
          <div className="py-4">
            <MonitoringPic
              result={screenData?.monitoringData || []}
              className="grid-cols-5"
              cardHeight="h-[200px]"
            />
          </div>
        </div>
      ) : currentTab1 == "3" ? (
        <SiteLevelLogReport />
      ) : null} */}
    </div>
  );
};

export default SiteLevelComponent;
