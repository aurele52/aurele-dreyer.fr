import { Socket } from 'socket.io';
import { Lobby } from './lobby/lobby';

export type AuthenticatedSocket = Socket & {
  data: {
    lobby: null | Lobby;
  };

  emit: <T>(ev: string, data: T) => boolean;
};

export type LobbyMode = 'duo' | 'solo';
