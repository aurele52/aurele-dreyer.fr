import { IsString } from 'class-validator';

export class CreateLobbyDto {
  @IsString()
  isOnline: 'isLocal' | 'isOnline';
  @IsString()
  isPublic: 'isPublic' | 'isPrivate' | 'isFriendOnly';
}
