import "./UserStatus.css";
import { useState, useEffect } from "react";
import { IconSVG } from "../../utils/svgComponent";
import { socket } from "../../../socket";
import api from "../../../axios";

type ButtonProps = {
	targetId?: number;
	displayText?: boolean;
};

export function UserStatus({ targetId, displayText }: ButtonProps) {
	const [status, setStatus] = useState<"ONLINE" | "INGAME" | "OFFLINE">(
		"OFFLINE"
	);

	const [currentTargetId, setCurrentTargetId] = useState<number | undefined>(
		undefined
	);

	useEffect(() => {
		setCurrentTargetId(targetId);
	}, [targetId]);

	useEffect(() => {
		const fetchDataAndEmit = async () => {
			try {
				const userData = await api.get(`/user/${currentTargetId}`);

				if (userData && userData.data && userData.data.username) {
					socket.emit("client.getStatusUser", {
						user: userData.data.username,
					});

					socket.on("server.getStatusUser", (res) => {
						console.log({ user: userData.data.username, res });
						if (res.data.username === userData.data.username)
							setStatus(res.data.status);
					});
				}
			} catch (error) {
				console.error("Error fetching user status:", error);
			}
		};

		if (currentTargetId !== undefined) {
			fetchDataAndEmit();
		}

		return () => {
			socket.off("server.getStatusUser");
		};
	}, [currentTargetId]);

	const statusSVG = () => {
		switch (status) {
			case "ONLINE":
				return IconSVG.StatusOnline;
			case "INGAME":
				return IconSVG.StatusIngame;
			case "OFFLINE":
				return IconSVG.StatusOffline;
			default:
				return null;
		}
	};

	return (
		<div className="UserStatusComponent">
			<div className="Icon">{statusSVG()}</div>
			{displayText ? <div className="Text">{status}</div> : null}
		</div>
	);
}
