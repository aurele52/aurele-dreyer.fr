import React from "react";
import "./Channel.css";

type ChannelProps = {
  name: string;
  image?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function Channel({ name, image, className, children, ...props }: ChannelProps) {
  return (
    <div {...props} className={`channel ${className ? className : ""}`}>
      <div className="truncate avatar-chan">
        {image && <img src={image} className="avatar" />}
        <p className="truncate">{name}</p>
      </div>
      {children}
    </div>
  );
}

export default Channel;
