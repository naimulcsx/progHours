import { Test, TestingModule } from '@nestjs/testing';
import { UserStudyService } from './user-study.service';

describe('UserStudyService', () => {
  let service: UserStudyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStudyService],
    }).compile();

    service = module.get<UserStudyService>(UserStudyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
