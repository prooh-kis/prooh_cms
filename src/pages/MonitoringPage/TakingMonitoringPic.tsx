import { format } from "date-fns";
import { MyTab } from "../../components/molecules/MyTab";
import { FileUpload } from "../../components/atoms/FileUpload";
import { Loading } from "../../components/Loading";
import RadioGroupInput from "../../components/atoms/RadioGroupInput";
import { MonitoringData, MonitoringUrlData } from "../../types/monitoringTypes";
import { useCallback, useEffect, useState } from "react";
import { ShowUploadedCard } from "./MonitoringReUsableComp";

interface DummyDataItem {
  label: string;
  value: string;
  count: number;
  icon: JSX.Element;
}

export const TakingMonitoringPic = ({
  data,
  pageLoading,
  result,
  setResult,
  currentTab,
  setCurrentTab,
}: {
  data: MonitoringData[];
  pageLoading: boolean;
  result: MonitoringData[];
  setResult: (value: MonitoringData[]) => void;
  currentTab: string;
  setCurrentTab: (value: string) => void;
}) => {
  const getColorCode = useCallback(() => {
    return currentTab === "startDate"
      ? "text-[#5AAF69]"
      : currentTab === "midDate"
      ? "text-[#FF8D22]"
      : "text-[#E43535]";
  }, [currentTab]);

  const [monitoringType, setMonitoringType] = useState<string>("dayShot");
  const [uploadedFiles, setUploadedFiles] = useState<MonitoringUrlData[]>([]);

  // Initialize dummyData structure without colors
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

  // Generate dummyData with current colors
  const [dummyData, setDummyData] = useState<DummyDataItem[]>(() =>
    dummyDataBase.map((item) => ({
      ...item,
      count: 0,
      icon: <i className={`fi ${item.iconType} ${getColorCode()}`}></i>,
    }))
  );

  // Update colors when tab changes
  useEffect(() => {
    setDummyData((prev) =>
      prev.map((item) => ({
        ...item,
        icon: (
          <i
            className={`fi ${
              item.icon.props.className.split(" ")[1]
            } ${getColorCode()}`}
          ></i>
        ),
      }))
    );
  }, [getColorCode]);

  const getCurrentData = (): MonitoringData => {
    return (
      result.find((data) => data.dateType === currentTab) || {
        date: new Date().toISOString(),
        dateType: currentTab,
        monitoringTypeWiseData: [],
      }
    );
  };

  const updateDummyDataCounts = useCallback(() => {
    const currentTabData = result.find((data) => data.dateType === currentTab);
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

  useEffect(() => {
    if (data) {
      setResult(data);
    }
  }, [data, setResult]);

  const handleFilesChange = (newFiles: File[]) => {
    const newUrls: MonitoringUrlData[] = newFiles.map((file) => ({
      url: URL.createObjectURL(file),
      awsUrl: "",
      file,
      fileType: file.type,
      uploadedDate: new Date().toISOString(),
    }));

    const prevResult = [...result];
    const currentTabData = prevResult.find(
      (data) => data.dateType === currentTab
    ) || {
      date: new Date().toISOString(),
      dateType: currentTab,
      monitoringTypeWiseData: [],
    };

    const monitoringTypeData = currentTabData.monitoringTypeWiseData.find(
      (item) => item.monitoringType === monitoringType
    ) || { monitoringType, monitoringUrls: [] };

    const updatedMonitoringTypeData = {
      ...monitoringTypeData,
      monitoringUrls: [...monitoringTypeData.monitoringUrls, ...newUrls],
    };

    const updatedCurrentTabData = {
      ...currentTabData,
      monitoringTypeWiseData: [
        ...currentTabData.monitoringTypeWiseData.filter(
          (item) => item.monitoringType !== monitoringType
        ),
        updatedMonitoringTypeData,
      ],
    };

    setResult([
      ...prevResult.filter((data) => data.dateType !== currentTab),
      updatedCurrentTabData,
    ]);
  };

  const handleRemoveFile = (index: number) => {
    const currentData = getCurrentData();
    const existingTypeData = currentData.monitoringTypeWiseData.find(
      (item) => item.monitoringType === monitoringType
    ) || { monitoringType, monitoringUrls: [] };

    const updatedMonitoringUrls = [...existingTypeData.monitoringUrls];
    updatedMonitoringUrls.splice(index, 1);

    const updatedData = [
      ...result.filter((item) => item.dateType !== currentTab),
      {
        ...currentData,
        monitoringTypeWiseData: [
          ...currentData.monitoringTypeWiseData.filter(
            (item) => item.monitoringType !== monitoringType
          ),
          { ...existingTypeData, monitoringUrls: updatedMonitoringUrls },
        ],
      },
    ];

    setResult(updatedData);
    setUploadedFiles(updatedMonitoringUrls);
  };

  const getFiles = () => {
    const currentData = result.find((data) => data.dateType === currentTab);
    if (!currentData) return [];
    return (
      currentData.monitoringTypeWiseData.find(
        (d) => d.monitoringType === monitoringType
      )?.monitoringUrls || []
    );
  };

  return (
    <div>
      {pageLoading ? (
        <Loading />
      ) : (
        <div>
          <MyTab
            tabData={[
              { label: "Start Date", id: "startDate" },
              { label: "Mid Date", id: "midDate" },
              { label: "End Date", id: "endDate" },
            ]}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />

          <div className="flex justify-between items-center py-2">
            <h1 className="text-lg font-medium">Select Type</h1>
            <div className="flex items-center gap-1">
              <i className="fi fi-rr-calendar-days"></i>
              <span className="text-gray-600">
                {format(new Date(getCurrentData().date), "yyyy-MM-dd")}
              </span>
            </div>
          </div>

          <RadioGroupInput
            initialValues={dummyData}
            value={monitoringType}
            setValue={setMonitoringType}
          />

          <div className="mt-4">
            <FileUpload
              accept="image/*,video/*"
              multiple={true}
              onFilesChange={handleFilesChange}
              maxFiles={20}
              maxSize={100}
            />
          </div>

          {getFiles().length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">
                Uploaded Files{" "}
                <span className="text-gray-500 text-[12px]">
                  (
                  {
                    dummyData?.find((d: any) => d?.value === monitoringType)
                      ?.count
                  }
                  )
                </span>
              </h3>
              <div className="grid grid-cols-3 gap-4 h-[30vh] overflow-auto">
                {getFiles().map((fileData, index) => (
                  <ShowUploadedCard
                    key={index}
                    fileData={fileData}
                    handleRemoveFile={handleRemoveFile}
                    index={index}
                    dummyData={dummyData}
                    monitoringType={monitoringType}
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
