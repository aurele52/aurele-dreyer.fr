import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { authenticator } from 'otplib';
import { PrismaService } from 'src/prisma.service';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class TwoFAService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      const err_message = `User with not found`;
      console.log('404 EXCEPTION THROWN: ', err_message);
      throw new NotFoundException(err_message);
    }
    return user;
  }

  async generateSecret(user: User) {
    try {
      const secret = authenticator.generateSecret();
      if (!secret) throw new Error('Secret is empty');
      return secret;
    } catch (error) {
      const err_message = 'Could not genera 2FA secret';
      console.log('500 EXCEPTION THROWN: ', err_message);
      console.log({ error });
      throw new InternalServerErrorException(err_message);
    }
  }

  public async generateQRCode(user: User) {
    try {
      const otpauthUrl = authenticator.keyuri(
        user.username,
        process.env.APP_NAME,
        user.secret_2fa,
      );
      if (!otpauthUrl) throw new Error('OTP auth URL is empty');
      const secret = user.secret_2fa;
      return {
        secret,
        otpauthUrl,
      };
    } catch (error) {
      const err_message = 'Could not generate 2FA QR code';
      console.log('500 EXCEPTION THROWN: ', err_message);
      console.log({ error });
      throw new InternalServerErrorException(err_message);
    }
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    try {
      return toFileStream(stream, otpauthUrl);
    } catch (error) {
      const err_message = 'Could not transform QR code to File Stream';
      console.log('500 EXCEPTION THROWN: ', err_message);
      console.log({ error });
      throw new InternalServerErrorException(err_message);
    }
  }

  public check2FACodeValidity(code2FA: string, secret: string) {
    if (
      !authenticator.verify({ token: code2FA, secret })
    ) {
      const err_message = 'Wrong authentication code';
      console.log('401 EXCEPTION THROWN: ', err_message);
      throw new ForbiddenException(err_message);
    }
  }
}
