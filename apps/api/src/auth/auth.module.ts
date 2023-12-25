import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.APP_SECRET,
    signOptions: { expiresIn: '3d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  // providers: [
  //   Auth42({
  //     clientId: process.env.API42_ID,
  //     clientSecret: process.env.API42_SECRET
  //   })
  // ],
})
export class AuthModule {}
