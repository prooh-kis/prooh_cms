import { Loading } from "../../components/Loading";
import { getCreativesMediaAction } from "../../actions/creativeAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { ShowMediaFile } from "../../components/molecules/ShowMediaFIle";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { message } from "antd";

interface AddDefaultMediaPopupProps {
  onClose?: any;
  openAddDefaultMediaPopup?: any;
  setOpenAddDefaultMediaPopup?: any;
  userInfo?: any;
}

export function AddDefaultMediaPopup({
  openAddDefaultMediaPopup,
  setOpenAddDefaultMediaPopup,
  onClose,
  userInfo,
}: AddDefaultMediaPopupProps) {
  const dispatch = useDispatch<any>();

  const [isLoading, setIsLoading] = useState<any>();
  const [brand, setBrand] = useState<any>("");
  const [mediaFiles, setMediaFiles] = useState<any>([]);

  const creativesMediaGet = useSelector(
    (state: any) => state.creativesMediaGet
  );
  const {
    loading: loadingCreatives,
    error: errorCreatives,
    data: creatives,
  } = creativesMediaGet;

  useEffect(() => {
    if (openAddDefaultMediaPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openAddDefaultMediaPopup]);

  useEffect(() => {
    dispatch(getCreativesMediaAction({ userId: userInfo?._id }));
  }, [dispatch, userInfo]);

  if (!openAddDefaultMediaPopup) {
    return null;
  }

  const createCampaignFromMedia = () => {
    setIsLoading(true);

    // const selectedScreenIds = selectedScreens?.map((s: any) => s._id);
    let dataToUpload: any = [];
    mediaFiles?.map((item: any) => {
      const mediaData = {
        resolution: `${item.resolution.width}x${item.resolution.height}`,
        type: item.extension,
        url: item.awsURL,
        size: item.fileSize,
        _id: { $oid: item._id },
        duration: item.duration,
      };
      dataToUpload.push(mediaData);
    });

    let creativeDataToUpload: any = {
      screenId: "",
      campaignId: "",
      duration: "",
      dimensions: "",
      creatives: [],
      atIndex: [],
    };

    dataToUpload?.forEach((u: any) => {});

    // dispatch(editCampaignCreativesEndDateAction({
    //   campaignId: campaign._id,
    //   endDate: endDate ? new Date(endDate).toISOString() : new Date(campaign.endDate).toISOString().split(".")[0],
    //   // creatives: creativeDataToUpload,
    //   duration: duration,
    //   creatives: creativeDataToUpload?.standardDayTimeCreatives?.length > 0 ? creativeDataToUpload : null,

    // }));

    message.success("Campaign creative/end date change initialized");
    setIsLoading(false);
    // handelDiscard();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-3/4 w-3/4 p-1">
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={() => setOpenAddDefaultMediaPopup(false)}
        >
          <i className="fi fi-rr-cross-small"></i>
        </div>
        <div className="p-2 overflow-y-auto no-scrollbar h-[60vh]">
          {loadingCreatives ? (
            <Loading />
          ) : (
            <div className="w-full">
              <div className="px-2 relative overflow-auto h-auto border-b">
                {mediaFiles?.length > 0 && (
                  <div className="h-[35vh]">
                    <div className="flex fle-row justify-between">
                      <p className="py-1">Uploaded media</p>
                      <button
                        className=""
                        type="submit"
                        onClick={() => {
                          setMediaFiles([]);
                        }}
                      >
                        Reset
                      </button>
                    </div>
                    <div className="flex flex-wrap justify-center overflow-y-auto no-scrollbar h-[30vh] gap-4">
                      {mediaFiles?.map((media: any, index: any) => (
                        <ShowMediaFile
                          url={media.awsURL || media.url}
                          mediaType={media?.creativeType}
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {creatives && (
                <DropdownInput
                  inputType="text"
                  placeHolder="Select Screens"
                  height="h-12"
                  options={Object.keys(creatives)
                    ?.sort((a: any, b: any) => {
                      const nameA = a.toLowerCase();
                      const nameB = b.toLowerCase();

                      if (nameA < nameB) return -1; // nameA comes first
                      if (nameA > nameB) return 1; // nameB comes first
                      return 0; // names are equal
                    })
                    ?.map((c: any, i: any) => {
                      return {
                        id: `${i + 1}`,
                        label: c,
                        value: c,
                      };
                    })}
                  selectedOption={brand}
                  setSelectedOption={(e: any) => {
                    setBrand(e);
                  }}
                />
              )}
              <div
              // className={`border ${monitoringDate === date ? "border-[#129BFF]" : ""} truncate rounded p-2 w-40 flex justify-center items-center`}
              // onClick={() => setOpenAddDefaultMediaPopup(date)}
              >
                {creatives &&
                  brand !== "" &&
                  Object.keys(creatives[brand])
                    ?.filter((c: any) => c !== "network")
                    ?.map((f: any, k: any) => (
                      <div className="p-2" key={k} onClick={() => {}}>
                        <h1 className="text-[12px] font-semibold border-b">
                          {`${f}s`.toUpperCase()}
                        </h1>
                        {Object.keys(creatives[brand][f])?.map(
                          (g: any, j: any) => (
                            <div key={j} className="py-2">
                              <h1 className="text-[10px] py-1">
                                Resolution: {g}
                              </h1>
                              <div className="grid grid-cols-3 gap-1">
                                {creatives[brand][f][g]?.map(
                                  (l: any, y: any) => (
                                    <div
                                      key={y}
                                      className="w-full border rounded"
                                      onClick={() => {
                                        setMediaFiles((prev: any) => {
                                          if (
                                            mediaFiles
                                              ?.map((file: any) => file._id)
                                              .includes(l._id)
                                          ) {
                                            return mediaFiles?.filter(
                                              (file: any) => file._id !== l._id
                                            );
                                          } else {
                                            return [...prev, l];
                                          }
                                        });
                                      }}
                                    >
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
                                            {Number(l?.duration)?.toFixed(2)}{" "}
                                            seconds{" "}
                                          </h1>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-2 w-full bottom-0">
          {/* {!loadingUpload && ( */}
          <PrimaryButton
            title="Upload"
            rounded="rounded"
            width="w-full"
            action={createCampaignFromMedia}
            disabled={isLoading}
            loading={isLoading}
            loadingText="Updating..."
          />
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
