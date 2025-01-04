import { message } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllScreensDetailsAction } from "../../actions/screenAction";
import { ScreenListThumbnail } from "../../components/molecules/ScreenListThumbnail";
import { Loading } from "../../components/Loading";
import {
  PrimaryButton,
  ReloadButton,
  SearchInputField,
} from "../../components";
import { SIGN_IN } from "../../routes/routes";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER } from "../../constants/localStorageConstants";
import { USER_ROLE_PRIMARY } from "../../constants/userConstants";
import { ChangeScreenCodePopup } from "../../components/popup/ChangeScreenCodePopup";
import { getAllScreensForScreenOwnerCampaignCreationAction } from "../../actions/campaignAction";

export const ScreensPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [showNetwork, setShowNetwork] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const [selectedNetwork, setSelectedNetwork] = useState<string[]>([]);
  const [selectedScreensViaNetwork, setSelectedScreensViaNetwork] = useState<
    string[]
  >([]);

  const handleClearAll = () => {
    setSelectedNetwork([]);
    setSelectedScreensViaNetwork([]);
  };

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allScreensDataGet = useSelector(
    (state: any) => state.allScreensDataGet
  );
  const { loading, error, data: allScreens } = allScreensDataGet;

  const getAllScreensForScreenOwnerCampaignCreation = useSelector(
    (state: any) => state.getAllScreensForScreenOwnerCampaignCreation
  );
  const {
    loading: loadingNetworkList,
    error: errorNetworkList,
    data: allNetworkData,
  } = getAllScreensForScreenOwnerCampaignCreation;

  // getAllScreensForScreenOwnerCampaignCreation;

  const filterScreens =
    selectedScreensViaNetwork?.length > 0
      ? allScreens
          ?.filter((screen: any) =>
            screen.screenName.toLowerCase().includes(searchText?.toLowerCase())
          )
          ?.filter((screen: any) =>
            selectedScreensViaNetwork.includes(screen?._id)
          )
      : allScreens?.filter((screen: any) =>
          screen.screenName.toLowerCase().includes(searchText?.toLowerCase())
        );

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!");
    }
    if (!userInfo) {
      navigate(SIGN_IN);
    }
    if (!allScreens)
      dispatch(getAllScreensDetailsAction({ userId: userInfo?.primaryUserId }));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (!loadingNetworkList && !allNetworkData)
      dispatch(getAllScreensForScreenOwnerCampaignCreationAction());
  }, [dispatch]);

  const handleCardClick = (id: any) => {
    if (userInfo && userInfo?.isMaster && userInfo?.userRole === "primary") {
      setSelectedCard(id);
      navigate(`/screens-details/${id}`);
    }
  };

  const reLoad = () => {
    dispatch(getAllScreensDetailsAction({ userId: userInfo?.primaryUserId }));
  };

  const networks =
    getDataFromLocalStorage(ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER)
      ?.networkWithScreens || [];

  const handleSelectNetwork = (value: string) => {
    let newValue;
    if (selectedNetwork.includes(value)) {
      newValue = selectedNetwork?.filter((option: string) => option !== value);
      let allScreenIds = networks[value]?.map((data: any) => data.value);
      let newScreenIds = selectedScreensViaNetwork?.filter(
        (screenId: string) => !allScreenIds.includes(screenId)
      );
      setSelectedScreensViaNetwork(newScreenIds);
    } else {
      newValue = [...selectedNetwork, value];
      let allScreenIds = networks[value]?.map((data: any) => data.value);
      setSelectedScreensViaNetwork((pre: any) =>
        Array.from(new Set([...pre, ...allScreenIds]))
      );
    }
    setSelectedNetwork(newValue);
  };

  const toggleOpen = useCallback(() => {
    setOpen((pre: boolean) => !pre);
  }, [open]);

  return (
    <div className="flex flex-col gap-1">
      {open && <ChangeScreenCodePopup open={open} onClose={toggleOpen} />}

      <div className="flex justify-between pr-8 border-b bg-white">
        <div className="flex gap-4 items-center p-4 ">
          <h1 className="text-[16px] font-semibold">
            My Screens{" "}
            <span className="text-[18px] text-[#68879C] ">
              ({filterScreens?.length})
            </span>
          </h1>
          <ReloadButton onClick={reLoad} />
        </div>
        <div className="flex items-center mt-1 w-96 flex gap-4">
          <SearchInputField
            value={searchText}
            onChange={setSearchText}
            placeholder="Search by screen name"
          />
          <PrimaryButton
            action={toggleOpen}
            title="+ Screen Code"
            rounded="rounded-lg"
            height="h-10"
            width="w-32"
            textSize="text-[12px] font-semibold"
            reverse={true}
            loading={false}
            loadingText="Saving..."
          />
        </div>
      </div>
      <div className="flex gap-2">
        {userInfo?.userRole === USER_ROLE_PRIMARY && (
          <div className="w-[17vw] bg-white  p-4 ">
            <div className="flex justify-between items-center border-b pb-4">
              <h1 className="text-[#151515] text-[16px] font-semibold">
                Filter
              </h1>
              <h1
                className="text-secondaryText text-[14px]"
                onClick={handleClearAll}
              >
                Clear All
              </h1>
            </div>
            <div className="flex justify-between mt-4">
              <h1>Network</h1>
              {/* {showNetwork ? (
                <i
                  className="fi fi-br-angle-up text-[14px]"
                  onClick={() => setShowNetwork((pre: boolean) => !pre)}
                ></i>
              ) : (
                <i
                  className="fi fi-br-angle-down text-[14px]"
                  onClick={() => setShowNetwork((pre: boolean) => !pre)}
                ></i>
              )} */}
            </div>
            {loadingNetworkList ? (
              <Loading />
            ) : (
              <div className="mt-1 h-[70vh] overflow-scroll no-scrollbar">
                {Object.keys(networks)?.map((network: string) => (
                  <div
                    className="flex justify-between text-sm pt-4"
                    key={network}
                    onChange={() => handleSelectNetwork(network)}
                  >
                    <label className="flex items-center space-x-2 ">
                      <input
                        type="checkbox"
                        value={network}
                        checked={selectedNetwork.includes(network)}
                        onChange={() => handleSelectNetwork(network)}
                        className="form-checkbox rounded text-[#129BFF] text-[12px] border-sky-500"
                      />

                      <span>
                        {network}{" "}
                        <span className="text-[12px] text-[#68879C] ">
                          ({networks?.[network]?.length})
                        </span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-[80vw] h-[85vh] overflow-scroll scrollbar-minimal pr-2">
          {loading ? (
            <Loading />
          ) : (
            filterScreens?.map((data: any, index: any) => (
              <div key={index} className="">
                <ScreenListThumbnail
                  isSelected={data._id === selectedCard}
                  color={""}
                  handleCardClick={() => handleCardClick(data._id)}
                  // navigate={() => navigate(`/screens-details/${data._id}`)}
                  data={data}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
