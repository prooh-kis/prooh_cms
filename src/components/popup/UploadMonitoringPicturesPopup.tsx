import { useEffect, useState } from "react";
import { ShowMediaFile } from "../molecules/ShowMediaFIle";
// import { campaignsCreateByScreenOwner } from "../../actions/campaignAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { message, Select } from "antd";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { uploadCreativesMediaAction } from "../../actions/creativeAction";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { useLocation } from "react-router-dom";
import {
  getImageResolution,
  getVideoDurationFromVideoURL,
  getVideoResolution,
} from "../../utils/fileUtils";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { MultipleFileUploader } from "../molecules/MultipleFileUploader";
import { UPLOAD_CREATIVES_RESET } from "../../constants/creativeConstants";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { SCREEN_CAMPAIGN_MONITORING_PICS } from "../../constants/localStorageConstants";

interface UploadMonitoringPicturesPopupProps {
  onClose?: any;
  openUploadPopup?: any;
  mediaFiles?: any;
  setMediaFiles?: any;
  monitoringScreenId?: any;
  monitoringCampaignId?: any;
  monitoringDate?: any;
  monitoringTime?: any;
  monitoringMedia?: any;
  setMonitoringData?: any;
  fileType: string;
}
export function UploadMonitoringPicturesPopup({
  onClose,
  openUploadPopup,
  mediaFiles,
  setMediaFiles,
  monitoringScreenId,
  monitoringCampaignId,
  monitoringDate,
  monitoringTime,
  monitoringMedia,
  setMonitoringData,
  fileType,
}: UploadMonitoringPicturesPopupProps) {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const creativeId =
    pathname?.split("/")?.length > 2
      ? pathname?.split("/")?.splice(2)[0]
      : null;

  const openErrorToast = (message: string) => {
    toast.error(message, {
      style: {
        marginTop: "50px",
      },
    });
  };

  const openSuccessToast = (message: string) => {
    toast.success(message, {
      style: {
        marginTop: "50px",
      },
    });
  };

  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    if (openUploadPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openUploadPopup]);

  if (!openUploadPopup) {
    return null;
  }

  const validateSelectedFile = (file: any) => {
    // const MIN_FILE_SIZE = 1024; // 1MB
    let mb = 1000; // mb
    const MAX_FILE_SIZE = mb * 1000 * 1024; // 5MB
    const fileExtension = file.type.split("/")[1];
    const fileSizeKiloBytes = file.size; // convert to kb
    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      openErrorToast(
        "File size is greater than maximum limit. File size must be less then 50 MB "
      );
      return false;
    }
    if (
      !(
        fileExtension === "mp4" ||
        fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "png"
      )
    ) {
      return false;
    }
    return true;
  };

  const validateForm = () => {
    if (mediaFiles.length === 0) {
      message.error("Please enter a monitoring media to continue");
      return false;
      // } else if (network === "") {
      //   message.error("Please select a network");
      //   return false;
    } else {
      return true;
    }
  };

  const handleFilesUploader = async (files: FileList) => {
    if (files) {
      const mediaFilesArray: any = [];
      for (let file of Array.from(files)) {
        if (
          file.type.startsWith("image/") ||
          file.type.startsWith("video/") ||
          file.type.startsWith("audio/")
        ) {
          const url = URL.createObjectURL(file);
          let duration: any = 10;
          let resolution: any = {};
          if (file.type.split("/")[0] != "image") {
            duration = await getVideoDurationFromVideoURL(url);
            resolution = await getVideoResolution(url);
          } else {
            duration = 10;
            resolution = await getImageResolution(url);
          }
          if (validateSelectedFile(file))
            mediaFilesArray.push({
              file: file,
              url,
              type: file.type,
              awsURL: "",
              fileSize: file.size,
              extension: file.type,
              creativeType: file.type.split("/")[0],
              duration: duration,
              resolution: resolution,
              creativeName: file?.name?.split(".")[0],
            });
        }
      }
      setMediaFiles(mediaFilesArray);
    }
  };

  const handleMonitoringPicturesUpload = async () => {
    if (validateForm()) {
      let myData = mediaFiles;
      try {
        for (let data of myData) {
          if (data.awsURL === "") {
            const aws = await getAWSUrlToUploadFile({
              contentType: data.extension,
              name: data.creativeName,
            });
            const successAWSUploadFile = await saveFileOnAWS(
              aws?.url,
              data.file
            );
            data.awsURL = aws?.awsURL;
            data.url = aws?.url;
          }
        }
        let pictures: any = getDataFromLocalStorage(
          SCREEN_CAMPAIGN_MONITORING_PICS
        )
          ? getDataFromLocalStorage(SCREEN_CAMPAIGN_MONITORING_PICS)
              ?.timeWiseMonitoringData
          : {
              day: {
                images: [],
                video: [],
                geoTag: [],
                newspaper: [],
              },
              night: {
                images: [],
                video: [],
                geoTag: [],
                newspaper: [],
              },
              misc: {
                images: [],
                video: [],
                geoTag: [],
                newspaper: [],
              },
            };

        for (let data of myData) {
          pictures[monitoringTime][monitoringMedia].push(data.awsURL);
        }
        let picturesData = {
          screenId: monitoringScreenId,
          campaignId: monitoringCampaignId,
          date: new Date(monitoringDate).toISOString(),
          timeWiseMonitoringData: pictures,
        };
        saveDataOnLocalStorage(SCREEN_CAMPAIGN_MONITORING_PICS, picturesData);
        setMonitoringData(picturesData);
        onClose();
      } catch (error) {
        message.error(`createNewCreatives Error, ${error}`);
      }
    }
  };

  const handleDelete = (index: any) => {
    // setMediaFiles(mediaFiles.filter((_: any, i: any) => i != index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div className="pt-20" onClick={onClose}>
        <ToastContainer position="top-center" />
      </div>
      <div
        className="
        bg-white p-4 rounded-lg shadow-lg w-9/12 max-w-full
        h-full flex flex-col justify-between
        "
        style={{ height: "70vh", width: "40vw" }}
      >
        <div className="">
          <div className="p-2">
            <div className="flex justify-between">
              <h1 className="text-[14px] font-semibold">Add Creatives</h1>
              <i className="fi fi-rs-circle-xmark" onClick={onClose}></i>
            </div>
            <h2 className="text-[12px]">
              {monitoringMedia.toUpperCase()}, {monitoringTime.toUpperCase()}{" "}
              TIME MONITORING
            </h2>
          </div>
          <div className="px-2 relative overflow-auto max-h-auto">
            {mediaFiles.length === 0 && (
              <div className="py-2">
                <MultipleFileUploader
                  handleFilesUploader={handleFilesUploader}
                  fileType={fileType}
                />
                <h1 className="text-[10px] text-red-700">{`Max file size less then 50 MB`}</h1>
              </div>
            )}

            {mediaFiles.length > 0 && (
              <div>
                <div className="flex fle-row justify-between">
                  <p className="py-1">Uploaded media</p>
                  <button
                    className=""
                    type="submit"
                    onClick={() => {
                      setMediaFiles([]);
                    }}
                  >
                    Reset
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {mediaFiles?.map((media: any, j: any) => (
                    <ShowMediaFile
                      url={media?.awsURL || media?.url}
                      mediaType={media?.creativeType}
                      key={j}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-2 w-full bottom-0">
          <PrimaryButton
            title="Upload"
            rounded="rounded"
            width="w-full"
            action={handleMonitoringPicturesUpload}
            loading={false}
            loadingText="updating..."
            // disabled={loadingUpload}
          />
        </div>
      </div>
    </div>
  );
}
