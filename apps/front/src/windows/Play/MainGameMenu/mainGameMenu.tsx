import { useEffect, useState } from "react";
import "./mainGameMenu.css";
import { socket } from "../../../socket";
import store from "../../../store";
import { HBButton, WinColor } from "../../../shared/utils/WindowTypes";
import { addWindow } from "../../../reducers";
import { gameInfo } from "shared/src/gameInfo.interface";


interface mainGameMenuProps {
	windowId: number;
	privateLobby?: {
		targetId: number;
	};
}

export default function MainGameMenu({ privateLobby }: mainGameMenuProps) {
	const [joinNormalDefaultDisplay, setJoinNormalDefaultDisplay] = useState<boolean>(true);
	const [joinNormalWaitingDisplay, setJoinNormalWaitingDisplay] = useState<boolean>(false);
	const [joinNormalInGameDisplay, setJoinNormalInGameDisplay] = useState<boolean>(false);
	const [joinNormalDesactivateDisplay, setJoinNormalDesactivateDisplay] = useState<boolean>(false);
	const [createCustomDefaultDisplay, setCreateCustomDefaultDisplay] = useState<boolean>(true);
	const [createCustomInGameDisplay, setCreateCustomInGameDisplay] = useState<boolean>(false);
	const [createCustomWaitingDisplay, setCreateCustomWaitingDisplay] = useState<boolean>(false);
	const [createCustomDesactivateDisplay, setCreateCustomDesactivateDisplay] = useState<boolean>(false);
	const [createCustomInTabDisplay, setCreateCustomInTabDisplay] = useState<boolean>(false);
	const [joinCustomDefaultDisplay, setJoinCustomDefaultDisplay] = useState<boolean>(true);
	const [joinCustomInGameDisplay, setJoinCustomInGameDisplay] = useState<boolean>(false);
	const [joinCustomWaitingDisplay, setJoinCustomWaitingDisplay] = useState<boolean>(false);
	const [joinCustomDesactivateDisplay, setJoinCustomDesactivateDisplay] = useState<boolean>(false);
	const [joinCustomInTabDisplay, setJoinCustomInTabDisplay] = useState<boolean>(false);

	function onMatchStart(gameInfo: gameInfo) {
		const newWindow = {
			WindowName: "PONG",
			width: "900",
			height: "900",
			id: 0,
			content: { type: "PONG" },
			toggle: true,
			handleBarButton: HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
			color: WinColor.PURPLE,
			gameInfo: gameInfo,
		};
		store.dispatch(addWindow(newWindow));
	}

	useEffect(() => {
		if (privateLobby) {
			console.log('create private match');
		}
		socket.on('server.matchStart', onMatchStart);
		return () => {
			socket.emit('server.closeMainWindow');
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
		const newWindow = {
			WindowName: "CREATECUSTOM",
			width: "900",
			height: "900",
			id: 0,
			content: { type: "CREATECUSTOM" },
			toggle: true,
			handleBarButton: HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
		setJoinNormalDefaultDisplay(false);
		setJoinNormalDesactivateDisplay(true);
		setJoinCustomDefaultDisplay(false);
		setJoinCustomDesactivateDisplay(true);
		setCreateCustomDefaultDisplay(false);
		setCreateCustomInTabDisplay(true);
	}
	function joinCustomDefaultOnClick() {
		const newWindow = {
			WindowName: "JOINCUSTOM",
			width: "900",
			height: "900",
			id: 0,
			content: { type: "JOINCUSTOM" },
			toggle: true,
			handleBarButton: HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
		setJoinNormalDefaultDisplay(false);
		setJoinNormalDesactivateDisplay(true);
		setJoinCustomDefaultDisplay(false);
		setJoinCustomInTabDisplay(true);
		setCreateCustomDefaultDisplay(false);
		setCreateCustomDesactivateDisplay(true);
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
	function joinNormalInGameOnClick() {
	}
	function createCustomInGameOnClick() {
	}
	function joinCustomInGameOnClick() {
	}
	function createCustomInTabOnClick() {
	}
	function joinCustomInTabOnClick() {
	}
	return (
		<div className="game-menu">
			{joinNormalDefaultDisplay === true && 
			<div className="play-button-default" onClick={joinNormalDefaultOnClick}>
				PLAY
			</div>}
			{joinNormalWaitingDisplay === true && 
			<div className="play-button-waiting" onClick={joinNormalWaitingOnClick}>
				WAITING...
			</div>}
			{joinNormalInGameDisplay === true && 
			<div className="play-button-ingame" onClick={joinNormalInGameOnClick}>
				IN GAME
			</div>}
			{joinNormalDesactivateDisplay === true && 
			<div className="play-button-off" onClick={joinNormalDesactivateOnClick}>
				PLAY
			</div>}
			{joinCustomDefaultDisplay === true && 
			<div className="join-button-default" onClick={joinCustomDefaultOnClick}>
				JOIN
			</div>}
			{joinCustomDesactivateDisplay === true && 
			<div className="join-button-off" onClick={joinCustomDesactivateOnClick}>
				JOIN
			</div>}
			{joinCustomInGameDisplay === true && 
			<div className="join-button-ingame" onClick={joinCustomInGameOnClick}>
				IN GAME
			</div>}
			{joinCustomWaitingDisplay === true && 
			<div className="join-button-waiting" onClick={joinCustomWaitingOnClick}>
				WAITING...
			</div>}
			{joinCustomInTabDisplay === true && 
			<div className="join-button-intab" onClick={joinCustomInTabOnClick}>
				IN GAME
			</div>}
			{createCustomDefaultDisplay === true && 
			<div className="custom-button-default" onClick={createCustomDefaultOnClick}>
				CUSTOM
			</div>}
			{createCustomDesactivateDisplay === true && 
			<div className="custom-button-off" onClick={createCustomDesactivateOnClick}>
				CUSTOM
			</div>}
			{createCustomInGameDisplay === true && 
			<div className="custom-button-ingame" onClick={createCustomInGameOnClick}>
				IN CUSTOM
			</div>}
			{createCustomWaitingDisplay === true && 
			<div className="ccustom-button-waiting" onClick={createCustomWaitingOnClick}>
				WAITING...
			</div>}
			{createCustomInTabDisplay === true && 
			<div className="custom-button-intab" onClick={createCustomInTabOnClick}>
				IN CUSTOM
			</div>}
		</div>
	);
}
