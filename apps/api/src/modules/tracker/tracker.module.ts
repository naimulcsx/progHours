import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { Queue } from "bull";

import { BullModule } from "@nestjs/bull";
import {
  DynamicModule,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule
} from "@nestjs/common";

import { SubmissionsModule } from "~/modules/submissions/submissions.module";

import { ProblemsModule } from "../problems/problems.module";
import { TrackerController } from "./controllers/tracker.controller";
import { BasicAuthMiddleware } from "./middlewares/basic-auth.middleware";
import {
  InjectTrackerRetrieveQueue,
  TRACKER_RETRIEVE_QUEUE,
  TrackerRetrieveProcessor
} from "./processors/retrieve.processor";
import {
  InjectTrackerVerifyQueue,
  TRACKER_VERIFY_QUEUE,
  TrackerVerifyProcessor
} from "./processors/verify.processor";
import { TrackerService } from "./services/tracker.service";
import { VerifyService } from "./services/verify.service";

@Global()
@Module({})
export class TrackerModule implements NestModule {
  static register(): DynamicModule {
    const trackerRetrieveQueue = BullModule.registerQueue({
      name: TRACKER_RETRIEVE_QUEUE
    });
    const trackerVerifyQueue = BullModule.registerQueue({
      name: TRACKER_VERIFY_QUEUE
    });
    if (
      !trackerRetrieveQueue.providers ||
      !trackerRetrieveQueue.exports ||
      !trackerVerifyQueue.providers ||
      !trackerVerifyQueue.exports
    ) {
      throw new Error("Unable to build queue");
    }
    return {
      module: TrackerModule,
      imports: [
        BullModule.forRoot({
          redis: {
            host: "localhost",
            port: 6379
          }
        }),
        trackerRetrieveQueue,
        trackerVerifyQueue,
        SubmissionsModule,
        ProblemsModule
      ],
      controllers: [TrackerController],
      providers: [
        VerifyService,
        TrackerService,
        TrackerRetrieveProcessor,
        TrackerVerifyProcessor,
        ...trackerRetrieveQueue.providers,
        ...trackerVerifyQueue.providers
      ],
      exports: [
        TrackerService,
        ...trackerRetrieveQueue.exports,
        ...trackerVerifyQueue.exports
      ]
    };
  }

  constructor(
    @InjectTrackerRetrieveQueue() private readonly trackerRetrieveQueue: Queue,
    @InjectTrackerVerifyQueue() private readonly trackerVerifyQueue: Queue
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath("/api/queues");
    createBullBoard({
      queues: [
        new BullAdapter(this.trackerRetrieveQueue),
        new BullAdapter(this.trackerVerifyQueue)
      ],
      serverAdapter
    });
    consumer
      .apply(BasicAuthMiddleware, serverAdapter.getRouter())
      .forRoutes("/queues");
  }
}
