import { useNavigate } from "react-router-dom";

interface PrimaryButtonProps {
  title?: string;
  rounded?: string;
  action?: any;
  width?: any;
  height?: any;
  disabled?: boolean;
  textSize?: any;
}

export const SecondaryButton = ({textSize, disabled, width, height, title, action, rounded}: PrimaryButtonProps) => {
  return (
    <div className="flex justify-center items-center">
      <button
        title="plan_campaign"
        type="submit"
        onClick={action}
        disabled={disabled}
        className={`
          ${width ? width : "w-[180px]"} flex items-center justify-center
          ${height ? height : "h-[48px]"} bg-secondaryButton
          ${rounded} ${textSize ? textSize : "text-[16px]"} text-white font-semibold
          hover:bg-transparent hover:border-secondaryButton
          hover:border-2 hover:text-secondaryButton 
          transition-colors duration-300
        `}
      >
        {title}
      </button>
    </div>
  )
}