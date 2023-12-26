import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.APP_SECRET,
    signOptions: { expiresIn: '3d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
  // providers: [AuthService, PrismaService, {
  //   provide: APP_GUARD,
  //   useClass: AuthGuard,
  // },],  // 💡 Replace with these providers to activate authentification
})
export class AuthModule {}
