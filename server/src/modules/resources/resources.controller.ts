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
import { ResourcesService } from "./resources.service"

@Controller("resources")
@UseGuards(IsAuthenticatedGuard)
export class ResourcesController {
  constructor(private readonly resourceService: ResourcesService) {}

  @Post("/")
  async createResources(@Body() body: CreateResourceDto) {
    const newResource = await this.resourceService.createResource(body)
    return { message: "Resource created", data: newResource }
  }

  @Get("/")
  async getResources() {
    const resources = await this.resourceService.getAllResources()

    return { resources }
  }

  @Get("/:id")
  async getAResource(@Param("id") id: number) {
    const resource = await this.resourceService.getAResources(id)

    return { resource }
  }

  @Patch("/:id")
  async updateResource(
    @Body() body: UpdateResourceDto,
    @Param("id") id: number
  ) {
    return await this.resourceService.updateResource(body, id)
  }

  @Delete("/:id")
  async deleteResource(@Param("id") id: number) {
    return await this.resourceService.deleteResource(id)
  }
}
