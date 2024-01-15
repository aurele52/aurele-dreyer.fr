import { Socket } from 'socket.io';
import { lobby } from '../lobby/lobby';
import { input } from './input.interface';
import { gameInfo } from './shared/gameInfo.interface';

export interface clientInfo {
  socket?: Socket;
  lobby?: lobby | null;
  user: string;
  mode: 'normal' | 'custom';
  status: 'connected' | 'waiting join normal' | 'waiting create custom' | 'inGame' | 'inJoinTab';
  input: input;
  matchInfo: gameInfo;
}
