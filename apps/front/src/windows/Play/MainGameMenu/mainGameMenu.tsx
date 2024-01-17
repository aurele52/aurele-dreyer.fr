import { useEffect, useState } from "react";
import "./mainGameMenu.css";
import { socket } from "../../../socket";
import { gameInfo } from "shared/src/gameInfo.interface";
import CreateCustom from "../CreateGame/CreateCustom";
import JoinCustom from "../JoinGame/JoinCustom";
import { normalGameInfo } from "shared/src/normalGameInfo";
import Pong from "../Pong/Pong";
import Win from "../Win/Win";
import Lose from "../Lose/Lose";


interface mainGameMenuProps {
	windowId: number;
	privateLobby?: {
		targetId: number;
	};
}

export default function MainGameMenu({ privateLobby }: mainGameMenuProps) {
	const [joinNormalDefaultDisplay, setJoinNormalDefaultDisplay] = useState<boolean>(true);
	const [joinNormalWaitingDisplay, setJoinNormalWaitingDisplay] = useState<boolean>(false);
	const [joinNormalDesactivateDisplay, setJoinNormalDesactivateDisplay] = useState<boolean>(false);
	const [createCustomDefaultDisplay, setCreateCustomDefaultDisplay] = useState<boolean>(true);
	const [createCustomWaitingDisplay, setCreateCustomWaitingDisplay] = useState<boolean>(false);
	const [createCustomDesactivateDisplay, setCreateCustomDesactivateDisplay] = useState<boolean>(false);
	const [joinCustomDefaultDisplay, setJoinCustomDefaultDisplay] = useState<boolean>(true);
	const [joinCustomWaitingDisplay, setJoinCustomWaitingDisplay] = useState<boolean>(false);
	const [joinCustomDesactivateDisplay, setJoinCustomDesactivateDisplay] = useState<boolean>(false);
	const [joinCustomDisplay, setJoinCustomDisplay] = useState<boolean>(false);
	const [createCustomDisplay, setCreateCustomDisplay] = useState<boolean>(false);
	const [pongDisplay, setPongDisplay] = useState<boolean>(false);
	const [gameInfo, setGameInfo] = useState<gameInfo>(normalGameInfo);
	const [winDisplay, setWinDisplay] = useState<boolean>(false);
	const [loseDisplay, setLoseDisplay] = useState<boolean>(false);

	function onWin() {
		setPongDisplay(false);
		setWinDisplay(true);
	}
	function onLose() {
		setPongDisplay(false);
		setLoseDisplay(true);
	}
	function onCreateLobby() {
		setCreateCustomDisplay(false);
		setCreateCustomWaitingDisplay(true);
		setJoinNormalDesactivateDisplay(true);
		setJoinCustomDesactivateDisplay(true);
	}
	function onJoinLobby() {
		setJoinCustomDisplay(false);
		setJoinCustomWaitingDisplay(true);
		setJoinNormalDesactivateDisplay(true);
		setCreateCustomDesactivateDisplay(true);
	}
	function onMatchStart(data: gameInfo) {
		setGameInfo({ ...normalGameInfo, ...data
		});
		setJoinNormalDesactivateDisplay(false);
		setJoinCustomDesactivateDisplay(false);
		setCreateCustomDesactivateDisplay(false);
		setJoinNormalWaitingDisplay(false);
		setJoinCustomWaitingDisplay(false);
		setCreateCustomWaitingDisplay(false);
		setPongDisplay(true);
	}
	useEffect(() => {
		if (privateLobby) {
			console.log('create private match');
		}
		socket.on('server.matchStart', onMatchStart);
		socket.on("server.win", onWin);
		socket.on("server.lose", onLose);
		return () => {
			socket.emit('client.closeMainWindow');
			socket.off('server.matchStart', onMatchStart);
		};
	}, [privateLobby]);

	function joinNormalDefaultOnClick() {
		setJoinNormalDefaultDisplay(false);
		setJoinNormalWaitingDisplay(true);
		setJoinCustomDesactivateDisplay(true);
		setJoinCustomDefaultDisplay(false);
		setCreateCustomDesactivateDisplay(true);
		setCreateCustomDefaultDisplay(false);
		socket.emit("client.normalMatchmaking");
	}
	function createCustomDefaultOnClick() {
		setJoinNormalDefaultDisplay(false);
		setJoinCustomDefaultDisplay(false);
		setCreateCustomDefaultDisplay(false);
		setCreateCustomDisplay(true);
	}
	function joinCustomDefaultOnClick() {
		setJoinNormalDefaultDisplay(false);
		setJoinCustomDefaultDisplay(false);
		setCreateCustomDefaultDisplay(false);
		setJoinCustomDisplay(true);
		socket.emit("client.inJoinTab");
	}
	function joinNormalWaitingOnClick() {
		setJoinNormalWaitingDisplay(false);
		setJoinNormalDefaultDisplay(true);
		setJoinCustomDesactivateDisplay(false);
		setJoinCustomDefaultDisplay(true);
		setCreateCustomDesactivateDisplay(false);
		setCreateCustomDefaultDisplay(true);
		socket.emit('client.joinNormalAbort');
	}
	function createCustomWaitingOnClick() {
		setJoinNormalDesactivateDisplay(false);
		setJoinNormalDefaultDisplay(true);
		setJoinCustomDesactivateDisplay(false);
		setJoinCustomDefaultDisplay(true);
		setCreateCustomWaitingDisplay(false);
		setCreateCustomDefaultDisplay(true);
		socket.emit('client.createCustomAbort');
	}
	function joinCustomWaitingOnClick() {
		setJoinNormalDesactivateDisplay(false);
		setJoinNormalDefaultDisplay(true);
		setJoinCustomWaitingDisplay(false);
		setJoinCustomDefaultDisplay(true);
		setCreateCustomDesactivateDisplay(false);
		setCreateCustomDefaultDisplay(true);
		socket.emit('client.joinCustomAbort');
	}
	function joinNormalDesactivateOnClick() {
	}
	function createCustomDesactivateOnClick() {
	}
	function joinCustomDesactivateOnClick() {
	}

	return (
		<>
		<div className="game-menu">
			{joinNormalDefaultDisplay === true && 
			<div className="play-button-default" onClick={joinNormalDefaultOnClick}>
				PLAY
			</div>}
			{joinNormalDesactivateDisplay === true 
			&& <div className="play-button-off" onClick={joinNormalDesactivateOnClick}>
				PLAY
			</div>}
			{joinNormalWaitingDisplay === true && 
			<div className="play-button-waiting" onClick={joinNormalWaitingOnClick}>
				WAITING...
			</div>}
			{joinCustomDefaultDisplay === true &&
			 <div className="join-button-default" onClick={joinCustomDefaultOnClick}>
				JOIN
			</div>}
			{joinCustomDesactivateDisplay === true &&
			 <div className="join-button-off" onClick={joinCustomDesactivateOnClick}>
				JOIN
			</div>}
			{joinCustomWaitingDisplay === true &&
			 <div className="join-button-waiting" onClick={joinCustomWaitingOnClick}>
				WAITING...
			</div>}
			{createCustomDefaultDisplay === true &&
			 <div className="custom-button-default" onClick={createCustomDefaultOnClick}>
				CUSTOM
			</div>}
			{createCustomDesactivateDisplay === true &&
			 <div className="custom-button-off" onClick={createCustomDesactivateOnClick}>
				CUSTOM
			</div>}
			{createCustomWaitingDisplay === true &&
			 <div className="custom-button-waiting" onClick={createCustomWaitingOnClick}>
				WAITING...
			</div>}
		</div>
			{createCustomDisplay === true && <CreateCustom onCreateLobby={onCreateLobby}/>}
			{joinCustomDisplay === true && <JoinCustom onJoinCustom={onJoinLobby}/>}
			{pongDisplay === true && <Pong gameInfo={gameInfo}/>}
			{loseDisplay === true && <Lose />}
			{winDisplay === true && <Win />}
			</>
	);
}
