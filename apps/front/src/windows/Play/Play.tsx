import { useEffect, useState } from "react";
import { socket } from "../../socket";
import Loading from "./Loading";
import Pong from "./Pong";
import Win from "./Win";
import Lose from "./Lose";
import { MainGameMenu } from "./mainGameMenu";
import JoinCustom from "./JoinCustom";
import CreateCustom from "./CreateCustom";

export default function Connection() {
	const [pongDisplay, setPongDisplay] = useState<boolean>(false);
	const [mainGameMenuDisplay, setMainGameMenuDisplay] = useState<boolean>(true);
	const [joinCustomDisplay, setJoinCustomDisplay] = useState<boolean>(false);
	const [createCustomDisplay, setCreateCustomDisplay] = useState<boolean>(false);
	const [loseDisplay, setLoseDisplay] = useState<boolean>(false);
	const [winDisplay, setWinDisplay] = useState<boolean>(false);
	const [loadingDisplay, setLoadingDisplay] = useState<boolean>(false);

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
		function onNormalMatchStart() {
			setLoadingDisplay(false);
			setPongDisplay(true);
		}
		socket.on("server.win", onWin);
		socket.on("server.lose", onLose);
		socket.on("server.matchLoading", onMatchLoading);
		socket.on("server.normalMatchStart", onNormalMatchStart);

		return () => {
		};
	}, []);

	function createCustomOnClick() {
		setMainGameMenuDisplay(false);
		setCreateCustomDisplay(true);
		socket.emit("client.createCustom", {
			mode: "custom",
		});
	}
	function joinCustomOnClick() {
		setMainGameMenuDisplay(false);
		setJoinCustomDisplay(true);
		socket.emit("client.joinCustom", {
			mode: "custom",
		});
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
			{joinCustomDisplay === true && <JoinCustom />}
			{createCustomDisplay === true && <CreateCustom />}
			{pongDisplay === true && <Pong socket={socket} />}
			{loseDisplay === true && <Lose />}
			{winDisplay === true && <Win />}
		</div>
	);
}
