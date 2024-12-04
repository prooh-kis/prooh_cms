import { useEffect, useState } from "react";
import { ShowMediaFile } from "../molecules/ShowMediaFIle";
import { isNumber } from "@turf/turf";
import { isValidUrl } from "../../utils/valueValidate";
// import { campaignsCreateByScreenOwner } from "../../actions/campaignAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { message, Select } from "antd";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { Loading } from "../../components/Loading";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import {
  CAMPAIGN_CREATIVES_TO_UPLOAD,
  FULL_CAMPAIGN_PLAN,
} from "../../constants/localStorageConstants";

interface UploadCreativesFromBucketPopupProps {
  onClose?: any;
  selectedScreens?: any;
  mediaFiles?: any;
  setMediaFiles?: any;
  brandName?: string;
  campaignId?: any;
  screenData?: any;
}
export function UploadCreativesFromBucketPopup({
  onClose,
  selectedScreens,
  mediaFiles,
  setMediaFiles,
  brandName,
  campaignId,
  screenData,
}: UploadCreativesFromBucketPopupProps) {
  const dispatch = useDispatch<any>();
  const [campaignOption, setCampaignOption] = useState("Image/Video");
  const [url, setUrl] = useState<any>("");
  const [campaignDuration, setCampaignDuration] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreativeOpen, setIsCreativeOpen] = useState<boolean>(false);

  const [creativesMedia, setCreativesMedia] = useState<any>([]);

  const uniqueResolution = selectedScreens.reduce(
    (unique: any, screen: any) => {
      if (!unique.includes(screen.resolution)) {
        unique.push(screen.resolution);
      }
      return unique;
    },
    []
  );

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const creativesMediaGet = useSelector(
    (state: any) => state.creativesMediaGet
  );
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
      setCreativesMedia(creatives[brandName]);
    }
  }, [brandName, creatives]);

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

  const createCampaignFromMedia = () => {
    setIsLoading(true);

    const selectedScreenIds = selectedScreens?.map((s: any) => s.id);
    let dataToUpload: any = [];
    mediaFiles?.map((item: any) => {
      const mediaData = {
        resolution: `${item.resolution.width}x${item.resolution.height}`,
        type: item.extension,
        url: item.awsURL,
        size: item.fileSize,
        _id: { $oid: item._id },
      };
      dataToUpload.push(mediaData);
    });
    const creativeDataToUpload = [];
    const screenDataToUpload = screenData
      ?.map((item: any) => {
        // Filter screens that match the screenIds array
        const filteredScreens = item?.screens?.filter((screen: any) =>
          selectedScreenIds.includes(screen.id)
        );
        if (filteredScreens.length > 0) {
          // Return the updated object with filtered screens and updated count
          return {
            ...item,
            count: filteredScreens.length,
            screens: filteredScreens,
          };
        }

        // Return null if no screens match
        return [null];
      })
      .filter((item: any) => item !== null); // Remove null items

    for (const scr of screenDataToUpload) {
      const standardDayTimeCreatives: any = [
        ...(scr.standardDayTimeCreatives || []),
      ]; // Clone the array

      selectedScreenIds?.forEach((s: any) => {
        if (scr.screens?.some((sd: any) => sd.id === s)) {
          dataToUpload.forEach((data: any) => {
            if (
              !standardDayTimeCreatives.some((f: any) => f.url === data.url)
            ) {
              standardDayTimeCreatives.push({
                size: data.size,
                type: data.type,
                url: data.url,
              });
            }
          });
        }
      });

      creativeDataToUpload.push({
        screenResolution: scr.screenResolution,
        count: selectedScreenIds.length,
        creativeDuration: parseInt(scr.creativeDuration, 10),
        screenIds: selectedScreenIds,
        standardDayTimeCreatives: standardDayTimeCreatives,
        standardNightTimeCreatives: [],
        triggerCreatives: [],
      });
    }

    const campData = getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId];
    for (const cd of creativeDataToUpload) {
      if (cd.standardDayTimeCreatives.length > 0) {
        campData.creatives.push(cd);
      }
    }
    saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, {
      [campaignId]: campData,
    });
    setIsLoading(false);
    setIsCreativeOpen(false);
    setMediaFiles([]);
    message.success("Creative added successfully");

    setTimeout(() => {
      handelDiscard();
    }, 0);
    return;
  };

  const createCampaignFromURL = () => {
    setIsLoading(true);
    const campData = getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId];
    // dispatch(
    //   createCampaignCreationByScreenOwnerAction({
    //     id: campaignId,
    //     mediaData: [
    //       {
    //         awsURL: url,
    //         fileType: "url",
    //         videoDuration: Number(campaignDuration),
    //         fileSize: 0,
    //       },
    //     ],
    //   })
    // );
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
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={() => onClose()}
        >
          <i className="fi fi-br-circle-xmark"></i>
        </div>
        <div>
          <div className="flex flex-col justify-center">
            <h1 className="text-[12px]">Choose Creatives</h1>
            <div className="flex justify-between">
              <h1 className="text-[12px]">Screen: {selectedScreens?.length}</h1>
              <h1
                className={`${
                  uniqueResolution?.length > 1 ? "text-red-500" : ""
                } text-[12px]`}
              >
                Resolution:{" "}
                {uniqueResolution?.length > 1
                  ? `${uniqueResolution?.length} resolutions`
                  : uniqueResolution}
              </h1>
            </div>
            {uniqueResolution?.length > 1 && (
              <h1 className="text-[10px] text-red-500">
                Screens with different resolutions selected, please check and
                proceed again
              </h1>
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
              <h1 className="text-[14px] font-semibold">
                Select from creatives
              </h1>
              {loadingCreatives ? (
                <Loading />
              ) : (
                <div>
                  {creativesMedia &&
                    creativesMedia?.map((f: any, k: any) => (
                      <div className="p-2" key={k} onClick={() => {}}>
                        {Object.keys(f)
                          .filter((c: any) => c !== "network")
                          ?.map((m: any, i: any) => (
                            <div key={i}>
                              <h1 className="text-[12px] font-semibold border-b">
                                {`${f}s`.toUpperCase()}
                              </h1>

                              {Object.keys(f[m])
                                .filter((c: any) => c !== "network")
                                ?.map((g: any, j: any) => (
                                  <div key={j} className="py-2">
                                    <h1 className="text-[10px] py-1">
                                      Resolution: {g}
                                    </h1>
                                    <div className="grid grid-cols-3 gap-2">
                                      {f?.[m]?.[g]?.map((l: any, y: any) => (
                                        <div
                                          key={y}
                                          className="w-full border rounded"
                                          onClick={() => {
                                            setMediaFiles((prev: any) => {
                                              if (
                                                mediaFiles
                                                  ?.map((file: any) => file._id)
                                                  .includes(l._id)
                                              ) {
                                                return mediaFiles?.filter(
                                                  (file: any) =>
                                                    file._id !== l._id
                                                );
                                              } else {
                                                return [...prev, l];
                                              }
                                            });
                                          }}
                                        >
                                          <div className="w-full">
                                            <ShowMediaFile
                                              url={l?.awsURL}
                                              mediaType={l?.creativeType}
                                              key={y}
                                              height="h-full"
                                              width="w-full"
                                            />
                                          </div>
                                          <div className="p-1">
                                            <h1 className="text-[12px] truncate">
                                              {l?.creativeName?.toUpperCase()}
                                            </h1>
                                            <div className="flex gap-1 items-center truncate">
                                              <h1 className="text-[12px]">
                                                {l?.extension?.split("/")[1]},
                                              </h1>
                                              <h1 className="text-[12px] truncate">
                                                {l?.duration} seconds
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
                {mediaFiles?.map((media: any, index: any) => (
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
            loading={isLoading}
            loadingText="uploading..."
          />
          <PrimaryButton
            title="Cancel"
            rounded="rounded-[12px]"
            reverse={true}
            action={handelDiscard}
            loading={false}
            loadingText="uploading..."
          />
        </div>
      </div>
      <div className="pt-20">
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}
