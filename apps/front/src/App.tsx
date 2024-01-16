import "./App.css";
import Navbar from "./main-page/Navbar/Navbar";
import Background from "./main-page/Background/Background";
import { AppState } from "./reducers";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import api from "./axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/user`);
        const userData = response.data;

        if (userData && userData.username) {
          socket.emit("client.authentification", {
            user: userData.username,
            token: window.localStorage.getItem("token"),
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

	socket.auth = {token: localStorage.getItem("token")};
    socket.connect();

    socket.on("connect", () => {
      fetchData();
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected : " + reason);
    });

		return () => {
			socket.off("connect");
			socket.off("disconnect");
		};
	}, []);
	const { displayFilter, zIndexFilter } = useSelector(
		(state: AppState) => {
			const modalWindow = state.windows.find(
				(window) =>
					window.content.type === "MODAL" ||
					window.content.type === "MODALREQUESTED"
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
		},
		(prev, next) =>
			prev.displayFilter === next.displayFilter &&
			prev.zIndexFilter === next.zIndexFilter
	);
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
