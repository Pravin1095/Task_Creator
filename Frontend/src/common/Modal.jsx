import React from "react";
import { 
  Overlay, 
  ModalWrapper, 
  ModalHeader, 
  ModalBody, 
  CloseButton, 
  ButtonLayout
} from "./Modal.styles";
import { X } from "lucide-react"; // optional: using lucide icon for close
import { Button } from "../Auth/Auth.styles";

const Modal = ({ isOpen, onClose, title, primaryButtonText, secondaryButtonText, primaryButtonHandler }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>{title}</h2>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
        <ButtonLayout>
          <Button onClick={primaryButtonHandler}>{primaryButtonText}</Button>
          <Button onClick={onClose}>{secondaryButtonText}</Button>
          </ButtonLayout>
        </ModalBody>
      </ModalWrapper>
    </Overlay>
  );
};

export default Modal;
