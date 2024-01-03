import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JWT {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async generateJWTToken(user: User, secret: string, expiresIn: string) {
    const payload = {
      id: user.id,
      username: user.username,
      connected_at: new Date(),
    };
    return await this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    },);
  }

  async generateFakeJWTToken(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    return await this.generateJWTToken(user, process.env.APP_SECRET, '3d');
  }
}
