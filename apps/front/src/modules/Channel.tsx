import React from "react";
import "./Channel.css";

type ChannelProps = {
  name: string;
} & React.HTMLAttributes<HTMLDivElement>;

function Channel({ name, ...props }: ChannelProps) {
  return (
    <div {...props} className={`channel ${props.className}`}>
      <p className="truncate">{name}</p>
    </div>
  );
}

export default Channel;
