import { ReactNode } from "react";
import { ActionType } from "../../utils/AddModal";
import "./Modal.css";
import Button from "../Button/Button";

interface ModalProps {
  text: ReactNode;
  action?: ActionType;
}

function Modal({ text, action }: ModalProps) {
  return (
    <>
      <div className="Modal">{text}</div>
      <Button content="ok" color="purple" onClick={action} />
    </>
  );
}

export default Modal;
