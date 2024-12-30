import { PrimaryButton, CalendarInput } from "../../components";
import React, { useEffect, useState } from "react";

interface ShowMediaPopupProps {
  openShowMedia?: boolean;
  onClose?: any;
  campaignCreation: any;
  isLoading: boolean;
  handleNext: any;
}

export function EditCampaignCreationAndItsSubCampaigns({
  openShowMedia,
  onClose,
  campaignCreation,
  isLoading,
  handleNext,
}: ShowMediaPopupProps) {
  const [endDate, setEndDate] = useState<any>(
    campaignCreation?.endDate?.split(".")[0]
  );
  useEffect(() => {
    if (openShowMedia) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openShowMedia]);

  if (!openShowMedia) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-[40vh] w-[30vw] p-4">
        <div
          className="relative inset-0 flex items-center justify-end gap-4"
          onClick={() => onClose()}
        >
          <i className="fi fi-br-circle-xmark"></i>
        </div>
        <h1>Edit Campaign: {campaignCreation?.campaignName}</h1>

        <div className="col-span-1 flex flex-col py-2">
          <h1 className="block text-secondaryText text-[12px]">
            Change End Date
          </h1>
          <CalendarInput
            placeholder={endDate}
            value={endDate}
            action={(e: any) => {
              setEndDate(e);
            }}
            minDate={campaignCreation?.endDate || new Date()}
            disabled={false}
          />
        </div>
        <PrimaryButton
          title="Update"
          rounded="rounded-[12px]"
          action={() => {
            handleNext(campaignCreation?._id, new Date(endDate).toISOString());
          }}
          disabled={isLoading}
          loading={isLoading}
          loadingText="updating..."
          width="w-[100vw]"
        />
      </div>
    </div>
  );
}
