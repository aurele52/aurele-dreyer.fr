import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AccessToken42, UserInfo42 } from './auth.types';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async fetchInfo42(code: string, state: string) {
    const access_token = await this.fetchAccessToken(code, state);
    const user = await this.fetchUserInfo(access_token.access_token);
    if (!access_token || !user) {
      const err_message = 'Fail to fetch access token or user from 42';
      console.log('401 EXCEPTION THROWN: ', err_message);
      throw new UnauthorizedException(err_message);
    }
    return {
      id: user.id,
      login: user.login,
      avatar: user.image.versions.small,
      access_token: access_token.access_token,
    };
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
        redirect_uri: `${process.env.DOMAIN_NAME_BACK}/api/auth/callback`,
        state: state,
      }),
    }).then((response) => {
      if (!response.ok) {
        console.log(
          `${response.status}: ${response.statusText} - could not fetch access token from 42`,
        );
        const err_message = 'Connection with 42 refused';
        console.log('401 EXCEPTION THROWN: ', err_message);
        throw new UnauthorizedException(err_message);
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
        console.log(
          `${response.status}: ${response.statusText} - could not fetch user info from 42`,
        );
        const err_message = 'Connection with 42 refused';
        console.log('401 EXCEPTION THROWN: ', err_message);
        throw new UnauthorizedException(err_message);
      }
      return response.json() as any as UserInfo42;
    });
  }

  async getUserbyId42(id_42: number) {
    return await this.prisma.user.findUnique({
      where: { id_42 },
    });
  }

  async signIn(user: User, access_token_42: string) {
    await this.userService.updateUser(user.id, { token_42: access_token_42 });
    if (user.is_enable_2fa) {
      const token = await this.generateJWTToken(
        user,
        process.env.APP_TMP_SECRET,
        '1h',
      );
      return `${process.env.DOMAIN_NAME_FRONT}/auth/2fa/${token}`;
    } else {
      const token = await this.generateJWTToken(
        user,
        process.env.APP_SECRET,
        '3d',
      );
      return `${process.env.DOMAIN_NAME_FRONT}/redirect/${token}`;
    }
  }

  async registerUser(user_infos_42, username) {
    try {
      const user = await this.prisma.user.create({
        data: {
          username: username,
          avatar_url: user_infos_42.avatar,
          id_42: user_infos_42.id,
          token_42: user_infos_42.access_token,
          is_enable_2fa: false,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.log(
            '403 EXCEPTION THROWN: Unique constraint violation, a new user cannot be created with this username',
          );
          throw new ForbiddenException('This username is already taken!');
        }
        const err_message = 'Could not create user';
        console.log('403 EXCEPTION THROWN: ', err_message);
        console.log({ error });
        throw new ForbiddenException(err_message);
      }
    }
  }

  async generateJWTToken(user, secret: string, expiresIn: string) {
    try {
      const payload = {
        id: user.id,
        username: user.username,
        connected_at: new Date(),
      };
      return await this.jwtService.signAsync(payload, {
        secret,
        expiresIn,
      });
    } catch (error) {
      const err_message = 'Could not generate access token';
      console.log('401 EXCEPTION THROWN: ', err_message);
      console.log({ error });
      throw new UnauthorizedException(err_message);
    }
  }

  async checkTokenValidity(token: any, secret: string) {
    try {
      return await this.jwtService.verifyAsync(token, { secret });
    } catch (error) {
      const err_message = 'Invalid or expired token. Please log in first';
      console.log('401 EXCEPTION THROWN: ', err_message);
      console.log({ error });
      throw new UnauthorizedException(err_message);
    }
  }
}
