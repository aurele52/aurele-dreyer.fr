import { addWindow } from "../reducers";
import { HBButton, WinColor } from "./WindowTypes";
import store from "../store";
import { ReactNode } from "react";

export enum ModalType {
  WARNING = "WARNING",
  ERROR = "ERROR",
  INFO = "INFO",
  REQUESTED = "REQUESTED",
}

export type ActionType = () => boolean;

export function addModal(
  type: ModalType,
  str: string,
  action?: ActionType
) {
  let color;
  if (type === ModalType.WARNING || ModalType.ERROR) color = WinColor.RED;
  else color = WinColor.PURPLE;

  const text: ReactNode = (
    <div className="textModal">
      <div className="heading-600">{type}</div>
      <div className="heading-500">{str}</div>
    </div>
  );

  const newWindow = {
    WindowName: type,
    width: "390",
    height: "199",
    id: 0,
    content: { type: "MODAL" },
    toggle: false,
    modal: { text, action },
    handleBarButton: HBButton.Close,
    color,
  };
  store.dispatch(addWindow(newWindow));
}
