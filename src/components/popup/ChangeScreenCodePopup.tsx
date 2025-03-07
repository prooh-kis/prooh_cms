import { useDispatch } from "react-redux";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import React, { useEffect, useState } from "react";
import {
  getAllScreensDetailsAction,
  screenCodeChangeAction,
} from "../../actions/screenAction";
import { useSelector } from "react-redux";
import { ALL_SCREENS_LIST } from "../../constants/localStorageConstants";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { message } from "antd";
import { SearchableSelect } from "../../components/atoms/SearchableSelect";
import { SCREEN_CODE_CHANGE_RESET } from "../../constants/screenConstants";
import { SCREEN_CODE_UPDATE_CMS, SCREEN_GET_ALL_SCREEN_DATA } from "../../constants/userConstants";

interface ChangeScreenCodePopupProps {
  open?: any;
  onClose?: any;
}

export function ChangeScreenCodePopup({
  open,
  onClose,
}: ChangeScreenCodePopupProps) {
  const dispatch = useDispatch<any>();

  const [screenCode, setScreenCode] = useState<any>("");
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allScreensDataGet = useSelector(
    (state: any) => state.allScreensDataGet
  );
  const {
    loading: loadingAllScreens,
    error,
    data: allScreens,
  } = allScreensDataGet;

  const screenCodeChange = useSelector((state: any) => state.screenCodeChange);
  const {
    loading: loadingChange,
    error: errorChange,
    success: successChange,
  } = screenCodeChange;

  useEffect(() => {
    if (successChange) {
      message.success("Screen Code updated successfully...");
      dispatch({ type: SCREEN_CODE_CHANGE_RESET });
      onClose();
    }
    if (errorChange) {
      alert(errorChange)
      dispatch({ type: SCREEN_CODE_CHANGE_RESET });
    }
    if (userInfo) {
      dispatch(getAllScreensDetailsAction({
        userId: userInfo?.primaryUserId,
        event: SCREEN_GET_ALL_SCREEN_DATA
      }));
    }
  }, [dispatch, userInfo, successChange, onClose, errorChange]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-1/2 w-1/2 p-1">
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={() => onClose()}
        >
          <i className="fi fi-rr-cross-small"></i>
        </div>
        <div className="p-2">
          <h1 className="text-[14px]">Change screen code to play campaigns</h1>
          <div className="p-2">
            <label className="block text-secondaryText text-[14px] mb-2">
              Screen Code
            </label>
            <PrimaryInput
              inputType="string"
              placeholder="Screen Code"
              value={screenCode}
              action={(e: any) => {
                setScreenCode(e);
              }}
            />
          </div>
          <div className="p-2">
            <label className="block text-secondaryText text-[14px] mb-2">
              Screens
            </label>
            {loadingAllScreens ? (
              <h1>Loading Screens</h1>
            ) : (
              <SearchableSelect
                placeholder="Select Screens"
                options={getDataFromLocalStorage(ALL_SCREENS_LIST)
                  ?.list?.sort((a: any, b: any) => a.screenName - b.screenName)
                  ?.map((screen: any) => {
                    return { label: screen.screenName, value: screen._id };
                  })}
                value={selectedOption}
                onChange={(e: any) => setSelectedOption(e)}
              />
            )}
          </div>
        </div>
        <div className="w-full p-4">
          <PrimaryButton
            rounded="rounded"
            width="w-full"
            title="Update Code"
            disabled-={loadingChange}
            loading={loadingChange}
            loadingText="Updating..."
            action={() =>
              dispatch(
                screenCodeChangeAction({
                  id: selectedOption,
                  screenCode: screenCode,
                  screenIds: [selectedOption],
                  event: SCREEN_CODE_UPDATE_CMS,
                })
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
