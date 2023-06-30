import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";

@Processor("submissions")
export class SubmissionsProcessor {
  @Process()
  async transcode(job: Job<unknown>) {
    console.log(job);
    return { foo: "bar " };
  }
}
