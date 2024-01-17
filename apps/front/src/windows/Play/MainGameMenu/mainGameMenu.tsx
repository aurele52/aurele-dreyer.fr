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
import PrivateWaiting from "../PrivateWaiting/PrivateWaiting";


interface mainGameMenuProps {
	windowId: number;
	privateLobby?: {
		targetId: number;
	};
}

export default function MainGameMenu(props: mainGameMenuProps) {
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
	const [privateWaitingDisplay, setPrivateWaitingDisplay] = useState<boolean>(false);

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
		setPrivateWaitingDisplay(false);
		setPongDisplay(true);
	}
	function onPrivateMatch() {
		setGameInfo({ ...normalGameInfo	});
		setJoinNormalDesactivateDisplay(false);
		setJoinCustomDesactivateDisplay(false);
		setCreateCustomDesactivateDisplay(false);
		setJoinNormalWaitingDisplay(false);
		setJoinCustomWaitingDisplay(false);
		setCreateCustomWaitingDisplay(false);
		setJoinNormalDefaultDisplay(false);
		setJoinCustomDefaultDisplay(false);
		setCreateCustomDefaultDisplay(false);
		setPrivateWaitingDisplay(true);
		socket.emit('client.privateMatchmaking', props.privateLobby.targetId);
	}
	useEffect(() => {
		if (props.privateLobby) {
			onPrivateMatch();
		}
		socket.on('server.matchStart', onMatchStart);
		socket.on("server.win", onWin);
		socket.on("server.lose", onLose);
		return () => {
			socket.emit('client.closeMainWindow');
			socket.off('server.matchStart', onMatchStart);
		};
	}, [props.privateLobby]);

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
		<div className="mainGameMenu">
			{joinNormalDefaultDisplay === true && <button className="joinNormalDefaultButton" onClick={joinNormalDefaultOnClick}>Normal Game</button>}
			{joinNormalDesactivateDisplay === true && <button className="joinNormalDesactivateButton" onClick={joinNormalDesactivateOnClick}>Normal Game</button>}
			{joinNormalWaitingDisplay === true && <button className="joinNormalWaitingButton" onClick={joinNormalWaitingOnClick}>Waiting</button>}
			{createCustomDefaultDisplay === true && <button className="createCustomDefaultButton" onClick={createCustomDefaultOnClick}>Create Custom Game</button>}
			{createCustomDesactivateDisplay === true && <button className="createCustomDesativateButton" onClick={createCustomDesactivateOnClick}>Create Custom Game</button>}
			{createCustomWaitingDisplay === true && <button className="createCustomWaitingButton" onClick={createCustomWaitingOnClick}>Waiting</button>}
			{joinCustomDefaultDisplay === true && <button className="joinCustomDefaultButton" onClick={joinCustomDefaultOnClick}>Join Custom Game</button>}
			{joinCustomDesactivateDisplay === true && <button className="joinCustomDesactivateButton" onClick={joinCustomDesactivateOnClick}>Join Custom Game</button>}
			{joinCustomWaitingDisplay === true && <button className="joinCustomWaitingButton" onClick={joinCustomWaitingOnClick}>Waiting</button>}
		</div>
			{createCustomDisplay === true && <CreateCustom onCreateLobby={onCreateLobby}/>}
			{joinCustomDisplay === true && <JoinCustom onJoinCustom={onJoinLobby}/>}
			{pongDisplay === true && <Pong gameInfo={gameInfo}/>}
			{loseDisplay === true && <Lose />}
			{winDisplay === true && <Win />}
			{privateWaitingDisplay === true && <PrivateWaiting />}
			</>
	);
}
