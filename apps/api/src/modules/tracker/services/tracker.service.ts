import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
export class TrackerService {
  constructor(@InjectQueue("submissions") private submissionsQueue: Queue) {}
}
