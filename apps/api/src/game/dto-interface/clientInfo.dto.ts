import { IsString } from 'class-validator';
import { Socket } from 'socket.io';
import { lobby } from '../lobby/lobby';
import { input } from './input.interface';

export class clientInfoDto {
  socket?: Socket;
  lobby?: lobby | null;
  @IsString()
  user: string;
  @IsString()
  mode: 'normal' | 'custom';
  @IsString()
  status: 'connected' | 'waiting' | 'inGame';
  input: input;
}
