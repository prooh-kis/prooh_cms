import { useState } from "react";

export function ScreenView({
  screen,
  noImages,
  campaignStatus,
  handleChangeCampaignStatus,
  handleEditCampaign,
}: any) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const getClassNameByStatus = () => {
    let className = "text-[12px] truncate";
    if (campaignStatus === "Active") {
      className += " text-green-500";
    } else if (campaignStatus === "Pause") {
      className += " text-orange-500";
    } else if (campaignStatus === "Deleted") {
      className += " text-yellow-500";
    } else {
      className += " text-blue-500";
    }
    console.log("classname : ", className);
    return className;
  };

  return (
    <div className="p-1" key={screen._id}>
      <div className="flex gap-2 p-2 hover:bg-gray-100 hover:rounded">
        {!noImages && (
          <img
            className="rounded h-16 max-w-24 min-w-24"
            src={screen.images[0]}
            alt={screen._id}
          />
        )}
        <div className="truncate">
          <h1 className="text-[14px] font-semibold truncate">
            {screen.screenName}
          </h1>
          <h1 className="text-[12px] text-gray-500 truncate">
            {screen.location.address || screen.location},{" "}
            {screen.location.city || screen.city}
          </h1>
          <h1 className={getClassNameByStatus()}>{campaignStatus}</h1>
        </div>
        <div className="relative inline-block ml-auto">
          <i
            className="fi fi-br-menu-dots-vertical cursor-pointer p-1"
            onClick={() => setShowMenu((pre) => !pre)}
          ></i>
          {showMenu && (
            <div
              onMouseLeave={() => setShowMenu(false)} // Close dropdown on mouse leave
              className="absolute z-10 mt-2 w-[200px] bg-white border border-gray-300 rounded-md shadow-lg right-0 text-sm text-black-1000"
            >
              <div
                onClick={() => {
                  handleEditCampaign(screen._id);
                }}
                className="px-2 py-1 text-gray-700 hover:bg-sky-600 hover:text-white cursor-pointer"
              >
                Edit Campaign
              </div>
              {campaignStatus === "Active" && (
                <div
                  onClick={() => {
                    handleChangeCampaignStatus("Pause", screen._id);
                  }}
                  className="px-2 py-1 text-gray-700 hover:bg-sky-600 hover:text-white cursor-pointer"
                >
                  Pause campaign
                </div>
              )}
              {(campaignStatus === "Active" || campaignStatus === "Pause") && (
                <div
                  onClick={() => {
                    handleChangeCampaignStatus("Delete", screen._id);
                  }}
                  className="px-2 py-1 text-gray-700 hover:bg-sky-600 hover:text-white cursor-pointer"
                >
                  Delete campaign
                </div>
              )}
              {(campaignStatus === "Deleted" || campaignStatus === "Pause") && (
                <div
                  onClick={() => {
                    handleChangeCampaignStatus("Active", screen._id);
                  }}
                  className="px-2 py-1 text-gray-700 hover:bg-sky-600 hover:text-white cursor-pointer"
                >
                  Activate Again
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
