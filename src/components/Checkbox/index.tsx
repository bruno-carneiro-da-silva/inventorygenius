import cx from "classnames";
import React from "react";
import styled from "styled-components";

interface InputPayload extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  name: string;
  id?: string;
  checked?: boolean;
}

const Input = styled.input`
  background-color: #fff;

  :focus {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  appearance: none;

  &:checked::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 7px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

export const Checkbox: React.FC<InputPayload> = ({
  containerClassName,
  className,
  name,
  id,
  label,
  labelClassName,
  checked,
  ...rest
}) => {
  return (
    <div key={name} className={cx(containerClassName)}>
      <div className="relative flex flex-row space-x-3">
        <Input
          id={id || name}
          defaultChecked={checked}
          type="checkbox"
          className={cx(
            `rounded-md min-w-5 min-h-5 cursor-pointer border w-5 border-gray-400 py-1 pl-1 checked:bg-primary-dark`,
            className
          )}
          {...rest}
        />
        <label
          htmlFor={id || name}
          className={cx(
            "text-left text-sm cursor-pointer font-light text-gray-500",
            labelClassName
          )}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
