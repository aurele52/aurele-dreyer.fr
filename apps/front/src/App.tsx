import "./App.css";
import Navbar from "./main-page/Navbar/Navbar";
import Background from "./main-page/Background/Background";
import { AppState } from "./reducers";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import api from "./axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useState } from "react";

function App() {
	//const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
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

	useEffect(() => {
		socket.connect();
		function onDisconnect() {
			//setIsConnected(false);
		}

		socket.on("connect", () => {
			//setIsConnected(true);
			socket.emit(
				"client.authentification", {
					user: user,
					token: window.localStorage.getItem("token")
				}
			);
		});
		socket.on("disconnect", onDisconnect);

		return () => {
			socket.off("connect");
			socket.off("disconnect", onDisconnect);
		};
	}, []);

	const { displayFilter, zIndexFilter } = useSelector((state: AppState) => {
		const modalWindow = state.windows.find(
			(window) => window.content.type === "MODAL"
		);

		if (modalWindow) {
			return {
				displayFilter: "block",
				zIndexFilter: modalWindow.zindex || 0,
			};
		} else {
			return {
				displayFilter: "none",
				zIndexFilter: 0,
			};
		}
	});
	return (
		<div className="App">
			<div
				className="Filter"
				style={{ display: displayFilter, zIndex: zIndexFilter }}
			></div>
			<Navbar />
			<Background />
		</div>
	);
}

export default App;
