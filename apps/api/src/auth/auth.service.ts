import {
  ForbiddenException,
  ImATeapotException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AccessToken42, UserInfo42 } from './auth.types';
import { JWT } from './jwt.service';
import { Prisma, User } from '@prisma/client';

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

  async getUserbyId42(id_42: number) {
    return await this.prisma.user.findUnique({
      where: { id_42 },
    });
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
    console.log({ user_infos_42, avatar_url, username });
    const getAvatarUrl = (): string => {
      if (avatar_url) {
        return avatar_url;
      } else {
        return user_infos_42.avatar;
      }
      // !!!!! handle user == null  !!!!!
    };
    try {
      const user = await this.prisma.user.create({
        data: {
          username: username,
          avatar_url: getAvatarUrl(),
          id_42: user_infos_42.id,
          token_42: user_infos_42.access_token,
          is_enable_2fa: false,
        },
      });
      console.log({ user });
      return user;
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this username',
          );
          throw new ForbiddenException();
        }
        throw new ImATeapotException();
      }
    }
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
