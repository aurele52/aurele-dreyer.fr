import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GameModule } from './game/game.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'front', 'dist'),
    }),
    DatabaseModule, 
    GameModule, 
    ChatModule, 
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}