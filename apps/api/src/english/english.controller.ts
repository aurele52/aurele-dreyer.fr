import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CurrentUserID } from 'src/decorators/user.decorator';
import { EnglishService } from './english.service';

interface listEle {
  eng: string;
  fr: string;
  hint: string;
  level: number;
}

@Controller()
export class EnglishController {
  constructor(private readonly englishService: EnglishService) {}

  @Get('/wordList/')
  async findWorldList(@CurrentUserID() user_id: number) {
    console.log('current = ', user_id);
    return await this.englishService.wordList(user_id);
  }

  @Post('/word')
  async createMessage(
    @Body('word') word: listEle,
    @CurrentUserID() user_id: number,
  ) {
    console.log(word);
    const message = await this.englishService.createWord(
      user_id,
      word.fr,
      word.eng,
      word.hint,
    );
    return message;
  }

  @Delete('/word/:word_id')
  async deleteReceivedInvitation(
    @Param('word_id') word_id: number,
    @CurrentUserID() user_id: number,
  ) {
    console.log(word_id);
    return this.englishService.deleteWord(user_id, word_id);
  }
}
