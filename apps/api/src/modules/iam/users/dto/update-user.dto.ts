import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsOptional, IsString } from "class-validator";

class CreateUserDtoWithoutPasswordAndUsername extends OmitType(CreateUserDto, [
  "password",
  "username"
] as const) {}
export class UpdateUserDto extends PartialType(
  CreateUserDtoWithoutPasswordAndUsername
) {
  @ApiProperty({
    description: "User phone number",
    example: "+8801625644843",
    required: false
  })
  @IsOptional()
  @IsString()
  phone: string;
}
