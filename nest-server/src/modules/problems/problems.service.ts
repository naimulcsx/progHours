import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from './problem.entity';
import { Tag } from './tag.entity';
import { UserTag } from './user-tags.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemsRepository: Repository<Problem>,

    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,

    @InjectRepository(UserTag)
    private userTagsRepository: Repository<UserTag>,
  ) {}
  async findOne(id) {
    return this.problemsRepository.findOne(id, { relations: ['user_tags'] });
  }
  async saveProblem(problem) {
    return this.problemsRepository.save(problem);
  }
  async getProblem(link): Promise<Problem> {
    const foundProblem = await this.problemsRepository.findOne({ link });
    return foundProblem;
  }
  async createProblem(problemData): Promise<Problem> {
    const { pid, link, name, difficulty } = problemData;
    const tags = [];
    for (const tag of problemData.tags) {
      const tagObj = { name: tag };
      const foundTag = await this.tagsRepository.findOne(tagObj);
      if (!foundTag) tags.push(tagObj);
      else tags.push(foundTag);
    }
    const newProblem = this.problemsRepository.create({
      pid,
      link,
      name,
      difficulty,
      tags,
    });
    return this.problemsRepository.save(newProblem);
  }
  async findOrCreateUserTag(tagData): Promise<UserTag> {
    const { user_id, tag_name } = tagData;
    let foundUserTag = await this.userTagsRepository.findOne(tagData);
    if (foundUserTag) return foundUserTag;
    const result = await this.userTagsRepository.save(
      this.userTagsRepository.create({ user_id, tag_name }),
    );
    return result;
  }
}
