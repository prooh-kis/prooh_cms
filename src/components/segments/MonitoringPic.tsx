import { useMemo, useState } from "react";
import ButtonInput from "../atoms/ButtonInput";
import { MonitoringData } from "../../types/monitoringTypes";
import { MonitoringPicCard } from "../molecules/MonitoringPicCard";
import { NoDataView } from "../molecules/NoDataView";

interface TransformedData {
  startDate: Array<{
    url: string;
    uploadedDate: string;
    fileType: string;
    monitoringType: string;
  }>;
  endDate: Array<{
    url: string;
    uploadedDate: string;
    fileType: string;
    monitoringType: string;
  }>;
  midDate: Array<{
    url: string;
    uploadedDate: string;
    fileType: string;
    monitoringType: string;
  }>;
}

interface MonitoringPicProps {
  result?: MonitoringData[];
  className?: string;
  cardHeight?: string;
}

export const MonitoringPic = ({
  result = [],
  className = "grid-cols-2",
  cardHeight = "h-[200px]",
}: MonitoringPicProps) => {
  const [currentTab, setCurrentTab] =
    useState<keyof TransformedData>("startDate");

  const tabOrder = ["startDate", "midDate", "endDate"] as const;
  const tabLabels = {
    startDate: "Start Date",
    midDate: "Mid Monitoring",
    endDate: "End Date",
  };

  const availableDateTypes = result
    ?.map((d) => d.dateType)
    .filter((value): value is keyof TransformedData =>
      ["startDate", "midDate", "endDate"].includes(value)
    );

  const getTabData = () => {
    return tabOrder
      .filter((key) => availableDateTypes.includes(key))
      .map((key) => ({
        label: tabLabels[key],
        id: key,
      }));
  };

  const transformData = (): TransformedData => {
    const output: TransformedData = {
      startDate: [],
      endDate: [],
      midDate: [],
    };

    result?.forEach((item) => {
      const dateType = item.dateType as keyof TransformedData;
      if (!output[dateType]) return;

      item.monitoringTypeWiseData.forEach((monitoringTypeData) => {
        monitoringTypeData.monitoringUrls.forEach((urlData) => {
          output[dateType].push({
            url: urlData.awsUrl || "",
            uploadedDate: urlData.uploadedDate,
            fileType: urlData.fileType,
            monitoringType: monitoringTypeData.monitoringType,
          });
        });
      });
    });

    return output;
  };

  const transformedData = transformData();
  const currentTabData = transformedData[currentTab] || [];
  const colorCode = useMemo(() => {
    return {
      startDate: "text-[#5AAF69]",
      midDate: "text-[#FF8D22]",
      endDate: "text-[#E43535]",
    }[currentTab];
  }, [currentTab]);

  return (
    <div className="h-full">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {getTabData().map((data) => (
            <ButtonInput
              variant={currentTab === data.id ? "primary" : "outline"}
              rounded="full"
              size="small"
              onClick={() => setCurrentTab(data.id)}
              key={data.id}
            >
              {data.label}
            </ButtonInput>
          ))}
        </div>
        <div className="flex gap-1 items-center text-[14px]">
          <i className="fi fi-rr-calendar flex item-center text-[#129BFF]"></i>
          <span>{result?.find((d) => d.dateType == currentTab)?.date}</span>
        </div>
      </div>

      {currentTabData.length === 0 ? (
        <NoDataView bg="bg-gray-100" title="Monitoring pic not uploaded yet" />
      ) : (
        <div className={`grid ${className} gap-4 py-4`}>
          {currentTabData.map((data, index) => (
            <MonitoringPicCard
              key={`${data.monitoringType}-${index}`}
              url={data.url}
              fileType={data.fileType}
              monitoringType={data.monitoringType}
              uploadedDate={data.uploadedDate}
              colorCode={colorCode}
              cardHeight={cardHeight}
            />
          ))}
        </div>
      )}
    </div>
  );
};
