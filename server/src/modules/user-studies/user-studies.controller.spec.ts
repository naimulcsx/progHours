import { Test, TestingModule } from '@nestjs/testing';
import { UserStudiesController } from './user-studies.controller';

describe('UserStudiesController', () => {
  let controller: UserStudiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserStudiesController],
    }).compile();

    controller = module.get<UserStudiesController>(UserStudiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
