export type ServerPayloads = {
  ['server.gameState']: {
    oneBary: number;
    twoBary: number;
    ballx: number;
    bally: number;
  };

  ['server.lobbyState']: {
    lobbyId: string;
    online: 'online' | 'local';
    public: 'private' | 'public' | 'friendOnly';
    hasStarted: boolean;
    hasFinished: boolean;
    currentRound: number;
    playersCount: number;
    isSuspended: boolean;
    scores: Record<string, number>;
  };

  ['server.gameMessage']: {
    message: string;
    color?: 'green' | 'red' | 'blue' | 'orange';
  };
};
