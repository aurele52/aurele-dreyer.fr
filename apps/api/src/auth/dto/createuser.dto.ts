import {IsNotEmpty, IsNumberString, Length} from 'class-validator';

export class CreateUserDto {
	@Length(3, 12)
	@IsNotEmpty()
	readonly username: string;
}