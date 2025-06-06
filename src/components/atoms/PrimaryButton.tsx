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
  loading: boolean;
  loadingText: string;
}

export const PrimaryButton = ({icon, reverse, textSize, disabled, width, height, title, action, rounded , loading, loadingText = "Loading..."}: PrimaryButtonProps) => {
  return (
    <div className="flex justify-center items-center">
      <button
        title={title}
        type="submit"
        onClick={action}
        disabled={disabled || loading}
        className={`
          px-4 py-2
          ${width ? width : "w-[180px]"} flex items-center justify-center
          ${height ? height : "h-[48px]"}
          ${rounded} ${textSize ? textSize : "text-[16px]"}
          ${reverse && !disabled ? 
              "bg-white border border-primaryButton text-primaryButton hover:bg-transparent hover:border-primaryButton hover:border-2 hover:text-primaryButton" :
              "bg-primaryButton font-semibold text-white hover:bg-transparent hover:border-primaryButton hover:border-2 hover:text-primaryButton"}
          ${disabled ? "bg-[#D7D7D7]" : ""}
          transition-colors duration-300
          ${loading ? "animate-pulse duration-200 ease-in-out forwards bg-gray-100 rounded-full p-1": ""}
        `}
      >
        {icon} {loading ? loadingText :title}
      </button>
    </div>
  )
}