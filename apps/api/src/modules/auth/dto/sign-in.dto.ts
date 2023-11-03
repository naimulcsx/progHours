import { IsString, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({
    description: "User username",
    example: "C181065"
  })
  @IsString()
  @MinLength(6)
  username: string;

  @ApiProperty({
    description: "User password",
    example: "YQ3jwr6ycN",
    minLength: 8
  })
  @IsString()
  @MinLength(8)
  password: string;
}
