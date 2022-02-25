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
  createProblem(problemData): Promise<Problem> {
    const { pid, link, name, difficulty } = problemData;
    const tags = problemData.tags.map((tag) =>
      this.tagsRepository.create({ name: tag }),
    );
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
