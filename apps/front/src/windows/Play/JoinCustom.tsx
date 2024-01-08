import { useEffect, useState } from "react"
import { socket } from "../../socket"
import { gameInfoDto } from "./dto/gameInfo.dto";
import Boutton from "./Boutton";

export default function JoinCustom()
{
	const [lobbies, setLobbies] = useState<gameInfoDto[]>([]);
	useEffect(() => {
		function onLobbies(lol: gameInfoDto) {
			setLobbies([...lobbies, lol]);
		}
		socket.on("server.lobbyCustom", onLobbies);

		return () => {
		};
	}, [lobbies]);
	return(
		<div className="JoinCustom">{lobbies.map((i, index)=><div key={index} className='lobbiesEle'><Boutton gameInfo={i} /></div>)}</div>
	)
}
