import { IsEmail, IsString, MinLength } from "class-validator";

export class SignUpDto {
  @IsString()
  fullName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
