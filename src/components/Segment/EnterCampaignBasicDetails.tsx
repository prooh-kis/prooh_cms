import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { useNavigate } from "react-router-dom";
import { CalendarInput } from "../atoms/CalendarInput";
import {
  getEndDateFromStartDateANdDuration,
  getNumberOfDaysBetweenTwoDates,
} from "../../utils/dateAndTimeUtils";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ALL_BRAND_LIST,
  ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER,
  FULL_CAMPAIGN_PLAN,
} from "../../constants/localStorageConstants";
import {
  createCampaignCreationByScreenOwnerAction,
  getAllScreensForScreenOwnerCampaignCreationAction,
} from "../../actions/campaignAction";
import { CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET } from "../../constants/campaignConstants";
import {
  MultiSelectInput,
  SearchableSelect,
  SwitchInput,
} from "../../components";
import { getAllBrandAndNetworkAction } from "../../actions/creativeAction";

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

const allIndexs = Array.from({ length: 18 }, (_, i) => ({
  label: (i + 1).toString(),
  value: i + 1,
  status: false,
}));

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
  const [isEnabled, setIsEnable] = useState(false);

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
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.atIndex || [0]
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
    } else if (atIndex.length === 0) {
      message.error("Please set loop for the campaign");
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
        setEndDate(
          new Date(getEndDateFromStartDateANdDuration(startDate, newDuration))
            .toISOString()
            .slice(0, 16)
        );
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
      //TODO add triggers object here
      dispatch(
        createCampaignCreationByScreenOwnerAction({
          id: campaignId,
          pageName: "Add Basic Details",
          name: campaignName,
          brandName: brandName.toUpperCase(),
          campaignType: campaignType,
          clientName: clientName,
          industry: industry,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          duration: getNumberOfDaysBetweenTwoDates(startDate, endDate),
          campaignPlannerId: userInfo?._id,
          campaignPlannerName: userInfo?.name,
          campaignPlannerEmail: userInfo?.email,
          campaignManagerId: userInfo?.primaryUserId,
          campaignManagerEmail: userInfo?.primaryUserEmail,
          atIndex: atIndex,
          screenIds: screenIds,
          creatives: [],
          triggers: {
            timeTriggers: [],
            weatherTriggers: [],
            sportsTriggers: [],
            vacantSlots: [],
          },
        })
      );
    } else {
      //TODO add triggers object here
      dispatch(
        createCampaignCreationByScreenOwnerAction({
          pageName: "Add Basic Details",
          name: campaignName,
          brandName: brandName.toUpperCase(),
          campaignType: campaignType,
          clientName: clientName,
          industry: industry,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          duration: getNumberOfDaysBetweenTwoDates(startDate, endDate),
          campaignPlannerId: userInfo?._id,
          campaignPlannerName: userInfo?.name,
          campaignPlannerEmail: userInfo?.email,
          campaignManagerId: userInfo?.primaryUserId,
          campaignManagerEmail: userInfo?.primaryUserEmail,
          atIndex: atIndex,
          screenIds: screenIds,
          creatives: [],
          triggers: {
            timeTriggers: [],
            weatherTriggers: [],
            sportsTriggers: [],
            vacantSlots: [],
          },
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
      });
      if (step === 1) {
        setStep(2);
      }
      message.success("Campaign initiated successfully");
    }

    if (
      !allScreens &&
      !getDataFromLocalStorage(ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER)
    ) {
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
    step,
  ]);

  useEffect(() => {
    if (getDataFromLocalStorage(ALL_BRAND_LIST)) {
    } else {
      dispatch(getAllBrandAndNetworkAction());
    }
  }, []);

  const handleScreenSelection = (screens: any) => {
    setScreenIds(screens);
  };

  const handleRemoveScreenIds = (screen: any) => {
    setScreenIds((pre: any) => {
      if (pre.find((s: any) => s === screen)) {
        return pre?.filter((s: any) => s !== screen);
      } else {
        return pre;
      }
    });
  };

  const handleSettingAtIndex = (index: any) => {
    if (isEnabled) setAtIndex(index);
    else message.error("please enable set screen priority");
  };

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
              <SearchableSelect
                onChange={(value: string) => setBrandName(value?.toUpperCase())}
                options={getDataFromLocalStorage(ALL_BRAND_LIST)?.map(
                  (value: string) => {
                    return { label: value, value: value };
                  }
                )}
                placeholder="Search by brand Name"
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
                <MultiSelectInput
                  options={getDataFromLocalStorage(
                    ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER
                  )?.sort((a: any, b: any) => {
                    const nameA = a.screenName.toLowerCase();
                    const nameB = b.screenName.toLowerCase();

                    if (nameA < nameB) return -1; // nameA comes first
                    if (nameA > nameB) return 1; // nameB comes first
                    return 0; // names are equal
                  })}
                  selectedOptions={screenIds}
                  setSelectedOptions={handleScreenSelection}
                  placeHolder="Select screens"
                />
              )}
            </div>
            <div className="col-span-1 py-1">
              <label className="block text-secondaryText text-[14px] mb-2">
                Priority
              </label>
              <MultiSelectInput
                options={allIndexs?.map((data: any) => {
                  return {
                    label: data.label,
                    value: data.value,
                  };
                })}
                selectedOptions={atIndex}
                placeHolder="Select Priority"
                setSelectedOptions={handleSettingAtIndex}
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
              </div>
              <CalendarInput
                placeholder={!enterDuration ? "End Date" : "0"}
                value={endDate}
                action={(e: any) => {
                  setEndDate(e);
                }}
                minDate={startDate || new Date()}
                disabled={false}
              />
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="border rounded-[12px] p-1 my-2">
            <div className="flex justify-between items-center py-1">
              <h1 className="px-2 text-[14px]">Priority</h1>
              <SwitchInput
                isEnabled={isEnabled}
                onToggle={() => {
                  setIsEnable((pre) => !pre);
                  if (!isEnabled) {
                    setAtIndex([]);
                  } else {
                    setAtIndex([0]);
                  }
                }}
                onColor="bg-green-500"
                offColor="bg-red-500"
              />
            </div>
            <div className="grid grid-cols-6 gap-2 justify-center px-1">
              {allIndexs?.map((index: any, i: any) => (
                <div
                  key={i}
                  className={`
                      ${
                        atIndex.includes(index.value)
                          ? "bg-[#129BFF] text-white"
                          : ""
                      }
                      border rounded-[8px] w-[40px] flex justify-center py-1
                    `}
                  onClick={() => {
                    if (atIndex?.includes(index.value)) {
                      handleSettingAtIndex(
                        atIndex?.filter((data: any) => data != index.value)
                      );
                    } else {
                      handleSettingAtIndex([...atIndex, index.value]);
                      // message.info(
                      //   "Please deselect auto-set priority switch first..."
                      // );
                    }
                  }}
                >
                  <h1 className="text-[12px]">{index.value}</h1>
                </div>
              ))}
            </div>
          </div>
          <div className="border rounded-[12px]">
            <div className="flex justify-between">
              <h1 className="my-2 px-2 text-[14px]">Screens</h1>
              <button
                className="text-[12px] px-2"
                onClick={() => setScreenIds([])}
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 justify-center px-1 py-1">
              {getDataFromLocalStorage(
                ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER
              )
                ?.filter((s: any) => screenIds.includes(s._id))
                ?.map((screen: any, i: any) => (
                  <div
                    key={i}
                    className="border rounded-[8px] flex justify-center gap-2 px-2 py-1"
                  >
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
            loading={loadingCampaignsCreations}
            loadingText="Creating campaign..."
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
