import { FC } from "react";

interface ToggleSwitchProps {
  value: boolean;
  action: () => void;
  height?: any;
  width?: any;
  h?: any;
  w?: any;
  translate?: any;
}
export const ToggleSwitch: FC<ToggleSwitchProps>  = ({
  value, action,
  height = "h-5",
  width = "w-16",
  h="h-4",
  w="w-4",
  translate=""
}) => {

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        title="toggle"
        type="checkbox"
        className="sr-only"
        checked={value}
        onChange={action}
      />
      <div
        className={`${height} ${width} flex items-center rounded-full p-1 transition-colors 
          ${value ? "bg-[#22C55E] " : "bg-[#D7D7D7]"}`}
      >
        <div
          className={`${h} ${w} bg-white rounded-full shadow-md transform transition-transform 
            ${value && translate == "sm" ? "translate-x-2" : value ? "translate-x-10" : "translate-x-0"}`}
        />
      </div>
    </label>
  );
};

