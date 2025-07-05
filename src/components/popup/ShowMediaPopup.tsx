import { NoDataView } from "../../components/molecules/NoDataView";
import { ShowMediaFile } from "../../components/molecules/ShowMediaFIle";
import React, { useEffect } from "react";

interface ShowMediaPopupProps {
  openShowMedia?: boolean;
  media?: any;
  onClose?: any;
  screenName: string;
  removeAddedCreativeFromCampaign?: any;
  showDelete?: any;
}

export function ShowMediaPopup({
  openShowMedia,
  media,
  onClose,
  screenName,
  removeAddedCreativeFromCampaign,
  showDelete = true,
}: ShowMediaPopupProps) {
  useEffect(() => {
    if (openShowMedia) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openShowMedia]);

  if (!openShowMedia) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-[90vh] w-3/4 p-4">
        <div
          className="relative inset-0 flex items-center justify-end gap-4"
          onClick={() => onClose()}
        >
          <i className="fi fi-rr-cross-small"></i>
        </div>
        <div className="flex justify-between w-full">
          <h1 className="text-[18px] font-semibold">Screen : {screenName}</h1>
          <h1 className="text-[18px] font-semibold pr-8">
            Total creatives : {media?.length}
          </h1>
        </div>
        {media?.length === 0 ? (
          <NoDataView bg="bg-gray-100" />
        ) : (
          <div className="grid grid-cols-3 flex justify-center gap-4 w-full h-[55vh]  overflow-y-auto bg-gray-100 p-2 ">
            {media?.map((l: any, index: any) => (
              <div
                key={index}
                className="col-span-1 p-1 h-[180px] w-auto bg-white rounded-lg"
                // onClick={() => removeAddedCreativeFromCampaign(l)}
              >
                <ShowMediaFile
                  url={l.url}
                  mediaType={l?.type?.split("/")[0]}
                  key={index}
                  height="h-full"
                  width="w-full"
                  rounded="rounded-[12px]"
                />
                {showDelete && (
                  <div
                    className="flex gap-1 text-[#A96767] text-[12px] cursor-pointer hover:opacity-[50%] pt-4"
                    onClick={() => {
                      removeAddedCreativeFromCampaign(l.url);
                    }}
                  >
                    <i className="fi fi-rs-trash"></i>
                    <h1>Delete</h1>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
