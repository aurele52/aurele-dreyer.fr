import { gameEndInfo } from "shared/src/gameEndInfo.interface";
import "./GameEnd.css";
import MatchRecap from "../../../shared/ui-components/MatchRecap/MatchRecap";

type GameEndProps = {
} & gameEndInfo;

export function GameEnd({
  isVictorious,
  player1,
  player2,
}: GameEndProps) {
  return (
    <>
      <div className="body-game-end">
        <div
          className={`title-stroke label-${
            isVictorious ? "victory" : "defeat"
          }`}
        >
          {isVictorious ? "Victory" : "Defeat"}
        </div>
        <MatchRecap
          bgColor={true}
          player1={player1}
          player2={player2}
          isVictorious={isVictorious}
        ></MatchRecap>
      </div>
    </>
  );
}
