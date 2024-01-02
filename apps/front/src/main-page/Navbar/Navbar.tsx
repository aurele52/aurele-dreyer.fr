import "./Navbar.css";
import { connect, ConnectedProps } from "react-redux";
import { addWindow } from "../../reducers";
import { HBButton, WinColor } from "../../shared/utils/WindowTypes";
import { Button } from "../../shared/ui-components/Button/Button";
import { router } from "../../router";
import axios from "axios";

interface NavbarProps extends ReduxProps {}

export function Navbar({ dispatch }: NavbarProps) {
  const handlePlay = () => {
    const newWindow = {
      WindowName: "Play",
      width: "500",
      height: "500",
      id: 0,
      content: { type: "PLAY" },
      toggle: true,
      handleBarButton: HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
      color: WinColor.PURPLE,
    };
    dispatch(addWindow(newWindow));
  };

  const handleLadder = () => {
    const newWindow = {
      WindowName: "Ladder",
      width: "500",
      height: "500",
      id: 0,
      content: { type: "LADDER" },
      toggle: true,
      handleBarButton: HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
      color: WinColor.PURPLE,
    };
    dispatch(addWindow(newWindow));
  };

  const handleChat = () => {
    const newWindow = {
      WindowName: "Chat",
      width: "387",
      height: "450",
      id: 0,
      content: { type: "CHAT" },
      toggle: true,
      handleBarButton: HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
      color: WinColor.PURPLE,
    };
    dispatch(addWindow(newWindow));
  };

  const handleProfile = () => {
    const newWindow = {
      WindowName: "Profile",
      width: "500",
      height: "500",
      id: 0,
      content: { type: "PROFILE" },
      toggle: true,
      handleBarButton: HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
      color: WinColor.PURPLE,
    };
    dispatch(addWindow(newWindow));
  };

  const handleLogOut = () => {
    const token = localStorage.getItem("token")
    console.log("Logging out");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.get(
      "/api/auth/disconnect",
      config
    );

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
      {/* <Button icon="LogOut" color="red" onClick={handleLogOut} /> */}
    </div>
  );
  return (
    <div id="Navbar">
      <div>
        <div className="NavButton" onClick={handlePlay}>
          <div>
            <div>PLAY</div>
          </div>
        </div>
        <div className="NavButton" onClick={handleLadder}>
          <div>
            <div>LADDER</div>
          </div>
        </div>
        <div className="NavButton" onClick={handleChat}>
          <div>
            <div>CHAT</div>
          </div>
        </div>
        <div className="NavButton" onClick={handleProfile}>
          <div>
            <div>MY PROFILE</div>
          </div>
        </div>
      </div>
      <Button icon="LogOut" color="red" onClick={handleLogOut} />
    </div>
  );
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedNavbar = connector(Navbar);
export default ConnectedNavbar;
