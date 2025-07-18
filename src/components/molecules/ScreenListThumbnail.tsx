import {
  convertIntoDateAndTime,
  getTimeAgo,
  getTimeDifferenceInMin,
} from "../../utils/dateAndTimeUtils";
import clsx from "clsx";

interface ScreenListThumbnailProps {
  color?: string;
  isSelected?: boolean;
  handleCardClick?: () => void;
  data?: any;
}

export const ScreenListThumbnail = ({
  data,
  color,
  isSelected,
  handleCardClick,
}: ScreenListThumbnailProps): JSX.Element => {
  const getScreenClassName = (screen: any) => {
    if (screen?.screenCode) {
      if (getTimeDifferenceInMin(screen?.lastActive) < 15)
        return "border w-3 h-3 bg-[#348730] rounded-full justify-end";
      else return "border w-3 h-3 bg-yellow-500 rounded-full justify-end";
    } else return "border w-3 h-3 bg-red-500 rounded-full justify-end";
  };
  return (
    <div
      onClick={handleCardClick}
      // onDoubleClick={navigate}
      className={clsx(
        "rounded-[4px] h-[280px] p-4 transition-colors cursor-pointer bg-white",
        {
          [`hover:shadow-lg`]: !isSelected, // Apply hover color if not clicked
          [``]: isSelected, // Apply border color if clicked
        }
      )}
    >
      <div
        className="relative rounded w-full h-40"
        style={{ backgroundColor: `${color}10` }} // Use inline styles for dynamic background color
      >
        <img
          className="h-40 w-full rounded-lg object-cover"
          src={data.images[0]}
          alt={data._id}
        />
        <div
          className="absolute bottom-1 left-1 flex flex-row gap-2 items-center text-[12px] px-4 py-1 rounded-2xl"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Transparent black background
        >
          <i className="fi fi-sr-megaphone text-[#ffffff]"></i>
          <h1 className="text-[#ffffff]">{data?.campaigns}</h1>
        </div>
        {/* <div
          className="absolute bottom-1 left-16 flex flex-row gap-2 items-center text-[12px] px-4 py-1 rounded-2xl"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Transparent black background
        >
          <i className="fi fi-sr-duration-alt text-[#ffffff]"></i>
          <h1 className="text-[#ffffff]">{data?.creativeDuration} s</h1>
        </div> */}
      </div>

      <div className="flex flex-col justify-center truncate mt-4 gap-1">
        <div className="flex flex-col justify-start items-center">
          <h1 className="text text-[14px] font-semibold w-full truncate text-ellipsis overflow-hidden">
            {data.screenName}
          </h1>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 text-[12px] items-center text-[#6B8494] truncate w-full">
            <i className="fi fi-sr-marker"></i>
            <h1 className="truncate text-wrap">
              {data?.location?.city || data?.city}
            </h1>
          </div>
        </div>
        {/* <div className="px-0 flex justify-between items-center truncate">
              <p className="text text-[12px] text-secondaryText text-center text-wrap truncate">
                {data.campaigns} Active Campaigns
              </p>
            </div> */}
        <div className="h-0.5 w-full bg-[#F1F1F1]"></div>

        <div className="flex flex-row gap-1 items-center text-[12px] text-secondaryText">
          <div className={getScreenClassName(data)} />
          <h1 className="truncate">
            {getTimeAgo(data?.lastActive)}
            {", "}
            {convertIntoDateAndTime(data?.lastActive) || "Not available"}
          </h1>
        </div>
      </div>
    </div>
  );
};
