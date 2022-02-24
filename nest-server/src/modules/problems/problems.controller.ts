import { Controller, Get, Post } from '@nestjs/common';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemService: ProblemsService) {}
}
