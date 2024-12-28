import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllScreensDetailsAction } from "../../actions/screenAction";
import { ScreenListThumbnail } from "../../components/molecules/ScreenListThumbnail";
import { Loading } from "../../components/Loading";
import { ReloadButton, SearchInputField } from "../../components";
import { SIGN_IN } from "../../routes/routes";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER } from "../../constants/localStorageConstants";

export const ScreensPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [showNetwork, setShowNetwork] = useState<boolean>(true);
  const [selectedNetwork, setSelectedNetwork] = useState<string[]>([]);
  const [selectedScreensViaNetwork, setSelectedScreensViaNetwork] = useState<
    string[]
  >([]);
  console.log("selectedScreensViaNetwork : ", selectedScreensViaNetwork);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allScreensDataGet = useSelector(
    (state: any) => state.allScreensDataGet
  );
  const { loading, error, data: allScreens } = allScreensDataGet;

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

  console.log("networks : ", networks);

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
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="bg-white rounded-md border p-4 w-full font-bold text-[24px] flex gap-4 ">
        My Screens
        <ReloadButton onClick={reLoad} />
      </div>
      <div className="flex gap-2">
        <div className="w-[17vw] h-[80vh] bg-white rounded-md p-4 ">
          <div className="flex justify-between items-center">
            <h1 className="text-[#151515] text-[16px] font-semibold">Filter</h1>
            <h1 className="text-[#092A41] text-[14px] ">Clear All</h1>
          </div>
          <div className="flex justify-between mt-2">
            <h1>Network</h1>
            {showNetwork ? (
              <i
                className="fi fi-br-angle-up"
                onClick={() => setShowNetwork((pre: boolean) => !pre)}
              ></i>
            ) : (
              <i
                className="fi fi-br-angle-down"
                onClick={() => setShowNetwork((pre: boolean) => !pre)}
              ></i>
            )}
          </div>
          {showNetwork && (
            <div className="mt-2">
              {Object.keys(networks)?.map((network: string) => (
                <div
                  className="flex justify-between text-sm pt-1"
                  key={network}
                  onChange={() => handleSelectNetwork(network)}
                >
                  <label className="flex items-center space-x-2 ">
                    <input
                      type="checkbox"
                      value={network}
                      checked={selectedNetwork.includes(network)}
                      onChange={() => handleSelectNetwork(network)}
                      className="form-checkbox rounded text-[#129BFF]"
                    />
                    <span>
                      {network}{" "}
                      <span className="font-bold">
                        {" "}
                        {networks?.[network]?.length}
                      </span>
                    </span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-[70vw] h-[80vh] flex flex-col gap-2">
          <div className="bg-white rounded-md p-2 w-full flex justify-between items-center ">
            <h1 className="text-[#151515] text-[20px] font-bold pl-4">
              Network{" "}
              <span className="text-green-500 pl-4">
                {filterScreens?.length}
              </span>
            </h1>
            <div className="w-96">
              <SearchInputField
                value={searchText}
                onChange={setSearchText}
                placeholder="Search by screen name"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap h-[70vh] overflow-scroll bg-gray-100">
            {filterScreens?.map((data: any, index: any) => (
              <div key={index} className="">
                <ScreenListThumbnail
                  isSelected={data._id === selectedCard}
                  color={""}
                  handleCardClick={() => handleCardClick(data._id)}
                  // navigate={() => navigate(`/screens-details/${data._id}`)}
                  data={data}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
