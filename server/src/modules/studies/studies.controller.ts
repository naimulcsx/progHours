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
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger"
import { StudiesService } from "./studies.service"

@Controller("/studies")
@ApiTags("Studies")
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  /**
   * @Post /api/studies
   * Create a new study
   */
  @Post("/")
  @UseGuards(IsAuthenticatedGuard)
  @ApiOperation({ summary: "Create a new study" })
  @ApiCreatedResponse({ description: "Created." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async createUserStudy(@Body() body: CreateStudyDto, @Req() req: any) {
    const { title, studyDate, studyTime, type, difficulty, link, language } =
      body

    // create the user study
    const study = await this.studiesService.createUserStudy(
      { title, studyDate, studyTime, type, difficulty, link, language },
      req.user.id
    )

    // return response
    return {
      statusCode: HttpStatus.CREATED,
      body: { study },
    }
  }

  /**
   * @GET /api/studies
   * Get studies for current user
   */
  @Get("/")
  @UseGuards(IsAuthenticatedGuard)
  @ApiOperation({ summary: "Get studies for current user." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getAllUserStudies(@Req() req) {
    // current user id
    const userId = req.user.id

    // get studies for the current user
    const studies = await this.studiesService.getStudiesByUserId(userId)

    // return response
    return {
      statusCode: HttpStatus.OK,
      body: { studies },
    }
  }

  /**
   * @Get /api/studies/:id
   * Get a particular study
   */
  @Get("/:id")
  @UseGuards(IsAuthenticatedGuard)
  @ApiOperation({ summary: "Get a particular study." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getUserStudy(@Param("id", ParseIntPipe) id: number, @Req() req: any) {
    // get the study
    const study = await this.studiesService.getStudyById(id)

    // return response
    return {
      statusCode: HttpStatus.OK,
      body: { study },
    }
  }

  /**
   * @PATCH /api/studies/:id
   * update a particular study
   */
  @Patch("/:id")
  @UseGuards(IsAuthenticatedGuard)
  @ApiOperation({ summary: "Update a particular study" })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async updateStudyList(
    @Param("id", ParseIntPipe) id: any,
    @Body() body: UpdateStudyDto,
    @Req() req
  ) {
    const { title, studyDate, studyTime, type, difficulty, link, language } =
      body

    // update the study
    await this.studiesService.updateStudy(id, req.user.id, {
      title,
      studyDate,
      studyTime,
      type,
      difficulty,
      link,
      language,
    })

    // return response
    return { statusCode: HttpStatus.OK, message: "User study Updated" }
  }

  /**
   * @DELETE /api/studies/:id
   * delete a particular study
   */
  @Delete("/:id")
  @UseGuards(IsAuthenticatedGuard)
  @ApiOperation({ summary: "Delete a particular study." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async deleteUserStudy(@Param("id", ParseIntPipe) id: any, @Req() req) {
    // delete the study
    await this.studiesService.deleteUserStudy(id, req.user.id)

    // return response
    return { statusCode: HttpStatus.OK, message: "user study deleted" }
  }
}
