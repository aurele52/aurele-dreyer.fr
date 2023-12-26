import { ReactNode } from "react";
import "./Modal.css";
import { ActionType, ModalType, iconsModal } from "../../utils/AddModal";
import { Button } from "../Button/Button";
import store from "../../../store";
import { delWindow } from "../../../reducers";

interface ModalProps {
  content: ReactNode;
  type?: ModalType;
  winId: number;
  action?: ActionType;
}

function Modal({ content, type, winId, action }: ModalProps) {
  const icon = iconsModal[type || "INFO"];

  const handleClose = (winId: number) => {
    store.dispatch(delWindow(winId));
  };

  const handleAction = (winId: number) => {
    if (action)
      action();
    handleClose(winId);
  };

  return (
    <div className="Modal">
      <div className="bodyModal">
        {icon}
        <div className="textModal">
          <div className="heading-600">{type}</div>
          <div className="heading-500">{content}</div>
        </div>
      </div>
      <div className="btnModal">
        {type === ModalType.WARNING && (
          <>
            <Button color="red" content="yes" onClick={() => handleAction(winId)} />
            <Button
              color="red"
              content="no"
              onClick={() => handleClose(winId)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
