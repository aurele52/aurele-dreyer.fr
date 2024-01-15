import { useEffect, useState } from "react";
import "./mainGameMenu.css";
import { socket } from "../../../socket";
import store from "../../../store";
import { HBButton, WinColor } from "../../../shared/utils/WindowTypes";
import { addWindow, delWindow } from "../../../reducers";
import { gameInfo } from "shared/src/gameInfo.interface";
import CreateCustom from "../CreateGame/CreateCustom";


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
	const [joinCustomDefaultDisplay, setJoinCustomDefaultDisplay] = useState<boolean>(true);
	const [joinCustomInGameDisplay, setJoinCustomInGameDisplay] = useState<boolean>(false);
	const [joinCustomWaitingDisplay, setJoinCustomWaitingDisplay] = useState<boolean>(false);
	const [joinCustomDesactivateDisplay, setJoinCustomDesactivateDisplay] = useState<boolean>(false);
	const [joinCustomDisplay, setJoinCustomDisplay] = useState<boolean>(false);
	const [createCustomDisplay, setCreateCustomDisplay] = useState<boolean>(false);

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
	function onCloseCreateCustom() {
		setJoinNormalDesactivateDisplay(false);
		setJoinNormalDefaultDisplay(true);
		setJoinCustomDesactivateDisplay(false);
		setJoinCustomDefaultDisplay(true);
		setCreateCustomDefaultDisplay(true);
			const memberSettingsWindow = store
				.getState()
				.windows.find(
					(window) => window.content.type === "CREATECUSTOM"
				);
			if (memberSettingsWindow) {
				store.dispatch(delWindow(memberSettingsWindow.id));
			}
	}
	function onCloseJoinCustom() {
		setJoinNormalDesactivateDisplay(false);
		setJoinNormalDefaultDisplay(true);
		setJoinCustomDefaultDisplay(true);
		setCreateCustomDesactivateDisplay(false);
		setCreateCustomDefaultDisplay(true);
			const memberSettingsWindow = store
				.getState()
				.windows.find(
					(window) => window.content.type === "JOINCUSTOM"
				);
			if (memberSettingsWindow) {
				store.dispatch(delWindow(memberSettingsWindow.id));
			}
	}

	useEffect(() => {
		if (privateLobby) {
			console.log('create private match');
		}
		socket.on('server.matchStart', onMatchStart);
		socket.on('server.closeCreateCustom', onCloseCreateCustom);
		socket.on('server.closeJoinCustom', onCloseJoinCustom);
		return () => {
			socket.emit('client.closeMainWindow');
			socket.off('server.matchStart', onMatchStart);
			let memberSettingsWindow = store
				.getState()
				.windows.find(
					(window) => window.content.type === "CREATECUSTOM"
				);
			if (memberSettingsWindow) {
				store.dispatch(delWindow(memberSettingsWindow.id));
			}
			memberSettingsWindow = store
				.getState()
				.windows.find(
					(window) => window.content.type === "JOINCUSTOM"
				);
			if (memberSettingsWindow) {
				store.dispatch(delWindow(memberSettingsWindow.id));
			}
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
	return (
		<>
		<div className="mainGameMenu">
			{joinNormalDefaultDisplay === true && <button className="joinNormalDefaultButton" onClick={joinNormalDefaultOnClick}>Normal Game</button>}
			{joinNormalDesactivateDisplay === true && <button className="joinNormalDesactivateButton" onClick={joinNormalDesactivateOnClick}>Normal Game</button>}
			{joinNormalInGameDisplay === true && <button className="joinNormalInGameButton" onClick={joinNormalInGameOnClick}>In Game</button>}
			{joinNormalWaitingDisplay === true && <button className="joinNormalWaitingButton" onClick={joinNormalWaitingOnClick}>Waiting</button>}
			{createCustomDefaultDisplay === true && <button className="createCustomDefaultButton" onClick={createCustomDefaultOnClick}>Create Custom Game</button>}
			{createCustomDesactivateDisplay === true && <button className="createCustomDesativateButton" onClick={createCustomDesactivateOnClick}>Create Custom Game</button>}
			{createCustomInGameDisplay === true && <button className="createCustomInGameButton" onClick={createCustomInGameOnClick}>In Game</button>}
			{createCustomWaitingDisplay === true && <button className="createCustomWaitingButton" onClick={createCustomWaitingOnClick}>Waiting</button>}
			{joinCustomDefaultDisplay === true && <button className="joinCustomDefaultButton" onClick={joinCustomDefaultOnClick}>Join Custom Game</button>}
			{joinCustomDesactivateDisplay === true && <button className="joinCustomDesactivateButton" onClick={joinCustomDesactivateOnClick}>Join Custom Game</button>}
			{joinCustomInGameDisplay === true && <button className="joinCustomInGameButton" onClick={joinCustomInGameOnClick}>In Game</button>}
			{joinCustomWaitingDisplay === true && <button className="joinCustomWaitingButton" onClick={joinCustomWaitingOnClick}>Waiting</button>}
		</div>
			{createCustomDisplay === true && <CreateCustom />}
			</>
	);
}
