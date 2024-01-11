import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelService } from './channel.service';
import { CurrentUser, CurrentUserID } from 'src/decorators/user.decorator';
import { UserChannelService } from 'src/user-channel/user-channel.service';
import { UserChannelRoles } from 'src/user-channel/roles/user-channel.roles';
import { ChannelTypes } from './types/channel.types';
import { FriendshipService } from 'src/friendship/friendship.service';

@Controller()
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService,
    private readonly userChannelService: UserChannelService,
    private readonly friendshipService: FriendshipService,
  ) {}

  @Get('/chats')
  async findCurrUserChannels(@CurrentUser() user) {
    const channels = await this.channelService.channelsCurrentUser({
      currUserId: user.id,
    });
    return channels;
  }

  @Get('/chat/:chatid')
  async findChat(@CurrentUser() user, @Param('chatid') channel_id: number) {
    return await this.channelService.chat(user.id, channel_id);
  }

  @Get('/channels')
  async findOtherChannels(@CurrentUser() user) {
    return this.channelService.otherChannels({ currUserId: user.id });
  }

  @Get('/channels/common/:userid')
  async findCommonChat(
    @CurrentUserID() user1_id,
    @Param('userid') user2_id: number,
  ) {
    return this.channelService.getCommonChats(user1_id, user2_id);
  }

  @Get('/channels/excluded/:userid')
  async findExcludedChat(
    @CurrentUserID() user1_id,
    @Param('userid') user2_id: number,
  ) {
    return this.channelService.getExcludedChats(user1_id, user2_id);
  }

  @Post('/channel')
  async addChannel(
    @CurrentUser() user,
    @Body() createChannelDto: CreateChannelDto,
  ) {
    const { passwordConfirmation: _, ...channelData } = createChannelDto;

    const channel = await this.channelService.createChannel({
      ...channelData,
    });
    await this.userChannelService.createUserChannel({
      userId: user.id,
      channelId: channel.id,
      role: UserChannelRoles.OWNER,
    });
    return channel;
  }

  @Get('/channel/:id')
  async findChannel(@Param('id') id: number) {
    return this.channelService.channel(id);
  }

  @Get('/channel/:id/me')
  async isCurrentUserMember(@Param('id') id: number, @CurrentUser() user) {
    return this.channelService.isUserMember(id, user.id);
  }

  @Get('/channel/:id/nonmembers')
  async findNonMembers(
    @Param('id') channel_id: number,
    @CurrentUserID() user_id: number,
  ) {
    return this.channelService.getNonMembers(channel_id, user_id);
  }

  @Put('/channel/:id')
  async updateChannel(
    @Param('id') channel_id: number,
    @Body() updateChannelDto: CreateChannelDto,
  ) {
    const { passwordConfirmation: _, ...channelData } = updateChannelDto;
    return this.channelService.updateChannel(channel_id, { ...channelData });
  }

  @Get('/banList/:chanId')
  async getBanList(
    @Param('chanId') channel_id: number,
    @CurrentUserID() user_id: number,
  ) {
    return this.channelService.getBanList(user_id, channel_id);
  }

  @Get('/dm/:userid')
  async getDm(
    @Param('userid') user1_id: number,
    @CurrentUserID() user2_id: number,
  ) {
    const dm = await this.channelService.getDm(user1_id, user2_id);
    if (dm === undefined) return undefined;
    return dm.id;
  }

  @Post('/dm')
  async createDm(
    @CurrentUserID() user1_id: number,
    @Body('userId') user2_id: number,
  ) {
    const isBlocked = await this.friendshipService.isBlockedRelationship(
      user1_id,
      user2_id,
    );
    if (isBlocked) {
      throw new BadRequestException('Cannot create a dm with a blocked user');
    }

    const channel = await this.channelService.createChannel({
      name: '',
      topic: '',
      type: ChannelTypes.DM,
      password: undefined,
    });

    if (channel) {
      await this.userChannelService.createUserChannel({
        userId: user1_id,
        channelId: channel.id,
        role: UserChannelRoles.MEMBER,
      });

      await this.userChannelService.createUserChannel({
        userId: user2_id,
        channelId: channel.id,
        role: UserChannelRoles.MEMBER,
      });

      return channel.id;
    }
    throw new Error('An error occured while creating the channel');
  }

  @Post('/channel/:channelid/checkpwd')
  async checkPwd(
    @Param('channelid') channelId: number,
    @Body('password') password: string,
  ) {
    return await this.channelService.checkPwd(channelId, password);
  }
}
