import { IsString } from "class-validator"

export class CreateGroupDto {
  @IsString()
  hashtag: string

  @IsString()
  name: string
}
