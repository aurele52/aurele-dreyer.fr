import { useEffect, useState } from "react"
import { gameInfoDto } from "shared/src/gameInfo.dto";
import Boutton from "./Boutton";
import { socket } from "../../../socket";
import store from "../../../store";
import { delWindow } from "../../../reducers";

export default function JoinCustom()
{
	const [lobbies, setLobbies] = useState<gameInfoDto[]>([]);
	const [joinLobbyClick, setJoinLobbyClick] = useState<boolean>(false);
	function joinLobbyOnClick() {
		setJoinLobbyClick(true);
	}
	useEffect(() => {
		function onLobbies(lol: gameInfoDto) {
			setLobbies([...lobbies, lol]);
		}
		socket.on("server.lobbyCustom", onLobbies);

		return () => {
			const memberSettingsWindow = store
				.getState()
				.windows.find(
					(window) => window.content.type === "PREVIEW"
				);
			if (memberSettingsWindow) {
				store.dispatch(delWindow(memberSettingsWindow.id));
			}
			if (joinLobbyClick === false) {
				socket.emit('client.closeJoinCustom');
			}
		};
	}, [lobbies]);
	return(
		<div className="JoinCustom">{lobbies.map((i, index)=><div key={index} className='lobbiesEle'><Boutton joinLobbyOnClick={joinLobbyOnClick} gameInfo={i} /></div>)}</div>
	)
}
