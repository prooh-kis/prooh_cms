interface MonitoringPicturesProps {
  handleUploadClick: any;
  time?: any;
  setMonitoringMedia?: any;
  setMonitoringTime?: any;
  monitoringData?: any;
  screenId?: any;
  campaignId?: any;
  isUsedForShow: boolean;
  setFileType: any;
  handleDownload?: any;
}

export const MonitoringPictures = ({
  handleUploadClick,
  time,
  setMonitoringMedia,
  setMonitoringTime,
  monitoringData,
  screenId,
  campaignId,
  isUsedForShow = false,
  setFileType,
  handleDownload,
}: MonitoringPicturesProps) => {
  return (
    <div className="w-full p-2">
      <div className="flex justify-between">
        <h1 className="text-[12px] font-semibold">
          Upload {time.toUpperCase()} Pictures
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-4 my-2">
        <div className="col-span-1 relative">
          <div
            className="border border-dotted bg-gray-100 rounded h-24 flex items-center justify-center"
            onClick={() => {
              setFileType("video");
              setMonitoringMedia("video");
              setMonitoringTime(time);
              handleUploadClick();
            }}
          >
            {monitoringData?.timeWiseMonitoringData?.[time]?.["video"]?.length >
            0 ? (
              <>
                <video
                  className="w-full h-full"
                  src={
                    monitoringData?.timeWiseMonitoringData?.[time]?.["video"][0]
                  }
                />
                <button
                  title="buttonB"
                  type="button"
                  className="absolute top-1 right-1 bg-white p-1 h-8 w-8 rounded-full shadow-md  hover:bg-[#129BFF] hover:text-[#FFFFFF] text-gray-600 "
                  onClick={(e) => {
                    e.stopPropagation();
                    const url =
                      monitoringData?.timeWiseMonitoringData?.[time]?.[
                        "video"
                      ][0];
                    const filename = `video-${time}.mp4`;
                    handleDownload(url, filename);
                  }}
                >
                  <i className="fi fi-sr-download text-[12px] "></i>
                </button>
              </>
            ) : isUsedForShow ? (
              <i className="fi flex items-center text-[20px] text-[#D6D2D2]"></i>
            ) : (
              <i className="fi fi-sr-square-plus flex items-center text-[20px] text-[#D6D2D2]"></i>
            )}
          </div>
          <h1 className="text-[10px] text-gray-500 m-1">Video</h1>
        </div>
        <div className="col-span-1 relative">
          <div
            className="border border-dotted bg-gray-100 rounded h-24 flex items-center justify-center"
            onClick={() => {
              setFileType("image");
              setMonitoringMedia("images");
              setMonitoringTime(time);
              handleUploadClick();
            }}
          >
            {monitoringData?.timeWiseMonitoringData?.[time]["images"]?.length >
            0 ? (
              <>
                <img
                  src={
                    monitoringData?.timeWiseMonitoringData?.[time]["images"][0]
                  }
                  alt="images"
                  className="w-full h-full"
                />
                <button
                  title="buttonA"
                  type="button"
                  className="absolute top-1 right-1 bg-white p-1 h-8 w-8 rounded-full shadow-md  hover:bg-[#129BFF] hover:text-[#FFFFFF] text-gray-600 "
                  onClick={(e) => {
                    e.stopPropagation();
                    const url =
                      monitoringData?.timeWiseMonitoringData?.[time]?.[
                        "images"
                      ][0];
                    const filename = `image-${time}.jpg`;
                    handleDownload(url, filename);
                  }}
                >
                  <i className="fi fi-sr-download text-[12px] "></i>
                </button>
              </>
            ) : isUsedForShow ? (
              <i className="fi flex items-center text-[20px] text-[#D6D2D2]"></i>
            ) : (
              <i className="fi fi-sr-square-plus flex items-center text-[20px] text-[#D6D2D2]"></i>
            )}
          </div>
          <h1 className="text-[10px] text-gray-500 m-1">Image</h1>
        </div>
        <div className="col-span-1 relative">
          <div
            className="border border-dotted bg-gray-100 rounded h-24 flex items-center justify-center"
            onClick={() => {
              setFileType("image");
              setMonitoringMedia("geoTag");
              setMonitoringTime(time);
              handleUploadClick();
            }}
          >
            {monitoringData?.timeWiseMonitoringData?.[time]["geoTag"]?.length >
            0 ? (
              <>
                <img
                  src={
                    monitoringData?.timeWiseMonitoringData?.[time]["geoTag"][0]
                  }
                  alt="geoTag"
                  className="w-full h-full"
                />
                <button
                  title="buttonC"
                  type="button"
                  className="absolute top-1 right-1 bg-white p-1 h-8 w-8 rounded-full shadow-md  hover:bg-[#129BFF] hover:text-[#FFFFFF] text-gray-600 "
                  onClick={(e) => {
                    e.stopPropagation();
                    const url =
                      monitoringData?.timeWiseMonitoringData?.[time]?.[
                        "geoTag"
                      ][0];
                    const filename = `geotag-${time}.jpg`;
                    handleDownload(url, filename);
                  }}
                >
                  <i className="fi fi-sr-download text-[12px] "></i>
                </button>
              </>
            ) : isUsedForShow ? (
              <i className="fi flex items-center text-[20px] text-[#D6D2D2]"></i>
            ) : (
              <i className="fi fi-sr-square-plus flex items-center text-[20px] text-[#D6D2D2]"></i>
            )}
          </div>
          <h1 className="text-[10px] text-gray-500 m-1">Geotag</h1>
        </div>
        {time !== "night" && (
          <div className="col-span-1 relative">
            <div
              className="border border-dotted bg-gray-100 rounded h-24 flex items-center justify-center"
              onClick={() => {
                setFileType("image");
                setMonitoringMedia("newspaper");
                setMonitoringTime(time);
                handleUploadClick();
              }}
            >
              {monitoringData?.timeWiseMonitoringData?.[time]["newspaper"]
                ?.length > 0 ? (
                <>
                  <img
                    src={
                      monitoringData?.timeWiseMonitoringData?.[time][
                        "newspaper"
                      ][0]
                    }
                    alt="newspaper"
                    className="w-full h-full"
                  />
                  <button
                    title="buttonD"
                    type="button"
                    className="absolute top-1 right-1 bg-white p-1 h-8 w-8 rounded-full shadow-md  hover:bg-[#129BFF] hover:text-[#FFFFFF] text-gray-600 "
                    onClick={(e) => {
                      e.stopPropagation();
                      const url =
                        monitoringData?.timeWiseMonitoringData?.[time]?.[
                          "newspaper"
                        ][0];
                      const filename = `newspaper-${time}.jpg`;
                      handleDownload(url, filename);
                    }}
                  >
                    <i className="fi fi-sr-download text-[12px] "></i>
                  </button>
                </>
              ) : isUsedForShow ? (
                <i className="fi flex items-center text-[20px] text-[#D6D2D2]"></i>
              ) : (
                <i className="fi fi-sr-square-plus flex items-center text-[20px] text-[#D6D2D2]"></i>
              )}
            </div>
            <h1 className="text-[10px] text-gray-500 m-1">Newpaper</h1>
          </div>
        )}
      </div>
    </div>
  );
};
