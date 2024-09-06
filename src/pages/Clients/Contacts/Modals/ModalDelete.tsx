import React from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import useDeleteContactHook from "@/pages/Clients/Contacts/hooks/useDeleteContact";
import { LoadingIcon } from "@/icons";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ isOpen, onClose }) => {
  const { handleSubmit, isLoading } = useDeleteContactHook({ onClose });

  const buttonText = isLoading ? <LoadingIcon /> : "Yes, delete";
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="!w-4/12">
      <div className="place-items-center rounded-sm flex flex-col space-y-10">
        <div className="text-2xl font-semibold text-gray-500">
          Delete Contact
        </div>
        <div className="text-base font-light text-gray-500">
          Are you sure you would like to delete this contact?
        </div>
        <div className="flex flex-row space-x-2">
          <Button
            className="bg-white border border-primary !text-primary hover:!text-white font-medium w-28"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary text-white w-28 font-medium"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;
