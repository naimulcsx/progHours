import { IsString, IsNumber, IsArray, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProblemDto {
  @ApiProperty({
    description: "The unique ID of the item",
    example: "CF-1593B"
  })
  @IsString()
  pid: string;

  @ApiProperty({
    description: "The name of the problem",
    example: "Make it Divisible by 25"
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "The difficulty level of the problem",
    example: 1000
  })
  @IsNumber()
  difficulty: number;

  @ApiProperty({
    description: "An array of tags associated with the problem",
    example: ["dp", "binary search"],
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    description: "The URL of the problem",
    example: "https://codeforces.com/contest/1593/problem/B"
  })
  @IsUrl()
  url: string;
}
