import { addWindow } from "../../../reducers";
import { WinColor } from "../../utils/WindowTypes";
import store from "../../../store";
import "./MatchRecap.css";
import { gameEndInfo } from "shared/src/gameEndInfo.interface";

type MatchRecapProps = {
  key?: number;
  bgColor: boolean;
} & gameEndInfo;

function MatchRecap({
  key,
  bgColor,
  player1,
  player2,
  isVictorious,
}: MatchRecapProps) {
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
    <div
      className={`match-recap bg-match-${
        bgColor ? (isVictorious ? "green" : "pink") : "default"
      }`}
      key={key}
    >
      <div
        className={`player ${player1.isWinner ? "winner-bg" : "loser-bg"}`}
        onClick={() => handleOpenProfile(player1.id, player1.username)}
        style={{ cursor: "pointer" }}
      >
        <div>
          <div className="Outline">
            <div className="Avatar">
              <img
                src={player1.avatar_url}
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
        className={`player ${player2.isWinner ? "winner-bg" : "loser-bg"}`}
        onClick={() => handleOpenProfile(player2.id, player2.username)}
        style={{ cursor: "pointer" }}
      >
        <div>
          <div className="Outline">
            <div className="Avatar">
              <img
                src={player2.avatar_url}
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
