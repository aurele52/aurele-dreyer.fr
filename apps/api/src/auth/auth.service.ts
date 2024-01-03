import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AccessToken42, UserInfo42 } from './auth.types';
import { OperationCanceledException } from 'typescript';
import { JWT } from './jwt.service';
import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JWT,
  ) {}

  async fetchInfo42(code: string, state: string) {
    const access_token = await this.fetchAccessToken(code, state);
    const user = await this.fetchUserInfo(access_token.access_token);
    return {
      id: user.id,
      login: user.login,
      avatar: user.image.versions.small,
      access_token: access_token.access_token,
    };
  }

  async isNewUser(id_42: number) {
    const user = await this.prisma.user
      .findUnique({
        where: { id_42 },
      })
      .then((user) => {
        if (!user) {
          return true;
        } else {
          return false;
        }
      });
    return user;
  }

  async signIn(user_info_42) {
    const user = await this.prisma.user.update({
      where: { id_42: user_info_42.id },
      data: {
        username: user_info_42.login,
        token_42: user_info_42.access_token,
      },
    });
    if (user.is_enable_2fa) {
      const jwt_id = await this.jwt.generateJWTToken(
        user,
        process.env.APP_TMP_SECRET,
        '60s',
      );
      return { jwt: jwt_id, twoFA: true };
    } else {
      const token = await this.jwt.generateJWTToken(
        user,
        process.env.APP_SECRET,
        '3d',
      );
      return { jwt: token, twoFA: false };
    }
  }

  async registerUser(user_infos_42, avatar_url, username) {
    const getUsername = (): string => {
      if (username) {
        return username;
      } else {
        user_infos_42.user.login;
      }
    };
    const getAvatarUrl = (): string => {
      if (avatar_url) {
        return avatar_url;
      } else {
        user_infos_42.user.image.versions.small;
      }
    };
    const user = await this.prisma.user.create({
      data: {
        username: getUsername(),
        avatar_url: getAvatarUrl(),
        id_42: user_infos_42.user.id,
        token_42: user_infos_42.access_token.access_token,
        is_enable_2fa: false,
      },
    });
    const token = await this.jwt.generateJWTToken(
      user,
      process.env.APP_SECRET,
      '3d',
    );
    return token;
  }

  async registerFakeUser(avatar_url, username) {
    const user = await this.prisma.user.create({
      data: {
        username: username,
        avatar_url: avatar_url,
        id_42: faker.number.int({ min: 0, max: 10000 }),
        token_42: faker.string.alphanumeric(20),
        is_enable_2fa: false,
      },
    });
    const token = await this.jwt.generateJWTToken(
      user,
      process.env.APP_SECRET,
      '3d',
    );
    return token;
  }

  async fetchAccessToken(code: string, state: string): Promise<AccessToken42> {
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

  async fetchUserInfo(access_token: string): Promise<UserInfo42> {
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
}
