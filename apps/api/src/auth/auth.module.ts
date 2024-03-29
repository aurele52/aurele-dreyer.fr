import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { PrismaService } from 'src/prisma.service';
import { TwoFAService } from './twoFA.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    TwoFAService,
    UserService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
