import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserChannelService } from './user-channel.service';
import { CurrentUser, CurrentUserID } from 'src/decorators/user.decorator';
import { UserChannelRoles } from './roles/user-channel.roles';
import { UserChannelModerateService } from './user-channel.moderate.service';

@Controller()
export class UserChannelController {
  constructor(
    private readonly userChannelService: UserChannelService,
    private readonly userChannelModerateService: UserChannelModerateService,
  ) {}

  @Post('/user-channel')
  async addCurrUser(@Body('channelId') channelId, @CurrentUser() user) {
    const userChannel = await this.userChannelService.createUserChannel({
      userId: user.id,
      channelId: channelId,
      role: UserChannelRoles.MEMBER,
    });
    return userChannel;
  }

  @Post('/user-channel/:userid')
  async addUser(@Body('channelId') channelId, @Param('userid') userId: number) {
    const userChannel = await this.userChannelService.createUserChannel({
      userId: userId,
      channelId: channelId,
      role: UserChannelRoles.MEMBER,
    });
    return userChannel;
  }

  @Delete('/user-channel/:id')
  async delete(@Param('id') id: number) {
    return await this.userChannelService.deleteUserChannel(id);
  }

  @Get('/user-channel/:channelid/current-user')
  async findCurrUser(
    @CurrentUser() user,
    @Param('channelid') channelId: number,
  ) {
    if (!channelId) return { id: user.id, role: undefined };
    return await this.userChannelService.currUser(user.id, channelId);
  }

  @Get('/user-channel/:channelid/:userid')
  async findUser(
    @Param('channelid') channelId: number,
    @Param('userid') targetId: number,
  ) {
    if (!channelId || !targetId)
      return {
        /* HTTP STATUS */
      };
    return await this.userChannelService.currUser(targetId, channelId);
  }

  @Post('/user-channel/moderate/admin')
  async makeAdmin(
    @Body() body: { data: { targetId: number; channelId: number } },
    @CurrentUserID() selfId: number,
  ) {
    console.log(body);
    const { targetId, channelId } = body.data;
    console.log({ targetId, selfId, channelId });
    const result = await this.userChannelModerateService.makeAdmin(
      selfId,
      targetId,
      channelId,
    );
    return result;
  }

  @Patch('/user-channel/moderate/admin')
  async demoteAdmin(
    @Body() body: { data: { targetId: number; channelId: number } },
    @CurrentUserID() selfId: number,
  ) {
    try {
      console.log(body);
      const { data } = body;

      if (!data || !data.targetId || !data.channelId) {
        throw new HttpException('Invalid request body', HttpStatus.BAD_REQUEST);
      }

      const { targetId, channelId } = data;
      const result = await this.userChannelModerateService.demoteAdmin(
        selfId,
        targetId,
        channelId,
      );
      return result;
    } catch (error) {
      console.error('Error in demoteAdmin:', error.message);
      throw error;
    }
  }

  @Post('/user-channel/moderate/owner')
  async makeOwner(
    @Body() body: { data: { targetId: number; channelId: number } },
    @CurrentUserID() selfId: number,
  ) {
    const { targetId, channelId } = body.data;
    const result = await this.userChannelModerateService.makeOwner(
      selfId,
      targetId,
      channelId,
    );
    return result;
  }

  @Post('/user-channel/moderate/mute')
  async muteUser(
    @Body()
    body: { data: { targetId: number; channelId: number; endDate: Date } },
    @CurrentUserID() selfId: number,
  ) {
    try {
      const { data } = body;

      if (!data || !data.targetId || !data.channelId || !data.endDate) {
        throw new HttpException('Invalid request body', HttpStatus.BAD_REQUEST);
      }

      return await this.userChannelModerateService.muteUser(
        selfId,
        data.targetId,
        data.channelId,
        data.endDate,
      );
    } catch (error) {
      console.error('Error in muteUser:', error.message);
      throw error;
    }
  }

  @Patch('/user-channel/moderate/unmute')
  async unmuteUser(
    @Body() body: { data: { targetId: number; channelId: number } },
    @CurrentUserID() selfId: number,
  ) {
    try {
      const { data } = body;

      if (!data || !data.targetId || !data.channelId) {
        throw new HttpException('Invalid request body', HttpStatus.BAD_REQUEST);
      }

      return await this.userChannelModerateService.unmuteUser(
        selfId,
        data.targetId,
        data.channelId,
      );
    } catch (error) {
      console.error('Error in unmuteUser:', error.message);
      throw error;
    }
  }

  @Post('/user-channel/moderate/ban')
  async banUser(
    @Body()
    body: { data: { targetId: number; channelId: number; endDate: Date } },
    @CurrentUserID() selfId: number,
  ) {
    try {
      const { data } = body;

      if (!data || !data.targetId || !data.channelId || !data.endDate) {
        throw new HttpException('Invalid request body', HttpStatus.BAD_REQUEST);
      }

      return await this.userChannelModerateService.banUser(
        selfId,
        data.targetId,
        data.channelId,
        data.endDate,
      );
    } catch (error) {
      console.error('Error in banUser:', error.message);
      throw error;
    }
  }

  @Patch('/user-channel/moderate/unban')
  async unbanUser(
    @Body() body: { data: { targetId: number; channelId: number } },
    @CurrentUserID() selfId: number,
  ) {
    try {
      const { data } = body;

      if (!data || !data.targetId || !data.channelId) {
        throw new HttpException('Invalid request body', HttpStatus.BAD_REQUEST);
      }

      return await this.userChannelModerateService.unbanUser(
        selfId,
        data.targetId,
        data.channelId,
      );
    } catch (error) {
      console.error('Error in unbanUser:', error.message);
      throw error;
    }
  }

  @Post('/user-channel/moderate/kick')
  async kickUser(
    @Body() body: { data: { targetId: number; channelId: number } },
    @CurrentUserID() selfId: number,
  ) {
    try {
      const { data } = body;

      if (!data || !data.targetId || !data.channelId) {
        throw new HttpException('Invalid request body', HttpStatus.BAD_REQUEST);
      }

      return await this.userChannelModerateService.kickUser(
        selfId,
        data.targetId,
        data.channelId,
      );
    } catch (error) {
      console.error('Error in kickUser:', error.message);
      throw error;
    }
  }
}
