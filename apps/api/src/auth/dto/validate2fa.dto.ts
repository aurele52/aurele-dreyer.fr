import {IsNumberString, Length} from 'class-validator';

export class Validate2FADto {
	@IsNumberString()
	@Length(6, 8)
	readonly code: string;
}