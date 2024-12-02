import { message } from "antd";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { useNavigate } from "react-router-dom";
import { getAllScreensDetailsAction } from "../../actions/screenAction";
import { ScreenListThumbnail } from "../../components/molecules/ScreenListThumbnail";
import { Loading } from "../../components/Loading";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_SCREENS_LIST } from "../../constants/localStorageConstants";
import { getTimeDifferenceInMin } from "../../utils/dateAndTimeUtils";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { getCreativesMediaAction, uploadCreativesMediaAction } from "../../actions/creativeAction";
import { UploadCreativesV2Popup } from "../../components/popup/UploadCreativesV2Popup";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { ShowMediaFile } from "../../components/molecules/ShowMediaFIle";



export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const [creativeName, setCreativeName] = useState<any>("");
  const [networkChoice, setNetworkChoice] = useState<any>("");
  const [resolution, setResolution] = useState<any>("");

  const [searchQuery, setSearchQuery] = useState<any>("");
  const [openCreateCreativePopup, setOpenCreateCreativePopup] = useState<any>(false);
  const [currentTab, setCurrentTab] = useState<any>("1");

  const [brandName, setBrandName] = useState<any>("");
  const [network, setNetwork] = useState<any>("");
  const [creativesMedia, setCreativesMedia] = useState<any>([]);

  const [mediaFiles, setMediaFiles] = useState<any>([]);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const creativesMediaGet = useSelector((state: any) => state.creativesMediaGet);
  const {
    loading: loadingCreatives,
    error: errorCreatives,
    data: creatives,
  } = creativesMediaGet;


  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a user or master!!!")
    }
    dispatch(getCreativesMediaAction({ userId: userInfo?._id }));
  },[dispatch, userInfo]);


  return (
    <div className="mt-6 w-full h-full pb-5">
      <UploadCreativesV2Popup
        isOpen={openCreateCreativePopup}
        mediaFiles={mediaFiles}
        setMediaFiles={setMediaFiles}
        brandName={brandName}
        setBrandName={setBrandName}
        network={network}
        setNetwork={setNetwork}
        userInfo={userInfo}
      />
      <div className="w-full flex justify-between items-center p-2 border rounded">
        <h1 className="text-[14px] font-bold">
          Creative Bucket
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-2 py-2">
        <div className="col-span-4 border rounded">
          <div className="flex justify-between items-center p-2">
            <h1 className="text-[14px] font-semibold">Brand</h1>
            <div className="flex gap-1 items-center" onClick={() => setOpenCreateCreativePopup(true)}>
              <i className="fi fi-br-plus-small flex items-center"></i>
              <h1 className="text-[12px]">Folder</h1>
            </div>
          </div>
          <div className="flex items-center p-1">
            <PrimaryInput
              inputType="text"
              placeholder="Search"
              height="h-8"
              value={searchQuery}
              action={setSearchQuery}
            />
          </div>
          {loadingCreatives ? (
            <Loading />
          ) : (
            <div className="p-2">
              {creatives && Object.keys(creatives)?.map((cr: any, i: any) => (
                <div
                  className="flex gap-4 items-center p-2 border-b"
                  key={i}
                  onClick={() => {
                    setBrandName(cr);
                    setNetwork(creatives[cr][0].network);
                    setCreativesMedia(creatives[cr][0]);
                  }}
                >
                  <i className="fi fi-sr-folder-open flex items-center text-[#D7D7D7]"></i>
                  <h1 className="text-[12px] font-semibold">{cr}</h1>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-8 border rounded">
          {brandName && (
            <div className="p-2">
              <div className="border-b py-1 flex items-center justify-between">
                <div className="flex gap-2 items-center py-1">
                  {/* <i
                    className="fi fi-sr-angle-small-left text-[#7C8E9B] px-1 flex items-center"
                    onClick={() =>{}}
                  ></i> */}
                  <h1 className="text-[14px] font-semibold">{brandName}</h1>
                </div>
                <div className="flex gap-1 items-center" onClick={() => setOpenCreateCreativePopup(true)}>
                  <i className="fi fi-br-plus-small flex items-center"></i>
                  <h1 className="text-[12px]">Creative Media</h1>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b py-1">
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
                  <PrimaryInput
                    inputType="text"
                    height="h-8"
                    placeholder="Enter Network"
                    value={networkChoice}
                    action={setNetworkChoice}
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
                <div className="flex gap-2 items-center justify-start">
                  {Object.keys(creativesMedia)?.filter((c: any) => c !== "network")?.map((cs: any, z: any) => {
                    return {
                      id: `${z+1}`,
                      label: cs,
                    }
                  })?.map((f: any, k: any) => (
                    <div className="p-2" key={k}>
                      {f.label.toUpperCase()}
                    </div>
                  ))}
                </div>
                <div>
                  {Object.keys(creativesMedia)?.filter((c: any) => c !== "network")?.map((f: any, k: any) => (
                    <div className="p-2" key={k} onClick={() => console.log(creativesMedia[f])}>
                      <h1 className="text-[12px] font-semibold border-b">{`${f}s`.toUpperCase()}</h1>
                      {Object.keys(creativesMedia[f])?.map((g: any, j: any) => (
                        <div key={j} className="py-2">
                          <h1 className="text-[10px] py-1">Resolution: {g}</h1>
                          <div className="grid grid-cols-3 gap-2">
                            {creativesMedia[f][g]?.map((l: any, y: any) => (
                              <div key={y} className="w-full border rounded">
                                <div className="w-full">
                                  <ShowMediaFile
                                    url={l.awsURL}
                                    mediaType={l?.creativeType}
                                    key={y}
                                    height="h-full"
                                    width="w-full"
                                  />
                                </div>
                                <div className="p-1">
                                  <h1 className="text-[12px] truncate">
                                    {l.creativeName.toUpperCase()}
                                  </h1>
                                  <div className="flex gap-1 items-center truncate">
                                    <h1 className="text-[12px]">
                                      {l.extension?.split("/")[1]},
                                    </h1>
                                    <h1 className="text-[12px] truncate">
                                      {l.duration} seconds
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
