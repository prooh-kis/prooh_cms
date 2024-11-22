import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { useLocation, useNavigate } from "react-router-dom";
import { CalendarInput } from "../atoms/CalendarInput";
import {
  getEndDateFromStartDateANdDuration,
  getNumberOfDaysBetweenTwoDates,
} from "../../utils/dateAndTimeUtils";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER, FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { createCampaignCreationByScreenOwnerAction, getAllScreensForScreenOwnerCampaignCreationAction } from "../../actions/campaignAction";
import { DropdownInput } from "../atoms/DropdownInput";
import { CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET } from "../../constants/campaignConstants";

interface EnterCampaignBasicDetailsProps {
  userInfo?: any;
  campaignType?: string;
  campaignId?: any;
  loadingCampaignsCreations?: any;
  successCampaignsCreations?: any;
  errorCampaignsCreations?: any;
  campaignsCreated?: any;
  setStep?: any;
  step?: any;
}

const allIndexs = Array.from({ length: 18 }, (_, i) => ({ label: (i + 1).toString(), value: i+1, status: false }));

export const EnterCampaignBasicDetails = ({
  userInfo,
  campaignType,
  campaignId,
  loadingCampaignsCreations,
  successCampaignsCreations,
  errorCampaignsCreations,
  campaignsCreated,
  setStep,
  step,
}: EnterCampaignBasicDetailsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();


  const [campaignName, setCampaignName] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.name || ""
  );
  const [brandName, setBrandName] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.brandName || ""
  );
  const [clientName, setClientName] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.clientName || ""
  );
  const [industry, setIndustry] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.industry || ""
  );
  const [screenIds, setScreenIds] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.screenIds || []
  );
  const [atIndex, setAtIndex] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.atIndex || []
  );

  const [startDate, setStartDate] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
      ? new Date(
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.startDate
        )
          ?.toISOString()
          ?.slice(0, 16)
      : ""
  );
   const [endDate, setEndDate] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
      ? new Date(
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.endDate
        )
          ?.toISOString()
          ?.slice(0, 16)
      : ""
  );

  const [duration, setDuration] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration || "30"
  );

  const [enterDuration, setEnterDuration] = useState<any>(false);

 

  const getAllScreensForScreenOwnerCampaignCreation = useSelector(
    (state: any) => state.getAllScreensForScreenOwnerCampaignCreation
  );
  const {
    loading: loadingAllScreens,
    error: errorAllScreens,
    success: successAllScreens,
    data: allScreens,
  } = getAllScreensForScreenOwnerCampaignCreation;

  const validateForm = () => {
    if (campaignName.length === 0) {
      message.error("Please enter campaign name");
      return false;
    } else if (brandName.length === 0) {
      message.error("Please enter brand name");
      return false;
    } else if (startDate === "") {
      message.error("Please enter start data ");
      return false;
    } else if (endDate === "") {
      message.error("Please enter endData ");
      return false;
    } else if (screenIds.length === 0) {
      message.error("Please select atleast one screens");
      return false;
    } else {
      return true;
    }
  };

  // Function to handle duration change and update the end date
  const updateEndDateBasedOnDuration = useCallback(
    (newDuration: number) => {
      if (startDate) {
        setEndDate(new Date(getEndDateFromStartDateANdDuration(
          startDate,
          newDuration
        )).toISOString().slice(0, 16));
      } else {
        message.error("Please enter a start date first");
      }
    },
    [startDate]
  );

  const handleSetNewDuration = useCallback(() => {
      setDuration(getNumberOfDaysBetweenTwoDates(startDate, endDate));
      updateEndDateBasedOnDuration(duration);
    // else message.error("Please enter first start , end Date");
  }, [duration, endDate, startDate, updateEndDateBasedOnDuration]);

  const saveCampaignDetails = useCallback(() => {
    handleSetNewDuration();
    if (campaignId !== "create-campaign") {
      dispatch(
        createCampaignCreationByScreenOwnerAction({
          id: campaignId,
          pageName: "Add Basic Details",
          name: campaignName,
          brandName: brandName.toUpperCase(),
          campaignType: campaignType,
          clientName: clientName,
          industry: industry,
          startDate: startDate,
          endDate: endDate,
          duration: getNumberOfDaysBetweenTwoDates(startDate, endDate),
          campaignPlannerId: userInfo?._id,
          campaignPlannerName: userInfo?.name,
          campaignPlannerEmail: userInfo?.email,
          campaignManagerId: userInfo?.primaryUserId,
          campaignManagerEmail: userInfo?.primaryUserEmail,
          atIndex: atIndex,
          screenIds: screenIds,
          creatives: [],
        })
      );
    } else {
      dispatch(
        createCampaignCreationByScreenOwnerAction({
          pageName: "Add Basic Details",
          name: campaignName,
          brandName: brandName.toUpperCase(),
          campaignType: campaignType,
          clientName: clientName,
          industry: industry,
          startDate: startDate,
          endDate: endDate,
          duration: getNumberOfDaysBetweenTwoDates(startDate, endDate),
          campaignPlannerId: userInfo?._id,
          campaignPlannerName: userInfo?.name,
          campaignPlannerEmail: userInfo?.email,
          campaignManagerId: userInfo?.primaryUserId,
          campaignManagerEmail: userInfo?.primaryUserEmail,
          atIndex: atIndex,
          screenIds: screenIds,
          creatives: [],
        })
      );
    }
   
  }, [
    handleSetNewDuration,
    dispatch,
    campaignId,
    campaignName,
    brandName,
    campaignType,
    screenIds,
    atIndex,
    clientName,
    industry,
    startDate,
    endDate,
    userInfo?._id,
    userInfo?.name,
    userInfo?.email,
    userInfo?.primaryUserId,
    userInfo?.primaryUserEmail,
  ]);


  useEffect(() => {
    if (errorCampaignsCreations) {
      message.error(errorCampaignsCreations);
    }
    if (successCampaignsCreations) {
      navigate(`/create-campaign/${campaignsCreated.campaignCreationRes._id}`);
      dispatch({
        type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET,
      })
      if (step === 1) {
        setStep(2);
      }
      message.success("Campaign initiated successfully");
    }

    if (!allScreens && !getDataFromLocalStorage(ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER)) {
      dispatch(getAllScreensForScreenOwnerCampaignCreationAction());
    }
  }, [
    navigate,
    successCampaignsCreations,
    errorCampaignsCreations,
    campaignsCreated,
    dispatch,
    campaignId,
    allScreens,
    setStep,
    step
  ]);

  const handleScreenSelection = (screen: any) => {
    setScreenIds((pre: any) => {
      if (pre.find((s: any) => s === screen)) {
        return pre;
      } else {
        return [...pre, screen];
      }
    })
  }

  const handleRemoveScreenIds = (screen: any) => {
    setScreenIds((pre: any) => {
      if (pre.find((s: any) => s === screen)) {

        return pre.filter((s: any) => s !== screen);
      } else {
        return pre;
      }
    })
  }

  const handleSettingAtIndex = (index: any) => {
    setAtIndex((pre: any) => {
      if (pre.find((a: any) => a === index)) {
        return pre.filter((s: any) => s !== index);
      } else {
        return [...pre, index];
      }
    })
  }
  
  return (
    <div className="w-full py-3">
      <div className="">
        <h1 className="text-[24px] text-primaryText font-semibold">
          Add Basic Details
        </h1>
        <p className="text-[14px] text-secondaryText">
          Enter your basic details for the campaigns to proceed further
        </p>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-8 pt-2">
            <div className="col-span-1 py-1">
              <label className="block text-secondaryText text-[14px] mb-2">
                Campaign Name
              </label>
              <PrimaryInput
                inputType="text"
                placeholder="Campaign Name"
                value={campaignName}
                action={setCampaignName}
              />
            </div>
            <div className="col-span-1 py-1">
              <label className="block text-secondaryText text-[14px] mb-2">
                Brand Name
              </label>
              <PrimaryInput
                inputType="text"
                placeholder="Brand Name"
                value={brandName}
                action={setBrandName}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-2">
            <div className="col-span-1 py-1">
              <label className="block text-secondaryText text-[14px] mb-2">
                Client Name
              </label>
              <PrimaryInput
                inputType="text"
                placeholder="Client Name"
                value={clientName}
                action={setClientName}
              />
            </div>
            <div className="col-span-1 py-1">
              <label className="block text-secondaryText text-[14px] mb-2">
                Industry
              </label>
              <PrimaryInput
                inputType="text"
                placeholder="Industry"
                value={industry}
                action={setIndustry}
              />
            </div>
          </div>
          {/* priority and screens */}
          <div className="grid grid-cols-2 gap-8 pt-2">
            <div className="col-span-1 py-1">
              <label className="block text-secondaryText text-[14px] mb-2">
                Screens
              </label>
              {loadingAllScreens ? (
                <h1>Loading Screens</h1>
              ) : (
                <DropdownInput
                  inputType="text"
                  placeHolder="Select Screens"
                  height="h-12"
                  options={getDataFromLocalStorage(ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER)?.sort((a: any, b: any) => {
                    const nameA = a.screenName.toLowerCase();
                    const nameB = b.screenName.toLowerCase();
                    
                    if (nameA < nameB) return -1; // nameA comes first
                    if (nameA > nameB) return 1;  // nameB comes first
                    return 0; // names are equal
                  })}
                  selectedOption={""}
                  setSelectedOption={(e: any) => handleScreenSelection(e)}
                />
              )}
            </div>
            <div className="col-span-1 py-1">
              <label className="block text-secondaryText text-[14px] mb-2">
                Priority
              </label>
              <DropdownInput
                inputType="text"
                placeHolder="Select Priority"
                height="h-12"
                options={allIndexs}
                selectedOption={""}
                setSelectedOption={(e: any) => handleSettingAtIndex(Number(e))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-2">
            <div className="col-span-1 py-1">
              <label className="block text-secondaryText text-[14px] mb-2">
                Start Date
              </label>
              <CalendarInput
                placeholder="Start Date"
                value={startDate}
                action={setStartDate}
                disabled={false}
                minDate={new Date()}
              />
            </div>
            <div className="col-span-1 py-1">
              <div className="flex justify-between">
                <label className="block text-secondaryText text-[14px] mb-2">
                  {!enterDuration ? "End Date" : "Duration"}
                </label>
                {/* <input
                  className="mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                  type="checkbox"
                  role="switch"
                  title="Enter duration"
                  id="flexSwitchCheckDefault"
                  onChange={() => {
                    handleSetNewDuration();
                    setEnterDuration(!enterDuration);
                  }}
                /> */}
              </div>
              {/* {!enterDuration ? ( */}
                <CalendarInput
                  placeholder={!enterDuration ? "End Date" : "0"}
                  value={endDate}
                  action={(e: any) => {
                    setEndDate(e);
                  }}
                  minDate={startDate || new Date()}
                  disabled={false}
                />
              {/* ) : (
                <PrimaryInput
                  inputType="string"
                  placeholder="duration"
                  value={duration}
                  action={(e: any) => {
                    setDuration(e);
                    handleSetNewDuration();
                  }}
                />
              )} */}
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="border rounded-[12px] p-1 my-2">
              <h1 className="p-1">Priority</h1>
              <div className="grid grid-cols-6 gap-2 justify-center px-1"> 
                {allIndexs?.map((index: any, i: any) => (
                  <div key={i}
                    className={`
                      ${atIndex.includes(index.value) ? "bg-[#129BFF] text-white" : ""}
                      border rounded-[8px] w-[40px] flex justify-center py-1
                    `}
                    onClick={() => handleSettingAtIndex(index.value)}
                  >
                    <h1 className="text-[12px]">
                      {index.value}
                    </h1>
                  </div>
                ))}
              </div>
          </div>
          <div className="border rounded-[12px]">
              <h1 className="p-1">Screens</h1>
              <div className="grid grid-cols-2 gap-2 justify-center px-1 py-1"> 
                {getDataFromLocalStorage(ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER)?.filter((s: any) => screenIds.includes(s._id))?.map((screen: any, i: any) => (
                  <div key={i} className="border rounded-[8px] flex justify-center gap-2 px-2 py-1">
                    <h1 className="text-[12px] truncate">
                      {screen.screenName}
                    </h1>
                    <i
                      className={`fi fi-br-cross flex items-center text-red-500 text-[10px]`}
                      onClick={() => handleRemoveScreenIds(screen._id)}
                    ></i>
                  </div>
                ))}
              </div>
          </div>

        </div>
        
      </div>
     
      <div className="flex py-4">
        {!loadingCampaignsCreations && (
          <PrimaryButton
            rounded="rounded-[6px]"
            title="Continue"
            action={() => {
              if (validateForm()) {
                saveCampaignDetails();
                message.success("Campaign initiated successfully");
              }
            }}
          />
        )}
      </div>
    </div>
  );
};
