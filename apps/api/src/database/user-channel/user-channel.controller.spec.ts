import { Test, TestingModule } from '@nestjs/testing';
import { UserChannelController } from './user-channel.controller';

describe('UserChannelController', () => {
  let controller: UserChannelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserChannelController],
    }).compile();

    controller = module.get<UserChannelController>(UserChannelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
