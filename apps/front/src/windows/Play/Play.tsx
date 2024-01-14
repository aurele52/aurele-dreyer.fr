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
		name: "normal",
		borderSize: 10,
		menuSize: 90,
		ysize: 500,
		xsize: 800,
		gamey: 110,
		gamex: 10,
		ballx: 100,
		bally: 100,
		barDist: 20,
		oneBary: 10,
		twoBary: 10,
		barSpeed: 2,
		ballDirx: -1,
		ballDiry: -0.4,
		ballSpeed: 4.0,
		gamexsize: 780,
		gameysize: 380,
		barLarge: 10,
		oneScore: 0,
		twoScore: 0,
		ballDeb: 150,
		ballSize: 10,
		barSize: 100,
		itemx: 40,
		itemy: 40,
		itemSize: 10,
		numberSize: 10,
		oneBarColor: "white",
		twoBarColor: "white",
		ballColor: "white",
		backgroundColor: "black",
		borderColor: "white",
		oneNumberColor: "white",
		twoNumberColor: "white",
		menuColor: "black",
		numberSideDist: 10,
		numberTopDist: 10,
	});
	useEffect(() => {
		if (privateLobby) {
			setMainGameMenuDisplay(false);
			setLoadingDisplay(true);
			//...
		}
		function onMatchLoading() {
			setLoadingDisplay(true);
			setMainGameMenuDisplay(false);
			setJoinCustomDisplay(false);
			setCreateCustomDisplay(false);
		}
		function onLose() {
			setLoseDisplay(true);
			setPongDisplay(false);
		}
		function onWin() {
			setWinDisplay(true);
			setPongDisplay(false);
		}
		function onMatchStart(gameData: gameInfoDto) {
			setLoadingDisplay(false);
			setJoinCustomDisplay(false);
			setMatchInfo({
				ballSize: gameData.ballSize,
				barSize: gameData.barSize,
				xsize: gameData.xsize,
				ysize: gameData.ysize,
				oneBarColor: gameData.oneBarColor,
				twoBarColor: gameData.twoBarColor,
				ballColor: gameData.ballColor,
				backgroundColor: gameData.backgroundColor,
				borderColor: gameData.borderColor,
				oneNumberColor: gameData.oneNumberColor,
				twoNumberColor: gameData.twoNumberColor,
				menuColor: gameData.menuColor,
				itemSize: gameData.itemSize,
				oneScore: gameData.oneScore,
				twoScore: gameData.twoScore,
				ballSpeed: gameData.ballSpeed,
				barDist: gameData.barDist,
				barSpeed: gameData.barSpeed,
				barLarge: gameData.barLarge,
				numberSize: gameData.numberSize,
				borderSize: gameData.borderSize,
				menuSize: gameData.menuSize,
				numberSideDist: gameData.numberSideDist,
				numberTopDist: gameData.numberTopDist,

				name: gameData.name,
				ballDirx: gameData.ballDirx,
				ballDiry: gameData.ballDiry,
				ballDeb: gameData.ballDeb,
				gamey: gameData.gamey,
				gamex: gameData.gamex,
				gamexsize: gameData.gamexsize,
				gameysize: gameData.gameysize,
				oneBary: gameData.oneBary,
				twoBary: gameData.twoBary,
				ballx: gameData.ballx,
				bally: gameData.bally,
				itemx: gameData.itemx,
				itemy: gameData.itemy,
			});
			setPongDisplay(true);
		}
		socket.on("server.win", onWin);
		socket.on("server.lose", onLose);
		socket.on("server.matchLoading", onMatchLoading);
		socket.on("server.matchStart", onMatchStart);

		return () => {};
	}, []);

	function createCustomOnClick() {
		setMainGameMenuDisplay(false);
		setCreateCustomDisplay(true);
	}
	function joinCustomOnClick() {
		setMainGameMenuDisplay(false);
		setJoinCustomDisplay(true);
		socket.emit("client.inJoinTab");
	}
	function createLobbyOnClick() {
		setCreateCustomDisplay(false);
		setLoadingDisplay(true);
	}
	function normalOnClick() {
		setMainGameMenuDisplay(false);
		setLoadingDisplay(true);
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
