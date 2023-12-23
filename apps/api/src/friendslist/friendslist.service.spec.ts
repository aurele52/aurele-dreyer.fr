import { Test, TestingModule } from '@nestjs/testing';
import { FriendslistService } from './friendslist.service';

describe('FriendslistService', () => {
  let service: FriendslistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendslistService],
    }).compile();

    service = module.get<FriendslistService>(FriendslistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
