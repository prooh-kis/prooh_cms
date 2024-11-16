import { convertIntoDateAndTime, getTimeDifferenceInMin } from "../../utils/dateAndTimeUtils";
import clsx from "clsx";

interface ScreenListThumbnailProps {

  color: string;
  isSelected?: boolean;
  handleCardClick: () => void;
  navigate?: any;
  data: any;
}

export const CampaignListThumbnail = ({navigate, data, color, isSelected, handleCardClick}: ScreenListThumbnailProps): JSX.Element => {
  const getCampaignClassName = (campaign: any) => {
    // if (screen?.status === "Active") {
    //   if (getTimeDifferenceInMin(screen?.lastActive) < 15)
    //     return "border w-3 h-3 bg-green-500 rounded-full justify-end";
    //   else return "border w-3 h-3 bg-yellow-500 rounded-full justify-end";
    // } else return "border w-3 h-3 bg-red-500 rounded-full justify-end";
  };
  return (
    <div 
      onClick={handleCardClick}
      onDoubleClick={navigate}
      className={clsx(
        "border rounded-[12px] w-[240px] h-[260px] p-2 flex justify-center items-center transition-colors cursor-pointer",
        {
          [`hover:border-primaryButton hover:shadow-lg`]: !isSelected,  // Apply hover color if not clicked
          [`border-primaryButton`]: isSelected,         // Apply border color if clicked
        }
      )}
    >
      <div className="py-0">
        <div className="w-full flex justify-center">
          <div 
            className="rounded w-auto h-40 flex justify-center items-center"
            style={{ backgroundColor: `${color}10` }}  // Use inline styles for dynamic background color
          >
            {/* <img className="h-full rounded" src={data.images[0]} alt={data._id} /> */}

          </div>
        </div>
            
        <div className="flex justify-center truncate">
          
          <div className="px-1 w-full truncate">
            <div className="flex justify-start items-center">
              <h1 className="text text-[12px] font-semibold">
                {data.campaignName}
              </h1>
              
            </div>
            <div className="px-0 flex justify-between items-center truncate">
              <p className="text text-[12px] text-secondaryText text-center text-wrap truncate">
                {data.brandName}
              </p>
              <p className="text text-[12px] text-secondaryText text-center text-wrap truncate">
                , {data.duration} sec
              </p>
            </div>
            <div className="px-0 flex justify-between items-center truncate">
              <p className="text text-[12px] text-green-500 text-center text-wrap truncate">
                On {data.screens.length} screens
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center px-1">
          <h1 className="text-[10px] text-blue-500">
            {/* Last Active: {convertIntoDateAndTime(data?.lastActive) || "Not Available"} */}
          </h1>
          {/* <div className={getScreenClassName(data)} /> */}
        </div>
      </div>
    </div>
  )
}
