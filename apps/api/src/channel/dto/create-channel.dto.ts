import { ChannelTypes } from '../types/channel.types';

export class CreateChannelDto {
  readonly id: number;
  readonly name: string;
  readonly type: ChannelTypes;
  readonly password: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}
