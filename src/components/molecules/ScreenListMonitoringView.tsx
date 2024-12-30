import { useState } from "react";
import { generateColorFromAlphabet } from "../../utils/colorUtils";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { UPLOAD_CREATIVE_SCREEN_DATA } from "../../constants/localStorageConstants";
import { useDispatch } from "react-redux";
import { getScreenDataUploadCreativeAction } from "../../actions/campaignAction";
import {
  convertDataTimeToLocale,
  convertIntoDateAndTime,
  getTimeDifferenceInMin,
} from "../../utils/dateAndTimeUtils";
import { useSelector } from "react-redux";

export function ScreenListMonitoringView({
  screen,
  noImages,
  setOpenCreativeEndDateChangePopup,
  campaignCreated,
  handleChangeCampaignStatus,
  handleGetCampaignLog,
  showOption,
  campaign,
}: any) {
  const dispatch = useDispatch<any>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const getScreenClassName = (screen: any) => {
    if (screen?.screenCode) {
      if (getTimeDifferenceInMin(screen?.lastActive) < 15)
        return "border w-3 h-3 bg-green-500 rounded-full justify-end";
      else return "border w-3 h-3 bg-yellow-500 rounded-full justify-end";
    } else return "border w-3 h-3 bg-red-500 rounded-full justify-end";
  };

  const getClassNameByStatus = () => {
    let className = "text-[12px] truncate";
    if (campaign?.status === "Active") {
      className += " text-green-500";
    } else if (campaign?.status === "Pause") {
      className += " text-orange-500";
    } else if (campaign?.status === "Deleted") {
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
            className="rounded h-24 w-32"
            src={screen?.images[0]}
            alt={screen?._id}
          />
        )}
        <div className="truncate">
          <h1 className="text-[16px] font-semibold truncate">
            {screen?.screenName}
          </h1>
          <h1 className="text-[12px] text-gray-500 truncate">
            {screen?.location?.address || screen?.location},{" "}
            {screen?.location?.city || screen?.city}
          </h1>
          <h1 className="text-[8px]">
            End Date:{" "}
            {convertDataTimeToLocale(
              campaignCreated?.campaigns?.filter(
                (c: any) => c.screenId === screen?._id
              )[0]?.endDate
            )}
          </h1>

          <div className="flex flex-row gap-2 items-center px-1">
            <h1 className="text-[10px] text-blue-500">
              Last Active:{" "}
              {convertIntoDateAndTime(screen?.lastActive) || "Not Available"}
            </h1>
            <div className={getScreenClassName(screen)} />
          </div>
          <h1 className={getClassNameByStatus()}>
            {campaignCreated?.campaigns?.filter(
              (c: any) => c.screenId === screen?._id
            )[0]?.status ?? "No Creatives"}
          </h1>
        </div>
        <div className="relative inline-block ml-auto">
          {showOption && (
            <i
              className="fi fi-bs-menu-dots cursor-pointer"
              onClick={() => setShowMenu(true)}
            ></i>
          )}

          {campaignCreated && showMenu && userInfo?.userRole === "primary" && (
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
                          campaign?.creatives?.standardDayTimeCreatives,
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

                {campaign?.status === "Active" && (
                  <li
                    onClick={() => {
                      handleChangeCampaignStatus("Pause", campaign?._id);
                    }}
                    className="px-4 py-2 text-gray-700 hover:bg-sky-600 hover:text-white cursor-pointer"
                  >
                    Pause
                  </li>
                )}
                {(campaign?.status === "Active" ||
                  campaign?.status === "Pause") && (
                  <li
                    onClick={() => {
                      handleChangeCampaignStatus("Delete", campaign?._id);
                    }}
                    className="px-4 py-2 text-gray-700 hover:bg-sky-600 hover:text-white cursor-pointer"
                  >
                    Delete
                  </li>
                )}
                {(campaign?.status === "Deleted" ||
                  campaign?.status === "Pause" ||
                  campaign?.status === "Completed") && (
                  <li
                    onClick={() => {
                      handleChangeCampaignStatus("Active", campaign?._id);
                    }}
                    className="px-4 py-2 text-gray-700 hover:bg-sky-600 hover:text-white cursor-pointer"
                  >
                    Activate
                  </li>
                )}

                <li
                  onClick={() => {
                    handleGetCampaignLog(campaign?._id);
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-sky-600 hover:text-white cursor-pointer"
                >
                  View Log Report
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
