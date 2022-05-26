import { Test, TestingModule } from '@nestjs/testing';
import { StudyListService } from './study-list.service';

describe('StudyListService', () => {
  let service: StudyListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyListService],
    }).compile();

    service = module.get<StudyListService>(StudyListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
