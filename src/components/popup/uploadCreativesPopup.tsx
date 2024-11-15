import { useEffect, useState } from "react";
import { ShowMediaFile } from "../molecules/ShowMediaFIle";
import { isNumber } from "@turf/turf";
import { isValidUrl } from "../../utils/valueValidate";
// import { campaignsCreateByScreenOwner } from "../../actions/campaignAction";
import { getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { CreativesListModal } from "../molecules/CreativeListModal";
import { message, Select } from "antd";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { getCreatives } from "../../actions/creativeAction";

interface UploadCreativesPopupProps {
  onClose?: any;
  screenOptions?: any;
  selectedScreens?: any;
  mediaFiles?: any;
  setMediaFiles?: any;
}
export function UploadCreativesPopup({
  onClose,
  screenOptions,
  selectedScreens,
  mediaFiles,
  setMediaFiles
}: UploadCreativesPopupProps) {
  const dispatch = useDispatch<any>();
  const [campaignOption, setCampaignOption] = useState("Image/Video");
  const [url, setUrl] = useState<any>("");
  const [campaignDuration, setCampaignDuration] = useState<any>("");
  // console.log("end Date : ", endDate);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreativeOpen, setIsCreativeOpen] = useState<boolean>(false);

  const uniqueResolution = selectedScreens.slice()
  .sort()
  .filter((value: any, index: any, self: any) => index === 0 || self[index - 1] !== value);
  
  const creativesList = useSelector((state: any) => state.creativesList);
  const { loading, error, data } = creativesList;

  const openErrorToast = (message: string) => {
    toast.error(message, {
      style: {
        marginTop: "50px",
      },
    });
  };

  useEffect(() => {
    dispatch(getCreatives());
    if (isCreativeOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isCreativeOpen]);

  const handleAddCampaignOption = (checked: boolean) => {
    if (checked) {
      setCampaignOption("URL");
    } else {
      setCampaignOption("Image/Video");
    }
  };

  const handelDiscard = () => {
    setMediaFiles([]);
    
    setUrl("");
    setIsLoading(false);
    onClose();
  };

  const createCampaignFromMedia = async () => {
    setIsLoading(true);
    const mediaData = mediaFiles.map((data: any) => {
      return {
        awsURL: data?.videoURL,
        fileType: data.extension,
        videoDuration:
          data.creativeType === "image"
            ? Number(campaignDuration)
            : Number(data.duration),
        fileSize: data?.fileSize,
      };
    });

    // dispatch(
    //   campaignsCreateByScreenOwner({
    //     screenIds: selectedScreens,
    //     campaignName,
    //     brandName,
    //     isDefaultCampaign: !takeDateRange,
    //     startDate: !takeDateRange ? null : new Date(startDate).toISOString(),
    //     endDate: !takeDateRange ? null : new Date(endDate).toISOString(),
    //     campaignBookedForDays: getNumberOfDaysBetweenTwoDates(
    //       startDate,
    //       endDate
    //     ),
    //     mediaData: mediaData,
    //   })
    // );

    setTimeout(() => {
      handelDiscard();
    }, 0);
  };

  const createCampaignFromURL = () => {
    setIsLoading(true);
    dispatch(
      // campaignsCreateByScreenOwner({
      //   screenIds: selectedScreens,
      //   campaignName,
      //   brandName,
      //   isDefaultCampaign: !takeDateRange,
      //   startDate: !takeDateRange ? null : new Date(startDate).toISOString(),
      //   endDate: !takeDateRange ? null : new Date(endDate).toISOString(),
      //   campaignBookedForDays: getNumberOfDaysBetweenTwoDates(
      //     startDate,
      //     endDate
      //   ),
      //   mediaData: [
      //     {
      //       awsURL: url,
      //       fileType: "url",
      //       videoDuration: Number(campaignDuration),
      //       fileSize: 0,
      //     },
      //   ],
      // })
    );
    setTimeout(() => {
      handelDiscard();
    }, 0);
  };

  const isImagePresent = () => {
    return mediaFiles.some((data: any) => data.creativeType == "image");
  };

  const validateForm = () => {
    if (campaignOption === "Image/Video" && mediaFiles?.length == 0) {
      message.error("Please Select Media First!");
      return false;
    } else if (campaignOption === "URL" && !isValidUrl(url)) {
      message.error("Please enter valid url");
      setUrl("");
      return false;
    } else if (isImagePresent() && !campaignDuration) {
      message.error("Please enter duration for image campaign");
      return false;
    } else if (isImagePresent() && Number(campaignDuration) <= 0) {
      message.error("Please enter duration > 0 for image campaign");
      return false;
    } else if (campaignOption === "URL" && !campaignDuration) {
      message.error("Please set campaign duration in sec");
      return false;
    } else if (campaignOption === "URL" && !isNumber(campaignDuration)) {
      message.error("Please Enter only number for campaign duration");
      setCampaignDuration("");
      return false;
    } else if (campaignOption === "URL" && Number(campaignDuration) <= 0) {
      message.error("Please Enter duration > 0 ");
      setCampaignDuration("");
      return false;
    } else if (selectedScreens?.length === 0) {
      message.error("Please Select at least one screen");
      return false;
    } else {
      return true;
    }
  };
  const handleNext = (e: any) => {
    if (validateForm()) {
      // console.log("form validated");
      if (url?.length > 0 && campaignOption === "URL") {
        createCampaignFromURL();
      } else {
        createCampaignFromMedia();
      }
    }
  };

  const handleCloseCreativeModel = () => {
    setIsCreativeOpen(false);
  };

  console.log(selectedScreens);
  console.log(uniqueResolution)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-9/12 max-w-full relative overflow-auto max-h-auto "
        style={{ height: "70vh", width: "40vw" }}
      >
        <CreativesListModal
          isOpen={isCreativeOpen}
          onClose={handleCloseCreativeModel}
          creativeList={data}
          loading={loading}
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
        />

        <div>
          <div className="flex flex-col justify-center">
            <h1 className="text-[12px]">Choose Creatives</h1>
            <div className="flex justify-between">
              <h1 className="text-[12px]">Screen: {selectedScreens?.length}</h1>
              <h1 className={`${uniqueResolution?.length > 1 ? "text-red-500" : ""} text-[12px]`}>Resolution: {uniqueResolution?.length > 1 ? `${uniqueResolution?.length} resolutions` : uniqueResolution[0].resolution}</h1>
            </div>
            {uniqueResolution?.length > 1 && (
              <h1 className="text-[10px] text-red-500">Screens with different resolutions selected, please check and proceed again</h1>
            )}
            {isLoading && (
              <h1 className="border border-1 bg-yellow-600 text-white text-lg px-8 py-2">
                Wait for some time file is saving....
              </h1>
            )}
          </div>
          <div>
            <div className="flex flex-row gap-2">
              <input
                placeholder="a"
                type="checkbox"
                id="url"
                checked={campaignOption === "URL" ? true : false}
                onChange={(e) => handleAddCampaignOption(e.target.checked)}
              />
              <label className="text-sm font-black" htmlFor="url">
                url
              </label>
            </div>
          </div>
          {campaignOption === "URL" ? (
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h1>Media URL:</h1>
                <input
                  placeholder="Enter media url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="border border-gray-300 rounded-sm w-full h-10 text text-sm text-black-600 p-2"
                />
              </div>
            </div>
          ) : (
            <button
              className="border border-solid rounded py-4 w-full bg-sky-200 hover:bg-sky-400 hover:text-white"
              onClick={() => {
                setIsCreativeOpen(true);
              }}
            >
              Select creatives
            </button>
          )}
          {campaignOption !== "URL" && mediaFiles?.length > 0 && (
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
                    url={media.videoURL}
                    mediaType={media?.creativeType}
                    key={index}
                  />
                ))}
              </div>
            </div>
          )}

          {(campaignOption === "URL" || isImagePresent()) && (
            <div className="flex flex-col">
              {/* <h1 fontSize="md" color="#131D30" fontWeight="400" m="0">
                Duration{" "}
              </h1> */}
              <div className="py-2 flex items-center gap-2">
                <i className="fi fi-br-stopwatch"></i>
                <h1 className="">(in seconds)</h1>
              </div>
              <input
                placeholder="Enter duration in sec."
                type="number"
                className="border border-gray-300 rounded-sm w-full h-10 text text-sm text-black-600 p-2"
                value={campaignDuration}
                onChange={(e) => setCampaignDuration(e.target.value)}
              />
            </div>
          )}
          
        </div>
        <div className="flex justify-between pt-2 gap-2">
          <PrimaryButton
            title="Upload"
            rounded="rounded-[12px]"
            action={handleNext}
            disabled={isLoading}
          />
          <PrimaryButton
            title="Cancel"
            rounded="rounded-[12px]"
            reverse={true}
            action={handelDiscard}
          />
        </div>
      </div>
      <div className="pt-20">
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}
