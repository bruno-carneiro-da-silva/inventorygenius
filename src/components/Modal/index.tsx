import React from "react";
import cx from "classnames";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center mt-0 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={cx(
          `bg-primary-light flex flex-col space-y-3 p-6 w-1/2 rounded-md shadow-lg`,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
