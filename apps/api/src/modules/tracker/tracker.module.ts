import { Module } from "@nestjs/common";
import { TrackerService } from "./services/tracker.service";
import { TrackerController } from "./controllers/tracker.controller";

@Module({
  controllers: [TrackerController],
  providers: [TrackerService]
})
export class TrackerModule {}
