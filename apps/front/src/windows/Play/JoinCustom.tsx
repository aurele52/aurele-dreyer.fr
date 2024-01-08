import { useEffect, useState } from "react"
import { socket } from "../../socket"
import { matchInfoDto } from "./dto/matchInfo.dto";
import Boutton from "./Boutton";

interface joinProps {
	joinLobbyOnClick: () => void;
}
export default function JoinCustom(props: joinProps)
{
	const [lobbies, setLobbies] = useState<matchInfoDto[]>([]);
	useEffect(() => {
		function onLobbies(lol: matchInfoDto) {
			setLobbies([...lobbies, lol]);
		}
		socket.on("server.lobbyCustom", onLobbies);

		return () => {
		};
	}, [lobbies]);
	return(
		<div className="JoinCustom">{lobbies.map((i, index)=><div key={index} className='lobbiesEle'><Boutton matchInfo={i} joinLobbyOnClick={props.joinLobbyOnClick}/></div>)}</div>
	)
}
