import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { authenticator } from 'otplib';
import { PrismaService } from 'src/prisma.service';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TwoFAService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwt:JwtService,
  ) {}

  async checkAuthorization(jwt_id: string) {
    try {
      const payload = await this.jwt.verifyAsync(jwt_id, {
        secret:process.env.APP_TMP_SECRET});
      return (payload.id);
    } catch {
      throw new UnauthorizedException();
    }
  }

  async getUser(id: number){
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async generateSecret(user: User) {
    const secret = authenticator.generateSecret();
    return (secret);
  }
  
  public async generateQRCode(user: User) {
    const otpauthUrl = authenticator.keyuri(
      user.username,
      process.env.APP_SECRET,
      user.secret_2fa,
    );
    const secret = user.secret_2fa;
    return {
      secret,
      otpauthUrl,
    };
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  public check2FACodeValidity(
    code2FA: string,
    user: User,
  ) {
    if (
      !authenticator.verify({
        token: code2FA,
        secret: user.secret_2fa as string,
      })
    ) {
      throw new ForbiddenException('Wrong authentication code');
    }
  }
}
