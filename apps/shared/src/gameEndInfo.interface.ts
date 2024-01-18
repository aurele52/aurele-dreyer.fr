export interface gameEndInfo {
  isVictorious?: boolean;
  player1: playerGameEndInfo;
  player2: playerGameEndInfo;
}

export interface playerGameEndInfo {
  id: number;
  username: string;
  avatar_url: string;
  score: number;
  isWinner: boolean;
}
