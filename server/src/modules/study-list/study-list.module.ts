import { Module } from '@nestjs/common';
import { StudyListService } from './study-list.service';
import { StudyListController } from './study-list.controller';

@Module({
  providers: [StudyListService],
  controllers: [StudyListController]
})
export class StudyListModule {}
