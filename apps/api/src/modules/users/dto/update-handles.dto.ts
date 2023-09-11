import { HandleType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsString, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

class HandleDto {
  @ApiProperty({
    description: "The type of handle",
    example: "Twitter",
    enum: HandleType
  })
  @IsEnum(HandleType)
  type: HandleType;

  @ApiProperty({
    description: "The handle or username associated with the account",
    example: "@example_user"
  })
  @IsString()
  handle: string;
}

export class UpdateHandlesDto {
  @ApiProperty({
    description: "An array of social media handles",
    type: [HandleDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HandleDto)
  handles: HandleDto[];
}
