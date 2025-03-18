import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  CAMPAIGN_CREATION_STATUS,
  FULL_CAMPAIGN_PLAN,
} from "../../constants/localStorageConstants";
import {
  createCampaignCreationByScreenOwnerAction,
  getAllCampaignsDetailsAction,
  getScreenDataUploadCreativeAction,
} from "../../actions/campaignAction";
import { CheckboxInput } from "../atoms/CheckboxInput";
import { UploadCreativesTable } from "../tables/UploadCreativesTable";
import { CAMPAIGN_CREATION_EDIT_CREATIVE_CMS, CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_CMS, SCREEN_ADMIN, SCREEN_GET_UPLOAD_CREATIVE_DETAILS_CMS, SCREEN_MANAGER, SCREEN_OWNER } from "../../constants/userConstants";
import { UploadCreativesFromBucketPopup } from "../popup/UploadCreativesFromBucketPopup";
import { Loading } from "../Loading";
// import { getCreativesMediaAction } from "../../actions/creativeAction";
import { ShowMediaPopup } from "../popup/ShowMediaPopup";
import {
  CAMPAIGN_STATUS_ACTIVE,
  CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET,
  EDIT_CAMPAIGN_FOR_SCREEN_OWNER_RESET,
} from "../../constants/campaignConstants";
import axios from "axios";
import { getCreativesMediaAction } from "../../actions/creativeAction";
import SearchInputField from "../../components/molecules/SearchInputField";

interface UploadCreativesProps {
  userInfo?: any;
  step?: any;
  setStep?: any;
  campaignId?: any;
  successCampaignsCreations?: any;
  campaignsCreated?: any;
  loadingCampaignsCreations?: any;
  successCampaignsEdit?: any;
  loadingCampaignsEdit?: any;
}

interface SingleFile {
  file: File;
  url: string;
  fileType: string;
  fileSize: number;
  duration: number;
  awsURL: string;
}

interface Data1 {
  screenResolution: string;
  count: number;
  screenIds: string[];
  creativeDuration: number;
  standardDayTimeCreatives: SingleFile[];
  standardNightTimeCreatives: SingleFile[];
  triggerCreatives: SingleFile[];
}

interface Data {
  [key: string]: Data1[];
}

