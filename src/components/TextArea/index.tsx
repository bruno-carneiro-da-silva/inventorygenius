// Textarea component

import React from "react";
import cx from "classnames";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ className, ...rest }) => {
  return (
    <textarea
      className={cx("w-full p-2 border border-gray-300 rounded-md", className)}
      {...rest}
    />
  );
};

export default TextArea;
