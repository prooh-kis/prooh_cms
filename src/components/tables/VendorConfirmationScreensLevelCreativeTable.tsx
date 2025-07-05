import { NoDataView } from "../../components/molecules/NoDataView";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { formattedINR } from "../../utils/formatValue";
import React, { useMemo } from "react";
import clsx from "clsx";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import "./index.css";
import { CustomRadio } from "../../components/atoms/CustomRadio";
interface ScreenItem {
  screenId: string;
  screenName: string;
  address: string;
  cost: number;
  slotAvailable: number;
  status?: "Approved" | "Rejected" | null;
  creatives?: any[];
}

interface VendorConfirmationScreensLevelCreativeTableProps {
  screenList: ScreenItem[];
  loading?: boolean;
  setScreenList: (list: ScreenItem[]) => void;
  handleOpenCreationModel: (data: any) => void;
}

export const VendorConfirmationScreensLevelCreativeTable = ({
  screenList,
  loading = false,
  setScreenList,
  handleOpenCreationModel,
}: VendorConfirmationScreensLevelCreativeTableProps) => {
  const handleStatusChange = (
    index: number,
    status: "Approved" | "Rejected"
  ) => {
    const updatedList = [...screenList];
    updatedList[index].status =
      updatedList[index].status === status ? null : status;
    setScreenList(updatedList);
  };

  const getApprovedCount = useMemo(() => {
    return screenList?.reduce((accum: number, current: ScreenItem) => {
      return accum + (current?.status === "Approved" ? 1 : 0);
    }, 0);
  }, [screenList]);

  const getRejectedCount = useMemo(() => {
    return screenList?.reduce((accum: number, current: ScreenItem) => {
      return accum + (current?.status === "Rejected" ? 1 : 0);
    }, 0);
  }, [screenList]);

  return (
    <div className="rounded p-4 mb-1 w-full bg-white">
      <div className="flex flex-row justify-between">
        <h1 className="text-[14px] font-semibold text-[#0E212E] leading-[100%] pb-4">
          Screens for Creative approval
        </h1>
      </div>
      <div className="w-full pb-2">
        <MultiColorLinearBar2
          delivered={screenList?.reduce(
            (accum: number, current: ScreenItem) => {
              return accum + (current?.status === "Approved" ? 1 : 0);
            },
            0
          )}
          expected={screenList?.length || 0}
          total={screenList?.length || 0}
          deliveredColor="bg-[#129BFF]"
        />
      </div>

      {/* Table Header */}
      <div className="w-full">
        <table className="w-full">
          <thead className="bg-[#F7F7F7] w-full">
            <tr className="grid grid-cols-12 w-full h-[40px]">
              <th className="col-span-4 flex items-center px-2">
                <div className="w-full grid grid-cols-5">
                  <span className="col-span-1 text-[12px] text-[#21394F]">
                    S.N.
                  </span>
                  <span className="col-span-4  text-start text-[12px] text-[#21394F]">
                    Screen Name
                  </span>
                </div>
              </th>
              <th className="col-span-2 flex items-center text-[12px] text-[#21394F]">
                Location
              </th>
              <th className="col-span-1 flex items-center justify-center gap-1 text-[12px] text-[#21394F]">
                Final Cost
              </th>
              <th className="col-span-2 flex items-center justify-center gap-1 text-[12px] text-[#21394F]">
                Slots Available
              </th>
              <th className="col-span-1 flex items-center justify-center gap-1 text-[12px] text-[#21394F]">
                Creatives
              </th>
              <th className="col-span-2 flex items-center px-2">
                <div className="w-full grid grid-cols-2">
                  <span className="text-[12px] text-[#21394F]">
                    Approve{" "}
                    <span className="text-[#16A34A]">({getApprovedCount})</span>
                  </span>
                  <span className="text-[12px] text-[#21394F]">
                    Reject{" "}
                    <span className="text-[#ef4444]">({getRejectedCount})</span>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Table Body */}
      <div className="overflow-y-auto h-[28vh]">
        <table className="w-full">
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={12} className="py-4">
                  <LoadingScreen />
                </td>
              </tr>
            ) : screenList?.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-4">
                  <NoDataView />
                </td>
              </tr>
            ) : (
              screenList.map((screen, index) => (
                <tr
                  key={screen.screenId || index}
                  className={clsx(
                    "grid grid-cols-12 border-b h-[45px] hover:bg-gray-200 items-center"
                  )}
                >
                  {/* Screen Info */}
                  <td className="col-span-4 px-2">
                    <div className="grid grid-cols-5">
                      <span className="col-span-1 text-[12px] text-[#21394F] truncate text-center">
                        {index + 1}
                      </span>
                      <span className="col-span-4 text-start text-[12px] text-[#21394F] font-normal truncate text-center">
                        {screen.screenName}
                      </span>
                    </div>
                  </td>
                  <td className="col-span-2 text-[12px] text-[#21394F] font-normal truncate">
                    {screen.address}
                  </td>
                  <td className="col-span-1 text-center text-[12px] text-[#21394F] font-normal">
                    {formattedINR(screen.cost) || "N/A"}
                  </td>
                  <td className="col-span-2 text-center text-[12px] text-[#21394F] font-normal">
                    {screen.slotAvailable} slots
                  </td>
                  <div
                    className="col-span-1 text-center text-[12px] text-[#21394F] font-normal"
                    onClick={() =>
                      handleOpenCreationModel({
                        screenName: screen?.screenName,
                        screenId: screen.screenId,
                        creatives: screen.creatives,
                      })
                    }
                  >
                    <i className="fi fi-sr-photo-video text-[20px] text-violet-500 flex justify-center"></i>
                  </div>

                  {/* Approval/Reject Controls */}
                  <td className="col-span-2 px-2 pl-10">
                    <div className="grid grid-cols-2 gap-4">
                      <CustomRadio
                        checked={screen.status === "Approved"}
                        onChange={() => handleStatusChange(index, "Approved")}
                      />
                      <CustomRadio
                        checked={screen.status === "Rejected"}
                        onChange={() => handleStatusChange(index, "Rejected")}
                        borderColor="#ef4444"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
