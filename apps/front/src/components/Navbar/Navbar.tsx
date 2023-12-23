import "./Navbar.css";
import { connect, ConnectedProps } from "react-redux";
import { addWindow } from "../../reducers";
import { HBButton, WinColor } from "../../utils/WindowTypes";

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
      modal: false,
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
      modal: false,
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
      modal: false,
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
      modal: false,
      handleBarButton: HBButton.Reduce + HBButton.Enlarge + HBButton.Close,
      color: WinColor.PURPLE,
    };
    dispatch(addWindow(newWindow));
  };

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
    </div>
  );
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedNavbar = connector(Navbar);
export default ConnectedNavbar;
