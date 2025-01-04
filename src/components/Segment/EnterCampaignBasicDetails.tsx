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
  getAllCampaignsDetailsAction,
  getAllScreensForScreenOwnerCampaignCreationAction,
} from "../../actions/campaignAction";
import {
  CAMPAIGN_STATUS_ACTIVE,
  CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET,
} from "../../constants/campaignConstants";
import {
  EnterTimeTriggerPopup,
  MultiSelectInput,
  ReloadButton,
  SearchableSelect,
  SwitchInput,
} from "../../components";
import { getAllBrandAndNetworkAction } from "../../actions/creativeAction";
import { SelectScreensViaNetwork } from "../../components/molecules/SelectScreensViaNetwork";

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
  purpose?: string;
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
  purpose,
}: EnterCampaignBasicDetailsProps) => {
  const navigate = useNavigate();
  const [timeTriggers, setTimeTriggers] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.triggers
      ?.timeTriggers || []
  );
  const dispatch = useDispatch<any>();
  const [isEnabled, setIsEnable] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
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

  const [enterDate, setEnterDate] = useState<any>(false);

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
    } else if (atIndex?.length === 0) {
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
    const data = {
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
      creatives: campaignsCreated?.creatives || [],
      triggers: {
        timeTriggers: timeTriggers,
        weatherTriggers: [],
        sportsTriggers: [],
        vacantSlots: [],
      },
    };
    if (purpose === "Edit") {
      dispatch(
        createCampaignCreationByScreenOwnerAction({
          id: campaignId,
          ...data,
        })
      );
    } else {
      dispatch(createCampaignCreationByScreenOwnerAction(data));
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
    timeTriggers,
    userInfo?._id,
    userInfo?.name,
    userInfo?.email,
    userInfo?.primaryUserId,
    userInfo?.primaryUserEmail,
  ]);

  useEffect(() => {
    if (errorCampaignsCreations) {
      message.error(errorCampaignsCreations);
      dispatch({ type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET });
    }

    if (successCampaignsCreations) {
      if (purpose === "Edit") {
        navigate(`/edit-campaign/${campaignsCreated.campaignCreationRes._id}`);
      } else {
        navigate(
          `/create-campaign/${campaignsCreated.campaignCreationRes._id}`
        );
      }
      dispatch({
        type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET,
      });
      dispatch(
        getAllCampaignsDetailsAction({
          userId: userInfo?.primaryUserId,
          status: CAMPAIGN_STATUS_ACTIVE,
        })
      );
      setStep(2);
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
    if (
      !allScreens &&
      !getDataFromLocalStorage(ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER)
    ) {
      dispatch(getAllScreensForScreenOwnerCampaignCreationAction());
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

  const validateEndDate = (selectedDate: any) => {
    if (new Date(selectedDate) <= new Date(startDate)) {
      message.error("End time must be greater then start date.");
      setEndDate("");
    } else setEndDate(selectedDate);
  };

  const handleStartDateChange = (value: any) => {
    if (new Date() > new Date(value)) {
      message.error("start date must be greater then today data and time!");
      setStartDate("");
    } else setStartDate(value);
  };

  const handelEndDateChange = (value: any) => {
    validateEndDate(value);
  };

  const handleOpenCloseAddTimeTrigger = useCallback(() => {
    setOpen((pre: boolean) => !pre);
  }, [open]);

  const handleSave = (data: any) => {
    setTimeTriggers(data);
  };

  return (
    <div className="w-full px-4 py-1 w-full h-full overflow-y-auto scrollbar-minimal ">
      <EnterTimeTriggerPopup
        open={open}
        onClose={handleOpenCloseAddTimeTrigger}
        handleSave={handleSave}
        data={timeTriggers}
      />
      <div className="bg-white p-4 flex gap-1 ">
        <i
          className="fi fi-sr-angle-small-left text-[#7C8E9B] flex items-center"
          onClick={() => navigate(-1)}
        ></i>
        <h1 className="text-[20px] font-semibold">Quick Upload</h1>
      </div>
      <div className="bg-white p-4 mt-1">
        <h1 className="text-[24px] text-primaryText font-semibold flex items-center">
          {purpose === "Edit" ? "Edit " : "Add "} Basic Details{" "}
          <span className="pl-8">
            <ReloadButton onClick={() => window.location.reload()} />
          </span>
        </h1>

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
                  onChange={(value: string) =>
                    setBrandName(value?.toUpperCase())
                  }
                  options={getDataFromLocalStorage(ALL_BRAND_LIST)?.map(
                    (value: string) => {
                      return { label: value, value: value };
                    }
                  )}
                  placeholder="Search by brand Name"
                  value={brandName}
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
                  <SelectScreensViaNetwork
                    screenList={
                      getDataFromLocalStorage(
                        ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER
                      )?.screensList || []
                    }
                    setSelectedOptions={handleScreenSelection}
                    selectedOptions={screenIds}
                    placeHolder="Select screens"
                    networkWithScreens={
                      getDataFromLocalStorage(
                        ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER
                      )?.networkWithScreens || []
                    }
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
                {purpose === "Edit" ? (
                  <div
                    className="flex items-center justify-start h-[48px] w-full border  px-4 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-gray-100 active:bg-blue-100 transition-colors"
                    // onClick={() => {
                    //   alert("You can't edit start date");
                    // }}
                  >
                    <h1 className="text-[14px]">
                      {new Date(startDate).toLocaleDateString()}
                    </h1>
                  </div>
                ) : (
                  <CalendarInput
                    placeholder="Start Date"
                    value={startDate}
                    action={handleStartDateChange}
                    disabled={false}
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="col-span-1 py-1">
                <div className="flex justify-between">
                  <label className="block text-secondaryText text-[14px] mb-2">
                    {!enterDuration ? "End Date" : "Duration"}
                  </label>
                </div>
                {purpose === "Edit" ? (
                  <div
                    className="flex items-center justify-start h-[48px] w-full border  px-4 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-gray-100 active:bg-blue-100 transition-colors"
                    onClick={() => {
                      // setEnterDate(true);
                    }}
                  >
                    <h1 className="text-[14px]">
                      {endDate === ""
                        ? "dd/mm/yyyy"
                        : new Date(endDate).toLocaleDateString()}
                    </h1>
                  </div>
                ) : (
                  <CalendarInput
                    placeholder={!enterDuration ? "End Date" : "0"}
                    value={endDate}
                    action={handelEndDateChange}
                    minDate={startDate || new Date()}
                    disabled={false}
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-2">
              <div className="col-span-1 py-1 text-[14px]">
                <label className="block text-secondaryText  mb-2">
                  Schedule Time{" "}
                </label>
                <div
                  onClick={handleOpenCloseAddTimeTrigger}
                  className="flex gap-1 w-full px-4 py-2 text-left bg-white border  focus:outline-none focus:ring focus:ring-indigo-300 items-center cursor-pointer"
                >
                  <i className="fi fi-rr-clock text-gray-400"></i>
                  <h1>Set Ad Play Time</h1>
                </div>
              </div>
              <div className="col-span-1 py-1"></div>
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
          <div className="col-span-4">
            <div className="border rounded-[12px] p-1 my-1">
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
                  onColor="bg-[#348730]"
                  offColor="bg-red-500"
                />
              </div>
              <div className="grid grid-cols-6 gap-1 justify-center px-1">
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
                <h1 className="my-1 px-2 text-[14px]">
                  Screens ({screenIds?.length})
                </h1>
                <button
                  className="text-[12px] px-2"
                  onClick={() => setScreenIds([])}
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1 justify-center px-1 py-1">
                {getDataFromLocalStorage(
                  ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER
                )
                  ?.screensList?.filter((s: any) => screenIds.includes(s.value))
                  ?.map((screen: any, i: any) => (
                    <div
                      key={i}
                      className="border rounded-[8px] flex justify-center gap-1 px-2 py-1"
                    >
                      <h1 className="text-[12px] truncate">{screen.label}</h1>
                      <i
                        className={`fi fi-br-cross flex items-center text-red-500 text-[10px]`}
                        onClick={() => handleRemoveScreenIds(screen.value)}
                      ></i>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
