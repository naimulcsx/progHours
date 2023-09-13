import { Matches, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({
    description: "User username",
    example: "C181065",
    pattern: "^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$"
  })
  @Matches(/^(c|C|e|E|et|ET|cce|CCE)[0-9]{6}$/, { message: "Invalid UID" })
  username: string;

  @ApiProperty({
    description: "User password",
    example: "YQ3jwr6ycN",
    minLength: 8
  })
  @MinLength(8)
  password: string;
}
