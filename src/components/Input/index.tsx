import cx from "classnames";
import React, { useState } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { getValueByKey } from "@/utils/utils";

export interface InputPayload
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  classNameContainer?: string;
  type?: string;
  placeholder?: string;
  name: string;
  icon?: JSX.Element;
  classNameIcon?: string;
}

const Input = styled.input`
  background-color: #fff;
  :focus {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  &[type="date"]::-webkit-calendar-picker-indicator,
  &[type="time"]::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

export const TextInput: React.FC<InputPayload> = ({
  className,
  label,
  classNameContainer,
  name,
  type = "text",
  icon,
  placeholder,
  classNameIcon,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = getValueByKey(errors, name) as FieldError | undefined;
  const isFieldError = fieldError && fieldError.message;

  const [typeInput] = useState(type);
  const [iconInput] = useState(icon);

  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <label htmlFor={name} className="text-gray-500 font-semibold">
          {label}
        </label>
      )}
      <div
        className={cx(
          `relative bg-white border border-gray-300 rounded-full p-2 w-full`,
          iconInput && "!pl-12",
          classNameContainer,
          isFieldError && "border-red-400"
        )}
      >
        <Input
          id={name}
          type={typeInput}
          className={cx(
            ` rounded-full p-2 w-full focus:outline-none focus:border-transparent`,
            className
          )}
          placeholder={placeholder}
          {...register?.(name)}
          {...rest}
        />
        <button
          className={cx(
            "absolute top-0 bottom-0 left-4 flex items-center justify-center",
            classNameIcon
          )}
        >
          {iconInput}
        </button>
      </div>
      {isFieldError && (
        <span className="text-red-400 text-left text-sm">
          {fieldError?.message}
        </span>
      )}
    </div>
  );
};

TextInput.displayName = "TextInput";
export type TextInputProps = InputPayload;
export default TextInput;
