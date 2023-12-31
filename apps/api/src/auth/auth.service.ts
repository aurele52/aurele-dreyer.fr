import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AccessToken42, UserInfo42 } from './auth.types';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signIn(code: string, state: string) {
    try {
      const access_token_42 = await this.fetchAccessToken(code, state);
      const user_info = await this.fetchUserInfo(access_token_42.access_token);
      const secret_2fa = 'blablablou';
      const user = await this.getOrCreateUser(
        access_token_42,
        user_info,
        secret_2fa,
      );
      const token = await this.generateJWTToken(user);

      return token;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async fetchAccessToken(code: string, state: string) {
    return fetch('https://api.intra.42.fr/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.API42_ID,
        client_secret: process.env.API42_SECRET,
        code: code,
        redirect_uri: 'http://localhost:3000/api/auth/callback',
        state: state,
      }),
    }).then((response) => {
      if (!response.ok) {
        return Promise.reject(
          `ERROR ${response.status} - ${response.statusText}: could not fetch access token`,
        );
      }
      return response.json() as any as AccessToken42;
    });
  }

  async fetchUserInfo(access_token: string) {
    return fetch('https://api.intra.42.fr/v2/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }).then((response) => {
      if (!response.ok) {
        return Promise.reject(
          `ERROR ${response.status} - ${response.statusText}: could not fetch user info`,
        );
      }
      return response.json() as any as UserInfo42;
    });
  }

  async getOrCreateUser(
    access_token_42: AccessToken42,
    user_info: UserInfo42,
    secret_2fa: string,
  ) {
    return this.prisma.user.upsert({
      where: { id_42: user_info.id },
      update: {
        username: user_info.login,
        token_42: access_token_42.access_token,
        email_42: user_info.email,
      },
      create: {
        username: user_info.login,
        avatar_url: user_info.image.versions.small,
        id_42: user_info.id,
        token_42: access_token_42.access_token,
        email_42: user_info.email,
        secret_2fa,
      },
    });
  }

  async generateJWTToken(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      connected_at: new Date(),
    };
    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }

  async impersonateSignIn(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    const access_token = await this.generateJWTToken(user);
    return access_token;
  }

  async disconnectUser(id: number) {
    await this.prisma.user.update({
      where: { id },
      data: {
        token_42: null,
      },
    });
  }
}
