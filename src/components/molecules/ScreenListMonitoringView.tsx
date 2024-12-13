import { useState } from "react";
import { generateColorFromAlphabet } from "../../utils/colorUtils";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { UPLOAD_CREATIVE_SCREEN_DATA } from "../../constants/localStorageConstants";
import { useDispatch } from "react-redux";
import { getScreenDataUploadCreativeAction } from "../../actions/campaignAction";

export function ScreenListMonitoringView({
  screen,
  noImages,
  setOpenCreativeEndDateChangePopup,
  campaignCreated,
  handleChangeCampaignStatus,
}: any) {
  const dispatch = useDispatch<any>();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const getClassNameByStatus = () => {
    let className = "text-[12px] truncate";
    if (
      campaignCreated?.campaigns?.filter(
        (c: any) => c.screenId === screen._id
      )[0]?.status === "Active"
    ) {
      className += " text-green-500";
    } else if (
      campaignCreated?.campaigns?.filter(
        (c: any) => c.screenId === screen._id
      )[0]?.status === "Pause"
    ) {
      className += " text-orange-500";
    } else if (
      campaignCreated?.campaigns?.filter(
        (c: any) => c.screenId === screen._id
      )[0]?.status === "Deleted"
    ) {
      className += " text-yellow-500";
    } else {
      className += " text-blue-500";
    }
    return className;
  };

  return (
    <div className="p-1" key={screen?._id}>
      <div className="flex gap-2 p-2 hover:bg-gray-100 hover:rounded">
        {!noImages && (
          <img
            className="rounded h-16 w-20"
            src={screen?.images[0]}
            alt={screen?._id}
          />
        )}
        <div className="truncate">
          <h1 className="text-[16px] font-semibold truncate">
            {screen?.screenName}
          </h1>
          <h1 className="text-[12px] text-gray-500 truncate">
            {screen?.location.address || screen?.location},{" "}
            {screen.location.city || screen.city}
          </h1>
          <h1 className={getClassNameByStatus()}>
            {campaignCreated?.campaigns?.filter(
              (c: any) => c.screenId === screen._id
            )[0]?.status ?? "No Creatives"}
          </h1>
        </div>
        <div className="relative inline-block ml-auto">
          <i
            className="fi fi-bs-menu-dots cursor-pointer"
            onClick={() => setShowMenu(true)}
          ></i>

          {campaignCreated && showMenu && (
            <div
              onMouseLeave={() => setShowMenu(false)}
              className="absolute z-10 mt-2 w-[150px] bg-white border border-gray-300 rounded-md shadow-lg right-0 text-sm text-black-1000"
            >
              <ul className="border rounded ">
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-sky-600 hover:text-white"
                  onClick={() => {
                    if (
                      confirm(`Are you sure you want to edit the campaign???`)
                    ) {
                        saveDataOnLocalStorage(UPLOAD_CREATIVE_SCREEN_DATA, {
                          [`${campaignCreated?._id}`]:
                            campaignCreated?.campaigns?.filter(
                              (c: any) => c.screenId === screen._id
                            )[0]?.creatives?.standardDayTimeCreatives,
                        });
                      dispatch(
                        getScreenDataUploadCreativeAction({
                          id: campaignCreated?._id,
                        })
                      );
                      setOpenCreativeEndDateChangePopup(true);
                    }
                  }}
                >
                  Edit
                </li>

                {campaignCreated?.campaigns?.filter(
                  (c: any) => c.screenId === screen._id
                )[0]?.status === "Active" && (
                  <li
                    onClick={() => {
                      handleChangeCampaignStatus("Pause", screen._id);
                    }}
                    className="px-4 py-2 text-gray-700 hover:bg-sky-600 hover:text-white cursor-pointer"
                  >
                    Pause
                  </li>
                )}
                {(campaignCreated?.campaigns?.filter(
                  (c: any) => c.screenId === screen._id
                )[0]?.status === "Active" ||
                  campaignCreated?.campaigns?.filter(
                    (c: any) => c.screenId === screen._id
                  )[0]?.status === "Pause") && (
                  <li
                    onClick={() => {
                      handleChangeCampaignStatus("Delete", screen._id);
                    }}
                    className="px-4 py-2 text-gray-700 hover:bg-sky-600 hover:text-white cursor-pointer"
                  >
                    Delete
                  </li>
                )}
                {(campaignCreated?.campaigns?.filter(
                  (c: any) => c.screenId === screen._id
                )[0]?.status === "Deleted" ||
                  campaignCreated?.campaigns?.filter(
                    (c: any) => c.screenId === screen._id
                  )[0]?.status === "Pause" ||
                  campaignCreated?.campaigns?.filter(
                    (c: any) => c.screenId === screen._id
                  )[0]?.status === "Completed") && (
                  <li
                    onClick={() => {
                      handleChangeCampaignStatus("Active", screen._id);
                    }}
                    className="px-4 py-2 text-gray-700 hover:bg-sky-600 hover:text-white cursor-pointer"
                  >
                    Activate
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
