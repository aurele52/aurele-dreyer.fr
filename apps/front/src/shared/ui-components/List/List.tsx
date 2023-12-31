import { ReactNode, forwardRef } from "react";
import "./List.css";

interface ListProps {
  dark?: boolean;
  children: ReactNode;
}

const List = forwardRef<HTMLDivElement, ListProps>(({ dark = true, children }, ref) => {
  return (
    <div ref={ref} className={`List custom-scrollbar ${dark ? "dark-list" : ""}`}>
      {children}
    </div>
  );
});

export default List;
