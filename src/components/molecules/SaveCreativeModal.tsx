import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_CREATIVES_RESET } from "../../constants/creativeConstants";
import {
  getImageResolution,
  getVideoDurationFromVideoURL,
  getVideoResolution,
} from "../../utils/fileUtils";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { getCreatives, uploadCreatives } from "../../actions/creativeAction";
import { ShowMediaFile } from "../molecules/ShowMediaFIle";
import { MultipleFileUploader } from "../molecules/MultipleFileUploader";
import "react-toastify/dist/ReactToastify.css";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";

interface MediaFile {
  url: string;
  type: string;
  file: any;
  awsURL: string;
  fileSize: number;
  fileType: string;
  // duration: number;
  creativeName: string;
  resolution: {
    width: number;
    height: number;
  };
}

export function SaveCreativeModel(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const creativesUpload = useSelector((state: any) => state.creativesUpload);
  const { loading, error, success, data: message } = creativesUpload;

  const handleClose = () => {
    props?.onClose();
  };

  const handleSetImageDuration = (value: any) => {
    let data = mediaFiles;
    data = data.map((media: any) => {
      // if (media.fileType?.split("/")[0] === "image") {
      //   // media.duration = Number(value);
      // }
      return media;
    });
    setMediaFiles(data);
  };

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
    if (props?.isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [props?.isOpen]);

  useEffect(() => {
    if (error) {
      openErrorToast(error);
      setIsLoading(false);
      dispatch({ type: UPLOAD_CREATIVES_RESET });
    }
    if (message) {
      openSuccessToast(
        "Successfully uploaded, continue uploading more if required"
      );
      setIsLoading(false);
      dispatch({ type: UPLOAD_CREATIVES_RESET });
      
      props?.onClose();
    }
  }, [dispatch, message, error]);

  if (!props?.isOpen) {
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

  const handleFilesUploader = async (files: FileList) => {
    if (files) {
      const mediaFilesArray: MediaFile[] = [];
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
              fileType: file.type,
              // duration: duration,
              resolution: resolution,
              creativeName: file?.name?.split(".")[0],
            });
        }
      }
      setMediaFiles(mediaFilesArray);
    }
  };

  const createNewCreatives = async () => {
    setIsLoading(true);
    let myData = mediaFiles;
    try {
      for (let data of myData) {
        if (data.awsURL === "") {
          const aws = await getAWSUrlToUploadFile(data.fileType);
          const successAWSUploadFile = await saveFileOnAWS(aws?.url, data.file);
          data.awsURL = aws?.awsURL;
        }
      }

      dispatch(
        uploadCreatives({
          creatives: myData.map((data: MediaFile) => {
            return {
              awsURL: data?.awsURL,
              fileType: data.fileType,
              // duration: Number(data.duration),
              fileSize: data?.fileSize,
              resolution: data.resolution,
              creativeName: data.creativeName,
            };
          }),
        })
      );
    } catch (error) {
      console.log("createNewCreatives Error : ", error);
      setIsLoading(false);
    }
  };

  const isImagePresent = () => {
    return mediaFiles?.some(
      (media: MediaFile) => media.fileType.split("/")[0] === "image"
    );
  };

  const validateForm = () => {
    if (setMediaFiles?.length == 0) {
      openErrorToast("Please select creatives");
      return false;
    } else {
      return true;
    }
  };

  const handleNext = (e: any) => {
    if (validateForm()) {
      createNewCreatives();
    }
  };

  const handleDelete = (index: any) => {
    setMediaFiles(mediaFiles.filter((_, i: any) => i != index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-9/12 max-w-full relative overflow-auto max-h-auto no-scrollbar"
        style={{ height: "70vh", width: "50vw" }}
      >
        <div className="flex flex-col justify-center">
          {isLoading && (
            <h1 className="border border-1 bg-yellow-600 text-white text-lg px-8 py-2">
              Wait for some time file is saving....
            </h1>
          )}
        </div>

        {mediaFiles?.length > 0 ? (
          <div>
            <div className="flex fle-row justify-between">
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
            <div className="flex flex-wrap gap-2 border border-1 p-2">
              {mediaFiles?.map((media, index) => (
                <div key={index} className="border border-1 p-2">
                  <div className="flex justify-end">
                    <i className="fi fi-sr-trash" onClick={() => handleDelete(index)}></i>
              
                  </div>
                  <ShowMediaFile
                    url={media.url}
                    mediaType={media?.fileType?.split("/")[0] || "url"}
                  />
                  <h1 className="py-t">{media.creativeName}</h1>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-2">
            <h1 className="">Upload content</h1>
            <MultipleFileUploader handleFilesUploader={handleFilesUploader} />
            <h1 className="text-sm font-semibold text-red-700">{`Max file size less then 50 MB`}</h1>
          </div>
        )}
        <div className="flex flex-row justify-end pt-2 gap-2">
          <PrimaryButton
            action={handleNext}
            disabled={isLoading}
            title="Upload"
            rounded="rounded-[12px]"
          />
          <PrimaryButton
            action={handleClose}
            title="Cancel"
            rounded="rounded-[12px]"
          />
        </div>

        <div className="pt-20">
          <ToastContainer position="top-center" />
        </div>
      </div>
    </div>
  );
}
