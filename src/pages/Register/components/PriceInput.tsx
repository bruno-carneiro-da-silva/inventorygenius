import React, { useState } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import styled from "styled-components";
import cx from "classnames";
import { maskCurrency } from "@/utils/functions";
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
`;

export const MaskedPriceInput: React.FC<InputPayload> = ({
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
    setValue,
    watch,
  } = useFormContext();
  const [typeInput] = useState(type);
  const [iconInput] = useState(icon);

  const value = watch(name);
  const fieldError = getValueByKey(errors, name) as FieldError | undefined;
  const isFieldError = fieldError && fieldError.message;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskCurrency(e.target.value);
    setValue(name, maskedValue);
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <label htmlFor={name} className="text-gray-500 font-semibold">
          {label}
        </label>
      )}
      <div
        className={cx(
          "relative bg-white border rounded-full border-gray-300  p-2 w-full",
          iconInput && "!pl-12",
          classNameContainer,
          isFieldError && "border-red-400"
        )}
      >
        <Input
          id={name}
          type={typeInput}
          className={cx(
            "rounded-full p-2 w-full focus:outline-none focus:border-transparent",
            className
          )}
          placeholder={placeholder}
          value={value || ""}
          {...register(name)}
          onChange={handleChange}
          {...rest}
        />
        {iconInput && (
          <button
            className={cx(
              "absolute top-0 bottom-0 left-4 flex items-center justify-center",
              classNameIcon
            )}
          >
            {iconInput}
          </button>
        )}
      </div>
      {isFieldError && (
        <span className="text-red-400 text-left text-sm">
          {fieldError?.message}
        </span>
      )}
    </div>
  );
};

MaskedPriceInput.displayName = "MaskedPriceInput";
export default MaskedPriceInput;
