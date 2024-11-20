import { useEffect, useState } from "react";
import { ShowMediaFile } from "../molecules/ShowMediaFIle";
// import { campaignsCreateByScreenOwner } from "../../actions/campaignAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { message, Select } from "antd";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { uploadCreativesMediaAction } from "../../actions/creativeAction";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { useLocation } from "react-router-dom";
import {
  getImageResolution,
  getVideoDurationFromVideoURL,
  getVideoResolution,
} from "../../utils/fileUtils";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { MultipleFileUploader } from "../../components/molecules/MultipleFileUploader";
import { UPLOAD_CREATIVES_RESET } from "../../constants/creativeConstants";

interface UploadCreativesV2PopupProps {
  onClose?: any;
  screenOptions?: any;
  selectedScreens?: any;
  mediaFiles?: any;
  setMediaFiles?: any;
  isOpen?: any;
  brandName?: string;
  setBrandName?: any;
  network?: string;
  setNetwork?: any;
  userInfo?: any;
}
export function UploadCreativesV2Popup({
  onClose,
  screenOptions,
  selectedScreens,
  mediaFiles,
  setMediaFiles,
  isOpen,
  brandName,
  setBrandName,
  network,
  setNetwork,
  userInfo,
}: UploadCreativesV2PopupProps) {
  const dispatch = useDispatch<any>();
  const {pathname} = useLocation();
  const creativeId = pathname?.split("/")?.length > 2
  ? pathname?.split("/")?.splice(2)[0]
  : null;


  const creativesMediaUpload = useSelector((state: any) => state.creativesMediaUpload);
  const {
    loading: loadingUpload,
    error: errorUpload,
    success: successUpload,
  } = creativesMediaUpload;

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

  useEffect(() => {
    if (successUpload) {
      openSuccessToast("Creative uploaded successfully!");
      setMediaFiles([]);
      dispatch({ type: UPLOAD_CREATIVES_RESET });
    }
  },[successUpload]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) {
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
    if (brandName === "") {
      message.error("Please enter a brand name");
      return false;
    } else if (network === "") {
      message.error("Please select a network");
      return false;
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
            console.log("resolution video", resolution);
          } else {
            duration = 10;
            resolution = await getImageResolution(url);
            console.log("resolution image", resolution);
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


  const createNewCreatives = async () => {
    let myData = mediaFiles;
    try {
      for (let data of myData) {
        if (data.awsURL === "") {
          const aws = await getAWSUrlToUploadFile({ contentType: data.extension, name: data.creativeName});
          const successAWSUploadFile = await saveFileOnAWS(aws?.url, data.file);
          data.awsURL = aws?.awsURL;
          data.url = aws?.url;
        }
      }
      console.log(myData);
    
      dispatch(uploadCreativesMediaAction({
        id: creativeId,
        userId: userInfo?._id,
        brand: brandName,
        network: network,
        creatives: myData
      }));
      
    } catch (error) {
      console.log("createNewCreatives Error : ", error);
    }
  };

  const handleCreateCreatives = () => {
    if (validateForm()) {
      createNewCreatives();
    }
  }

  const handleDelete = (index: any) => {
    setMediaFiles(mediaFiles.filter((_: any, i: any) => i != index));
  };
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div className="pt-20">
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
          <div className="flex p-2">
            <h1 className="text-[14px] font-semibold">Add Creatives</h1>
          </div>
          <div className="p-2">
            <div className="py-1">
              <PrimaryInput
                inputType="text"
                placeholder="brand"
                value={brandName}
                action={setBrandName}
              />
            </div>
            <div className="py-1">
              <PrimaryInput
                inputType="text"
                placeholder="network"
                value={network}
                action={setNetwork}
              />
            </div>
          </div>
          <div className="px-2 relative overflow-auto max-h-auto">
            {mediaFiles?.length === 0 && (
              <div className="py-2">
                <MultipleFileUploader handleFilesUploader={handleFilesUploader} />
                <h1 className="text-[10px] text-red-700">{`Max file size less then 50 MB`}</h1>
              </div>
            )}

            {mediaFiles?.length > 0 && (
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
                  {mediaFiles.map((media: any, index: any) => (
                    <ShowMediaFile
                      url={media.awsURL || media.url}
                      mediaType={media?.creativeType}
                      key={index}
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
            action={handleCreateCreatives}
            disabled={loadingUpload}
          />

        </div>
      </div>

    </div>
  );
}
