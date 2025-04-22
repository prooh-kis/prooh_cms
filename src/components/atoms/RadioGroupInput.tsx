import { Radio } from "antd";
import React from "react";

interface RadioOption {
  label: string;
  value: string;
  count?: number;
}

interface RadioGroupInputProps {
  value: string;
  setValue: (value: string) => void;
  initialValues: RadioOption[];
  className?: string;
}

const RadioGroupInput: React.FC<RadioGroupInputProps> = ({
  value,
  setValue,
  initialValues,
  className = "grid grid-cols-3 gap-2 mt-2 truncate",
}) => {
  return (
    <Radio.Group
      className={className}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {initialValues.map((data) => (
        <Radio value={data.value} key={data.value}>
          {`${data.label} (${data?.count})`}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default RadioGroupInput;
