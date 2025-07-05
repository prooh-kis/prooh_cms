import { Tooltip } from "antd";
import React from "react";

interface TabInterface {
  params?: [number, number]; // Tuple for selected and unselected counts
  label: string;
  id: string | number;
}

interface Props {
  tabData: TabInterface[];
  currentTab: string | number;
  setCurrentTab: (id: string | number) => void; // Update this line
  textSize?: string;
}

export const TabWithoutIcon: React.FC<any> = ({
  tabData,
  currentTab,
  setCurrentTab,
  textSize = "text-[16px]",
}) => {
  const getTabClassName = (tabId: string | number) =>
    `py-2 pr-2 flex gap-4 items-center ${textSize} font-inter ${
      currentTab === tabId
        ? "border-b-2 border-primaryButton"
        : "border-b-2 border-transparent hover:border-gray-200"
    }`;

  const getLabelClassName = (tabId: string | number) =>
    `pr-2 truncate ${
      currentTab === tabId
        ? "text-primaryButton font-semibold"
        : "text-gray-500 hover:text-gray-700"
    }`;

  const getParamClassName = (tabId: string | number, isSelected: boolean) =>
    `text-[12px] ${
      currentTab === tabId
        ? isSelected
          ? "text-[#358E0B]"
          : "text-[#FF0808]"
        : "text-gray-500"
    }`;

  return (
    <div className="inline-flex items-center gap-8 cursor-pointer border-b-2 border-gray-100 w-full overflow-x-auto">
      {tabData?.map((tab: TabInterface) => (
        <div
          key={tab.id}
          onClick={() => setCurrentTab(tab.id)}
          className={`${getTabClassName(tab.id)}`}
        >
          <h1 className={`${getLabelClassName(tab.id)}`}>{tab.label}</h1>

          {tab.params && (
            <div className="flex gap-2 items-center">
              <Tooltip title="Selected Screens">
                <div className="flex gap-1 items-center">
                  <p className={getParamClassName(tab.id, true)}>
                    {tab.params[0]}
                  </p>
                  <i
                    className={`fi fi-br-check ${getParamClassName(
                      tab.id,
                      true
                    )}`}
                  />
                </div>
              </Tooltip>

              <Tooltip title="Unselected Screens">
                <div className="flex gap-1 items-center">
                  <p className={getParamClassName(tab.id, false)}>
                    {tab.params[1]}
                  </p>
                  <i
                    className={`fi fi-br-cross ${getParamClassName(
                      tab.id,
                      false
                    )} text-[10px]`}
                  />
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
