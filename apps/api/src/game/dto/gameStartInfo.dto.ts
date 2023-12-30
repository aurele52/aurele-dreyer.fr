import { IsString } from 'class-validator';

export class gameStartInfoDto {
  @IsString()
  mode: 'normal' | 'custom';
}
