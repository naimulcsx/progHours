import { Module } from "@nestjs/common";

import { UserStudiesController } from "./controllers/user-studies.controller";
import { UserStudiesRepository } from "./providers/user-studies.repository";
import { UserStudiesService } from "./providers/user-studies.service";

@Module({
  controllers: [UserStudiesController],
  providers: [UserStudiesService, UserStudiesRepository]
})
export class UserStudiesModule {}
