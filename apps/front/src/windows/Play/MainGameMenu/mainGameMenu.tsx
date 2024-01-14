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
		<div className="mainGameMenu">
			{joinNormalDefaultDisplay === true && <button className="joinNormalDefaultButton" onClick={joinNormalDefaultOnClick}>Normal Game</button>}
			{joinNormalDesactivateDisplay === true && <button className="joinNormalDesactivateButton" onClick={joinNormalDesactivateOnClick}>Normal Game</button>}
			{joinNormalInGameDisplay === true && <button className="joinNormalInGameButton" onClick={joinNormalInGameOnClick}>In Game</button>}
			{joinNormalWaitingDisplay === true && <button className="joinNormalWaitingButton" onClick={joinNormalWaitingOnClick}>Waiting</button>}
			{createCustomDefaultDisplay === true && <button className="createCustomDefaultButton" onClick={createCustomDefaultOnClick}>Create Custom Game</button>}
			{createCustomDesactivateDisplay === true && <button className="createCustomDesativateButton" onClick={createCustomDesactivateOnClick}>Create Custom Game</button>}
			{createCustomInGameDisplay === true && <button className="createCustomInGameButton" onClick={createCustomInGameOnClick}>In Game</button>}
			{createCustomWaitingDisplay === true && <button className="createCustomWaitingButton" onClick={createCustomWaitingOnClick}>Waiting</button>}
			{createCustomInTabDisplay === true && <button className="createCustomInTabButton" onClick={createCustomInTabOnClick}>In Create Custom Windows</button>}
			{joinCustomDefaultDisplay === true && <button className="joinCustomDefaultButton" onClick={joinCustomDefaultOnClick}>Join Custom Game</button>}
			{joinCustomDesactivateDisplay === true && <button className="joinCustomDesactivateButton" onClick={joinCustomDesactivateOnClick}>Join Custom Game</button>}
			{joinCustomInGameDisplay === true && <button className="joinCustomInGameButton" onClick={joinCustomInGameOnClick}>In Game</button>}
			{joinCustomWaitingDisplay === true && <button className="joinCustomWaitingButton" onClick={joinCustomWaitingOnClick}>Waiting</button>}
			{joinCustomInTabDisplay === true && <button className="joinCustomInTabButton" onClick={joinCustomInTabOnClick}>In Join Window</button>}
		</div>
	);
}
