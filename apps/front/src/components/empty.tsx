import './empty.css';

interface emptyProps {
  emptyStr: string
}

function empty({ emptyStr }: emptyProps) {
  return (
    <div id="empty">
      <h1 className={emptyStr}>empty</h1>
    </div>
  
  )
}

export default empty;