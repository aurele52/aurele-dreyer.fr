import { Module } from '@nestjs/common';
import { ChannelModule } from './channel/channel.module';
import { UserModule } from './user/user.module';
import { UserChannelModule } from './user-channel/user-channel.module';
import { MessageModule } from './message/message.module';
import { MatchModule } from './match/match.module';
import { FriendshipModule } from './friendship/friendship.module';
import { UserAchievementModule } from './user-achievement/user-achievement.module';

@Module({
    imports: [ChannelModule, UserModule, UserChannelModule, MessageModule, MatchModule, FriendshipModule, UserAchievementModule]
})
export class DatabaseModule {}
