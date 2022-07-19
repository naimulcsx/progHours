import { Test, TestingModule } from '@nestjs/testing';
import { UserStudyController } from './user-study.controller';

describe('UserStudyController', () => {
  let controller: UserStudyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserStudyController],
    }).compile();

    controller = module.get<UserStudyController>(UserStudyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
