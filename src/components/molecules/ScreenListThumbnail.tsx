import clsx from "clsx";

interface ScreenListThumbnailProps {

  color: string;
  isSelected: boolean;
  handleCardClick: () => void;
  navigate?: any;
  data: any;
}

export const ScreenListThumbnail = ({navigate, data, color, isSelected, handleCardClick}: ScreenListThumbnailProps): JSX.Element => {
  return (
    <div 
      onClick={handleCardClick}
      onDoubleClick={navigate}
      className={clsx(
        "border rounded-[20px] p-2 h-[272px] w-[360px] flex justify-center items-center transition-colors cursor-pointer",
        {
          [`hover:border-primaryButton`]: !isSelected,  // Apply hover color if not clicked
          [`border-primaryButton`]: isSelected,         // Apply border color if clicked
        }
      )}
    >
      <div className="py-[48px] ">
        <div className="w-full flex justify-center">
          <div 
            className="rounded-[40px] w-[65px] h-[65px] flex justify-center items-center"
            style={{ backgroundColor: `${color}10` }}  // Use inline styles for dynamic background color
          >
            <img className="h-20 rounded" src={data.images[0]} alt={data._id} />

          </div>
        </div>
        <div className="flex justify-center pt-5 truncate">
          <div className="px-1 truncate">
            <div className="flex justify-center items-center">
              <h1 className="text font-[16px] font-semibold">
                {data.screenName}
              </h1>
            </div>
            <div className="px-4 flex justify-center items-center truncate">
              <p className="text text-[14px] text-secondaryText text-center text-wrap truncate">
                {data.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
