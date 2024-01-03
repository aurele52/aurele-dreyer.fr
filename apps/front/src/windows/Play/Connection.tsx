import { useEffect, useState } from "react";
import { socket } from "../../socket";
import Loading from "./Loading";
import Play from "./Play";
import api from "../../axios";
import { useQuery } from "@tanstack/react-query";
import Win from "./Win";
import Lose from "./Lose";

export default function Connection() {
	const {
		data: user,
		//isLoading: userLoading,
		//error: userError,
	} = useQuery<{
		username: string;
		avatar_url: string;
	}>({
		queryKey: ["connectionUser"],
		queryFn: async () => {
			try {
				const response = await api.get(`/user/`);
				return response.data;
			} catch (error) {
				console.error("Error fetching user:", error);
				throw error;
			}
		},
	});
	const [pongDisplay, setPongDisplay] = useState<boolean>(false);
	const [connectionDisplay, setConnectionDisplay] = useState<boolean>(true);
	const [loseDisplay, setLoseDisplay] = useState<boolean>(false);
	const [winDisplay, setWinDisplay] = useState<boolean>(false);
	const [loadingDisplay, setLoadingDisplay] = useState<boolean>(false);

	useEffect(() => {
		socket.emit("client.openGame");
		/* socket.connect(); */
		function onMatchStart() {
			setPongDisplay(true);
			setLoadingDisplay(false);
		}
		function onLose() {
			setLoseDisplay(true);
			setPongDisplay(false);
		}
		function onWin() {
			setWinDisplay(true);
			setPongDisplay(false);
		}
		socket.on("server.win", onWin);
		socket.on("server.lose", onLose);
		socket.on("server.matchStart", onMatchStart);

		return () => {
		};
	}, []);

	function customOnClick() {
		setConnectionDisplay(false);
		setLoadingDisplay(true);
		socket.emit("client.matchmaking", {
			user: user?.username,
			mode: "custom",
		});
	}

	function normalOnClick() {
		setConnectionDisplay(false);
		setLoadingDisplay(true);
		socket.emit("client.matchmaking", {
			user: user?.username,
			mode: "normal",
		});
	}

	return (
		<div className="App">
			{connectionDisplay === true && (
				<>
					<button onClick={normalOnClick}>Normal Game</button>
					<button onClick={customOnClick}>Custom Game</button>
				</>
			)}
			{loadingDisplay === true && <Loading />}
			{loseDisplay === true && <Lose />}
			{winDisplay === true && <Win />}
			{pongDisplay === true && <Play socket={socket} />}
		</div>
	);
}
