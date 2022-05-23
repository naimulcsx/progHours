import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Handle } from "./handles.entity"

@Injectable()
export class HandlesService {
  constructor(
    @InjectRepository(Handle)
    private handlesRepository: Repository<Handle>
  ) {}

  /**
   * Get a handle
   */
  findHandle({ user_id, judge_id }) {
    return this.handlesRepository.findOne({
      where: { user_id, judge_id },
    })
  }

  /**
   * Create a handle
   */
  async createHandles({ handle, judge_id, user_id }) {
    const newHandles = this.handlesRepository.create({
      handle,
      judge_id,
      user_id,
    })
    return this.handlesRepository.save(newHandles)
  }

  /**
   * Find all handles
   */
  async findAllHandles(userId: number) {
    const handles = await this.handlesRepository
      .createQueryBuilder("handle")
      .where("handle.user_id = :userId", { userId })
      .innerJoinAndSelect("handle.judge_id", "judge_id")
      .innerJoinAndSelect("handle.user_id", "user_id")
      .select(["handle", "user_id.username", "judge_id.name"])
      .getMany()

    return handles
  }

  /**
   * Delete handle
   */
  async deleteHandle(userId: number, judge_id: number) {
    const foundHandle = await this.findHandle({ user_id: userId, judge_id })

    return this.handlesRepository.delete(foundHandle)
  }
}
