import React, { useRef, useState } from "react";
import { MonitoringUrlData2 } from "../../types/monitoringTypes";
import ButtonInput from "../../components/atoms/ButtonInput";
import { message, Tooltip } from "antd";
import { FirstCharForBrandName } from "../../components/molecules/FirstCharForBrandName";
import { camelToTitleCase } from "../../utils/formatValue";

interface ShowFileDataProps {
  fileData: MonitoringUrlData2;
  handleRemoveFile: (index: number) => void;
  index: number;
  setUploadedMonitoringPic: (value: MonitoringUrlData2[]) => void;
}

interface MonitoringType {
  label: string;
  value: string;
  iconType: string;
  label2: string;
}

interface Campaign {
  _id: string;
  name: string;
}

interface UploadedMonitoringPicsPopupProps {
  open: boolean;
  onClose: () => void;
  mediaFile: MonitoringUrlData2[];
  campaignList: Campaign[];
  setUploadedMonitoringPic: (value: MonitoringUrlData2[]) => void;
  handleOk: () => void;
  currentTab: string;
  screenName: string;
}

export const ShowFileData = ({
  fileData,
  handleRemoveFile,
  index,
  setUploadedMonitoringPic,
}: ShowFileDataProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative group h-[200px] bg-gray-100 rounded-t-lg">
      {fileData?.fileType?.includes("image") ? (
        <img
          src={fileData?.url || fileData?.awsUrl}
          alt={fileData?.file?.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      ) : (
        <video ref={videoRef} className="h-full w-full rounded-t-lg" controls>
          <source
            src={fileData?.url || fileData?.awsUrl}
            type={fileData.fileType}
          />
        </video>
      )}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <i
          className="fi fi-rr-cross-circle cursor-pointer text-[#FF0000]"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFile(index);
          }}
        ></i>
      </div>
    </div>
  );
};

export function UploadedMonitoringPicsPopupV2({
  open,
  onClose,
  handleOk,
  mediaFile,
  campaignList,
  setUploadedMonitoringPic,
  screenName,
  currentTab,
}: UploadedMonitoringPicsPopupProps) {
  const [monitoringTypes] = useState<MonitoringType[]>([
    {
      label: "Day Shots",
      label2: "Day",
      value: "dayShot",
      iconType: "fi-br-brightness",
    },
    {
      label2: "Newspaper",
      label: "With Newspaper",
      value: "withNewspaper",
      iconType: "fi-sr-newspaper",
    },
    {
      label2: "Geo Tag",
      label: "With Geo Tag",
      value: "withGeoTag",
      iconType: "fi-ss-map-marker-check",
    },
    {
      label2: "Loop Video",
      label: "Loop Video",
      value: "loopVideo",
      iconType: "fi-sr-video-camera-alt",
    },
    {
      label2: "Night",
      label: "Night Shots",
      value: "nightShot",
      iconType: "fi-ss-moon",
    },
  ]);

  const handleMonitoringTypeChange = (
    fileIndex: number,
    monitoringType: string
  ) => {
    const updated = [...mediaFile];
    updated[fileIndex] = {
      ...updated[fileIndex],
      monitoringType,
    };
    setUploadedMonitoringPic(updated);
  };

  const handleRemoveFile = (index: number) => {
    const updated = [...mediaFile];
    updated.splice(index, 1);
    setUploadedMonitoringPic(updated);
  };

  const getCountMonitoringTypeWise = (key: string) => {
    return mediaFile.reduce((accum: number, current: any) => {
      if (current.monitoringType === key) {
        accum += 1;
      }
      return accum;
    }, 0);
  };

  if (!open) {
    return null;
  }

  const getMonitoringType = (monitoringType: string) => {
    return monitoringTypes.find((data: any) => data.value === monitoringType);
  };

  const handleSave = () => {
    if (mediaFile?.find((data: any) => data.monitoringType === "")) {
      message.error("Please add tags for all or remove images");
      return;
    }
    handleOk();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-[10px] h-[84vh] w-[85%] flex flex-col">
        <div className="flex justify-between items-center border-b p-4 px-8">
          <div className="flex gap-2">
            <FirstCharForBrandName brandName={screenName} />
            <div className="">
              <h2 className="text-[20px] font-bold">{screenName}</h2>
              <h6 className="text-md font-normal text-[#6F7F8E]">
                {camelToTitleCase(currentTab)}
              </h6>
            </div>
          </div>
          <div className="flex gap-2">
            <ButtonInput
              variant="outline"
              onClick={() => {
                setUploadedMonitoringPic([]);
                onClose();
              }}
            >
              Cancel
            </ButtonInput>
            <ButtonInput onClick={handleSave}>Save</ButtonInput>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-10 grid grid-cols-3 h-[70vh] overflow-y-auto scrollbar-minimal pr-2 px-8 py-4 gap-4 border-r">
            {mediaFile?.map((file, index) => (
              <div key={index} className="relative group h-[240px]">
                <div className="flex-1">
                  {/* Add overlay div for the hover effect */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg z-10"></div>

                  <ShowFileData
                    fileData={file}
                    handleRemoveFile={handleRemoveFile}
                    index={index}
                    setUploadedMonitoringPic={setUploadedMonitoringPic}
                  />

                  <div
                    className={`flex gap-2 p-2  text-[#FFFFFF] rounded-b-lg ${
                      file.monitoringType ? `bg-[#3A9868]` : `bg-[#FF9047]`
                    }`}
                  >
                    <i
                      className={`fi ${
                        getMonitoringType(file.monitoringType)?.iconType
                      } flex items-center`}
                    />
                    {file.monitoringType ? (
                      <h1 className="font-bold text-[16px]">
                        {getMonitoringType(file.monitoringType)?.label}
                      </h1>
                    ) : (
                      <h1 className="font-bold text-[16px]">Tag Pending</h1>
                    )}
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-[50px] p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="flex justify-between w-full items-center rounded-full p-2 border bg-[#FFFFFF]">
                    {monitoringTypes.map((type, typeIndex) => (
                      <Tooltip key={typeIndex} title={type.label}>
                        <div
                          onClick={() =>
                            handleMonitoringTypeChange(index, type.value)
                          }
                          className={`h-8 w-8 rounded-full flex justify-center items-center cursor-pointer ${
                            file.monitoringType === type.value
                              ? `bg-[#129BFF] text-[#FFFFFF]`
                              : "text-[#ADB7BF]"
                          }`}
                        >
                          <i
                            className={`flex items-center fi ${type.iconType}`}
                          />
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-2 border-r p-4 ">
            <div className="flex gap-2 mb-4">
              <h1 className="text-[#129BFF]">
                All Picture{" "}
                <span className="text-[#6F7F8E] text-[12px]">
                  ({mediaFile.length})
                </span>
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              {monitoringTypes?.map((data: any, index: number) => (
                <div className="flex gap-2" key={index}>
                  <i
                    className={`fi ${data.iconType} flex items-center text-[#ADB7BF] `}
                  />
                  <h1 className="text-[#000000] text-[14px] font-medium">
                    {data.label2}{" "}
                    <span className="text-[#6F7F8E] text-[12px]">
                      ({getCountMonitoringTypeWise(data.value)})
                    </span>
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
