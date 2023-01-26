import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
  ParseIntPipe,
} from "@nestjs/common"
import { ListsService } from "./lists.service"
import { CreateListDto } from "./dto/create-list.dto"
import { UpdateListDto } from "./dto/update-list.dto"
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"
import { IsGroupAdminGuard } from "@/guards/is-group-admin/is-group-admin.guard"
import { CreateCollectionDto } from "./dto/create-collection.dto"
import { AddProblemsDto } from "./dto/add-problems.dto"

@Controller("lists")
@UseGuards(IsAuthenticatedGuard)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  @UseGuards(IsGroupAdminGuard)
  async create(@Body() createListDto: CreateListDto, @Req() req) {
    const list = await this.listsService.create(createListDto)
    return {
      statusCode: HttpStatus.CREATED,
      list,
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const list = await this.listsService.findOne(+id)
    return {
      statusCode: HttpStatus.CREATED,
      list,
    }
  }

  @Post("/:id/collections")
  async createCollection(
    @Param("id", ParseIntPipe) id: number,
    @Body() createCollectionDto: CreateCollectionDto
  ) {
    const collection = await this.listsService.createCollection(id, createCollectionDto)
    return {
      message: "Collection created!",
      statusCode: HttpStatus.CREATED,
      collection,
    }
  }

  @Post("/:id/collections/:collectionId")
  async addProblemsToCollection(
    @Param("id", ParseIntPipe) id: number,
    @Param("collectionId", ParseIntPipe) collectionId: number,
    @Body() addProblemsDto: AddProblemsDto
  ) {
    const problemIds = await this.listsService.getProblemIds(addProblemsDto.links)
    await this.listsService.addProblemsToCollection(id, collectionId, problemIds)
    return {
      problemIds,
      message: "Problems updated!",
    }
  }

  @Delete("/:id/collections/:collectionId")
  async deleteCollection(
    @Param("id", ParseIntPipe) id: number,
    @Param("collectionId", ParseIntPipe) collectionId: number
  ) {
    await this.listsService.removeCollection(id, collectionId)
    return {
      message: "Collection deleted!",
    }
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.update(+id, updateListDto)
  }

  @Get("/:id/progress")
  async getListProgress(@Param("id", ParseIntPipe) id: number) {
    const result = await this.listsService.getListProgress(id)
    return {
      ...result,
    }
  }
}
