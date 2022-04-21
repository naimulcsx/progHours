import { Test, TestingModule } from '@nestjs/testing';
import { OnlineJudgesService } from './online-judges.service';

describe('OnlineJudgesService', () => {
  let service: OnlineJudgesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnlineJudgesService],
    }).compile();

    service = module.get<OnlineJudgesService>(OnlineJudgesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
