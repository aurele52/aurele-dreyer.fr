import "./Background.css";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { ConnectedProps } from "react-redux";
import Window from "../Window/Window";
import Play from "../Play/Play";
import Chat from "../Chat/Chat";
import Ladder from "../Ladder/Ladder";
import Profile from "../Profile/Profile";
import FindChan from "../FindChan/FindChan";
import NewChan from "../NewChan/NewChan";
import AboutChan from "../AboutChan/AboutChan";
import Achievements from "../Achievements/Achievements";

interface BackgroundProps extends ReduxProps {}

export function Background({ windows }: BackgroundProps) {
  return (
    <div id="Background">
      {Array.isArray(windows) &&
        windows.map((window) => {
          return (
            <Window
              key={window.id}
              WindowName={window.WindowName}
              width={window.width}
              height={window.height}
              id={window.id}
              modal={window.modal}
              handleBarButton={window.handleBarButton}
              color={window.color}
            >
              {window.content.type === "PLAY" && <Play />}
              {window.content.type === "LADDER" && <Ladder />}
              {window.content.type === "CHAT" && <Chat />}
              {window.content.type === "PROFILE" && <Profile />}
              {window.content.type === "FINDCHAN" && <FindChan />}
              {window.content.type === "NEWCHAN" && <NewChan />}
              {window.content.type === "ABOUTCHAN" && <AboutChan chanId={window.content.id || -1} />}
              {window.content.type === "ACHIEVEMENTS" && <Achievements />}
            </Window>
          );
        })}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  windows: state.windows,
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedBackground = connector(Background);
export default ConnectedBackground;
