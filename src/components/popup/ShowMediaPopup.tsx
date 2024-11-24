import { ShowMediaFile } from "../../components/molecules/ShowMediaFIle";
import React, { useEffect, useState } from "react";


interface ShowMediaPopupProps {
  openShowMedia?: boolean;
  media?: any
  onClose?: any;
  // removeAddedCreativeFromCampaign?: any;
}

export function ShowMediaPopup({
  openShowMedia,
  media,
  onClose,
  // removeAddedCreativeFromCampaign
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

      <div className="border bg-white rounded-[10px] h-3/4 w-3/4">
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={() => onClose()}
        >
          <i className="fi fi-br-circle-xmark"></i>
        </div>
  
        <div className="grid grid-cols-2 flex p-2 justify-center gap-4 w-full h-full">
          {media?.map((l: any, index: any) => (
            <div key={index} className="col-span-1 p-1 h-40 w-auto" 
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

