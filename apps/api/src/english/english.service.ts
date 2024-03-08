import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EnglishService {
  constructor(private readonly prisma: PrismaService) {}

  async wordList(user_id: number) {
    if (!user_id) {
      console.error(`User with ID ${user_id} not found`);
      throw new NotFoundException(`User not found`);
    }

    const wordlist = await this.prisma.word.findMany({
      where: {
        user_id,
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    if (wordlist === null) {
      console.error(`Word for user with ID ${user_id} not found`);
      throw new NotFoundException('Word not found for this user');
    }
    console.log(wordlist);

    return wordlist.map((word) => {
      return {
        ...word,
      };
    });
  }

  async createWord(user_id: number, fr: string, eng: string, hint: string) {
    if (!user_id) {
      console.error(
        `Missing property for word creation: user_id = ${user_id}, fr = ${fr}`,
      );
      throw new BadRequestException(`Missing property for word creation`);
    }
    if (!fr) {
      return undefined;
    }

    try {
      return await this.prisma.word.create({
        data: {
          user_id,
          fr,
          eng,
          hint,
        },
      });
    } catch (error) {
      console.error('Error during word creation:', error);
      throw error;
    }
  }
  async deleteWord(id: number, word_id: number) {
    try {
      const deletedMessages = await this.prisma.word.deleteMany({
        where: {
          id: word_id,
          user_id: id,
        },
      });

      if (deletedMessages) {
        return { success: true, message: 'Invitations deleted successfully' };
      } else {
        throw new NotFoundException('No invitations found');
      }
    } catch (error) {
      console.error('Error deleting invitations:', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Prisma error details:', error);
      }

      console.log('No invitations found for deletion');
    }
  }
}
