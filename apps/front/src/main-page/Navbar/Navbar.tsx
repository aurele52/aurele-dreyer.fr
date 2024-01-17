import "./Navbar.css";
import { addWindow } from "../../reducers";
import { HBButton, WinColor } from "../../shared/utils/WindowTypes";
import { router } from "../../router";
import store from "../../store";
import { socket } from "../../socket";
import { IconSVG } from "../../shared/utils/svgComponent";

export default function Navbar() {
	const handlePlay = () => {
		socket.emit("client.openGame");
		const newWindow = {
			WindowName: "Play",
			width: "500",
			height: "500",
			id: 0,
			content: { type: "PLAY" },
			toggle: true,
			handleBarButton:
				HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
	};

	const handleLadder = () => {
		const newWindow = {
			WindowName: "Ladder",
			width: "500",
			height: "500",
			id: 0,
			content: { type: "LADDER" },
			toggle: true,
			handleBarButton:
				HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
	};

	const handleChat = () => {
		const newWindow = {
			WindowName: "Chat",
			width: "387",
			height: "450",
			id: 0,
			content: { type: "CHAT" },
			toggle: true,
			handleBarButton:
				HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
	};

	const handleProfile = () => {
		const newWindow = {
			WindowName: "Profile",
			width: "500",
			height: "500",
			id: 0,
			content: { type: "PROFILE" },
			toggle: true,
			handleBarButton:
				HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
			color: WinColor.PURPLE,
		};
		store.dispatch(addWindow(newWindow));
	};

	const handleLogOut = () => {
		localStorage.removeItem("token");
		router.load();
	};


  return (
    <div id="Navbar">
      <div>
        <button type="button" className="NavButton" onClick={handlePlay}>
          PLAY
        </button>
        <button type="button" className="NavButton" onClick={handleLadder}>
          LADDER
        </button>
        <button type="button" className="NavButton" onClick={handleChat}>
          CHAT
        </button>
        <button type="button" className="NavButton" onClick={handleProfile}>
          MY PROFILE
        </button>
      </div>
      <button type="button" className="DecoButton" onClick={handleLogOut}>
        <div>{IconSVG['LogOut']}</div>
      </button>
    </div>
  );
}
