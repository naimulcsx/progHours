import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Resource } from "./resources.entity"

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>
  ) {}

  /**
   * Create resource service
   */
  async createResource(body) {
    const { title, link, difficulty, language, type } = body

    const foundResource = await this.resourceRepository.findOne({ link })

    /**
     * Check if the resource is exist or not
     */
    if (foundResource) throw new BadRequestException("Resource already exists!")

    const newResource = this.resourceRepository.create({
      title,
      link,
      difficulty,
      language,
      type,
    })

    return this.resourceRepository.save(newResource)
  }

  /**
   * Get all resources service
   */
  getAllResources() {
    return this.resourceRepository.find()
  }

  /**
   * Get a resource service
   */
  async getAResources(id: number) {
    const resource = await this.resourceRepository.findOne({ id })

    if (!resource) throw new NotFoundException("Resource not found!")

    return resource
  }

  /**
   * Update resource
   */
  async updateResource(body: any, id: number) {
    try {
      await this.resourceRepository.update(id, body)

      return { message: "Resource updated" }
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete resource
   */
  async deleteResource(id: number) {
    try {
      await this.resourceRepository.delete(id)

      return { message: "Resource deleted" }
    } catch (err) {
      throw err
    }
  }
}
