import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule
} from "@nestjs/common";
import { TrackerService } from "./services/tracker.service";
import { TrackerController } from "./controllers/tracker.controller";
import { BullModule } from "@nestjs/bull";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { BasicAuthMiddleware } from "./middlewares/basic-auth.middleware";
import { Queue } from "bull";
import { SubmissionsModule } from "~/modules/submissions/submissions.module";
import {
  InjectTrackerPullQueue,
  TRACKER_PULL_QUEUE,
  TrackerPullProcessor
} from "./processors/pull.processor";
import {
  InjectTrackerPushQueue,
  TRACKER_PUSH_QUEUE,
  TrackerPushProcessor
} from "./processors/push.processor";

@Module({})
export class TrackerModule implements NestModule {
  static register(): DynamicModule {
    const trackerPullQueue = BullModule.registerQueue({
      name: TRACKER_PULL_QUEUE
    });
    const trackerPushQueue = BullModule.registerQueue({
      name: TRACKER_PUSH_QUEUE
    });
    if (
      !trackerPullQueue.providers ||
      !trackerPullQueue.exports ||
      !trackerPushQueue.providers ||
      !trackerPushQueue.exports
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
        trackerPullQueue,
        trackerPushQueue,
        SubmissionsModule
      ],
      controllers: [TrackerController],
      providers: [
        TrackerService,
        TrackerPullProcessor,
        TrackerPushProcessor,
        ...trackerPullQueue.providers,
        ...trackerPushQueue.providers
      ],
      exports: [...trackerPullQueue.exports, ...trackerPushQueue.exports]
    };
  }

  constructor(
    @InjectTrackerPullQueue() private readonly trackerPullQueue: Queue,
    @InjectTrackerPushQueue() private readonly trackerPushQueue: Queue
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath("/api/queues");
    createBullBoard({
      queues: [
        new BullAdapter(this.trackerPullQueue),
        new BullAdapter(this.trackerPushQueue)
      ],
      serverAdapter
    });
    consumer
      .apply(BasicAuthMiddleware, serverAdapter.getRouter())
      .forRoutes("/queues");
  }
}
