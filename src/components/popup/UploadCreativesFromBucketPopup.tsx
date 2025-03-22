import { useEffect, useState } from "react";
import { ShowMediaFile } from "../molecules/ShowMediaFIle";
import { isNumber } from "@turf/turf";
import { isValidUrl } from "../../utils/valueValidate";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { message, Tooltip } from "antd";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { Loading } from "../../components/Loading";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import SingleCreativeInPopup from "../molecules/SingleCreativeInPopup";
import SearchInputField from "../../components/molecules/SearchInputField";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";

interface UploadCreativesFromBucketPopupProps {
  onClose?: any;
  selectedScreens?: any;
  mediaFiles?: any;
  setMediaFiles?: any;
  brandName?: string;
  campaignId?: any;
  screenData?: any;
  saveCampaignCreativesDetails?: any;
}
export function UploadCreativesFromBucketPopup({
  onClose,
  selectedScreens,
  mediaFiles,
  setMediaFiles,
  brandName,
  campaignId,
  screenData,
  saveCampaignCreativesDetails,
}: UploadCreativesFromBucketPopupProps) {
  const dispatch = useDispatch<any>();
  const [campaignOption, setCampaignOption] = useState("Image/Video");
  const [url, setUrl] = useState<any>("");
  const [campaignDuration, setCampaignDuration] = useState<any>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreativeOpen, setIsCreativeOpen] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [creativesMedia, setCreativesMedia] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
        duration: item?.duration ? item?.duration : campaignDuration,
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
        if (filteredScreens?.length > 0) {
          // Return the updated object with filtered screens and updated count
          return {
            ...item,
            count: filteredScreens?.length,
            screens: filteredScreens,
          };
        }

        // Return null if no screens match
        return [null];
      })
      ?.filter((item: any) => item !== null); // Remove null items

    for (const scr of screenDataToUpload) {
      const standardDayTimeCreatives: any = [
        ...(scr.standardDayTimeCreatives || []),
      ]; // Clone the array
      let duration: number = 0;

      selectedScreenIds?.forEach((s: any) => {
        if (scr.screens?.some((sd: any) => sd.id === s)) {
          duration = Math.max(
            ...dataToUpload?.map((data: any) => parseInt(data.duration))
          );
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
        count: selectedScreenIds?.length,
        creativeDuration: duration,
        screenIds: selectedScreenIds,
        standardDayTimeCreatives: standardDayTimeCreatives,
        standardNightTimeCreatives: [],
        triggerCreatives: [],
      });
    }

    const campData = getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId];
    for (const creative of campData.creatives) {
      creative.screenIds = creative.screenIds.filter(
        (id: string) => !selectedScreenIds.includes(id)
      );
    }
    campData.creatives = campData.creatives.filter(
      (creative: any) => creative.screenIds.length > 0
    );
    for (const cd of creativeDataToUpload) {
      if (cd.standardDayTimeCreatives?.length > 0) {
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
        className="bg-white p-4  shadow-lg w-full max-w-full rounded-lg"
        style={{ height: "80vh", width: "70vw" }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-[20px] font-semibold text-[#092A41]">
            Choose Creatives
          </h1>
          <div className="flex gap-4 items-center">
            <PrimaryButton
              title="Save"
              rounded="rounded-[12px]"
              action={handleNext}
              disabled={isLoading}
              loading={isLoading}
              loadingText="uploading..."
              width="w-[150px]"
              height="h-[36px]"
            />
            <i
              className="fi fi-rr-cross-small text-[20px] hover:text-[#FF0000]"
              onClick={() => onClose()}
            ></i>
          </div>
        </div>

        <div className="flex pt-4">
          <div className="w-[80%] border border-1">
            <div className="flex flex-col justify-center">
              <div className="flex justify-between border border-1 p-2">
                <h1 className="text-[12px]">
                  Screen: {selectedScreens?.length}
                </h1>
                <div className="flex flex-row gap-4">
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
              {(campaignOption === "URL" || isImagePresent()) && (
                <div className="flex flex-col p-2">
                  <div className="py-2 flex items-center gap-1">
                    <i className="fi fi-br-stopwatch"></i>
                    <h1 className="">(in seconds)</h1>
                  </div>
                  <PrimaryInput
                    inputType="number"
                    placeholder="10"
                    value={campaignDuration}
                    action={setCampaignDuration}
                  />
                </div>
              )}
              <div className="py-4 px-2">
                <SearchInputField
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search Creative by creative name"
                />
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
            <div></div>
            {campaignOption === "URL" ? (
              <div className="flex flex-col p-2">
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
              <div className="">
                {loadingCreatives ? (
                  <Loading />
                ) : (
                  <div className="mt-2 px-2">
                    <div className="py-1">
                      <TabWithoutIcon
                        tabData={creativesMedia?.map(
                          (data: any, index: any) => {
                            return {
                              id: index,
                              label: data?.network,
                            };
                          }
                        )}
                        setCurrentTab={setCurrentTab}
                        currentTab={currentTab}
                      />
                    </div>
                    {creativesMedia && (
                      <div className="h-[42vh] overflow-auto">
                        {Object.keys(creativesMedia?.[currentTab] || {})
                          ?.filter((c: any) => c !== "network")
                          ?.map((m: any, i: any) => (
                            <div key={i}>
                              <h1 className="text-[12px] font-semibold border-b">
                                {`${m}s`.toUpperCase()}
                              </h1>

                              {Object.keys(creativesMedia?.[currentTab][m])
                                ?.filter((c: any) => c !== "network")
                                ?.map((g: any, j: any) => (
                                  <div key={j} className="py-2">
                                    <h1 className="text-[10px] py-1">
                                      Resolution: {g}
                                    </h1>
                                    <div className="grid grid-cols-3 gap-2">
                                      {creativesMedia?.[currentTab]?.[m]?.[g]
                                        ?.filter((l: any) =>
                                          l?.creativeName
                                            ?.toUpperCase()
                                            .includes(
                                              searchQuery?.toUpperCase()
                                            )
                                        )
                                        ?.map((l: any, y: any) => (
                                          <div
                                            key={y}
                                            className="w-full border rounded"
                                            onClick={() => {
                                              setMediaFiles((prev: any) => {
                                                if (
                                                  mediaFiles
                                                    ?.map(
                                                      (file: any) => file._id
                                                    )
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
                                              <Tooltip
                                                title={`${l?.creativeName?.toUpperCase()}`}
                                              >
                                                <h1 className="text-[10px] truncate">
                                                  {l?.creativeName?.toUpperCase()}
                                                </h1>
                                              </Tooltip>
                                              <div className="flex gap-1 items-center truncate">
                                                <h1 className="text-[12px]">
                                                  {l?.extension?.split("/")[1]},
                                                </h1>
                                                <h1 className="text-[12px] truncate">
                                                  {Number(l?.duration)?.toFixed(
                                                    2
                                                  )}{" "}
                                                  seconds
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
              </div>
            )}
          </div>

          <div className="w-[40%] border border-1 ">
            <div className="flex justify-between p-2 border border-1">
              <h1 className="test-[#092A41] text-[16px] font-semibold">
                Selected Creative: {mediaFiles?.length}
              </h1>
              <button
                className="text-[#000000] opacity-[50%] text-[14px] font-normal hover:text-[#129BFF] cursor-pointer"
                onClick={() => {
                  setMediaFiles([]);
                }}
              >
                Clear All
              </button>
            </div>
            {campaignOption !== "URL" && mediaFiles?.length > 0 && (
              <div className="flex flex-col gap-2 p-2 h-[65vh] relative overflow-scroll no-scrollbar">
                {mediaFiles?.map((media: any, index: any) => (
                  <SingleCreativeInPopup
                    media={media}
                    handleDelete={setMediaFiles}
                    key={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
