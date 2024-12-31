import React, { useEffect } from "react";
import { convertDataTimeToLocale } from "../../utils/dateAndTimeUtils";
// import { FileExporter } from "../FileExpoter";
import { Skeleton } from "antd";

export const ScreenLogReportPopup = React.memo(function ScreenLogReport(
  props: any
) {
  const { screenLogs, screenName, loading, onClose } = props;

  useEffect(() => {}, [props?.isOpen]);

  if (!props?.isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-white p-4  shadow-lg w-9/12 max-w-full relative overflow-auto max-h-auto no-scrollbar"
        style={{ height: "70vh", width: "80vw" }}
      >
        <div className="flex justify-between">
          <h1 className="py-4 text-lg font-bold">
            Screen logs report{" "}
            <span className="text-green-500">{screenLogs?.length}</span>
          </h1>
          <i
            onClick={() => onClose(false)}
            className="fi fi-br-circle-xmark"
          ></i>
        </div>

        {loading ? (
          <Skeleton active={true} />
        ) : (
          <div className="auto">
            {/* <FileExporter
              excelData={screenLogs?.map((c: any, i: any) => {
                return {
                  "SN.": i + 1,
                  "Time of playback": convertDataTimeToLocale(c.time),
                  "Device Status": c.screenStatus,
                  "Campaign Name": c?.campaignName || "N/A",
                  "Brand Name": c?.brandName || "N/A",
                };
              })}
              fileName={`${screenName}`}
            /> */}
            <table className="auto ">
              <thead>
                <tr>
                  <th className="border px-4">Sl. No</th>
                  <th className="border px-4">Log Time</th>
                  <th className="border px-4">Device Time</th>
                  <th className="border px-4">Device Status</th>
                  <th className="border px-4">Campaign Name</th>
                  <th className="border px-4">Media</th>
                  <th className="border px-4">Brand Name</th>
                </tr>
              </thead>
              <tbody className="overflow-auto">
                {screenLogs?.map((c: any, i: any) => (
                  <tr className="" key={i}>
                    <td className="border px-4">{i + 1}</td>
                    <td className="border px-4">
                      {convertDataTimeToLocale(c.logTime)}
                    </td>
                    <td className="border px-4">
                      {convertDataTimeToLocale(c.deviceTime)}
                    </td>
                    <td className="border px-4">{c.screenStatus}</td>
                    <td className="border px-4">{c?.campaignName || "N/A"}</td>
                    <td className="border px-4">
                      {c?.mediaId?.split("_")[1] || "N/A"}
                    </td>
                    <td className="border px-4">{c?.brandName || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
});
