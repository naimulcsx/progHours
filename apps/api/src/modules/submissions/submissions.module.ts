import { Module } from "@nestjs/common";
import { SubmissionsController } from "./controllers/submissions.controller";
import { SubmissionsService } from "./services/submissions.service";

@Module({
  controllers: [SubmissionsController],
  providers: [SubmissionsService]
})
export class SubmissionsModule {}
