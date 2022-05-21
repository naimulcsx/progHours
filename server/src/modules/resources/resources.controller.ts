import { IsAuthenticatedGuard } from "@/guards/is-authenticated"
import { CreateResourceDto } from "@/validators/create-resource-dto"
import { UpdateResourceDto } from "@/validators/update-resource-dto"
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common"
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { ResourcesService } from "./resources.service"

@Controller("resources")
@ApiTags("resources")
@UseGuards(IsAuthenticatedGuard)
export class ResourcesController {
  constructor(private readonly resourceService: ResourcesService) {}

  @Post("/")
  @ApiOperation({ summary: "Create a new resource." })
  @ApiOkResponse({ description: "Success." })
  async createResources(@Body() body: CreateResourceDto) {
    const newResource = await this.resourceService.createResource(body)
    return { message: "Resource created", data: newResource }
  }

  @Get("/")
  @ApiOperation({ summary: "Get all resources." })
  @ApiOkResponse({ description: "Success." })
  async getResources() {
    const resources = await this.resourceService.getAllResources()
    return { resources }
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get a resource by id." })
  @ApiOkResponse({ description: "Success." })
  async getAResource(@Param("id") id: number) {
    const resource = await this.resourceService.getAResources(id)

    return { resource }
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Update a resource by id." })
  @ApiOkResponse({ description: "Success." })
  async updateResource(
    @Body() body: UpdateResourceDto,
    @Param("id") id: number
  ) {
    return await this.resourceService.updateResource(body, id)
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Delete a resource by id." })
  @ApiOkResponse({ description: "Success." })
  async deleteResource(@Param("id") id: number) {
    return await this.resourceService.deleteResource(id)
  }
}
