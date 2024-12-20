import React, { useEffect, useState } from "react";

export const EnterTimeTriggerPopup = ({
  open,
  onClose,
  handleSave,
  data,
}: any) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const [currentTab, setCurrentTab] = useState<string>("weekdays");
  const [values, setValues] = useState<any>(data);

  const tabData = [
    {
      label: "Weekdays",
      id: "weekdays",
    },
    {
      label: "Saturday",
      id: "saturdays",
    },
    {
      label: "Sunday",
      id: "sundays",
    },
  ];
  if (!open) {
    return null;
  }

  const handleSelect = (time: any) => {
    let data: any = values;
    if (
      values?.find(
        (data: any) => data.day == currentTab && data.startTime == time
      )
    ) {
      console.log("present!");
    } else {
      data = [...values, { day: currentTab, startTime: time, hours: 4 }];
    }
    setValues(data);
  };

  const isAdded = (time: any) => {
    if (
      values?.find(
        (data: any) => data.day === currentTab && data.startTime === time
      )
    ) {
      return "p-4 border border-1 rounded-md bg-sky-500 text-[#ffffff] font-bold text-[16px]";
    } else {
      return "text-[16px] p-4 border border-1 rounded-md";
    }
  };

  const handleReset = () => {
    setValues((pre: any) => pre.filter((data: any) => data?.day != currentTab));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-1/2 w-1/2 p-8">
        <div className="flex justify-between">
          <h1 className="text-[24px] font-bold">Schedule Ad Play Time</h1>
          <i className="fi fi-br-circle-xmark" onClick={onClose}></i>
        </div>
        <div className="pt-4">
          <div className="flex gap-12 border-b text-[14px]">
            {tabData?.map((data: any, index) => (
              <div
                key={index}
                className="flex flex-col gap-2"
                onClick={() => setCurrentTab(data?.id)}
              >
                <h1
                  className={
                    currentTab === data.id ? "text-sky-500 font-bold" : ""
                  }
                >
                  {data?.label}{" "}
                  <span className="text-sky-400 pl-8">
                    {values?.find((data1: any) => data1.day === data.id) && (
                      <i className="fi fi-br-check "></i>
                    )}
                  </span>
                </h1>
                <div
                  className={
                    currentTab === data?.id
                      ? "border border-2 border-sky-400"
                      : ""
                  }
                />
              </div>
            ))}
          </div>
          <h1 className="pt-4 text-gray-500">Select Time</h1>
          <div className="flex flex-wrap gap-6 pt-4">
            <div
              className={isAdded(8)}
              onClick={() => {
                handleSelect(8);
              }}
            >
              <h1>08 AM - 12 PM </h1>
              <h1>T1 (Morning)</h1>
            </div>
            <div
              className={isAdded(12)}
              onClick={() => {
                handleSelect(12);
              }}
            >
              <h1>12 PM - 4 PM </h1>
              <h1>T2 (AfterNoon)</h1>
            </div>
            <div
              className={isAdded(16)}
              onClick={() => {
                handleSelect(16);
              }}
            >
              <h1>04 PM - 8 PM </h1>
              <h1>T3 (Evening)</h1>
            </div>
            <div
              className={isAdded(20)}
              onClick={() => {
                handleSelect(20);
              }}
            >
              <h1>08 PM - 12 AM </h1>
              <h1>T4 (Night)</h1>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-8 font-bold">
            <button
              onClick={handleReset}
              className="border-2 p-2 px-8 border-red-500 text-red-500 hover:text-[#fffff] hover:bg-red-500  hover:text-[#ffffff] rounded-md"
            >
              Reset
            </button>
            <button
              onClick={() => {
                handleSave(values);
                onClose();
              }}
              className="border-2 p-2 px-8 border-sky-500 text-[#ffffff]  bg-sky-500 hover:text-sky-500 hover:bg-[#ffffff]  hover:text-sky-500 rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
