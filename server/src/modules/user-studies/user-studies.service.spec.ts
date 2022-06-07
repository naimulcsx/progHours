import { Test, TestingModule } from '@nestjs/testing';
import { UserStudiesService } from './user-studies.service';

describe('UserStudiesService', () => {
  let service: UserStudiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStudiesService],
    }).compile();

    service = module.get<UserStudiesService>(UserStudiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
