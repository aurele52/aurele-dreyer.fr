import { ReactNode } from 'react';
import './List.css';

interface ListProps {
  children: ReactNode;
}

function List({ children }: ListProps) {
  return <div id="List">{children}</div>
}
export default List;