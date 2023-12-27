import { Socket } from 'socket.io';
import { lobby } from './lobby/lobby';

export type AuthenticatedSocket = Socket & {
  data: {
    lobby: null | lobby;
  };

  emit: <T>(ev: string, data: T) => boolean;
};

export type LobbyOnline = 'isOnline' | 'isLocal';
export type LobbyPublic = 'isPrivate' | 'isPublic' | 'isFriendOnly';
