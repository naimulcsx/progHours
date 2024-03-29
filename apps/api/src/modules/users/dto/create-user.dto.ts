import { Prisma } from "@prisma/client";
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import IsValidUserMetaData from "../decorators/IsUserMetadata";

export class CreateUserDto {
  @ApiProperty({
    description: "User full name",
    example: "Naimul Haque"
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: "User username",
    example: "C181065",
    pattern: "^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$"
  })
  @Matches(/^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$/, { message: "Invalid UID" })
  username: string;

  @ApiProperty({
    description: "User email",
    example: "naimulcsx@gmail.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User password",
    example: "YQ3jwr6ycN",
    minLength: 8
  })
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: "User metadata",
    required: false,
    example: {
      department: "Computer Science and Engineering",
      section: "BM",
      batch: 46,
      cgpa: 3.67
    }
  })
  @IsValidUserMetaData()
  @IsOptional()
  metaData?: Prisma.InputJsonObject;
}
