import React, { useState, ReactNode } from "react";
import cx from "classnames";

interface TooltipProps {
  text: string;
  children: ReactNode;
  bgColor?: string;
  borderColor?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  bgColor = "bg-primary-dark ",
  borderColor = "border-r-primary-dark",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          className={cx(
            `absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 text-white text-sm rounded whitespace-nowrap`,
            `${bgColor}`
          )}
        >
          {text}
          <div
            className={cx(
              `absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4`,
              borderColor
            )}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
