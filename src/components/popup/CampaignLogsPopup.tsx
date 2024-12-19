import { Skeleton } from "antd";
import { DownLoadCampaignLogReport, NoDataView } from "../../components";
import React, { useEffect } from "react";
import { convertDataTimeToLocale } from "../../utils/dateAndTimeUtils";

export const CampaignLogsPopup = ({ open, onClose, logs, loading }: any) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-full max-w-full relative overflow-auto max-h-auto "
        style={{ height: "80vh", width: "50vw" }}
      >
        <div className="flex justify-between">
          <h1 className="text-[16px] font-bold">
            Campaign Logs : <span className="">{logs?.campaign?.name}</span>
          </h1>
          <i className="fi fi-br-circle-xmark" onClick={() => onClose()}></i>
        </div>
        {!loading && logs?.logs?.length > 0 && (
          <DownLoadCampaignLogReport
            campaignLog={logs?.logs}
            campaign={logs?.campaign}
          />
        )}
        {loading ? (
          <Skeleton active paragraph={{ rows: 12 }} />
        ) : logs?.logs?.length > 0 ? (
          <div className="p-2 overflow-scroll h-[60vh]">
            <table className="auto overflow-scroll  h-[20rem] ">
              <thead>
                <tr className="gap-4">
                  <th className="border p-2 ">Sl. No</th>
                  <th className="border p-2">Playback Time</th>
                  <th className="border p-2">ScreenName</th>
                  <th className="border p-2">Device Status</th>
                </tr>
              </thead>
              <tbody className="overflow-auto text-[14px]">
                {logs.logs?.map((c: any, i: any) => (
                  <tr className="" key={i}>
                    <td className="border p-2">{i + 1}</td>
                    <td className="border p-2">
                      {convertDataTimeToLocale(c.time)}
                    </td>
                    <td className="border p-2">{logs?.campaign?.screenName}</td>
                    <td
                      className={
                        c.screenStatus === "online"
                          ? "border p-2 bg-green-500 text-white font-bold"
                          : "border p-2 bg-red-500 text-white font-bold"
                      }
                    >
                      {c.screenStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NoDataView />
        )}
      </div>
    </div>
  );
};
