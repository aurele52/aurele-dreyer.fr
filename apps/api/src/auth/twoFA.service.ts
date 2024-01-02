import {
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

@Injectable()
export class TwoFAService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async checkUserFirstAuthentication(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (!user.token_42)
      throw new UnauthorizedException(
        'Must complete first step of authentication before accessing second step',
      );
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
      throw new UnauthorizedException('Wrong authentication code');
    }
  }
}
