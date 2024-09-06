import React from "react";
import Modal from "@/components/Modal";
import ModalHeader from "@/components/ModalHeader";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";

interface ModalNoteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalNote: React.FC<ModalNoteProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Note"
        subtitle="Your note will appear on the client details"
        onClose={onClose}
      />
      <div className=" bg-white p-4 rounded-sm flex flex-col space-y-2">
        <TextArea
          className="border border-primary text-base"
          onChange={(value) => console.log(value)}
          placeholder="LeadPublisher17, your insights are truly illuminating! It's fascinating to see how Instagram's allure translates into tangible client leads. Your analysis sheds light on the evolving landscape of digital marketing."
          rows={3}
        />
        <div className="flex flex-row-reverse space-x-reverse space-x-2">
          <Button className="bg-primary text-white w-24 font-medium">
            Save
          </Button>
          <Button
            className="bg-white border border-primary !text-primary hover:!text-white font-medium w-24"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalNote;
