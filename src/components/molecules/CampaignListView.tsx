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
        "border rounded w-full h-auto my-2 p-2 flex items-center transition-colors cursor-pointer bg-white",
        {
          [`hover:border-primaryButton hover:shadow-lg`]: !isSelected, // Apply hover color if not clicked
          [`border-primaryButton`]: isSelected, // Apply border color if clicked
        }
      )}
    >
      <div className="py-0 w-full flex justify-between items-center">
        <div className="flex gap-2">
          <div
            className={`border rounded flex justify-center items-center w-20 bg-[${
              generateColorFromAlphabet(data.brandName.split("")[0], 0) ||
              "#D7D7D750"
            }]`}
          >
            <h1 className="text-[40px] text-gray-400 font-black">
              {data.brandName.split("")[0]}
            </h1>
          </div>
          <div className="flex">
            <div className="px-1 w-full truncate">
              <div className="">
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
                <p className="text text-[12px] text-green-500 text-center text-wrap truncate">
                  On {data.screens?.length} screens
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-1 flex gap-4 items-center">
          <div>
            <div className="flex gap-2 items-center">
              <i className="fi fi-br-hourglass-start text-green-500 text-[12px] flex items-center"></i>
              <h1 className="text-[12px] text-blue-500">
                : {convertDataTimeToLocale(data.startDate)}
              </h1>
            </div>

            <div className="flex gap-2 items-center">
              <i className="fi fi-br-hourglass-end text-red-500 text-[12px] flex items-center"></i>
              <h1 className="text-[12px] text-blue-500">
                : {convertDataTimeToLocale(data.endDate)}
              </h1>
            </div>
          </div>
          <div>
            <i className="fi fi-rs-circle-ellipsis"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
