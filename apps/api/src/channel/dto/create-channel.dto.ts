import { ChannelTypes } from '../types/channel.types';
import { Prisma } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { IsEqualToProperty } from 'src/decorators/equal-to.decorator';

const ChannelTypesSubset = {
  PUBLIC: ChannelTypes.PUBLIC,
  PRIVATE: ChannelTypes.PRIVATE,
  PROTECTED: ChannelTypes.PROTECTED,
};

export class CreateChannelDto implements Prisma.ChannelCreateInput {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly topic: string;

  @IsNotEmpty()
  @IsEnum(ChannelTypesSubset)
  readonly type: ChannelTypes;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((c) => c.type === ChannelTypes.PROTECTED, {
    message: 'No password is required for channel types other than protected.',
  })
  readonly password: string;

  @IsEqualToProperty<CreateChannelDto>('password', {
    message: 'The password confirmation does not match the password.',
  })
  readonly passwordConfirmation: string;
}
