import { generateColorFromAlphabet } from "../../utils/colorUtils";
import {
  convertDataTimeToLocale,
  convertIntoDateAndTime,
  getTimeDifferenceInMin,
} from "../../utils/dateAndTimeUtils";
import clsx from "clsx";

interface ScreenListThumbnailProps {
  color: string;
  isSelected?: boolean;
  handleCardClick: () => void;
  onDoubleClick?: any;
  data: any;
  index?: any;
}

export const CampaignListView = ({
  onDoubleClick,
  data,
  color,
  isSelected,
  handleCardClick,
  index
}: ScreenListThumbnailProps): JSX.Element => {
  const getBgColors = (index: any) => {
    const colors = ["bg-[#EF444450]", "bg-[#F59E0B50]", "bg-[#EAB30850]", "bg-[#22C55E50]", "bg-[#06B6D450]", "bg-[#3B82F650]", "bg-[#6366F150]", "bg-[#8B5CF650]", "bg-[#78DCCA50]", "bg-[#FF77E950]", "bg-[#3AB7BF50]", "bg-[#3F3CBB50]", "bg-[#22C55E50]", "bg-[#06B6D450]", "bg-[#3B82F650]", "bg-[#6366F150]", "bg-[#EF444450]", "bg-[#F59E0B50]" ];
    return colors[index];
  }
  return (
    <div
      onClick={handleCardClick}
      onDoubleClick={onDoubleClick}
      className={clsx(
        "rounded w-full h-auto my-1 p-4 flex items-center transition-colors cursor-pointer bg-white",
        {
          [`hover:border-primaryButton hover:shadow-lg`]: !isSelected, // Apply hover color if not clicked
          [`border-primaryButton`]: isSelected, // Apply border color if clicked
        }
      )}
    >
      <div className="py-0 w-full flex justify-between items-center">
        <div className="flex gap-1">
          <div
            className={`rounded flex justify-center items-center w-20 ${getBgColors(data?.brandName?.split(" ")[0]?.split("")?.length)}`}
          >
            <h1 className="text-[40px] text-white font-black">
              {data.brandName.split("")[0]}
            </h1>
          </div>
          <div className="flex">
            <div className="px-1 w-full truncate flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <h1 className="text text-[14px] font-semibold">
                  {data.campaignName}
                </h1>
                <div className="px-0 flex justify-between items-center">
                  <p className="text text-[12px] text-secondaryText text-center">
                    {data.brandName}
                  </p>
                  <p className="text text-[12px] text-secondaryText text-center">
                    , {data.duration} days
                  </p>
                </div>
              </div>

              <div className="px-0 flex justify-between items-center truncate">
                <p className="text text-[12px] text-secondaryText text-center">
                  On {data.screens?.length} screens
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center pr-8">
          <div className="flex gap-1 items-center">
            <i className="fi fi-br-hourglass-start text-[#68879C] text-[12px] flex items-center"></i>
            <h1 className="text-[12px] text-[#68879C]">
              : {convertDataTimeToLocale(data.startDate)}
            </h1>
          </div>
          <div className="flex gap-1 items-center">
            <i className="fi fi-br-hourglass-end text-red-500 text-[12px] flex items-center"></i>
            <h1 className="text-[12px] text-[#68879C]">
              : {convertDataTimeToLocale(data.endDate)}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
