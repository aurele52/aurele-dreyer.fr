import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JWT {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async generateJWTToken(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      connected_at: new Date(),
    };
    return await this.jwt.signAsync(payload);
  }

  async generateFakeJWTToken(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    return await this.generateJWTToken(user);
  }
}
