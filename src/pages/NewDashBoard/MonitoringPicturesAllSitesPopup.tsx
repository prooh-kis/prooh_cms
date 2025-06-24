import { useState, useEffect } from "react";
import { getAllSitesMonitoringData } from "../../actions/dashboardAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { List } from "../../components/molecules/List";
import { MonitoringPic } from "../../components/segments/MonitoringPic";
import {
  generateMonitoringPpt,
  getMonitoringPptJobStatus,
} from "../../actions/monitoringAction.";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import {
  DownloadMenu,
  PanelHeader,
  FilterSection,
} from "../../components/molecules/ViewMonitoringPicMolicule";
import {
  GENERATE_MONITORING_PPT_RESET,
  GET_MONITORING_PPT_JOB_STATUS_RESET,
} from "../../constants/monitoringConstants";
import { getUserRole } from "../../utils/campaignUtils.js";

interface Props {
  handleCancel: () => void;
  campaignId: string;
  open: string;
}

export const MonitoringPicturesAllSitesPopup = ({
  open,
  handleCancel,
  campaignId,
}: Props) => {
  const dispatch = useDispatch<any>();
  const { loading, error, data } = useSelector(
    (state: any) => state.allSitesMonitoringData
  );

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  // State management
  const [currentScreen, setCurrentScreen] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedTouchPoints, setSelectedTouchPoints] = useState<string[]>([]);
  const [selectedScreenTypes, setSelectedScreenTypes] = useState<string[]>([]);
  const [dataInitialized, setDataInitialized] = useState(false);
  const [pptGeneration, setPptGeneration] = useState(false);
  const [zipGeneration, setZipGeneration] = useState(false);
  const [pptJobId, setPptJobId] = useState(1);

  const generateMonitoringPPT = useSelector(
    (state: any) => state.generateMonitoringPpt
  );
  const {
    loading: generateMonitoringPptLoading,
    error: generateMonitoringPptError,
    success: generateMonitoringPptSuccess,
    data: generateMonitoringPptData,
  } = generateMonitoringPPT;

  const getMonitoringPptJobStatusData = useSelector(
    (state: any) => state.getMonitoringPptJobStatus
  );
  const {
    loading: pptJobStatusLoading,
    error: pptJobStatusError,
    success: pptJobStatusSuccess,
    data: pptJobStatusData,
  } = getMonitoringPptJobStatusData;

  const downloadPPT = (url: any) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "monitoring_ppt.pptx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getJobStatusInfo = async (id: any) => {
    setTimeout(async () => {
      try {
        dispatch(getMonitoringPptJobStatus({ id: id }));
      } catch (error) {
        console.error("API call failed:", error);
      }
    }, 10000);
  };

  useEffect(() => {
    if (generateMonitoringPptSuccess) {
      console.log(generateMonitoringPptData);
      setPptJobId(Number(generateMonitoringPptData.jobId));
      setPptGeneration(true);
      getJobStatusInfo(Number(generateMonitoringPptData.jobId));
      dispatch({ type: GENERATE_MONITORING_PPT_RESET });
    }

    if (pptJobStatusSuccess) {
      if (pptJobStatusData.state === "completed") {
        setPptGeneration(false);
        downloadPPT(pptJobStatusData.result.url);
        dispatch({ type: GET_MONITORING_PPT_JOB_STATUS_RESET });
      } else {
        getJobStatusInfo(pptJobId);
      }
    }
  }, [
    generateMonitoringPptError,
    generateMonitoringPptSuccess,
    pptJobStatusSuccess,
    pptJobStatusError,
  ]);

  // Initialize data
  useEffect(() => {
    if (data && !dataInitialized) {
      const cities = Object.keys(data.cityWiseData || {}).filter(
        (c) => c !== "all"
      );
      const touchPoints = Object.keys(data.touchPointWiseData || {}).filter(
        (t) => t !== "all"
      );
      const screenTypes = Object.keys(data.screenTypeWiseData || {}).filter(
        (s) => s !== "all"
      );

      setSelectedCities(cities);
      setSelectedTouchPoints(touchPoints);
      setSelectedScreenTypes(screenTypes);
      setCurrentScreen(data?.screenList?.[0] || "");
      setDataInitialized(true);
    }
  }, [data, dataInitialized]);

  // Fetch data when filters change
  useEffect(() => {
    dispatch(
      getAllSitesMonitoringData({
        id: campaignId,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
        cities: selectedCities,
        touchPoints: selectedTouchPoints,
        screenTypes: selectedScreenTypes,
        screenName: currentScreen === "all" ? "" : currentScreen,
      })
    );
  }, [
    campaignId,
    selectedCities,
    selectedTouchPoints,
    selectedScreenTypes,
    currentScreen,

    open,
    dispatch,
  ]);

  // Handle downloads
  const handleDownloadPPT = () => {
    dispatch(generateMonitoringPpt({ campaignId }));
  };

  const handleDownloadZip = async () => {
    setZipGeneration(true);
    try {
      const res = await fetch(
        `https://api.justmonad.com/api/v2/monitoring/downloadMonitoringPicsZip?id=${campaignId}`
      );
      if (!res.ok) throw new Error("Failed to download");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "monitoring_pics.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      notification.error({ message: "Download failed. Please try again." });
    } finally {
      setZipGeneration(false);
    }
  };

  // Filter toggle handlers
  const toggleAllCities = (checked: boolean) => {
    const allCities = Object.keys(data?.cityWiseData || {}).filter(
      (c) => c !== "all"
    );
    setSelectedCities(checked ? allCities : []);
  };

  const toggleAllTouchPoints = (checked: boolean) => {
    const allTouchPoints = Object.keys(data?.touchPointWiseData || {}).filter(
      (t) => t !== "all"
    );
    setSelectedTouchPoints(checked ? allTouchPoints : []);
  };

  const toggleAllScreenTypes = (checked: boolean) => {
    const allScreenTypes = Object.keys(data?.screenTypeWiseData || {}).filter(
      (s) => s !== "all"
    );
    setSelectedScreenTypes(checked ? allScreenTypes : []);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 font-inter">
      {/* Modal Content */}
      <div className="bg-[#FFFFFF] rounded-[10px] h-[80vh] w-[90%] p-4 flex flex-col relative">
        {(pptGeneration || zipGeneration) && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-20 rounded-[10px]">
            <LoadingScreen
              title={
                pptGeneration
                  ? "Generating PPT, Please Wait..."
                  : "Generating Zip, Please Wait..."
              }
            />
          </div>
        )}
        <div className="relative inset-0 flex items-center justify-between gap-4 py-2 pr-5">
          <div className="flex gap-2 items-center">
            <h1 className="text-[#0E212E] font-semibold text-[20px]">
              Monitoring Pictures
              <span className="text-[#B0B0B0] text-[14px] ml-2">
                ({data?.monitoringData?.length || 0} Screens)
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <DownloadMenu
              onDownloadPPT={handleDownloadPPT}
              onDownloadZip={handleDownloadZip}
            />
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <i className="fi fi-br-cross text-[14px] text-gray-500" />
            </button>
          </div>
        </div>
        <div className="my-4 grid grid-cols-6 max-h-[65vh] gap-1">
          <FilterSection
            title="City"
            icon="fi-sr-marker"
            data={data}
            selectedItems={selectedCities}
            onItemChange={(city: string, checked: boolean) => {
              setSelectedCities(
                checked
                  ? [...selectedCities, city]
                  : selectedCities.filter((c) => c !== city)
              );
            }}
            onToggleAll={toggleAllCities}
            dataKey="cityWiseData"
          />

          <FilterSection
            title="Touch points"
            icon="fi-sr-land-location"
            data={data}
            selectedItems={selectedTouchPoints}
            onItemChange={(tp, checked) =>
              setSelectedTouchPoints(
                checked
                  ? [...selectedTouchPoints, tp]
                  : selectedTouchPoints.filter((t) => t !== tp)
              )
            }
            onToggleAll={toggleAllTouchPoints}
            dataKey="touchPointWiseData"
          />

          <FilterSection
            title="Screen Types"
            icon="fi-sr-screen"
            data={data}
            selectedItems={selectedScreenTypes}
            onItemChange={(st, checked) =>
              setSelectedScreenTypes(
                checked
                  ? [...selectedScreenTypes, st]
                  : selectedScreenTypes.filter((s) => s !== st)
              )
            }
            onToggleAll={toggleAllScreenTypes}
            dataKey="screenTypeWiseData"
          />

          <div className="border border-gray-100 rounded-[12px] col-span-1">
            <PanelHeader title={"Screens"} icon="fi-sr-screen" />
            <div className="h-[60vh]">
              <List
                items={data?.screenList || []}
                loading={loading}
                renderItem={(screenName: string) => (
                  <div
                    key={screenName}
                    className={`p-2 cursor-pointer truncate ${
                      currentScreen === screenName ? "bg-[#129BFF50]" : ""
                    }`}
                    onClick={() => setCurrentScreen(screenName)}
                  >
                    {screenName === "all" ? "All Screens" : screenName}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="border border-gray-100 rounded-[12px]  col-span-2 px-2 py-2 h-[65vh] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                Loading...
              </div>
            ) : error ? (
              <div className="text-red-500 p-4">
                Error loading monitoring data
              </div>
            ) : (
              <MonitoringPic
                result={
                  Array.isArray(data?.monitoringData) ? data.monitoringData : []
                }
                className="grid-cols-2"
                cardHeight="h-[200px]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
