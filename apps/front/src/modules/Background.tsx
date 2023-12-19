import "./Background.css";
import { connect } from "react-redux";
import { AppState } from "../reducers";
import { ConnectedProps } from "react-redux";
import Window from "./Window";
import Play from "./Play";
import Chat from "./Chat";
import Ladder from "./Ladder";
import Profile from "./Profile";
import FindChan from "./FindChan";
import NewChan from "./NewChan";

interface BackgroundProps extends ReduxProps {}

export function Background({ windows }: BackgroundProps) {
  return (
    <div id="Background">
      {Array.isArray(windows) &&
        windows.map((window, index) => {
          return (
            <Window
              key={index}
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
