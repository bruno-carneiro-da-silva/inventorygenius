import React from "react";
import Button from "@/components/Button";
import { X } from "lucide-react";

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  onClose,
}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col text-base">
        <div className="font-semibold">{title}</div>
        <div className="font-light">{subtitle}</div>
      </div>
      {onClose && (
        <Button
          onClick={onClose}
          className="!text-gray-500 bg-transparent hover:!bg-transparent hover:!text-gray-700"
        >
          <X />
        </Button>
      )}
    </div>
  );
};

export default ModalHeader;
