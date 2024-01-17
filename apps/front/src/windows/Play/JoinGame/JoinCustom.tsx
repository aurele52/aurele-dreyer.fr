import { useEffect, useState } from "react"
import { gameInfoDto } from "shared/src/gameInfo.dto";
import Boutton from "./Boutton";
import { socket } from "../../../socket";
import store from "../../../store";
import { delWindow } from "../../../reducers";
interface joinCustomProps {
	onJoinCustom: () => void,
}
export default function JoinCustom(props: joinCustomProps)
{
	const [lobbies, setLobbies] = useState<gameInfoDto[]>([]);
	const [joinLobbyClick, setJoinLobbyClick] = useState<boolean>(false);
	function joinLobbyOnClick() {
		props.onJoinCustom();
		setJoinLobbyClick(true);
	}
	useEffect(() => {
		function onLobbies(lol: gameInfoDto) {
			setLobbies([...lobbies, lol]);
		}
		function onLobbiesDelete(lol: gameInfoDto) {
			const index = lobbies.findIndex((value) => {
				console.log('val', value.name, 'lol', lol.name);
				return value.name === lol.name;
			});
			if (index !== -1) {
				const temp: gameInfoDto[] = [...lobbies];
				temp.splice(index, 1);
				setLobbies(temp);
			}
		}
		socket.on("server.lobbyCustom", onLobbies);
		socket.on("server.lobbyCustomDelete", onLobbiesDelete);

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
	}, [lobbies, joinLobbyClick]);
	return(
		<div className="JoinCustom">{lobbies.map((i, index)=><div key={index} className='lobbiesEle'><Boutton joinLobbyOnClick={joinLobbyOnClick} gameInfo={i} /></div>)}</div>
	)
}
