

interface RadioInputProps {
  value?: string;
  title?: string;
  isChecked?: boolean;
  onChange: (checked: boolean) => void;  // Updated action type to be more specific
}


export const RadioInput = ({ isChecked, title, value, onChange }: RadioInputProps) => {
  // console.log(option);
  // console.log(value);
  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        value={value}
        // defaultChecked={option === value}
        checked={isChecked}
        onChange={(e: any) => onChange(e)}
        className="h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-gray-600 transition duration-200"
      />
      <span className={`ml-2 ${isChecked ? "text-primaryButton" : "text-primaryText"} text-[14px]`}>{title}</span>
    </label>
  )
}