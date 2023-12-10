import React from "react";
import "./Channel.css";

type ChannelProps = {
  name: string;
  image?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function Channel({ name, image, ...props }: ChannelProps) {
  return (
    <div {...props} className={`channel ${props.className}`}>
      {image && <img src={image} className="avatar"/>}
      <p className="truncate">{name}</p>
    </div>
  );
}

export default Channel;
