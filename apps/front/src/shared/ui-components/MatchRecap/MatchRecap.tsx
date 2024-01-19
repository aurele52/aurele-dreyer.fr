import { addWindow } from "../../../reducers";
import { WinColor } from "../../utils/WindowTypes";
import store from "../../../store";
import "./MatchRecap.css";
import { gameEndInfo } from "shared/src/gameEndInfo.interface";
import { useQuery } from "@tanstack/react-query";
import api from "../../../axios";

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
  const { data: selfId } = useQuery<number>({
    queryKey: ["selfId"],
    queryFn: async () => {
      const response = await api.get("/id");
      return response.data;
    },
  });

  const handleOpenProfile = (id: number, username: string) => {
    const name = selfId === id ? "Profile" : username;
    const idUser = id === selfId ? undefined : id;
    const newWindow = {
      WindowName: name,
      width: "400",
      height: "600",
      id: 0,
      content: { type: "PROFILE", id: idUser },
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
        className={`player player-left ${
          player1.isWinner ? "winner-bg" : "loser-bg"
        }`}
        onClick={() => handleOpenProfile(player1.id, player1.username)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={player1.avatar_url}
          className="avatar-match"
          alt={player1.username}
        />
        <div className="username">{player1.username}</div>
      </div>
      <div className="score">
        <div>{player1.score + " - " + player2.score}</div>
      </div>
      <div
        className={`player player-right ${
          player2.isWinner ? "winner-bg" : "loser-bg"
        }`}
        onClick={() => handleOpenProfile(player2.id, player2.username)}
        style={{ cursor: "pointer" }}
      >
        <div className="username">{player2.username}</div>
        <img
          src={player2.avatar_url}
          className="avatar-match"
          alt={player2.username}
        />
        <div className="Crown">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default MatchRecap;
