import { useEffect, useState } from "react";
import { gameInfoDto } from "shared/src/gameInfo.dto";
import { socket } from "../../../socket";
import store from "../../../store";
import { HBButton, WinColor } from "../../../shared/utils/WindowTypes";
import { addWindow, delWindow } from "../../../reducers";

interface BouttonProps {
	gameInfo: gameInfoDto;
	joinLobbyOnClick: () => void;
}
export default function Boutton(props: BouttonProps) {
	function previewOnClick() {
		const memberSettingsWindow = store
			.getState()
			.windows.find((window) => window.content.type === "PREVIEW");
		if (memberSettingsWindow) {
			store.dispatch(delWindow(memberSettingsWindow.id));
		}
		const newWindow = {
			WindowName: "PREVIEW",
			width: "900",
			height: "900",
			id: 0,
			content: { type: "PREVIEW" },
			toggle: true,
			handleBarButton:
				HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
		socket.emit("client.previewUpdate", props.gameInfo);
	}
	function joinMatchOnClick() {
		props.joinLobbyOnClick();
		socket.emit("client.joinMatch", props.gameInfo.id);
	}
	useEffect(() => {
		return () => {};
	}, []);
	return (
		<div className="BouttonDiv">
			{props.gameInfo.name}
			<button onClick={previewOnClick}>Preview</button>
			<button onClick={joinMatchOnClick}>Join Match</button>
		</div>
	);
}
