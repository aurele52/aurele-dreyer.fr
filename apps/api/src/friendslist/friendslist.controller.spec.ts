import { Test, TestingModule } from '@nestjs/testing';
import { FriendslistController } from './friendslist.controller';

describe('FriendslistController', () => {
  let controller: FriendslistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendslistController],
    }).compile();

    controller = module.get<FriendslistController>(FriendslistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
