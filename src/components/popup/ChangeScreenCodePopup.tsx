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

interface ChangeScreenCodePopupProps {
  openScreenCodePopup?: any;
  setOpenScreenCodePopup?: any;
}

export function ChangeScreenCodePopup({
  openScreenCodePopup,
  setOpenScreenCodePopup,
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
    if (openScreenCodePopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openScreenCodePopup]);

  useEffect(() => {
    if (successChange) {
      message.success("Screen Code updated successfully...");
      setOpenScreenCodePopup(false);
    }
    if (userInfo) {
      dispatch(getAllScreensDetailsAction({ userId: userInfo?.primaryUserId }));
    }
  }, [dispatch, userInfo, successChange, setOpenScreenCodePopup]);

  if (!openScreenCodePopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-1/2 w-1/2 p-1">
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={() => setOpenScreenCodePopup(false)}
        >
          <i className="fi fi-br-circle-xmark"></i>
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
              <DropdownInput
                inputType="text"
                placeHolder="Select Screens"
                height="h-12"
                options={getDataFromLocalStorage(ALL_SCREENS_LIST)
                  ?.list?.sort((a: any, b: any) => a.screenName - b.screenName)
                  ?.map((screen: any) => {
                    return { label: screen.screenName, value: screen._id };
                  })}
                selectedOption={selectedOption}
                setSelectedOption={(e: any) => setSelectedOption(e)}
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
                })
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
