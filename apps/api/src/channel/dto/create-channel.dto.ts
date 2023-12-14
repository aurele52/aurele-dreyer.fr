import { ChannelTypes } from '../types/channel.types';
import { Prisma } from '@prisma/client';

export class CreateChannelDto implements Prisma.ChannelCreateInput {
  readonly name: string;
  readonly topic: string;
  readonly type: ChannelTypes;
  readonly password?: string;
  readonly passwordConfirmation?: string;
}
