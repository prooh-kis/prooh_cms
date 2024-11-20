import { useEffect, useState } from "react";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import Fraction from "fraction.js";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { ShowMediaPopup } from "../../components/popup/ShowMediaPopup";

interface UploadCreativesTableProps {
  userInfo?: any;
  step?: any;
  setStep?: any;
  screenData?: any;
  handleScreenSelection?: (data: { screen: any; status: boolean }) => void;
  selectedScreens?: any[];
  campaignId?: any;
  openShowMedia?: any;
  setOpenShowMedia?: any;
  onClose?: any;
}

export const UploadCreativesTable = ({

  screenData,
  handleScreenSelection,
  selectedScreens = [],
  campaignId,
  openShowMedia,
  setOpenShowMedia,
  onClose,
}: UploadCreativesTableProps) => {


  const screens: any = screenData?.flatMap((data: any) => data.screens);

  const isAllSelected = screens?.length > 0 && screens?.every((screen: any) =>
    selectedScreens.some((selected) => selected.id === screen.id)
  );

  useEffect(() => {
    if (screenData) {}
  },[screenData]);

  const handleHeaderCheckboxChange = (checked: boolean) => {
    if (handleScreenSelection) {
      if (checked) {
        // Select all screens
        screens.forEach((screen: any) => {
          if (!selectedScreens.some((selected) => selected.id === screen.id)) {
            handleScreenSelection({ screen, status: true });
          }
        });
      } else {
        // Deselect all screens
        screens.forEach((screen: any) => {
          if (selectedScreens.some((selected) => selected.id === screen.id)) {
            handleScreenSelection({ screen, status: false });
          }
        });
      }
    }
  };

  return (
    <div className="w-full">
     
      <table className="w-full">
        <thead className="bg-[#EBF6FF]">
          <tr>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1">
                <CheckboxInput
                  label=""
                  textSize="12px"
                  color="#129BFF"
                  onChange={(e) => handleHeaderCheckboxChange(e)}
                  checked={isAllSelected}
                />
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Screen Name
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Network
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Ratio
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Resolution
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Slot Duration
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Repeat
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Creative
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {screens?.map((s: any, i: number) => (
            <tr key={i}>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                  <CheckboxInput
                    label=""
                    textSize="12px"
                    color="#129BFF"
                    onChange={(e) => {
                      if (handleScreenSelection) {
                        handleScreenSelection({ screen: s, status: e })
                      }
                    }}
                    checked={selectedScreens.map(
                      (selected) => selected.id
                    ).includes(s.id)}
                  />
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {s.screenName}
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {s.network || "Individual"}
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {s.ratio ||
                    `${new Fraction(
                      Number(
                        s?.resolution?.split("x")[0] /
                          s?.resolution?.split("x")[1]
                      )
                    ).n}:${new Fraction(
                      Number(
                        s?.resolution?.split("x")[0] /
                          s?.resolution?.split("x")[1]
                      )
                        .toFixed(2)
                        .toString()
                    ).d}`}
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {s.resolution}
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {s.slotDuration} seconds
                </div>
              </td>
              <td className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                  {getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.creatives
                    .filter(
                      (rb: any) => rb.screenResolution === s.resolution
                    )
                    ?.map((r: any) => r.standardDayTimeCreatives)[0]?.length > 1
                    ? "Multiple"
                    : "Single"}
                </div>
              </td>
              <td className="py-2 px-1">
                <div
                  className="flex items-center justify-center gap-1 truncate text-[12px]"
                  onClick={() => setOpenShowMedia(s)}
                >
                  {getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.creatives
                    .flatMap((r: any) => r.screenIds)
                    ?.includes(s.id)
                    ? "uploaded"
                    : "??"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
