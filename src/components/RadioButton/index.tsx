import React from "react";
import cx from "classnames";
import { Check } from "lucide-react";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  tagDiscount?: number | null;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  description,
  children,
  tagDiscount,
  className,
  ...rest
}) => {
  return (
    <label className={cx("flex space-x-4 w-full cursor-pointer", className)}>
      <div className="flex flex-row space-x-3">
        <input type="radio" value={value} className="peer sr-only " {...rest} />
        <div className="w-7 h-7 flex self-center bg-white border-2 justify-center border-gray-300 rounded-full peer-checked:bg-primary-dark">
          <Check className="w-4 h-4 text-white self-center" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-bold">{label}</div>
            {tagDiscount && (
              <span className="bg-gray-300 text-primary-dark font-bold text-xs rounded-full p-1">
                Economize {tagDiscount}%
              </span>
            )}
          </div>
          {description && (
            <div className={cx("text-xs font-normal text-gray-500")}>
              {description}
            </div>
          )}
        </div>
      </div>
      {children}
    </label>
  );
};

export default RadioButton;
