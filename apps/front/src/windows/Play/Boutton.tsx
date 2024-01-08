import { useEffect, useState } from "react";
import { matchInfoDto } from "./dto/matchInfo.dto";
import { socket } from "../../socket";

interface BouttonProps {
	joinLobbyOnClick: () => void;
	matchInfo: matchInfoDto;
}
export default function Boutton(props: BouttonProps)
{
	const [display, setDisplay] = useState<boolean>(false);
	function displayOnClick() {
		setDisplay(!display);
	}
	function joinMatchOnClick() {
		socket.emit('client.joinMatch', props.matchInfo.name);
		props.joinLobbyOnClick();
	}
	useEffect(() => {

		return () => {
		};
	}, []);
	return(
		<div className="BouttonDiv">
			{props.matchInfo.name}<button onClick={displayOnClick}>Show</button><button onClick={joinMatchOnClick}>Join Match</button>
			
				{display === true && <div className="matchInfo">
				ball Size: {props.matchInfo.ballSize}
				bar Size: {props.matchInfo.barSize}
			</div>}
		</div>
	)
}
