import { ReactNode } from "react";
import "./List.css";

interface ListProps {
  children: ReactNode;
}

function List({ children }: ListProps) {
  return <div className="List custom-scrollbar sb-dark">{children}</div>;
}
export default List;
