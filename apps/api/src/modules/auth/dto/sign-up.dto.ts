import { IsEmail, IsString, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
  @ApiProperty({
    description: "User full name",
    example: "Naimul Haque"
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: "User username",
    example: "C181065"
  })
  @IsString()
  @MinLength(6)
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
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: "Invitation Code",
    example: "YOUR_INVITATION_CODE"
  })
  @IsString()
  invitationCode: string;
}
