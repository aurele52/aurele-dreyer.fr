import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { authenticator } from 'otplib';
import { PrismaService } from 'src/prisma.service';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(private readonly prisma: PrismaService) {}

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

  public async generateTwoFactorAuthenticationSecret(id) {
    const user = await this.checkUserFirstAuthentication(id);
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(
      user.email_42,
      process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,
      secret,
    );
    await this.setTwoFactorAuthenticationSecret(secret, user.id);

    return {
      secret,
      otpauthUrl,
    };
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        secret_2fa: secret,
      },
    });
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  public isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    user,
  ) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.secret_2fa,
    });
  }
}
