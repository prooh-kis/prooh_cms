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
  navigate?: any;
  data: any;
}

export const CampaignListView = ({
  navigate,
  data,
  color,
  isSelected,
  handleCardClick,
}: ScreenListThumbnailProps): JSX.Element => {
  return (
    <div
      onClick={handleCardClick}
      onDoubleClick={navigate}
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
            className={`rounded flex justify-center items-center w-20 bg-[#F6F6F6] bg-[${
              generateColorFromAlphabet(data.brandName.split("")[0], 0) ||
              "#F6F6F6"
            }]`}
          >
            <h1 className="text-[40px] text-gray-400 font-black">
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
