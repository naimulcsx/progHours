import {
  StudyDifficultyEnum,
  StudyLanguageEnum,
  StudyTypeEnum
} from "@prisma/client";
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsString
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateUserStudyDto {
  @ApiProperty({
    description: "Study title",
    example: "Prime Numbers - Sieve of Eratosthenes",
    type: "string"
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "Study notes",
    example: "Notes about prime number",
    type: "string"
  })
  @IsString()
  notes: string;

  @ApiProperty({
    description: "Study type",
    example: "VIDEO",
    enum: StudyTypeEnum
  })
  @IsEnum(StudyTypeEnum)
  type: StudyTypeEnum;

  @ApiProperty({
    description: "Study tags",
    example: ["mathematics"],
    type: "string"
  })
  @IsArray()
  tags: string[];

  @ApiProperty({
    description: "Study date",
    example: "2024-03-10"
  })
  @IsISO8601()
  studyDate: Date;

  @ApiProperty({
    description: "Total time(minutes) spent on study",
    example: 120
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: "Study link",
    example: "https://www.youtube.com/watch?v=V08g_lkKj6Q"
  })
  @IsString()
  resourceLink: string;

  @ApiProperty({
    description: "Difficulty of the study",
    example: "BEGINNER",
    enum: StudyDifficultyEnum
  })
  @IsEnum(StudyDifficultyEnum)
  difficulty: StudyDifficultyEnum;

  @ApiProperty({
    description: "Language of study material",
    example: "BENGALI",
    enum: StudyLanguageEnum
  })
  @IsEnum(StudyLanguageEnum)
  language: StudyLanguageEnum;
}
