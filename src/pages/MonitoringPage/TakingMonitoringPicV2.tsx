import { format } from "date-fns";
import { MyTab } from "../../components/molecules/MyTab";
import { FileUpload } from "../../components/atoms/FileUpload";
import { Loading } from "../../components/Loading";
import {
  MonitoringData,
  MonitoringUrlData2,
} from "../../types/monitoringTypes";
import { useCallback, useEffect, useMemo, useState } from "react";
// import { UploadedMonitoringPicsPopup } from "./UploadedMonitoringPicsPopup";
import { ShowUploadedCardV2 } from "./MonitoringReUsableComp";
import { UploadedMonitoringPicsPopupV2 } from "./UploadedMonitoringPicsPopupV2";

interface DummyDataItem {
  label: string;
  value: string;
  count: number;
  iconType: string;
}

interface Props {
  uploadedMonitoringPic: MonitoringUrlData2[];
  setUploadedMonitoringPic: (value: MonitoringUrlData2[]) => void;
  pageLoading: boolean;
  result: MonitoringData[];
  setResult: (value: MonitoringData[]) => void;
  currentTab: string;
  setCurrentTab: (value: string) => void;
  campaignList: any[];
  handleOk: () => void;
  handleClearAll?: () => void;
  handleSingleRemove?: (value: any) => void;
  screenName?: string;
}
export const TakingMonitoringPicV2 = ({
  pageLoading,
  result,
  setResult,
  currentTab,
  setCurrentTab,
  uploadedMonitoringPic,
  setUploadedMonitoringPic,
  handleOk,
  campaignList,
  handleClearAll,
  handleSingleRemove,
  screenName,
}: Props) => {
  const colorCode = useMemo(() => {
    return currentTab === "startDate"
      ? "text-[#5AAF69]"
      : currentTab === "midDate"
      ? "text-[#FF8D22]"
      : "text-[#E43535]";
  }, [currentTab]);

  // Initialize dummyData structure with icon types only
  const [dummyDataBase] = useState([
    { label: "Day Shots", value: "dayShot", iconType: "fi-rs-brightness" },
    {
      label: "With News paper",
      value: "withNewspaper",
      iconType: "fi-rr-newspaper",
    },
    {
      label: "With Geo Tag",
      value: "withGeoTag",
      iconType: "fi-ss-map-marker-check",
    },
    {
      label: "Loop Video",
      value: "loopVideo",
      iconType: "fi-sr-video-camera-alt",
    },
    { label: "Night Shots", value: "nightShot", iconType: "fi-ss-moon" },
  ]);

  // Generate dummyData without full icon elements
  const [dummyData, setDummyData] = useState<DummyDataItem[]>(() =>
    dummyDataBase.map((item) => ({
      ...item,
      count: 0,
    }))
  );

  const [open, setOpen] = useState<boolean>(false);

  const getCurrentData = (): MonitoringData => {
    return (
      result?.find((data) => data.dateType === currentTab) || {
        date: new Date().toISOString(),
        dateType: currentTab,
        monitoringTypeWiseData: [],
      }
    );
  };

  const updateDummyDataCounts = useCallback(() => {
    const currentTabData = result?.find((data) => data.dateType === currentTab);
    if (!currentTabData) return;

    setDummyData((prev) =>
      prev.map((item) => {
        const monitoringData = currentTabData.monitoringTypeWiseData.find(
          (data) => data.monitoringType === item.value
        );
        return {
          ...item,
          count: monitoringData?.monitoringUrls?.length || 0,
        };
      })
    );
  }, [result, currentTab]);

  useEffect(() => {
    updateDummyDataCounts();
  }, [result, currentTab, updateDummyDataCounts]);

  const handleFilesChange = useCallback((newFiles: File[]) => {
    // Create new URL objects for each file
    const newUrls: MonitoringUrlData2[] = newFiles.map((file) => ({
      url: URL.createObjectURL(file),
      awsUrl: "",
      file,
      fileType: file.type,
      uploadedDate: new Date().toISOString(),
      monitoringType: "", // Consider making this configurable
      campaignId: "",
    }));

    // Update state while cleaning up previous object URLs
    setUploadedMonitoringPic([...uploadedMonitoringPic, ...newUrls]);
    setOpen(true);
  }, []);

  // Memoize the radio group items with current color
  const radioGroupItems = useMemo(() => {
    return dummyData.map((item) => ({
      ...item,
      icon: <i className={`fi ${item.iconType} ${colorCode}`}></i>,
    }));
  }, [dummyData, colorCode]);

  const tabOrder = ["startDate", "midDate", "endDate"] as const;

  const availableDateTypes = (result || [])
    .map((d: MonitoringData) => d.dateType)
    .filter((value): value is string => value != "");

  const getTabData = () => {
    const labelMap = {
      startDate: "Start Date",
      midDate: "Mid Date",
      endDate: "End Date",
    } as const;

    return tabOrder
      .filter((key) => availableDateTypes.includes(key))
      .map((key) => ({
        label: labelMap[key],
        id: key,
      }));
  };

  const getAllFilesFromCurrentTab = (): MonitoringUrlData2[] => {
    const currentTabData = result?.find((data) => data.dateType === currentTab);
    if (!currentTabData) return [];

    return currentTabData.monitoringTypeWiseData.flatMap((typeData) =>
      typeData.monitoringUrls.map((urlData) => ({
        ...urlData,
        monitoringType: typeData.monitoringType,
        campaignId: "", // Provide default value if undefined
      }))
    );
  };

  return (
    <div>
      {pageLoading ? (
        <Loading />
      ) : availableDateTypes?.length === 0 ? (
        <h1 className="py-2 px-8 text-[#FF0000] text-[16px]">
          Monitoring data not selected
        </h1>
      ) : (
        <div>
          {open && (
            <UploadedMonitoringPicsPopupV2
              open={open}
              onClose={() => setOpen(false)}
              mediaFile={uploadedMonitoringPic}
              setUploadedMonitoringPic={setUploadedMonitoringPic}
              campaignList={campaignList}
              handleOk={() => {
                setOpen(false);
                handleOk();
              }}
              currentTab={currentTab}
              screenName={screenName || ""}
            />
          )}
          <MyTab
            tabData={getTabData()}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />

          <div className="flex justify-between items-center py-2">
            <h1 className="text-lg font-medium">Upload Monitoring Pic</h1>
            <div className="flex items-center gap-1">
              <i className="fi fi-rr-calendar-days"></i>
              <span className="text-gray-600">
                {format(new Date(getCurrentData().date), "yyyy-MM-dd")}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <FileUpload
              accept="image/*,video/*"
              multiple={true}
              onFilesChange={handleFilesChange}
              maxFiles={20}
              maxSize={100}
            />
          </div>
          {getAllFilesFromCurrentTab().length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between">
                <h3 className="font-medium mb-2">
                  Uploaded Files{" "}
                  <span className="text-gray-500 text-[12px]">
                    (Total: {getAllFilesFromCurrentTab().length})
                  </span>
                </h3>
                {getAllFilesFromCurrentTab().length > 0 && (
                  <button
                    className="text-[#000000] opacity-[80%] text-[14px] font-normal hover:text-[#129BFF] cursor-pointer"
                    onClick={handleClearAll}
                  >
                    Remove All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 h-[22vh] overflow-y-auto">
                {getAllFilesFromCurrentTab().map((fileData, index) => (
                  <ShowUploadedCardV2
                    key={`${fileData.url}-${index}`}
                    fileData={fileData}
                    handleRemoveFile={handleSingleRemove}
                    dummyData={radioGroupItems}
                    monitoringType={fileData.monitoringType}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