export const UploadCreatives = ({
  userInfo,
  step,
  setStep,
  campaignId,
  successCampaignsCreations,
  loadingCampaignsCreations,
  successCampaignsEdit,
  loadingCampaignsEdit,
}: UploadCreativesProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { pathname, state } = useLocation();

  const [isBucketPopupOpen, setIsBucketPopupOpen] = useState<boolean>(false);
  const [openShowMedia, setOpenShowMedia] = useState<any>(null);

  const [selectedScreens, setSelectedScreens] = useState<any>([]);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [clearCreatives, setClearCreatives] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [brandName, setBrandName] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.brandName
  );

  const [screenCreativeUpload, setScreenCreativeUpload] = useState<any>(null);
  const [toggleState, setToggleState] = useState<boolean>(false);

  const screenDataUploadCreativeGet = useSelector(
    (state: any) => state.screenDataUploadCreativeGet
  );

  const {
    loading,
    error,
    data: screenDataUploadCreative,
  } = screenDataUploadCreativeGet;

  const screenOptions = state?.screens?.map((screen: any) => {
    return {
      value: screen?._id,
      label: screen?.screenName?.toUpperCase(),
    };
  });

  const closePopup = () => {
    setIsBucketPopupOpen(false);
    setOpenShowMedia(null);
    setSelectedScreens([]);
  };

  const handleSetOpenBucketModel = () => {
    if (userInfo?.userRole === SCREEN_ADMIN || userInfo?.userRole === SCREEN_OWNER || userInfo?.userRole === SCREEN_MANAGER) {
      setIsBucketPopupOpen(true);
    } else {
      message.error("You have no access");
    }
  };

  const saveCampaignCreativesDetails = async () => {
    const creativesFromStorage =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.creatives;

    if (creativesFromStorage && creativesFromStorage.length > 0) {
      const immutableCreatives = JSON.parse(
        JSON.stringify(creativesFromStorage)
      );

      const campaignCreationStatus = getDataFromLocalStorage(
        CAMPAIGN_CREATION_STATUS
      );
      dispatch(
        createCampaignCreationByScreenOwnerAction({
          pageName: "Upload Creatives",
          id: campaignId,
          creatives: immutableCreatives,
          campaignCreationIds: [campaignId],
          event: CAMPAIGN_CREATION_EDIT_CREATIVE_CMS,
        })
      );
    } else {
      message.error("No creative uploaded");
    }
  };

  const handleScreenSelection = (data: any) => {
    if (data.status) {
      setSelectedScreens((pre: any) => {
        if (pre?.map((p: any) => p.id)?.includes(data.screen.id)) {
          return pre;
        } else {
          return [...pre, data.screen];
        }
      });
    } else {
      setSelectedScreens((pre: any) => {
        if (!pre?.map((p: any) => p.id)?.includes(data.screen.id)) {
          return pre;
        } else {
          return pre.filter((sc: any) => sc.id !== data.screen.id);
        }
      });
    }
  };

  useEffect(() => {
    if (successCampaignsCreations) {
      dispatch({
        type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET,
      });
      message.success("Campaign saved successfully . It would get live in about 4-5 mins");
      // navigate(`/campaigns-list`);
      dispatch(
        getAllCampaignsDetailsAction({
          userId: userInfo?.primaryUserId,
          status: CAMPAIGN_STATUS_ACTIVE,
          event : CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_CMS
        })
      );
    }
    if (successCampaignsEdit) {
      dispatch({
        type: EDIT_CAMPAIGN_FOR_SCREEN_OWNER_RESET,
      });
      message.success("Creatives Edited successfully");
    }

    // this might be unnecessary
    if (clearCreatives) {
      setClearCreatives(false);
      var data = getDataFromLocalStorage(FULL_CAMPAIGN_PLAN);
      data[campaignId].creatives = data[campaignId].creatives || [];
      saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, data);
    }
    //
  }, [dispatch, successCampaignsCreations, successCampaignsEdit, navigate]);

  useEffect(() => {
    dispatch(getScreenDataUploadCreativeAction({ id: campaignId , event : SCREEN_GET_UPLOAD_CREATIVE_DETAILS_CMS }));
    dispatch(getCreativesMediaAction({ userId: userInfo?._id }));
  }, [dispatch, userInfo, campaignId]);

  useEffect(() => {
    if (screenDataUploadCreative) {
      setScreenCreativeUpload(screenDataUploadCreative);
    }
  }, [screenDataUploadCreative]);

  const getUploadedScreensNumber = () => {
    let screenIds: any = [];
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.creatives?.map(
      (c: any) => {
        c.screenIds?.map((screenId: any) => {
          if (!screenIds.includes(screenId)) {
            return screenIds.push(screenId);
          }
        });
      }
    );

    return screenIds.length;
  };

  const removeAddedCreativeFromCampaign = (url: string) => {
    if (confirm("Do you really want to remove it?")) {
      let data = getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId];
      data.creatives = data?.creatives?.map((data1: any) => {
        if (data1?.screenIds?.includes(openShowMedia?.id)) {
          data1.standardDayTimeCreatives =
            data1?.standardDayTimeCreatives?.filter(
              (data2: any) => data2?.url != url
            );
          return data1;
        }
        return data1;
      });
      data.creatives = data?.creatives?.filter(
        (data1: any) => data1?.standardDayTimeCreatives?.length > 0
      );
      saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, { [campaignId]: data });
      setToggleState((pre: boolean) => !pre);
    }
  };

  return (
    <div className="w-full py-1 px-4">
      {isBucketPopupOpen && (
        <UploadCreativesFromBucketPopup
          onClose={closePopup}
          selectedScreens={selectedScreens}
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
          brandName={brandName}
          campaignId={campaignId}
          screenData={screenCreativeUpload}
          saveCampaignCreativesDetails={saveCampaignCreativesDetails}
        />
      )}

      {openShowMedia && (
        <div className="col-span-1">
          <ShowMediaPopup
            onClose={closePopup}
            screenName={openShowMedia?.screenName}
            openShowMedia={openShowMedia ? true : false}
            media={getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)
              ?.[campaignId]?.creatives?.filter((f: any) =>
                f.screenIds?.includes(openShowMedia?.id)
              )
              ?.flatMap((c: any) => c.standardDayTimeCreatives)}
            removeAddedCreativeFromCampaign={removeAddedCreativeFromCampaign}
          // media={getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.creatives?.flatMap((c: any) => c.standardDayTimeCreatives)}
          />
        </div>
      )}
      <div className="border rounded-[12px] py-4 px-2 bg-white">
        <div className="w-full flex justify-between ">
          <div className="flex gap-1 items-center">
            <i
              className="fi fi-sr-angle-small-left text-[#7C8E9B] flex items-center"
              onClick={() => navigate(`/edit-campaign/${campaignId}`)}
            ></i>
            <h1 className="text text-[14px] font-semibold">Upload Creatives</h1>
          </div>
          <div className="flex gap-1 items-center">
            <h1 className="text-[16px] font-semibold">
              {getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.name}
            </h1>
            <h1 className="text-[12px]">
              (
              {
                getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
                  ?.brandName
              }
              )
            </h1>
          </div>
          <div className="flex gap-4">
            {screenCreativeUpload && (
              <div className="flex items-center gap-4">
                <h1 className="text text-[12px]">Uploaded</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <i
                      className={`fi fi-br-check flex items-center text-[#348730] text-[12px]`}
                    ></i>
                    <h1 className="text text-[12px]">
                      {getUploadedScreensNumber()}
                    </h1>
                  </div>
                  <div className="flex items-center gap-1">
                    <i
                      className={`fi fi-br-cross flex items-center text-red-500 text-[10px]`}
                    />
                    <h1 className="text text-[12px]">
                      {Number(
                        screenCreativeUpload?.flatMap(
                          (data: any) => data.screens
                        ).length || 0
                      ) - getUploadedScreensNumber()}
                    </h1>
                  </div>
                </div>
              </div>
            )}

            <div className="p-1">
              {!loading && (
                <PrimaryButton
                  title="Live Now"
                  rounded="rounded-full"
                  reverse={true}
                  // disabled={getUploadedScreensNumber() === screenCreativeUpload?.flatMap((data: any) => data.screens).length ? false : true}
                  height="h-8"
                  width="w-30"
                  textSize="text-[12px]"
                  loading={loadingCampaignsCreations || loadingCampaignsEdit}
                  loadingText={"Saving Creatives"}
                  action={() => {
                    saveCampaignCreativesDetails();
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full p-1">
          <h1 className="text-[10px] text-red-500">
            Please deselect the checkbox, once you upload the creatives on any
            screen and see a green icon in the creatives column, before
            selecting other screens for uploading...
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-1 p-4 bg-white mt-1 rounded-lg">
        <div className="col-span-12 rounded-[12px]">
          <div className="flex justify-between items-center border-b py-1">
            <div className="py-2 px-4 w-96">
              <SearchInputField
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search screen by screen ratio"
              />
            </div>

            <div className="flex justify-end items-center gap-4 pb-1">
              <h1 className="text-[12px] font-semibold">
                {selectedScreens.length} selected
              </h1>
              <PrimaryButton
                title="Bucket"
                reverse={true}
                rounded="rounded-full"
                height="h-8"
                width="w-32"
                textSize="text-[12px]"
                disabled={selectedScreens?.length > 0 ? false : true}
                loading={selectedScreens?.length > 0 ? false : true}
                loadingText="+ Campaign"
                action={handleSetOpenBucketModel}
              />
              <i
                className="fi fi-br-disk flex items-center text-[#129BFF]"
                onClick={() => {
                  saveCampaignCreativesDetails();
                }}
              ></i>
            </div>
          </div>
          <div className="py-2">
            {loading ? (
              <Loading />
            ) : (
              <div className={"grid grid-cols-4"}>
                <div className={openShowMedia ? "col-span-3" : "col-span-4"}>
                  <UploadCreativesTable
                    loading={loadingCampaignsCreations}
                    onClose={closePopup}
                    openShowMedia={openShowMedia}
                    setOpenShowMedia={setOpenShowMedia}
                    screenData={screenCreativeUpload}
                    handleScreenSelection={handleScreenSelection}
                    selectedScreens={selectedScreens}
                    campaignId={campaignId}
                    searchQuery={searchQuery}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
