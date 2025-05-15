import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllScreensDetailsAction,
  getScreenCampaignsDetailsAction,
} from "../../actions/screenAction";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_SCREENS_LIST } from "../../constants/localStorageConstants";
import { SearchInputField } from "../../components";
import { GET_SCREEN_CAMPAIGN_MONITORING_RESET } from "../../constants/screenConstants";
import {
  SCREEN_GET_ALL_SCREEN_DATA_CMS,
  SCREEN_GET_SCREEN_CAMPAIGN_DETAILS_CMS,
} from "../../constants/userConstants";
import { List, ListItem, Panel } from "./MonitoringReUsableComp";
import { TakingMonitoringPic } from "./TakingMonitoringPic";
import {
  getCampaignMonitoringDataAction,
  addCampaignMonitoringDataAction,
} from "../../actions/campaignAction";
import { MonitoringData } from "../../types/monitoringTypes";
import { message } from "antd";
import { notification } from "antd";
import { ADD_CAMPAIGN_MONITORING_DATA_RESET } from "../../constants/campaignConstants";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";

export const ScreenWiseMonitoring: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [result, setResult] = useState<MonitoringData[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("startDate");
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [searchQueryForCampaign, setSearchQueryForCampaign] = useState<any>("");
  const [monitoringScreen, setMonitoringScreen] = useState<any>(null);
  const [monitoringCampaign, setMonitoringCampaign] = useState<any>(null);
  const [loadingSaveOnAWS, setLoading] = useState<boolean>(false);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allScreensDataGet = useSelector(
    (state: any) => state.allScreensDataGet
  );
  const { loading, error, data: allScreens } = allScreensDataGet;

  const screenCampaignsDetailsGet = useSelector(
    (state: any) => state.screenCampaignsDetailsGet
  );
  const {
    loading: loadingCampaigns,
    error: errorCampaigns,
    data: campaigns,
  } = screenCampaignsDetailsGet;

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
    data: monitoringData3,
  } = addCampaignMonitoring;

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
  }, [successAddCampaignMonitoring, errorAddCampaignMonitoring]);

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      // message.error("Not a screen owner!!!");
    }
    dispatch(
      getAllScreensDetailsAction({
        userId: userInfo?.primaryUserId,
        event: SCREEN_GET_ALL_SCREEN_DATA_CMS,
      })
    );
  }, [dispatch, userInfo]);

  const handleScreenClick = ({ screen }: any) => {
    setMonitoringScreen(screen);
    setMonitoringCampaign(null);
    dispatch(
      getScreenCampaignsDetailsAction({
        screenId: screen._id,
        status: ["Active", "Pause"],
        event: SCREEN_GET_SCREEN_CAMPAIGN_DETAILS_CMS,
      })
    );
  };

  const handleCampaignClick = ({ campaign }: any) => {
    setMonitoringCampaign(campaign);
    dispatch({ type: GET_SCREEN_CAMPAIGN_MONITORING_RESET });
    dispatch(
      getCampaignMonitoringDataAction({
        campaignId: campaign?._id,
      })
    );
  };

  const handleSaveMonitoringData = (monitoringData: MonitoringData[]) => {
    dispatch(
      addCampaignMonitoringDataAction({
        campaignId: monitoringCampaign?._id,
        monitoringData,
      })
    );
    return Promise.resolve();
  };

  const handleSave = async () => {
    if (confirm("Do you want to save monitoring data?")) {
      setLoading(true);

      try {
        // Create a deep copy of the current result state
        const updatedResult = structuredClone(result);

        // Find the current tab data
        const currentTabData = updatedResult.find(
          (data) => data.dateType === currentTab
        );

        if (!currentTabData) {
          throw new Error("Current tab data not found");
        }

        // Process each monitoring type in the current tab
        for (const monitoringTypeData of currentTabData.monitoringTypeWiseData) {
          // Filter only URLs that need processing (has file but no awsUrl)
          const urlsToProcess = monitoringTypeData.monitoringUrls.filter(
            (urlData) => urlData.awsUrl === "" && urlData.file instanceof File
          );

          // Process files in parallel for better performance
          await Promise.all(
            urlsToProcess.map(async (urlData) => {
              try {
                if (!urlData.file) {
                  console.warn("File object is missing for URL data:", urlData);
                  return;
                }

                // Get AWS upload URL
                const awsResponse = await getAWSUrlToUploadFile({
                  contentType: urlData.file.type,
                  name: urlData.file.name,
                });

                if (!awsResponse?.url) {
                  throw new Error("Failed to get AWS upload URL");
                }

                // Upload file to AWS
                await saveFileOnAWS(awsResponse.url, urlData.file);

                // Update the URL data
                urlData.awsUrl = awsResponse.awsURL;
                urlData.url = awsResponse.awsURL;

                // Clean up - remove file object and revoke blob URL if it exists
                if (urlData.url && urlData.url.startsWith("blob:")) {
                  URL.revokeObjectURL(urlData.url);
                }
                delete urlData.file;
              } catch (error) {
                console.error(
                  `Error uploading file ${urlData.file?.name}:`,
                  error
                );
              }
            })
          );
        }
        setResult(updatedResult);

        // Call the parent save function
        await handleSaveMonitoringData(updatedResult);
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
    }
  };

  const labels =
    result
      ?.map((d: MonitoringData) => d.dateType)
      ?.filter((value) => value != "") || [];

  return (
    <div className="grid grid-cols-12 gap-1 mt-1">
      <Panel title="Screen List" className="col-span-3">
        <div className="mt-2">
          <SearchInputField
            placeholder="Screen Name"
            value={searchQuery}
            onChange={setSearchQuery}
            height="h-8"
          />
        </div>
        <List
          items={getDataFromLocalStorage(ALL_SCREENS_LIST)?.list?.filter(
            (screen: any) =>
              screen?.screenName
                ?.toLowerCase()
                ?.includes(searchQuery?.toLowerCase())
          )}
          loading={loading}
          renderItem={(data: any, index: number) => (
            <ListItem
              key={index}
              item={data}
              isActive={monitoringScreen?._id === data?._id}
              onClick={() => handleScreenClick({ screen: data })}
              icon="screen"
              text={data?.screenName}
            />
          )}
        />
      </Panel>

      {/* Campaigns Panel */}
      <Panel title="Campaign List" className="col-span-3">
        <div className="mt-2">
          <SearchInputField
            placeholder="Campaign Name"
            value={searchQueryForCampaign}
            onChange={setSearchQueryForCampaign}
            height="h-8"
          />
        </div>
        <List
          items={campaigns?.filter((campaign: any) =>
            campaign?.name.toLowerCase().includes(searchQueryForCampaign)
          )}
          loading={loadingCampaigns}
          renderItem={(campaign: any, index: number) => (
            <ListItem
              key={index}
              item={campaign}
              isActive={monitoringCampaign?._id === campaign?._id}
              onClick={() => handleCampaignClick({ campaign: campaign })}
              icon="megaphone"
              text={campaign.name}
            />
          )}
        />
      </Panel>
      {monitoringScreen && monitoringCampaign && (
        <Panel
          title={monitoringCampaign?.name}
          className="col-span-6"
          buttonTitle="Save Monitoring Data"
          isShow={labels?.length > 0 ? true : false}
          loading={loadingAddCampaignMonitoring || loadingSaveOnAWS}
          onClick={handleSave}
        >
          <TakingMonitoringPic
            data={monitoringData?.monitoringData || []}
            pageLoading={loadingGetCampaignMonitoring}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            result={result}
            setResult={setResult}
          />
        </Panel>
      )}
    </div>
  );
};
