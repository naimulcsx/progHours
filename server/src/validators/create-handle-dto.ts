import { IsNumber, IsString } from 'class-validator';

export class CreateHandleDto {
  @IsString()
  handle: string;

  @IsNumber()
  judge_id: number;
}
