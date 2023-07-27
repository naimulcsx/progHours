import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsOptional, IsString, MinLength } from "class-validator";

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
  phone?: string;

  @ApiProperty({
    description: "Current password",
    example: "YQ3jwr6ycN",
    minLength: 8
  })
  @IsOptional()
  @MinLength(8)
  currentPassword?: string;

  @ApiProperty({
    description: "New password",
    example: "new_YQ3jwr6ycN",
    minLength: 8
  })
  @IsOptional()
  @MinLength(8)
  newPassword?: string;
}
