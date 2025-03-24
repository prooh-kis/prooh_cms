import React from "react";
import { ShowMediaFile } from "./ShowMediaFIle";

export const SingleCreativeInPopup = ({ media, handleDelete }: any) => {
  return (
    <div className="flex gap-1">
      <div className="max-w-[12vw] min-w-[12vw]">
        <ShowMediaFile
          url={media?.awsURL}
          mediaType={media?.creativeType}
          width="w-full"
          height="h-[77px]"
        />
      </div>
      <div className="truncate">
        <h1 className="test-[#0E212E] text-[12px] font-semibold truncate">
          {media?.creativeName}
        </h1>
        <h1 className="test-[#434343] text-[12px]">
          {media?.extension?.split("/")[1]} {media?.duration} Sec.
        </h1>
        <div
          className="flex gap-1 text-[#A96767] text-[12px] cursor-pointer hover:opacity-[50%] pt-4"
          onClick={() => {
            handleDelete((prev: any) => {
              return prev?.filter((file: any) => file._id !== media?._id);
            });
          }}
        >
          <i className="fi fi-rs-trash"></i>
          <h1>Delete</h1>
        </div>
      </div>
    </div>
  );
};

export default SingleCreativeInPopup;
