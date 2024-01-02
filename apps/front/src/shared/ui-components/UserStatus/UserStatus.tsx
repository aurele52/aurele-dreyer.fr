import "./UserStatus.css";
import { useState } from "react";
import { IconSVG } from "../../utils/svgComponent";

type ButtonProps = {
	targetId?: number;
	displayText?: boolean;
};

export function UserStatus({ targetId, displayText }: ButtonProps) {
	const [status, setStatus] = useState<"ONLINE" | "INGAME" | "OFFLINE">(
		"ONLINE"
	);

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
