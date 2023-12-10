import React from "react";
import "./Channel.css";

type ChannelProps = {
  name: string;
  image?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function Channel({ name, image, className, ...props }: ChannelProps) {
  return (
    <div {...props} className={`channel ${className ? className : ""}`}>
      {image && <img src={image} className="avatar"/>}
      <p className="truncate">{name}</p>
    </div>
  );
}

export default Channel;
