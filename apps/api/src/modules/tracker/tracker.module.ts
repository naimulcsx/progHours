import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule
} from "@nestjs/common";
import { TrackerService } from "./services/tracker.service";
import { TrackerController } from "./controllers/tracker.controller";
import { BullModule, InjectQueue } from "@nestjs/bullmq";
import { SubmissionsProcessor } from "./processors/submissions.processor";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { BasicAuthMiddleware } from "./middlewares/basic-auth.middleware";
import { Queue } from "bull";

@Module({})
export class TrackerModule implements NestModule {
  static register(): DynamicModule {
    const submissionsQueue = BullModule.registerQueue({
      name: "submissions"
    });
    if (!submissionsQueue.providers || !submissionsQueue.exports) {
      throw new Error("Unable to build queue");
    }
    return {
      module: TrackerModule,
      imports: [
        BullModule.forRoot({
          connection: {
            host: "localhost",
            port: 6379
          }
        }),
        submissionsQueue
      ],
      controllers: [TrackerController],
      providers: [
        TrackerService,
        SubmissionsProcessor,
        ...submissionsQueue.providers
      ],
      exports: [...submissionsQueue.exports]
    };
  }

  constructor(
    @InjectQueue("submissions") private readonly submissionsQueue: Queue
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath("/api/queues");
    createBullBoard({
      queues: [new BullAdapter(this.submissionsQueue)],
      serverAdapter
    });
    consumer
      .apply(BasicAuthMiddleware, serverAdapter.getRouter())
      .forRoutes("/queues");
  }
}
