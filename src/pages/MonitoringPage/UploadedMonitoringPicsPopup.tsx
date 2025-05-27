import React, { useRef, useState } from "react";
import { MonitoringUrlData2 } from "../../types/monitoringTypes";
import ButtonInput from "../../components/atoms/ButtonInput";

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
}

export const ShowFileData = ({
  fileData,
  handleRemoveFile,
  index,
  setUploadedMonitoringPic,
}: ShowFileDataProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative group h-full bg-gray-100 rounded-lg">
      {fileData?.fileType?.includes("image") ? (
        <img
          src={fileData?.url || fileData?.awsUrl}
          alt={fileData?.file?.name}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <video ref={videoRef} className="h-full w-full rounded" controls>
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

export function UploadedMonitoringPicsPopup({
  open,
  onClose,
  handleOk,
  mediaFile,
  campaignList,
  setUploadedMonitoringPic,
}: UploadedMonitoringPicsPopupProps) {
  const [monitoringTypes] = useState<MonitoringType[]>([
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

  const handleCampaignChange = (fileIndex: number, campaignId: string) => {
    const updated = [...mediaFile]; // Use mediaFile prop instead of prev
    updated[fileIndex] = {
      ...updated[fileIndex],
      campaignId,
    };
    setUploadedMonitoringPic(updated); // Pass the new array directly
  };

  const handleMonitoringTypeChange = (
    fileIndex: number,
    monitoringType: string
  ) => {
    const updated = [...mediaFile]; // Use mediaFile prop instead of prev
    updated[fileIndex] = {
      ...updated[fileIndex],
      monitoringType,
    };
    setUploadedMonitoringPic(updated); // Pass the new array directly
  };

  const handleRemoveFile = (index: number) => {
    const updated = [...mediaFile]; // Use mediaFile prop instead of prev
    updated.splice(index, 1);
    setUploadedMonitoringPic(updated); // Pass the new array directly
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-[10px] h-[80%] w-[80%] p-1">
        <div className="relative inset-0 flex items-center justify-end gap-4 p-3">
          <div className="flex gap-2">
            <ButtonInput variant="outline" onClick={handleOk}>
              Save
            </ButtonInput>
            <ButtonInput variant="outline" onClick={onClose}>
              Cancel
            </ButtonInput>
          </div>
        </div>
        <div className="p-4">
          {/* Header */}
          <div className="grid grid-cols-12 border py-2 text-[14px]">
            <div className="col-span-4 flex justify-center">
              Pictures / Videos
            </div>
            <div className="col-span-8 grid grid-cols-10">
              {monitoringTypes?.map((item, index) => (
                <div className="col-span-2 flex justify-center" key={index}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="h-[56vh] overflow-y-auto mt-2 flex flex-col gap-1">
            {mediaFile?.map((file, index) => (
              <div
                className="grid grid-cols-12 gap-1 hover:bg-[#129BFF20] mt-4"
                key={index}
              >
                <div className="col-span-4 p-1 flex flex-col">
                  <ShowFileData
                    fileData={file}
                    handleRemoveFile={handleRemoveFile}
                    index={index}
                    setUploadedMonitoringPic={setUploadedMonitoringPic}
                  />
                  <p className="text-[12px] truncate">{file?.file?.name}</p>
                </div>
                {/* <div className="col-span-2 p-1 flex flex-col">
                  <select
                    className="border rounded p-1 text-sm"
                    value={file.campaignId || ""}
                    onChange={(e) =>
                      handleCampaignChange(index, e.target.value)
                    }
                  >
                    <option value="">Select Campaign</option>
                    {campaignList?.map((campaign) => (
                      <option key={campaign._id} value={campaign._id}>
                        {campaign.name}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div className="col-span-8 grid grid-cols-10">
                  {monitoringTypes?.map((item, typeIndex) => (
                    <div
                      className="col-span-2 flex justify-center"
                      key={typeIndex}
                    >
                      <input
                        title="d"
                        type="radio"
                        className="h-6 w-6 mt-1"
                        name={`monitoringType-${index}`}
                        checked={file.monitoringType === item.value}
                        onChange={() =>
                          handleMonitoringTypeChange(index, item.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
