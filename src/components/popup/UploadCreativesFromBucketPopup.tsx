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
import { getCreatives, getCreativesMediaAction } from "../../actions/creativeAction";
import { Loading } from "../../components/Loading";
import { createCampaignCreationByScreenOwnerAction } from "../../actions/campaignAction";

interface UploadCreativesFromBucketPopupProps {
  onClose?: any;
  screenOptions?: any;
  selectedScreens?: any;
  mediaFiles?: any;
  setMediaFiles?: any;
  brandName?: string;
  campaignId?: any;
}
export function UploadCreativesFromBucketPopup({
  onClose,
  screenOptions,
  selectedScreens,
  mediaFiles,
  setMediaFiles,
  brandName,
  campaignId
}: UploadCreativesFromBucketPopupProps) {
  const dispatch = useDispatch<any>();
  const [campaignOption, setCampaignOption] = useState("Image/Video");
  const [url, setUrl] = useState<any>("");
  const [campaignDuration, setCampaignDuration] = useState<any>("");
  // console.log("end Date : ", endDate);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreativeOpen, setIsCreativeOpen] = useState<boolean>(false);

  const [creativesMedia, setCreativesMedia] = useState<any>([]);

  const uniqueResolution = selectedScreens.slice()
  .sort()
  .filter((value: any, index: any, self: any) => index === 0 || self[index - 1] !== value);
  
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const creativesMediaGet = useSelector((state: any) => state.creativesMediaGet);
  const {
    loading: loadingCreatives,
    error: errorCreatives,
    data: creatives,
  } = creativesMediaGet;

  const openErrorToast = (message: string) => {
    toast.error(message, {
      style: {
        marginTop: "50px",
      },
    });
  };

  useEffect(() => {
    if (creatives && brandName) {
      console.log(creatives);
      setCreativesMedia(creatives[brandName]);
    }
  },[brandName, creatives]);
console.log(creativesMedia);

  useEffect(() => {
   
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
    const mediaData = mediaFiles.map((item: any) => ({
      screenResolution: `${item.resolution.width}x${item.resolution.height}`,
      count: 1,
      creativeDuration: parseInt(item.duration, 10),
      standardDayTimeCreatives: [
        {
          type: `image/${item.extension.split("/").pop()}`,
          url: item.url,
          size: item.fileSize,
          _id: { $oid: item._id }
        }
      ],
      standardNightTimeCreatives: [],
      triggerCreatives: []
    }))

    dispatch(
      createCampaignCreationByScreenOwnerAction({
        id: campaignId,
        creatives: mediaData,
      })
    );

    setTimeout(() => {
      handelDiscard();
    }, 0);
  };

  const createCampaignFromURL = () => {
    setIsLoading(true);
    dispatch(
      createCampaignCreationByScreenOwnerAction({
        id: campaignId,
        mediaData: [
          {
            awsURL: url,
            fileType: "url",
            videoDuration: Number(campaignDuration),
            fileSize: 0,
          },
        ],
      })
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


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-full max-w-full relative overflow-auto max-h-auto "
        style={{ height: "70vh", width: "40vw" }}
      >
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
            <div>
              <h1 className="text-[14px] font-semibold">Select from creatives</h1>
              {loadingCreatives ? (
                <Loading />
              ) : (
                <div>
                  {creativesMedia && Object.keys(creativesMedia)?.filter((c: any) => c !== "network")?.map((f: any, k: any) => (
                    <div className="p-2" key={k} onClick={() => {}}>
                      <h1 className="text-[12px] font-semibold border-b">{`${f}s`.toUpperCase()}</h1>
                      {Object.keys(creativesMedia[f])?.map((g: any, j: any) => (
                        <div key={j} className="py-2">
                          <h1 className="text-[10px] py-1">Resolution: {g}</h1>
                          <div className="grid grid-cols-3 gap-2">
                            {creativesMedia[f][g]?.map((l: any, y: any) => (
                              <div key={y} className="w-full border rounded"
                                onClick={() => {
                                  setMediaFiles((prev: any) => {
                                    if (mediaFiles?.map((file: any) => file._id).includes(l._id)) {
                                      return mediaFiles.filter((file: any) => file._id !== l._id);
                                    } else {
                                      return [...prev, l];
                                    }
                                  })
                                }}
                              >
                                <div className="w-full">
                                  <ShowMediaFile
                                    url={l.awsURL}
                                    mediaType={l?.creativeType}
                                    key={y}
                                    height="h-full"
                                    width="w-full"
                                  />
                                </div>
                                <div className="p-1">
                                  <h1 className="text-[12px] truncate">
                                    {l.creativeName.toUpperCase()}
                                  </h1>
                                  <div className="flex gap-1 items-center truncate">
                                    <h1 className="text-[12px]">
                                      {l.extension?.split("/")[1]},
                                    </h1>
                                    <h1 className="text-[12px] truncate">
                                      {l.duration} seconds
                                    </h1>
                                  </div>
                                </div>

                              </div>
                            ))}
                          </div>

                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

            </div>
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
                    url={media.awsURL}
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
