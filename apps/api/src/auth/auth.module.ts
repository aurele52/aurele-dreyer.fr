import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  // providers: [
  //   Auth42({
  //     clientId: process.env.API42_ID,
  //     clientSecret: process.env.API42_SECRET
  //   })
  // ],
})
export class AuthModule {}
