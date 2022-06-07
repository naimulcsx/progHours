import { Module } from '@nestjs/common';
import { UserStudiesService } from './user-studies.service';
import { UserStudiesController } from './user-studies.controller';

@Module({
  providers: [UserStudiesService],
  controllers: [UserStudiesController]
})
export class UserStudiesModule {}
