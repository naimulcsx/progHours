import { IsAuthenticatedGuard } from "@/guards/is-authenticated"
import { CreateStudyDto } from "@/validators/create-study-dto"
import { UpdateStudyDto } from "@/validators/update-study-dto"
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger"
import { UserStudyService } from "./user-study.service"

@ApiTags("User Study")
@Controller("user-study")
@UseGuards(IsAuthenticatedGuard)
export class UserStudyController {
  constructor(private userStudyService: UserStudyService) {}
}
