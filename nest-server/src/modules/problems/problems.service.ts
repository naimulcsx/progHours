import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from './problem.entity';
import { Tag } from './tag.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemsRepository: Repository<Problem>,

    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}
  async getProblem(link): Promise<Problem> {
    const foundProblem = await this.problemsRepository.findOne({ link });
    return foundProblem;
  }
  async createProblem(problemData): Promise<Problem> {
    const { pid, link, name, difficulty } = problemData;
    const tags = [];
    for (const tag of problemData.tags) {
      const tagObj = { name: tag };
      const foundTag = await this.tagsRepository.count(tagObj);
      if (!foundTag) tags.push(tagObj);
    }
    console.log(tags);
    const newProblem = this.problemsRepository.create({
      pid,
      link,
      name,
      difficulty,
      tags,
    });
    return this.problemsRepository.save(newProblem);
  }
}
