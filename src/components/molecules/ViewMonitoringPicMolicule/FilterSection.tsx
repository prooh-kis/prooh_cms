import { Checkbox } from "antd";
import { LinearBar } from "../linearbar";
import { PanelHeader } from "./PanelHeader";

interface FilterSectionProps {
  title: string;
  icon: string;
  data: Record<string, any>;
  selectedItems: string[];
  onItemChange: (item: string, checked: boolean) => void;
  onToggleAll: (checked: boolean) => void;
  dataKey: string;
}

export const FilterSection = ({
  title,
  icon,
  data,
  selectedItems,
  onItemChange,
  onToggleAll,
  dataKey,
}: FilterSectionProps) => {
  const items = Object.keys(data?.[dataKey] || {}).filter(
    (item) => item !== "all"
  );

  return (
    <div className="border border-gray-100 rounded-[12px]">
      <PanelHeader title={title} icon={icon} />
      <div className="px-2 py-2 flex flex-col max-h-[40vh] overflow-y-auto">
        <div className="grid grid-cols-4 items-center">
          <Checkbox
            indeterminate={
              selectedItems.length > 0 && selectedItems.length < items.length
            }
            onChange={(e) => onToggleAll(e.target.checked)}
            checked={selectedItems.length === items.length}
            className="col-span-3 truncate"
          >
            All
          </Checkbox>
          <div className="col-span-1">
            <LinearBar
              value={data?.[dataKey]?.all?.monitoringDelivered?.toFixed(2)}
              colors={["#E4E4E4", "#129bff"]}
              highest={data?.[dataKey]?.all?.monitoringPromised?.toFixed(2)}
              percent={false}
            />
          </div>
        </div>

        {items.map((item: string) => (
          <div className="grid grid-cols-4 items-center truncate" key={item}>
            <Checkbox
              checked={selectedItems.includes(item)}
              onChange={(e) => onItemChange(item, e.target.checked)}
              className="col-span-3 truncate"
            >
              {item}
            </Checkbox>
            <div className="col-span-1">
              <LinearBar
                value={data?.[dataKey]?.[item]?.monitoringDelivered?.toFixed(2)}
                colors={["#E4E4E4", "#129bff"]}
                highest={data?.[dataKey]?.[item]?.monitoringPromised?.toFixed(
                  2
                )}
                percent={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
