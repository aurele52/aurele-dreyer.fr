import { useEffect, useState } from "react";
import { gameInfoDto } from "shared/src/gameInfo.dto";
import { socket } from "../../socket";
import store from "../../store";
import { HBButton, WinColor } from "../../shared/utils/WindowTypes";
import { addWindow } from "../../reducers";

interface BouttonProps {
	gameInfo: gameInfoDto;
}
export default function Boutton(props: BouttonProps)
{
	const [display, setDisplay] = useState<boolean>(false);
	function previewOnClick() {
		const newWindow = {
			WindowName: "PREVIEW",
			width: "900",
			height: "900",
			id: 0,
			content: { type: "PREVIEW" },
			toggle: true,
			handleBarButton: HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
		socket.emit('client.previewUpdate', props.gameInfo);
		setDisplay(!display);
	}
	function joinMatchOnClick() {
		socket.emit('client.joinMatch', props.gameInfo.name);
	}
	useEffect(() => {

		return () => {
		};
	}, []);
	return(
		<div className="BouttonDiv">
			{props.gameInfo.name}<button onClick={previewOnClick}>Preview</button><button onClick={joinMatchOnClick}>Join Match</button>
		</div>
	)
}
