import React, { useState } from "react";
interface TabInterface {
  params: any;
  label: string;
  id: string;
}

interface Props {
  tabData: TabInterface[];
  currentTab: string;
  setCurrentTab: any;
}

export function TabWithoutIcon({ tabData, currentTab, setCurrentTab }: any) {
  return (
    <div className="flex items-center gap-1 overflow-y-auto no-scrollbar">
      {tabData?.map((tab: TabInterface, index: any) => (
        <div
          key={index}
          onClick={() => {
            setCurrentTab(tab.id);
          }}
          className={
            currentTab === tab.id
              ? "px-1 flex gap-4 items-center text-[14px] border-b-2 border-[#129BFF] py-2 truncate cursor-pointer"
              : "px-1 flex gap-1 items-center text-[14px] py-1 px-2 truncate cursor-pointer"
          }
        >
          <h1
            className={
              currentTab === tab.id
                ? "text-[#129BFF] truncate"
                : "text-gray-500 truncate"
            }
          >
            {tab.label}
          </h1>
          {tab.params && (
            <div className="flex gap-1 items-center">
              <div className="flex gap-1 items-center">
                <p
                  className={
                    currentTab === tab.id
                      ? "text-[#348730] text-[12px]"
                      : "text-gray-500 text-[12px]"
                  }
                >
                  {tab.params[0]}
                </p>
                <i
                  className={`fi fi-br-check flex items-center ${
                    currentTab === tab.id ? "text-[#348730]" : "text-gray-500"
                  } text-[12px]`}
                ></i>
              </div>
              <div className="flex gap-1 items-center">
                <p
                  className={
                    currentTab === tab.id
                      ? "text-red-500 text-[12px]"
                      : "text-gray-500 text-[12px]"
                  }
                >
                  {tab.params[1]}
                </p>
                <i
                  className={`fi fi-br-cross flex items-center ${
                    currentTab === tab.id ? "text-red-500" : "text-gray-500"
                  } text-[10px]`}
                ></i>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
