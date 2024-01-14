import { useEffect, useState } from "react";
import { socket } from "../../socket";
import Loading from "./Loading";
import Pong from "./Pong";
import Win from "./Win";
import Lose from "./Lose";
import { MainGameMenu } from "./mainGameMenu";
import JoinCustom from "./JoinCustom";
import CreateCustom from "./CreateCustom";
import { gameInfoDto } from "shared/src/gameInfo.dto";
import { gameInfo } from "shared/src/gameInfo.interface";
import { normalGameInfo } from "shared/src/normalGameInfo";

interface ConnectionProps {
	windowId: number;
	privateLobby?: {
		targetId: number;
	};
}

export default function Connection({ privateLobby }: ConnectionProps) {
	const [pongDisplay, setPongDisplay] = useState<boolean>(false);
	const [mainGameMenuDisplay, setMainGameMenuDisplay] =
		useState<boolean>(true);
	const [joinCustomDisplay, setJoinCustomDisplay] = useState<boolean>(false);
	const [createCustomDisplay, setCreateCustomDisplay] =
		useState<boolean>(false);
	const [loseDisplay, setLoseDisplay] = useState<boolean>(false);
	const [winDisplay, setWinDisplay] = useState<boolean>(false);
	const [loadingDisplay, setLoadingDisplay] = useState<boolean>(false);
	const [matchInfo, setMatchInfo] = useState<gameInfo>({
		...normalGameInfo
	});
	useEffect(() => {
		if (privateLobby) {
			setMainGameMenuDisplay(false);
			setLoadingDisplay(true);
		}
		function onMatchLoading() {
		}
		function onLose() {
		}
		function onWin() {
		}
		function onMatchStart(gameData: gameInfoDto) {
			setMatchInfo({
				...normalGameInfo,
				...gameData,
			});
		}
		socket.on("server.win", onWin);
		socket.on("server.lose", onLose);
		socket.on("server.matchLoading", onMatchLoading);
		socket.on("server.matchStart", onMatchStart);

		return () => {
		socket.emit('client.closeGame');
		socket.off("server.win", onWin);
		socket.off("server.lose", onLose);
		socket.off("server.matchLoading", onMatchLoading);
		socket.off("server.matchStart", onMatchStart);
		};
	}, []);

	function createCustomOnClick() {
	}
	function joinCustomOnClick() {
		socket.emit("client.inJoinTab");
	}
	function createLobbyOnClick() {
	}
	function normalOnClick() {
		socket.emit("client.normalMatchmaking");
	}

	return (
		<div className="App">
			{mainGameMenuDisplay === true && (
				<MainGameMenu
					normalOnClick={normalOnClick}
					joinCustomOnClick={joinCustomOnClick}
					createCustomOnClick={createCustomOnClick}
				/>
			)}
			{loadingDisplay === true && <Loading />}
			{joinCustomDisplay === true && <JoinCustom />}
			{createCustomDisplay === true && (
				<CreateCustom
					socket={socket}
					createLobbyOnClick={createLobbyOnClick}
				/>
			)}
			{pongDisplay === true && <Pong gameInfo={matchInfo} />}
			{loseDisplay === true && <Lose />}
			{winDisplay === true && <Win />}
		</div>
	);
}
