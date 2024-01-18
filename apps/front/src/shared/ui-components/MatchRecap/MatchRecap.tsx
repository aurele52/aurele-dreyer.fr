import { addWindow } from "../../../reducers";
import { WinColor } from "../../utils/WindowTypes";
import store from "../../../store";
import "./MatchRecap.css"

interface MatchRecapProps {
  id: number;
  player1: {
    id: number;
    username: string;
    avatar: string;
    score: number;
  };
  player2: {
    id: number;
    username: string;
    avatar: string;
    score: number;
  };
}

function MatchRecap({ id, player1, player2 }: MatchRecapProps) {
  const handleOpenProfile = (id: number, username: string) => {
    const newWindow = {
      WindowName: username,
      width: "400",
      height: "600",
      id: 0,
      content: { type: "PROFILE", id: id },
      toggle: false,
      handleBarButton: 7,
      color: WinColor.PURPLE,
      targetId: id,
    };
    store.dispatch(addWindow(newWindow));
  };

  return (
    <div className="match-recap" key={id}>
      <div
        className={`player ${
          player1.score > player2.score ? "winner-bg" : "loser-bg"
        }`}
      >
        <div>
          <div className="Outline">
            <div className="Avatar">
              <img
                src={player1.avatar}
                className="Picture"
                alt={player1.username}
              />
            </div>
          </div>
          <div className="Username">{player1.username}</div>
        </div>
      </div>
      <div className="score">
        <div>{player1.score + " - " + player2.score}</div>
      </div>
      <div
        className={`player ${
          player1.score < player2.score ? "winner-bg" : "loser-bg"
        }`}
        onClick={() => handleOpenProfile(player2.id, player2.username)}
        style={{ cursor: "pointer" }}
      >
        <div>
          <div className="Outline">
            <div className="Avatar">
              <img
                src={player2.avatar}
                className="Picture"
                alt={player2.username}
              />
            </div>
            <div className="Crown">
              <div></div>
            </div>
          </div>
          <div className="Username">{player2.username}</div>
        </div>
      </div>
    </div>
  );
}

export default MatchRecap;
