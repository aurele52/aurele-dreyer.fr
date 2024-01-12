import { ReactNode, forwardRef } from "react";
import "./List.css";

interface ListProps {
  dark?: boolean;
  lilac?: boolean;
  children: ReactNode;
}

const List = forwardRef<HTMLDivElement, ListProps>(({ dark = true, lilac = false, children }, ref) => {
  return (
    <div ref={ref} className={`List custom-scrollbar ${dark ? "dark-list" : ""} ${lilac ? "lilac-list" : ""}`}>
      {children}
    </div>
  );
});

export default List;
