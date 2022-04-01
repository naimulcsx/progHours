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

  findHandles({ handle, judge_id }) {
    return this.handlesRepository.findOne({
      where: { handle, judge_id },
    })
  }

  async createHandles({ handle, judge_id, user_id }) {
    const newHandles = this.handlesRepository.create({
      handle,
      judge_id,
      user_id,
    })
    return this.handlesRepository.save(newHandles)
  }

  async findAllHandles(userId) {
    const handles = await this.handlesRepository
      .createQueryBuilder("handle")
      .where("handle.user_id = :userId", { userId })
      .innerJoinAndSelect("handle.judge_id", "judge_id")
      .innerJoinAndSelect("handle.user_id", "user_id")
      .select(["handle", "user_id.username", "judge_id.name"])
      .getMany()

    return handles
  }
}
