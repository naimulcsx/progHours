import { Test, TestingModule } from '@nestjs/testing';
import { ParsersService } from './parsers.service';

describe('ParsersService', () => {
  let service: ParsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParsersService],
    }).compile();

    service = module.get<ParsersService>(ParsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
