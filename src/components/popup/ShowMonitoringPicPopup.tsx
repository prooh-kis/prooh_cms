import { MonitoringPic } from "../segments/MonitoringPic";
import { useEffect } from "react";

export const ShowMonitoringPicPopup = (props: any) => {
  const { currentSite } = props;
  useEffect(() => {
    if (props?.open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [props?.open]);

  if (!props?.open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-full max-w-full relative overflow-auto max-h-auto "
        style={{ height: "80vh", width: "70vw" }}
      >
        <div className="flex justify-between">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-[16px] font-semibold">Campaign Monitoring</h1>
            <i className="fi fi-br-cross" onClick={() => props?.onClose()}></i>
          </div>
        </div>
        <div className="mt-4">
          <MonitoringPic
            result={currentSite?.monitoringData || []}
            className="grid-cols-4"
            cardHeight="h-[200px]"
          />
        </div>
      </div>
    </div>
  );
};
