import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

/**
 * Import Entities (models)
 */
import { Tag } from "@/modules/problems/tag.entity"
import { Problem } from "@/modules/problems/problem.entity"
import { UserProblemTag } from "@/modules/problems/user-problem-tag"
import * as UrlPattern from "url-pattern"

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemsRepository: Repository<Problem>,

    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,

    @InjectRepository(UserProblemTag)
    private userProblemTagsRepository: Repository<UserProblemTag>
  ) {}
  async findOne(id) {
    return this.problemsRepository.findOne(id, { relations: ["user_tags"] })
  }
  async saveProblem(problem) {
    return this.problemsRepository.save(problem)
  }
  async getProblem(link): Promise<Problem> {
    let foundProblem = await this.problemsRepository.findOne({ link })
    /**
     * ~ ONLY FOR LIGHTOJ - NEED TO CHECK IF the problem exists with the pid from link
     */
    console.log(link)
    if (!foundProblem && new URL(link).hostname === "lightoj.com") {
      const pattern = new UrlPattern("/problem/:problemId")
      const patternResult = pattern.match(new URL(link).pathname)
      if (patternResult) {
        foundProblem = await this.problemsRepository.findOne({
          pid: `LOJ-${patternResult.problemId}`,
        })
      }
    }
    return foundProblem
  }
  async createProblem(problemData): Promise<Problem> {
    const { pid, link, name, difficulty, judge_id } = problemData
    const tags = []
    for (const tag of problemData.tags) {
      const tagObj = { name: tag }
      const foundTag = await this.tagsRepository.findOne(tagObj)
      if (!foundTag) tags.push(tagObj)
      else tags.push(foundTag)
    }
    const newProblem = this.problemsRepository.create({
      pid,
      link,
      name,
      difficulty,
      tags,
      judge_id,
    })
    return this.problemsRepository.save(newProblem)
  }

  async findOrCreateTag(tag_name): Promise<Tag> {
    let tag: Tag
    try {
      tag = await this.tagsRepository.findOne({ name: tag_name })
      if (!tag) {
        const newTag = this.tagsRepository.create({ name: tag_name })
        tag = await this.tagsRepository.save(newTag)
      }
    } catch (err) {}
    return tag
  }

  async findOrCreateUserTag(
    user_id: number,
    problem_id: number,
    tag_name: string
  ): Promise<any> {
    /**
     * Find or Create the tag
     */
    const tag = await this.findOrCreateTag(tag_name)
    console.log(tag)
    const dataToStore = {
      problem_id,
      user_id,
      tag_id: tag.id,
    }

    /**
     * Check if the tag is already associated with the problem
     */
    let problem = await this.problemsRepository
      .createQueryBuilder("problem")
      .where("problem.id = :id", { id: problem_id })
      .leftJoinAndSelect("problem.tags", "tags")
      .getOne()

    let tagAlreadyExists = false
    problem.tags.forEach((t) => {
      if (t.id === tag.id) tagAlreadyExists = true
    })

    /**
     * Check if the user has already suggested the same tag before
     */
    let userProblemTag = await this.userProblemTagsRepository.findOne(
      dataToStore
    )

    if (!tagAlreadyExists && !userProblemTag) {
      const newUserProblemTag =
        this.userProblemTagsRepository.create(dataToStore)
      try {
        userProblemTag = await this.userProblemTagsRepository.save(
          newUserProblemTag
        )
      } catch (err) {
        console.log(err)
      }
    }

    return userProblemTag
  }
}
