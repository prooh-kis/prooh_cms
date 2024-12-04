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
import { Loading } from "../Loading";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import {
  CAMPAIGN_CREATIVES_TO_UPLOAD,
  FULL_CAMPAIGN_PLAN,
  UPLOAD_CREATIVE_SCREEN_DATA,
} from "../../constants/localStorageConstants";
import { CalendarInput } from "../../components/atoms/CalendarInput";
import { editCampaignCreativesEndDateAction } from "../../actions/screenAction";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";

interface EditCreativeEndDatePopupProps {
  onClose?: any;
  selectedScreens?: any;
  mediaFiles?: any;
  setMediaFiles?: any;
  campaign?: any;
  screenData?: any;
}
export function EditCreativeEndDatePopup({
  onClose,
  selectedScreens,
  mediaFiles,
  setMediaFiles,
  campaign,
  screenData,
}: EditCreativeEndDatePopupProps) {
  const dispatch = useDispatch<any>();
  const [campaignOption, setCampaignOption] = useState("Image/Video");
  const [url, setUrl] = useState<any>("");
  // const [campaignDuration, setCampaignDuration] = useState<any>("");
  // console.log("end Date : ", endDate);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreativeOpen, setIsCreativeOpen] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<any>(campaign?.endDate?.split(".")[0]);
  const [duration, setDuration] = useState<any>(campaign?.campaignDuration);

  const [creativesMedia, setCreativesMedia] = useState<any>([]);

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
    if (creatives && campaign.brandName) {
      setCreativesMedia(creatives[campaign.brandName]);
    }
  }, [campaign, creatives]);

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

    const selectedScreenIds = selectedScreens?.map((s: any) => s._id);
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

    let creativeDataToUpload: any = {};

    const scrData = screenData?.filter((scr: any) =>
      scr.screens?.map((s: any) => s.id).includes(selectedScreenIds[0])
    )[0]; // for (const scr of screenData) {
    const standardDayTimeCreatives: any = [
      ...(scrData.standardDayTimeCreatives || []),
    ]; // Clone the array

    dataToUpload.forEach((data: any) => {
      if (!standardDayTimeCreatives.some((f: any) => f.url === data.url)) {
        standardDayTimeCreatives.push({
          size: data.size,
          type: data.type,
          url: data.url,
        });
      }
    });

    creativeDataToUpload = {
      creativeDuration: parseInt(scrData.creativeDuration, 10),
      standardDayTimeCreatives: standardDayTimeCreatives,
      standardNightTimeCreatives: [],
      triggerCreatives: [],
    };

    dispatch(
      editCampaignCreativesEndDateAction({
        campaignId: campaign._id,
        endDate: endDate
          ? new Date(endDate).toISOString()
          : new Date(campaign.endDate).toISOString().split(".")[0],
        // creatives: creativeDataToUpload,
        duration: duration,
        creatives:
          creativeDataToUpload?.standardDayTimeCreatives?.length > 0
            ? creativeDataToUpload
            : null,
      })
    );
    setIsLoading(false);
    setIsCreativeOpen(false);

    message.success("Campaign creative/end date change initialized");

    handelDiscard();
  };

  const createCampaignFromURL = () => {
    setIsLoading(true);
    const campData =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[
        campaign.campaignCreationId
      ];
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

  const validateForm = () => {
    if (campaignOption === "URL" && !isValidUrl(url)) {
      message.error("Please enter valid url");
      setUrl("");
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
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={() => onClose(false)}
        >
          <i className="fi fi-br-circle-xmark"></i>
        </div>
        <div>
          <div className="flex flex-col justify-center">
            <h1 className="text-[12px]">Choose Creatives</h1>
            <div className="flex justify-between">
              <h1 className="text-[12px]">Screen: {selectedScreens?.length}</h1>
              <h1 className={`text-[12px]`}>Resolution:</h1>
            </div>

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
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1 flex flex-col py-2">
                  <h1 className="block text-secondaryText text-[12px]">
                    Change End Date
                  </h1>
                  <CalendarInput
                    placeholder={endDate}
                    value={endDate ? endDate : campaign.endDate}
                    action={(e: any) => {
                      setEndDate(e);
                    }}
                    minDate={new Date()}
                    disabled={false}
                  />
                </div>
                <div className="col-span-1 flex flex-col py-2">
                  <label className="block text-secondaryText text-[12px]">
                    Duration
                  </label>
                  <PrimaryInput
                    inputType="number"
                    placeholder="10"
                    value={duration}
                    action={setDuration}
                  />
                </div>
              </div>

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
                                {`${m}s`.toUpperCase()}
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
        </div>
        <div className="flex justify-between pt-2 gap-2">
          <PrimaryButton
            title="Upload"
            rounded="rounded-[12px]"
            action={handleNext}
            disabled={isLoading}
            loading={isLoading}
            loadingText="Updating..."
          />
          <PrimaryButton
            title="Cancel"
            rounded="rounded-[12px]"
            reverse={true}
            action={handelDiscard}
            loading={isLoading}
            loadingText="Updating..."
          />
        </div>
      </div>
      <div className="pt-20">
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}
