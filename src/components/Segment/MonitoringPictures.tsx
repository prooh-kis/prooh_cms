
interface MonitoringPicturesProps {
  handleUploadClick: any;
  time?: any;
  setMonitoringMedia?: any;
  setMonitoringTime?: any;
  monitoringData?: any;
  screenId?: any;
  campaignId?: any;
}

export const MonitoringPictures = ({
  handleUploadClick,
  time,
  setMonitoringMedia,
  setMonitoringTime,
  monitoringData,
  screenId,
  campaignId,
}: MonitoringPicturesProps) => {

  console.log(campaignId, screenId, time)
  console.log(monitoringData);
  console.log(monitoringData?.timeWiseMonitoringData[time]["images"])


  return (
    <div className="w-full p-2">
      <h1 className="text-[12px] font-semibold">Upload {time.toUpperCase()} Pictures</h1>
      <div className="grid grid-cols-4 gap-4 my-2">
        <div className="col-span-1">
          <div className="border border-dotted bg-gray-100 rounded h-24 flex items-center justify-center"
            onClick={() => {
              setMonitoringMedia("video")
              setMonitoringTime(time);
              handleUploadClick();
            }}
          >
            {monitoringData?.timeWiseMonitoringData?.[time]["video"]?.length > 0 ? (
              <video
                className="w-full h-full"
                src={monitoringData?.timeWiseMonitoringData?.[time]["video"][0]}
              />
            ) : (
              <i className="fi fi-sr-square-plus flex items-center text-[20px] text-gray-300"></i>
            )}
          </div>
          <h1 className="text-[10px] text-gray-500 m-1">Video</h1>
        </div>
        <div className="col-span-1">
          <div className="border border-dotted bg-gray-100 rounded h-24 flex items-center justify-center"
            onClick={() => {
              setMonitoringMedia("images")
              setMonitoringTime(time);
              handleUploadClick();
            }}
          >
             {monitoringData?.timeWiseMonitoringData?.[time]["images"]?.length > 0 ? (
              <img
                src={monitoringData?.timeWiseMonitoringData?.[time]["images"][0]} alt="images"
                className="w-full h-full"
              />
            ) : (
              <i className="fi fi-sr-square-plus flex items-center text-[20px] text-gray-300"></i>
            )}
          </div>
          <h1 className="text-[10px] text-gray-500 m-1">Image</h1>
        </div>
        <div className="col-span-1">
          <div className="border border-dotted bg-gray-100 rounded h-24 flex items-center justify-center"
            onClick={() => {
              setMonitoringMedia("geoTag");
              setMonitoringTime(time);
              handleUploadClick();
            }}
          >
             {monitoringData?.timeWiseMonitoringData?.[time]["geoTag"]?.length > 0 ? (
              <img
                src={monitoringData?.timeWiseMonitoringData?.[time]["geoTag"][0]} alt="geoTag"
                className="w-full h-full"
              />
            ) : (
              <i className="fi fi-sr-square-plus flex items-center text-[20px] text-gray-300"></i>
            )}
          </div>
          <h1 className="text-[10px] text-gray-500 m-1">Geotag</h1>
        </div>
        {time !== "night"&& (
          <div className="col-span-1">
            <div className="border border-dotted bg-gray-100 rounded h-24 flex items-center justify-center"
              onClick={() => {
                setMonitoringMedia("newspaper")
                setMonitoringTime(time);
                handleUploadClick();
              }}
            >
              {monitoringData?.timeWiseMonitoringData?.[time]["newspaper"]?.length > 0 ? (
                <img
                  src={monitoringData?.timeWiseMonitoringData?.[time]["newspaper"][0]} alt="newspaper"
                  className="w-full h-full"
                />
              ) : (
                <i className="fi fi-sr-square-plus flex items-center text-[20px] text-gray-300"></i>
              )}
            </div>
            <h1 className="text-[10px] text-gray-500 m-1">Newpaper</h1>
          </div>
        )}
      </div>
    </div>
  )
}