import "./UserStatus.css";
import { useState } from "react";
import { IconSVG } from "../../utils/svgComponent";
import { socket } from "../../../socket";
import { useEffect } from "react";

type ButtonProps = {
	targetId?: number;
	displayText?: boolean;
};

export function UserStatus({ targetId, displayText }: ButtonProps) {
	const [status, setStatus] = useState<"ONLINE" | "INGAME" | "OFFLINE">(
		"OFFLINE"
	);

	useEffect(() => {
		socket.emit("client.getStatusUser", { user: "Kyla32" });

		socket.on("server.getStatusUser", (res) => {
			setStatus(res ? "ONLINE" : "OFFLINE");
		});

		return () => {
			socket.off("server.getStatusUser");
		};
	}, []);

	const statusSVG = () => {
		switch (status) {
			case "ONLINE":
				return IconSVG.StatusOnline;
			case "INGAME":
				return IconSVG.StatusIngame;
			case "OFFLINE":
				return IconSVG.StatusOffline;
		}
	};

	return (
		<div className="UserStatusComponent">
			<div className="Icon">{statusSVG()}</div>
			{displayText ? <div className="Text">{status}</div> : null}
		</div>
	);
}
