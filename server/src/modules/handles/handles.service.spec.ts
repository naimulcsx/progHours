import { Test, TestingModule } from '@nestjs/testing';
import { HandlesService } from './handles.service';

describe('HandlesService', () => {
  let service: HandlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandlesService],
    }).compile();

    service = module.get<HandlesService>(HandlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
