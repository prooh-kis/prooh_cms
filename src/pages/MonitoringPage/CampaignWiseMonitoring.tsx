import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, SearchInputField } from "../../components";
import { GET_SCREEN_CAMPAIGN_MONITORING_RESET } from "../../constants/screenConstants";
import { MONITORING_GET_CAMPAIGN_DETAILS } from "../../constants/userConstants";
import { List, ListItem, Panel } from "./MonitoringReUsableComp";
import {
  getCampaignMonitoringDataAction,
  addCampaignMonitoringDataAction,
  getCampaignDetailsListForMonitoring,
} from "../../actions/monitoringAction.";
import {
  MonitoringData,
  MonitoringUrlData2,
} from "../../types/monitoringTypes";
import { message, notification } from "antd";
import { ADD_CAMPAIGN_MONITORING_DATA_RESET } from "../../constants/monitoringConstants";
import { getAWSUrl } from "../../utils/awsUtils";
import { TakingMonitoringPicV2 } from "./TakingMonitoringPicV2";

interface Screen {
  _id: string;
  screenName: string;
  // Add other screen properties as needed
}
interface Campaign {
  _id: string;
  name: string;
  brandName: string;
  campaignScreens: Screen[];
  // Add other campaign properties as needed
}

export const CampaignWiseMonitoring: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [result, setResult] = useState<MonitoringData[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("startDate");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterCampaignType, setFilterCampaignType] =
    useState<string>("Active");
  const [searchQueryForCampaign, setSearchQueryForCampaign] =
    useState<string>("");
  const [monitoringScreen, setMonitoringScreen] = useState<Screen | null>(null);
  const [monitoringCampaign, setMonitoringCampaign] = useState<Campaign | null>(
    null
  );

  const [uploadedMonitoringPic, setUploadedMonitoringPic] = useState<
    MonitoringUrlData2[]
  >([]);

  const [monitoringScreens, setMonitoringScreens] = useState<Screen[]>([]);

  const [loadingSaveOnAWS, setLoading] = useState<boolean>(false);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const activeCampaignListForMonitoring = useSelector(
    (state: any) => state.activeCampaignListForMonitoring
  );
  const {
    loading,
    error,
    data: allCampaigns,
  } = activeCampaignListForMonitoring;

  const getCampaignMonitoring = useSelector(
    (state: any) => state.getCampaignMonitoring
  );
  const {
    loading: loadingGetCampaignMonitoring,
    error: errorGetCampaignMonitoring,
    success: successGetCampaignMonitoring,
    data: monitoringData,
  } = getCampaignMonitoring;

  const addCampaignMonitoring = useSelector(
    (state: any) => state.addCampaignMonitoring
  );
  const {
    loading: loadingAddCampaignMonitoring,
    error: errorAddCampaignMonitoring,
    success: successAddCampaignMonitoring,
  } = addCampaignMonitoring;

  useEffect(() => {
    if (successGetCampaignMonitoring) {
      setResult(
        Array.isArray(monitoringData?.monitoringData)
          ? monitoringData.monitoringData
          : []
      );
    }
  }, [successGetCampaignMonitoring, monitoringData?.monitoringData]);

  // Notification handler
  useEffect(() => {
    if (errorAddCampaignMonitoring) {
      notification.error({
        message: "Add Monitoring Data Error",
        description: errorAddCampaignMonitoring,
      });
      dispatch({ type: ADD_CAMPAIGN_MONITORING_DATA_RESET });
    }

    if (successAddCampaignMonitoring) {
      notification.success({
        message: "Add Monitoring Data Success",
        description: "Successfully Saved!",
      });
      dispatch({ type: ADD_CAMPAIGN_MONITORING_DATA_RESET });
    }
  }, [successAddCampaignMonitoring, errorAddCampaignMonitoring, dispatch]);

  // Initial data loading
  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
    }
    dispatch(
      getCampaignDetailsListForMonitoring({
        type: filterCampaignType,
        event: MONITORING_GET_CAMPAIGN_DETAILS,
      })
    );
  }, [dispatch, userInfo?._id]);

  const handleScreenClick = useCallback(
    ({ screen }: { screen: Screen }) => {
      setMonitoringScreen(screen);
      dispatch({ type: GET_SCREEN_CAMPAIGN_MONITORING_RESET });
      dispatch(
        getCampaignMonitoringDataAction({
          campaignId: screen?._id,
        })
      );
    },
    [dispatch]
  );

  const handleCampaignClick = useCallback(
    ({ campaignCreated }: { campaignCreated: Campaign }) => {
      setMonitoringCampaign(campaignCreated);
      setMonitoringScreens(campaignCreated?.campaignScreens);
    },
    [dispatch]
  );

  const handleSaveMonitoringData = useCallback(
    (monitoringData: MonitoringData[]) => {
      if (!monitoringScreen?._id) return Promise.reject("No screen selected");

      return dispatch(
        addCampaignMonitoringDataAction({
          campaignId: monitoringScreen?._id,
          monitoringData,
        })
      );
    },
    [dispatch, monitoringScreen?._id]
  );

  const filterResult = allCampaigns?.filter(
    (campaign: Campaign) =>
      campaign?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign?.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRadioChange = (value: string) => {
    dispatch(
      getCampaignDetailsListForMonitoring({
        type: value,
        event: MONITORING_GET_CAMPAIGN_DETAILS,
      })
    );
    setFilterCampaignType(value);
  };

  const handleOk = async () => {
    if (!confirm("Do you want to save monitoring data?")) return;

    setLoading(true);

    try {
      const updatedMonitoringPic = [...uploadedMonitoringPic];
      const monitoringTypeWiseData: any = [];

      // Process files sequentially to maintain order
      for (const file of updatedMonitoringPic) {
        try {
          if (!file.file) continue;

          const awsUrl = await getAWSUrl(file.file);
          file.awsUrl = awsUrl;

          // Find existing monitoring type or create new entry
          const existingTypeIndex = monitoringTypeWiseData.findIndex(
            (item: any) => item.monitoringType === file.monitoringType
          );

          if (existingTypeIndex >= 0) {
            // Add to existing monitoring type
            monitoringTypeWiseData[existingTypeIndex].monitoringUrls.push({
              awsUrl,
              url: awsUrl,
              fileType: file.fileType,
              uploadedDate: new Date().toISOString(),
            });
          } else {
            // Create new monitoring type entry
            monitoringTypeWiseData.push({
              monitoringType: file.monitoringType,
              monitoringUrls: [
                {
                  awsUrl,
                  url: awsUrl,
                  fileType: file.fileType,
                  uploadedDate: new Date().toISOString(),
                },
              ],
            });
          }
        } catch (error) {
          console.error(`Error processing file ${file.file?.name}:`, error);
          throw error;
        }
      }

      const prevResult = [...result];

      // Update result state
      const currentTabData = prevResult.find(
        (data) => data.dateType === currentTab
      ) || {
        date: new Date().toISOString(),
        dateType: currentTab,
        monitoringTypeWiseData: [],
      };

      // Merge new data with existing monitoring types
      const mergedMonitoringTypes = [
        ...currentTabData.monitoringTypeWiseData.filter(
          (existingType) =>
            !monitoringTypeWiseData.some(
              (newType: any) =>
                newType.monitoringType === existingType.monitoringType
            )
        ),
        ...monitoringTypeWiseData,
      ];

      const updatedCurrentTabData = {
        ...currentTabData,
        monitoringTypeWiseData: mergedMonitoringTypes,
      };

      const updatedResult = [
        ...prevResult.filter((data) => data.dateType !== currentTab),
        updatedCurrentTabData,
      ];
      setResult(updatedResult);

      handleSaveMonitoringData(updatedResult);
      setUploadedMonitoringPic([]);
    } catch (error) {
      console.error("Error saving monitoring data:", error);
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to save monitoring data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm("Do you really want to delete all monitoring pictures?")
    ) {
      try {
        const updatedResult = result.map((data) => {
          if (data.dateType === currentTab) {
            return {
              ...data,
              monitoringTypeWiseData: [],
            };
          }
          return data;
        });
        setResult(updatedResult);
        handleSaveMonitoringData(updatedResult);
        setUploadedMonitoringPic([]);
      } catch (error) {
        console.error("Error clearing monitoring pictures:", error);
        message.error("Failed to clear monitoring pictures");
      }
    }
  };

  const handleSingleRemove = async (fileToRemove: MonitoringUrlData2) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this monitoring picture?"
      )
    )
      return;

    try {
      // Create a deep copy of the current result
      const updatedResult = [...result].map((data) => ({ ...data }));

      // Find the current tab data
      const currentTabIndex = updatedResult.findIndex(
        (data) => data.dateType === currentTab
      );

      if (currentTabIndex >= 0) {
        // Filter out the file to be removed
        updatedResult[currentTabIndex] = {
          ...updatedResult[currentTabIndex],
          monitoringTypeWiseData: updatedResult[
            currentTabIndex
          ].monitoringTypeWiseData
            .map((typeData) => ({
              ...typeData,
              monitoringUrls: typeData.monitoringUrls.filter(
                (urlData) => urlData.awsUrl !== fileToRemove.awsUrl
              ),
            }))
            .filter((typeData) => typeData.monitoringUrls.length > 0), // Remove empty types
        };

        // Update local state

        setResult(updatedResult);

        handleSaveMonitoringData(updatedResult);
        setUploadedMonitoringPic([]);
      } else {
        message.error("Could not find current tab data");
      }
    } catch (error) {
      console.error("Error removing monitoring picture:", error);
      message.error("Failed to remove monitoring picture");
    }
  };

  return (
    <div className="">
      {loadingAddCampaignMonitoring ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12 gap-1 mt-1">
          <Panel
            title="Campaigns"
            className="col-span-3"
            isShowRadio={true}
            isForCampaignType={true}
            filterCampaignType={filterCampaignType}
            setFilterCampaignType={handleRadioChange}
          >
            <div className="mt-2">
              <SearchInputField
                placeholder="Brand, Campaign Name"
                value={searchQuery}
                onChange={setSearchQuery}
                height="h-8"
              />
            </div>
            <List
              items={filterResult}
              loading={loading}
              renderItem={(data: Campaign, index: number) => (
                <ListItem
                  key={index}
                  item={data}
                  isActive={monitoringCampaign?._id === data?._id}
                  onClick={() => handleCampaignClick({ campaignCreated: data })}
                  icon="megaphone"
                  text={`${data?.name}`}
                />
              )}
            />
          </Panel>

          <Panel
            title="Screens List"
            className="col-span-3"
            isShowRadio={false}
          >
            <div className="mt-2">
              <SearchInputField
                placeholder="Screen Name"
                value={searchQueryForCampaign}
                onChange={setSearchQueryForCampaign}
                height="h-8"
              />
            </div>
            <List
              items={monitoringScreens?.filter((screen: Screen) =>
                screen?.screenName
                  .toLowerCase()
                  .includes(searchQueryForCampaign.toLowerCase())
              )}
              loading={false}
              renderItem={(screen: Screen, index: number) => (
                <ListItem
                  key={index}
                  item={screen}
                  isActive={monitoringScreen?._id === screen?._id}
                  onClick={() => handleScreenClick({ screen })}
                  icon="screen"
                  text={screen.screenName}
                />
              )}
            />
          </Panel>

          {monitoringScreen && monitoringCampaign && (
            <Panel
              title={monitoringScreen?.screenName}
              className="col-span-6"
              buttonTitle="Save Monitoring Data"
              // isShow={labels?.length > 0 ? true : false}
              isShow={false}
              loading={loadingAddCampaignMonitoring || loadingSaveOnAWS}
              isShowRadio={false}
            >
              <TakingMonitoringPicV2
                pageLoading={loadingGetCampaignMonitoring}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                result={result}
                setResult={setResult}
                uploadedMonitoringPic={uploadedMonitoringPic}
                setUploadedMonitoringPic={setUploadedMonitoringPic}
                campaignList={monitoringScreens}
                handleOk={handleOk}
                handleClearAll={handleClearAll}
                handleSingleRemove={handleSingleRemove}
                screenName={monitoringScreen?.screenName || ""}
              />
            </Panel>
          )}
        </div>
      )}
    </div>
  );
};
