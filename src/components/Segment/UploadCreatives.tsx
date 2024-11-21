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
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { createCampaignCreationByScreenOwnerAction, getScreenDataUploadCreativeAction } from "../../actions/campaignAction";
import { CheckboxInput } from "../atoms/CheckboxInput";
import { UploadCreativesTable } from "../tables/UploadCreativesTable";
import { USER_ROLE_PRIMARY } from "../../constants/userConstants";
import { UploadCreativesFromBucketPopup } from "../popup/UploadCreativesFromBucketPopup";
import { Loading } from "../Loading";
// import { getCreativesMediaAction } from "../../actions/creativeAction";
import { ShowMediaPopup } from "../popup/ShowMediaPopup";
import { CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET } from "../../constants/campaignConstants";
import axios from "axios";
import { getCreativesMediaAction } from "../../actions/creativeAction";

interface UploadCreativesProps {
  userInfo?: any;
  step?: any;
  setStep?: any;
  campaignId?: any;
  successCampaignsCreations?: any;
  campaignsCreated?: any
  loadingCampaignsCreations?: any;

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
  loadingCampaignsCreations
}: UploadCreativesProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {pathname, state} = useLocation();
  
  const [isBucketPopupOpen, setIsBucketPopupOpen] = useState<boolean>(false);
  const [openShowMedia, setOpenShowMedia] = useState<any>(null);

  const [selectedScreens, setSelectedScreens] = useState<any>([]);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);

  const [brandName, setBrandName] = useState<any>(getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.brandName);

  const [screenCreativeUpload, setScreenCreativeUpload] = useState<any>(null);

  const screenDataUploadCreativeGet = useSelector((state: any) => state.screenDataUploadCreativeGet);
  const {
    loading, error, data: screenDataUploadCreative
  } = screenDataUploadCreativeGet;

  const validateForm = () => {
    if ("") {
      message.error("Please enter campaign name");
      return false;
    } else {
      return true;
    }
  };

  const screenOptions = state?.screens?.map((screen: any) => {
    return {
      value: screen?._id,
      label: screen?.screenName?.toUpperCase(),
    };
  });
  

  const closePopup = () => {
    setIsBucketPopupOpen(false);
    setOpenShowMedia(null);

  };


  const handleSetOpenBucketModel = () => {
    if (userInfo?.userRole === USER_ROLE_PRIMARY) {
      setIsBucketPopupOpen(true); 
    } else {
      message.error("You have no access");
    }
  }

  const saveCampaignCreativesDetails = async () => {

    const creativesFromStorage = getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.creatives;
    // if (getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.creatives.length > 0) {
    console.log("yes", screenDataUploadCreativeGet[0])

    if (creativesFromStorage && creativesFromStorage.length > 0) {

      const immutableCreatives = JSON.parse(JSON.stringify(creativesFromStorage));
      // const { data } = await axios.post(`${process.env.REACT_APP_PROOH_SERVER}/api/v2/campaigns/createCampaignByScreenOwner`, {
      //   pageName: "Upload Creatives",
      //   id: campaignId,
      //   creatives: immutableCreatives
      // });

      // if (data) {
      //   message.success("Campaign Created Successfully!");
      // }

      console.log(immutableCreatives);
      console.log("jdjsk")
    console.log("no", screenDataUploadCreativeGet[0]?.standardDayTimeCreatives[0])
      
      dispatch(
        createCampaignCreationByScreenOwnerAction({
          pageName: "Upload Creatives",
          id: campaignId,
          // creatives: []
          creatives: immutableCreatives,
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
   
  }
  
  useEffect(() => {
    if (successCampaignsCreations) {
      // navigate(`/create-campaign/${campaignsCreated.campaignCreationRes._id}`);
      dispatch({
        type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET,
      })
      message.success("Campaign saved successfully");
    }
    
  }, [dispatch, successCampaignsCreations, navigate]);

  useEffect(() => {
    dispatch(getScreenDataUploadCreativeAction({id: campaignId}));
    dispatch(getCreativesMediaAction({ userId: userInfo?._id }));
  },[dispatch, userInfo, campaignId]);

  useEffect(() => {
    if (screenDataUploadCreative) {
      setScreenCreativeUpload(screenDataUploadCreative)
    }
  },[screenDataUploadCreative])

  const getUploadedScreensNumber = () => {
    let screenIds: any = []
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId].creatives?.map((c: any) => {
      c.screenIds?.map((screenId: any) => {
        if (!screenIds.includes(screenId)) {
          return screenIds.push(screenId);
        }

      })
    });
    
    return screenIds.length;
  }

  return (
    <div className="w-full py-3">
      {isBucketPopupOpen && (
        <UploadCreativesFromBucketPopup
          onClose={closePopup}
          screenOptions={screenOptions}
          selectedScreens={selectedScreens}
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
          brandName={brandName}
          campaignId={campaignId}
          handleScreenSelection={handleScreenSelection}
          screenData={screenCreativeUpload}
        />
      )}


      <div className="flex justify-between border rounded-[12px] py-4 px-2">
        <div className="flex gap-2 items-center">
          <i
            className="fi fi-sr-angle-small-left text-[#7C8E9B] flex items-center"
            onClick={() => setStep(1)}
          ></i>
          <h1 className="text text-[14px] font-semibold">Upload Creatives</h1>
        </div>
        <div className="flex gap-4">
          {screenCreativeUpload && (
            <div className="flex items-center gap-4">
              <h1 className="text text-[12px]">Uploaded</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <i className={`fi fi-br-check flex items-center text-green-500 text-[12px]`}></i>
                  <h1 className="text text-[12px]">
                    {getUploadedScreensNumber()}
                  </h1>
                </div>
                <div className="flex items-center gap-1">
                  <i className={`fi fi-br-cross flex items-center text-red-500 text-[10px]`}/>
                  <h1 className="text text-[12px]">
                    {/* {Number(screenCreativeUpload?.flatMap((data: any) => data.screens).length || 0) - getUploadedScreensNumber()} */}
                  </h1>
                </div>
              </div>
            </div>
          )}

          <div className="p-1">
            <PrimaryButton 
              title="Live Now"
              rounded="rounded-full"
              reverse={true}
              // disabled={getUploadedScreensNumber() === screenCreativeUpload?.flatMap((data: any) => data.screens).length ? false : true}
              height="h-8"
              width="w-30"
              textSize="text-[12px]"
              action={() => {
                if (validateForm()) {
                  saveCampaignCreativesDetails();
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 py-4">
        <div className="col-span-2 border rounded-[12px] p-2">
          <div className="flex justify-between items-center border-b py-1">
            <h1 className="text text-[12px] font-semibold">Filter</h1>
            <p className="text text-[10px] text-[#7C8E9B]">Clear All</p>
          </div>
          <div className="py-2">
            <div className="flex items-center gap-1">
              <h1 className="text text-[12px]">Network</h1>
              <i className="fi fi-sr-angle-small-up text-[#7C8E9B] flex items-center"></i>
            </div>
            <div className="py-2">
              <CheckboxInput
                label={`M3M (23)`}
                textSize="12px"
              />
            </div>
          </div>
          <div className="py-2">
            <div className="flex items-center gap-1">
              <h1 className="text text-[12px]">Aspect Ratio</h1>
              <i className="fi fi-sr-angle-small-up text-[#7C8E9B] flex items-center"></i>
            </div>
            <div className="py-2">
              <CheckboxInput
                label={`16:9 (23)`}
                textSize="12px"
              />
            </div>
          </div>
          <div className="py-2">
            <div className="flex items-center gap-1">
              <h1 className="text text-[12px]">Resolution</h1>
              <i className="fi fi-sr-angle-small-up text-[#7C8E9B] flex items-center"></i>
            </div>
            <div className="py-2">
              <CheckboxInput
                label={`1280 x 768 (23)`}
                textSize="12px"
              />
            </div>
          </div>
        </div>
        <div className="col-span-10 border rounded-[12px] py-2 px-4">
          <div className="flex justify-between items-center border-b py-1">
            <div className="flex justify-start gap-2">
              <h1 className="text text-[12px] font-semibold">All Network</h1>
              <i className="fi fi-sr-angle-small-down text-[#7C8E9B] flex items-center"></i>
            </div>
            <div className="flex justify-end items-center gap-4 pb-1">
              <h1 className="text-[12px] font-semibold">{selectedScreens.length} selected</h1>
              <PrimaryButton
                title="Bucket"
                reverse={true}
                rounded="rounded-full"
                height="h-8"
                width="w-32"
                textSize="text-[12px]"
                disabled={selectedScreens?.length > 0 ? false : true}
                action={handleSetOpenBucketModel}
              />
              <i className="fi fi-br-disk flex items-center text-blue-500" onClick={() => {
                  if (validateForm()) {
                    saveCampaignCreativesDetails();
                  }
              }}></i>
            </div>
          </div>
          <div className="py-2">
            {loading ? (
              <Loading />
            ) : (
              <div className={"grid grid-cols-4"}>
                <div className={openShowMedia ? "col-span-3" : "col-span-4"}>
                  <UploadCreativesTable
                    onClose={closePopup}
                    openShowMedia={openShowMedia}
                    setOpenShowMedia={setOpenShowMedia}
                    screenData={screenCreativeUpload}
                    handleScreenSelection={handleScreenSelection}
                    selectedScreens={selectedScreens}
                    campaignId={campaignId}
                  />
                </div>
                {openShowMedia && (
                  <div className="col-span-1">
                    <ShowMediaPopup
                      onClose={closePopup}
                      openShowMedia={openShowMedia}
                      media={getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.creatives?.flatMap((c: any) => c.standardDayTimeCreatives)}
                    />
                  </div>
                )}
                
              </div>

            )}

          </div>
        </div>
      </div>
    </div>
  );
};
