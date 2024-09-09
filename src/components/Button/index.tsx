import cx from "classnames";
import React from "react";

export interface ButtonPayload
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ className, children, ...rest }: ButtonPayload) => {
  return (
    <button
      className={cx(
        "bg-primary-dark text-white font-light p-3 rounded-full",
        "hover:bg-primary-dark",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";
export type ButtonProps = ButtonPayload;
export default Button;
