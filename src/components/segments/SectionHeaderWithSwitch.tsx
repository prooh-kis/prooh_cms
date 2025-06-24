import { ToggleSwitch } from "../atoms/ToggleSwitch";
import { Tooltip } from "antd";

interface SectionHeaderWithSwitchProps {
  iconClass: string;
  title: string;
  bgColor: string;
  showPercent?: any;
  setShowPercent?: any;
  switchShow?: boolean;
}


export const SectionHeaderWithSwitch: React.FC<SectionHeaderWithSwitchProps> = ({
  iconClass,
  title,
  bgColor,
  showPercent=false,
  setShowPercent,
  switchShow=true,
}) => (
  <div className="flex items-center justify-between gap-2 pb-2">
    <div className="flex items-center gap-1 truncate">
      <div className={`rounded-full p-2 ${bgColor}`}>
        <i
          className={`fi ${iconClass} text-[12px] text-white flex items-center justify-center`}
        ></i>
      </div>
      <h1 className="text-[12px] text-[#0E212E] truncate ">
        {title}
      </h1>
      <Tooltip title="">
        <i className="fi fi-br-info text-[12px] text-[#b2c1ca] flex justify-center items-center"></i>
      </Tooltip>
    </div>
    {switchShow && (
      <div className="flex items-center gap-1">
        <h1 className="text-[10px] text-gray-500">
          {showPercent ? "#" : "%"}
        </h1>
        <ToggleSwitch
          h="h-2"
          w="w-2"
          height="h-3"
          width="w-6"
          value={showPercent}
          action={setShowPercent}
          translate="sm"
        />

      </div>
    )}

  </div>
);