import React, { useState } from "react";
import { CampaignWiseMonitoring } from "./CampaignWiseMonitoring";
import { ScreenWiseMonitoring } from "./ScreenWiseMonitoring";
import { SwitchInput } from "../../components/index";
import { Tooltip } from "antd";

export const MonitoringPage: React.FC = () => {
  const [options, setOption] = useState<boolean>(true);

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="p-4 w-full bg-white flex gap-8">
          <h1 className="text-[16px] font-semibold">Campaign Monitoring</h1>
          <Tooltip
            title={
              options ? "Campaign wise monitoring" : "Screen Wise monitoring"
            }
          >
            {" "}
            {/* <SwitchInput
              onToggle={(value) => setOption(value)}
              isEnabled={options}
              
            /> */}
          </Tooltip>
        </div>
        {options ? <CampaignWiseMonitoring /> : <ScreenWiseMonitoring />}
      </div>
    </div>
  );
};
