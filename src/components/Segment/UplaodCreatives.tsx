import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER, FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { createCampaignCreationByScreenOwnerAction, getAllScreensForScreenOwnerCampaignCreationAction, getScreenDataUploadCreativeAction } from "../../actions/campaignAction";
import { DropdownInput } from "../atoms/DropdownInput";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { UploadCreativesTable } from "../../components/tables/UploadCreativesTable";
import { USER_ROLE_PRIMARY } from "../../constants/userConstants";
import { UploadCreativesFromBucketPopup } from "../../components/popup/UploadCreativesFromBucketPopup";
import { Loading } from "../../components/Loading";
import { getCreativesMediaAction } from "../../actions/creativeAction";

interface UploadCreativesProps {
  userInfo?: any;
  step?: any;
  setStep?: any;
  campaignId?: any;
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
  campaignId

}: UploadCreativesProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {pathname, state} = useLocation();
  
  const [isBucketPopupOpen, setIsBucketPopupOpen] = useState<boolean>(false);

  const [selectedScreens, setSelectedScreens] = useState<any>([]);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [requestBody, setRequestBody] = useState<any>([]);

  const [brandName, setBrandName] = useState<any>(getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.brandName);


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
    const dataToUpload: any = [];
    for (const data of screenDataUploadCreative?.cmsData) {
      var objectData: any = {};
      var screenIds: any = [];
      var count = 0;
      if (!objectData.resolution) {
        objectData[data.resolution] = {};
      }
      if (!screenIds?.includes(data.id)) {
        screenIds.push(data.id);
      }
      objectData[data.resolution] = {
        screenResolution: data.resolution,
        screenIds: screenIds,
        count: count + 1,
        creativeDuration: data.slotDuration,
        standardDayTimeCreatives: mediaFiles?.map((f: any) => {
          return {
            url: f.videoURL,
            size: f.fileSize,
            type: f.extension
          }
        }),
        standardNightTimeCreatives: [],
        triggerCreatives: [],
      }
      dataToUpload.push(objectData[data.resolution]);
    }
    
    setRequestBody(dataToUpload);
    setIsBucketPopupOpen(false);
  };


  const handleSetOpenBucketModel = () => {
    if (userInfo?.userRole === USER_ROLE_PRIMARY) {
      setIsBucketPopupOpen(true); 
    } else {
      message.error("You have no access");
    }
  }

  const saveCampaignDetails = useCallback(() => {
    if (requestBody.length > 0) {
      dispatch(
        createCampaignCreationByScreenOwnerAction({
          pageName: "Uplaod Creatives Page",
          id: campaignId,
          creatives: requestBody,
        })
      );
    } else {
      message.error("No creative uploaded");
    }

  }, [campaignId, dispatch, requestBody]);

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
    if (campaignId !== "create-campaign") {
      dispatch(getScreenDataUploadCreativeAction({id: campaignId}));
      dispatch(getCreativesMediaAction({ userId: userInfo?._id }));

    }
  }, [
    dispatch,
    campaignId,
    userInfo
  ]);

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
          <div className="flex items-center gap-4">
            <h1 className="text text-[12px]">Uploaded</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <i className={`fi fi-br-check flex items-center text-green-500 text-[12px]`}></i>
                <h1 className="text text-[12px]">60</h1>
              </div>
              <div className="flex items-center gap-1">
                <i className={`fi fi-br-cross flex items-center text-red-500 text-[10px]`}/>
                <h1 className="text text-[12px]">40</h1>
              </div>
            </div>
          </div>
          <div className="p-1">
            <PrimaryButton 
              title="Live Now"
              rounded="rounded-full"
              reverse={true}
              disabled={false}
              height="h-8"
              width="w-30"
              textSize="text-[12px]"
              action={() => {
                if (validateForm()) {
                  saveCampaignDetails();
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
            </div>
          </div>
          <div className="py-2">
            {loading ? (
              <Loading />
            ) : (
              <UploadCreativesTable
                screenData={screenDataUploadCreative?.cmsData}
                handleScreenSelection={handleScreenSelection}
                selectedScreens={selectedScreens}
                requestBody={requestBody}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
