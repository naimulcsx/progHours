import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateSubmissionDto } from "./create-submission.dto";

export class UpdateSubmissionDto extends PartialType(
  OmitType(CreateSubmissionDto, ["url"] as const)
) {}
