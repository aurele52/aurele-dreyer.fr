import React from "react";
import "./Channel.css";

type ChannelProps = {
  name: string;
  clickable: boolean;
  image?: string;
  notif: number
} & React.HTMLAttributes<HTMLDivElement>;

function Channel({
  name,
  image,
  className,
  children,
  clickable,
  notif,
  ...props
}: ChannelProps) {

  return (
    <div
      {...props}
      className={`channel heading-500 ${className ? className : ""} ${
        clickable ? "chanClickable" : ""
      }`}
    >
      <div className="truncate avatar-chan">
        {image && <img src={image} className="avatar insideCard" />}
        <p className="truncate">{name}</p>
      </div>
      {children}
      {notif ? <div className="ButtonNotif">{notif}</div> : ""}
    </div>
  );
}

export default Channel;
