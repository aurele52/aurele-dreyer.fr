import { Socket } from 'socket.io';
import { lobby } from '../lobby/lobby';
import { input } from './input.interface';
import { gameInfo } from './shared/gameInfo.interface';

export interface clientInfo {
  socket?: Socket;
  lobby?: lobby | null;
  user?: {id: number, username: string, avatar_url: string} | null;
  mode: 'normal' | 'custom' | 'private';
  status: 'connected' | 'waiting join normal' | 'waiting create custom' | 'waiting join private' | 'inGame' | 'inJoinTab';
  input: input;
  matchInfo: gameInfo;
}
