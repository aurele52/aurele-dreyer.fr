import { useEffect, useState } from "react";
import { socket } from "../../socket";
import Loading from "./Loading";
import Pong from "./Pong";
import Win from "./Win";
import Lose from "./Lose";
import { MainGameMenu } from "./mainGameMenu";
import JoinCustom from "./JoinCustom";
import CreateCustom from "./CreateCustom";
import { matchInfoDto } from "./dto/matchInfo.dto";
import { gameInfo } from "./dto/gameInfo.interface";

export default function Connection() {
	const [pongDisplay, setPongDisplay] = useState<boolean>(false);
	const [mainGameMenuDisplay, setMainGameMenuDisplay] = useState<boolean>(true);
	const [joinCustomDisplay, setJoinCustomDisplay] = useState<boolean>(false);
	const [createCustomDisplay, setCreateCustomDisplay] = useState<boolean>(false);
	const [loseDisplay, setLoseDisplay] = useState<boolean>(false);
	const [winDisplay, setWinDisplay] = useState<boolean>(false);
	const [loadingDisplay, setLoadingDisplay] = useState<boolean>(false);
	const [matchInfo, setMatchInfo] = useState<gameInfo>({
    borderSize: 10,
    midSquareSize: 10,
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

	});
	useEffect(() => {
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
		function onMatchStart(matchData: matchInfoDto) {
			setLoadingDisplay(false);
			setJoinCustomDisplay(false);
			setMatchInfo({
				name: matchData.name,
		barDist: matchData.barDist,
		barSpeed: matchData.barSpeed,
		barLarge: matchData.barLarge,
		barSize: matchData.barSize,
		ballDirx: matchData.ballDirx,
		ballDiry: matchData.ballDiry,
		ballSpeed: matchData.ballSpeed,
		ballSize: matchData.ballSize,
		ballDeb: matchData.ballDeb,
		gamexsize: matchData.gamexsize,
		gameysize: matchData.gameysize,
		ballx: matchData.ballx,
		bally: matchData.bally,
		oneBary: matchData.oneBary,
		twoBary: matchData.twoBary,
		oneScore: matchData.oneScore,
		twoScore: matchData.oneScore,
		itemx: matchData.itemx,
		itemy: matchData.itemy,
		itemSize: matchData.itemSize,
		borderSize: matchData.borderSize,
		midSquareSize: matchData.midSquareSize,
		menuSize: matchData.menuSize,
		ysize: matchData.ysize,
		xsize: matchData.xsize,
		gamey: matchData.gamey,
		gamex: matchData.gamex,
	});
			setPongDisplay(true);
		}
		socket.on("server.win", onWin);
		socket.on("server.lose", onLose);
		socket.on("server.matchLoading", onMatchLoading);
		socket.on("server.matchStart", onMatchStart);

		return () => {
		};
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
	function joinLobbyOnClick() {
		setJoinCustomDisplay(false);
		setPongDisplay(true);
	}
	function normalOnClick() {
		setMainGameMenuDisplay(false);
		setLoadingDisplay(true);
		socket.emit("client.normalMatchmaking");
	}

	return (
		<div className="App">
			{mainGameMenuDisplay === true && <MainGameMenu normalOnClick={normalOnClick} joinCustomOnClick={joinCustomOnClick} createCustomOnClick={createCustomOnClick} />}
			{loadingDisplay === true && <Loading />}
			{joinCustomDisplay === true && <JoinCustom joinLobbyOnClick={joinLobbyOnClick}/>}
			{createCustomDisplay === true && <CreateCustom socket={socket} createLobbyOnClick={createLobbyOnClick}/>}
			{pongDisplay === true && <Pong matchInfo={matchInfo} />}
			{loseDisplay === true && <Lose />}
			{winDisplay === true && <Win />}
		</div>
	);
}
