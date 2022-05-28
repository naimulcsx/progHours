import { Test, TestingModule } from '@nestjs/testing';
import { StudyListController } from './study-list.controller';

describe('StudyListController', () => {
  let controller: StudyListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyListController],
    }).compile();

    controller = module.get<StudyListController>(StudyListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
