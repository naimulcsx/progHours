import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsOptional, IsString } from "class-validator"

export class UpdateGroupDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  slug: string

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  private: boolean
}
