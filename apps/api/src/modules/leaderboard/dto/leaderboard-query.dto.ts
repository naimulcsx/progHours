import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export enum LeaderboardTypeEnum {
  Full = "full",
  CurrentWeek = "currentWeek",
  LastWeek = "lastWeek",
  CurrentMonth = "currentMonth",
  LastMonth = "lastMonth"
}

export class LeaderboardQueryDto {
  @ApiProperty({
    name: "type",
    example: "full",
    enum: LeaderboardTypeEnum
  })
  @IsEnum(LeaderboardTypeEnum)
  type: LeaderboardTypeEnum;
}
