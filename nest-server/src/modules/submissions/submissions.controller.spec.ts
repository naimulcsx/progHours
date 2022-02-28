import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

describe('SubmissionsController', () => {
  let controller: SubmissionsController;
  let submissionsService: SubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionsController],
      providers: [
        {
          provide: SubmissionsService,
          useFactory: () => ({
            getSubmissions: (userId) => [],
          }),
        },
      ],
    }).compile();

    controller = module.get<SubmissionsController>(SubmissionsController);
    submissionsService = module.get<SubmissionsService>(SubmissionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSubmissions', () => {
    it('should return the submissions', () => {
      let userId = 1;
      expect(submissionsService.getSubmissions(userId)).toBe([]);
    });
  });
});
