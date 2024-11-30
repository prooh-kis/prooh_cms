import React, { useEffect } from "react";

interface CalendarPopupProps {
  openCalendarPopup?: boolean;
  dates?: any;
  onClose?: any;
  monitoringDate?: any;
  setMonitoringDate?: any;
}

export function CalendarPopup({
  openCalendarPopup,
  dates,
  monitoringDate,
  setMonitoringDate,
  onClose,
}: CalendarPopupProps) {
  useEffect(() => {
    if (openCalendarPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openCalendarPopup]);

  if (!openCalendarPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-3/4 w-3/4 p-1">
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={() => onClose()}
        >
          <i className="fi fi-br-circle-xmark"></i>
        </div>
        <div className="p-2 overflow-scroll no-scrollbar h-[60vh]">
          <div className="flex flex-wrap justify-center items-center gap-2">
            {dates?.map((date: any) => (
              <div
                key={date}
                className={`border ${
                  monitoringDate === date ? "border-blue-500" : ""
                } truncate rounded p-2 w-40 flex justify-center items-center`}
                onClick={() => {
                  setMonitoringDate(date);
                  onClose();
                }}
              >
                {new Date(date).toDateString()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
