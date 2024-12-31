import { message, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/Loading";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import {
  getAllBrandAndNetworkAction,
  getCreativesMediaAction,
} from "../../actions/creativeAction";
import { UploadCreativesV2Popup } from "../../components/popup/UploadCreativesV2Popup";
import { ShowMediaFile } from "../../components/molecules/ShowMediaFIle";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_BRAND_LIST } from "../../constants/localStorageConstants";
import { NoDataView, SearchInputField } from "../../components";

export const MyCreativesPage: React.FC = () => {
  const dispatch = useDispatch<any>();

  const [creativeName, setCreativeName] = useState<any>("");
  const [networkChoice, setNetworkChoice] = useState<any>(0);
  const [purpose, setPurpose] = useState<string>("New");

  const [resolution, setResolution] = useState<any>("");

  const [searchQuery, setSearchQuery] = useState<any>("");
  const [openCreateCreativePopup, setOpenCreateCreativePopup] =
    useState<any>(false);
  const [currentTab, setCurrentTab] = useState<any>("1");

  const [brandName, setBrandName] = useState<any>("");
  const [network, setNetwork] = useState<any>("");
  const [creativesMedia, setCreativesMedia] = useState<any>({});

  const [mediaFiles, setMediaFiles] = useState<any>([]);

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

  const handleOpenCreateCreativePopup = (purpose: string) => {
    if (purpose === "New") {
      setBrandName("");
      setNetwork("");
    }
    setPurpose(purpose);
    setOpenCreateCreativePopup(true);
  };

  const getJSXValue = (contentType: string) => {
    if (Object.keys(creativesMedia || {})?.length > 0) {
      if (Object.keys(creativesMedia).includes(contentType)) {
        return (
          Object.keys(creativesMedia?.[contentType])?.length > 0 &&
          Object.keys(creativesMedia?.[contentType])
            ?.filter((dimension: any) =>
              dimension?.toLowerCase().includes(resolution.toLowerCase())
            )
            ?.map((resolution: any, j: any) => (
              <div key={j} className="py-2">
                <h1 className="text-[10px] py-1">Resolution: {resolution}</h1>
                <div className="grid grid-cols-3 gap-1">
                  {creativesMedia?.[contentType]?.[resolution]
                    ?.filter((l: any) =>
                      l?.creativeName
                        ?.toLowerCase()
                        .includes(creativeName.toLowerCase())
                    )
                    ?.map((l: any, y: any) => (
                      <div key={y} className="w-full border">
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
                          <Tooltip title={`${l?.creativeName?.toUpperCase()}`}>
                            <h1 className="text-[12px] truncate">
                              {l?.creativeName?.toUpperCase()}
                            </h1>
                          </Tooltip>

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
            ))
        );
      } else return <NoDataView />;
    }
  };

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a user or master!!!");
    }
    dispatch(getCreativesMediaAction({ userId: userInfo?._id }));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (getDataFromLocalStorage(ALL_BRAND_LIST)) {
    } else {
      dispatch(getAllBrandAndNetworkAction());
    }
  }, []);

  return (
    <div className="w-full h-full ">
      <div className="p-4 bg-white">
        <h1 className="text-[16px] font-bold">Creative Bucket</h1>
      </div>
      <div className="w-full ">
        <UploadCreativesV2Popup
          isOpen={openCreateCreativePopup}
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
          brandName={brandName}
          setBrandName={setBrandName}
          network={network}
          setNetwork={setNetwork}
          userInfo={userInfo}
          onClose={() => setOpenCreateCreativePopup(false)}
          purpose={purpose}
        />

        <div className="grid grid-cols-12 gap-1 py-1">
          <div className="col-span-4  bg-white">
            <div className="flex justify-between items-center p-2">
              <h1 className="text-[14px] font-semibold">Brand</h1>
              <div
                className="flex gap-1 items-center"
                onClick={() => handleOpenCreateCreativePopup("New")}
              >
                <i className="fi fi-br-plus-small flex items-center"></i>
                <h1 className="text-[12px]">Folder</h1>
              </div>
            </div>
            <div className="flex items-center p-1">
              <SearchInputField
                placeholder="Search By brand name"
                height="h-8"
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>
            <div className="p-2 h-[70vh] ">
              {loadingCreatives ? (
                <Loading />
              ) : (
                <div className="p-2 h-[70vh] overflow-scroll">
                  {creatives &&
                    Object.keys(creatives)
                      ?.filter((brand: string) =>
                        brand
                          .toLowerCase()
                          ?.includes(searchQuery?.toLowerCase())
                      )
                      ?.map((brand: any, i: any) => (
                        <div
                          className={
                            brand === brandName
                              ? "flex gap-4 items-center p-2 border-b text-blue-400"
                              : "flex gap-4 items-center p-2 border-b"
                          }
                          key={i}
                          onClick={() => {
                            setBrandName(brand);
                            setNetwork(creatives[brand][0].network);
                            setCreativesMedia(creatives[brand][0]);
                          }}
                        >
                          <i className="fi fi-sr-folder-open flex items-center text-[#D7D7D7]"></i>
                          <h1 className="text-[12px] font-semibold">{brand}</h1>
                        </div>
                      ))}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-8 bg-white">
            {brandName && (
              <div className="p-2">
                <div className="border-b py-1 flex items-center justify-between">
                  <div className="flex gap-1 items-center py-1">
                    {/* <i
                    className="fi fi-sr-angle-small-left text-[#7C8E9B] px-1 flex items-center"
                    onClick={() =>{}}
                  ></i> */}
                    <h1 className="text-[14px] font-semibold">{brandName}</h1>
                  </div>
                  <div
                    className="flex gap-1 items-center"
                    onClick={() => handleOpenCreateCreativePopup("Old")}
                  >
                    <i className="fi fi-br-plus-small flex items-center"></i>
                    <h1 className="text-[12px]">Creative Media</h1>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1 border-b py-1">
                  <div className="col-span-1 py-1">
                    <label className="block text-secondaryText text-[12px] mb-2">
                      Creative Name
                    </label>
                    <PrimaryInput
                      inputType="text"
                      height="h-8"
                      placeholder="Creative Name"
                      value={creativeName}
                      action={setCreativeName}
                    />
                  </div>
                  <div className="col-span-1 py-1">
                    <label className="block text-secondaryText text-[12px] mb-2">
                      Network
                    </label>
                    <DropdownInput
                      inputType="text"
                      placeHolder="Select Network"
                      height="h-8"
                      options={creatives?.[brandName]?.map(
                        (data: any, index: number) => {
                          return {
                            label: data?.network,
                            value: index,
                          };
                        }
                      )}
                      selectedOption={networkChoice}
                      setSelectedOption={(value: number) => {
                        setCreativesMedia(creatives?.[brandName][value]);
                        setNetworkChoice(value);
                      }}
                    />
                  </div>
                  <div className="col-span-1 py-1">
                    <label className="block text-secondaryText text-[12px] mb-2">
                      Resolution
                    </label>
                    <PrimaryInput
                      inputType="text"
                      height="h-8"
                      placeholder="Enter resolution"
                      value={resolution}
                      action={setResolution}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex gap-1 items-center justify-start py-2">
                    <TabWithoutIcon
                      currentTab={currentTab}
                      setCurrentTab={setCurrentTab}
                      tabData={[
                        {
                          id: "1",
                          label: "Videos",
                        },
                        {
                          id: "2",
                          label: "Images",
                        },
                      ]}
                    />
                  </div>
                  <div className="pt-1 h-[60vh] overflow-scroll">
                    {getJSXValue(currentTab == "1" ? "video" : "image")}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
