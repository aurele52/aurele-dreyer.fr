import { ReactNode } from "react";
import "./List.css";

interface ListProps {
  dark?: boolean;
  children: ReactNode;
}

function List({ dark=true, children }: ListProps) {
  return <div className={`List custom-scrollbar ${dark ? "dark-list" : ""}`}>{children}</div>;
}
export default List;
