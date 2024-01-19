import { IsNotEmpty, Length, Matches } from 'class-validator';

export class SetUsernameDto {
  @Length(4, 15)
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9_-]*$/, {
    message: 'username must contain only letters, numbers, - or _',
  })
  readonly username: string;
}
