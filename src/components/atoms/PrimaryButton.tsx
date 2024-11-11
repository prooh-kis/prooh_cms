import { useNavigate } from "react-router-dom";

interface PrimaryButtonProps {
  title?: string;
  rounded?: string;
  action?: any;
  width?: any;
  height?: any;
  disabled?: boolean;
  textSize?: any;
  reverse?: any;
  icon?: any;
}

export const PrimaryButton = ({icon, reverse, textSize, disabled, width, height, title, action, rounded}: PrimaryButtonProps) => {
  return (
    <div className="flex justify-center items-center">
      <button
        title="plan_campaign"
        type="submit"
        onClick={action}
        disabled={disabled}
        className={`
          px-4 py-2
          ${width ? width : "w-[180px]"} flex items-center justify-center
          ${height ? height : "h-[48px]"}
          ${rounded} ${textSize ? textSize : "text-[16px]"}
          ${reverse ? 
              "bg-white border border-primaryButton text-primaryButton hover:bg-transparent hover:border-primaryButton hover:border-2 hover:text-primaryButton" :
              "bg-primaryButton font-semibold text-white hover:bg-transparent hover:border-primaryButton hover:border-2 hover:text-primaryButton"}
          transition-colors duration-300
        `}
      >
        {icon} {title}
      </button>
    </div>
  )
}