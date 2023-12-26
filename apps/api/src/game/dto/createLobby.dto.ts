import { IsString } from 'class-validator';

export class CreateLobbyDto {
  @IsString()
  mode: 'local' | 'online';
}
