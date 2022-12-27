import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common"

import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { PrismaService } from "../prisma/prisma.service"
import { ok } from "assert"

@Injectable()
export class JudgeSubmissionManagerService {
  constructor(
    private prisma: PrismaService,

    /**
     * Job Queue Producer for submission
     */
    @InjectQueue('submission-queue') 
    private subissionQueue: Queue,
  ) {}

  /* 
   * Judge Problem Submissions
   */
  async practiseSubmission() {

  }
  async contestSubmission() {

  }

  /**
   * 
   * @param code Problme solution
   * @param lang Used language
   * For judging solutions
   * Submission can be a practise-submission or contest-submission.
   */
  async judgeSubmission(sourceCode, problemId, language) {
    /**
     * Algo - 
     * Determine if it's a practise submission or contest submission
     * If it's a practise submission then judge normally
     * If it's a contest submission then update contest stats for the person in standings board, or table
     * Check redis contest queue to determine if it'a a running contest or not
     * Return submissionId
     */

    try {
      let job = await this.subissionQueue.add('handle-submisson', {
        sourceCode: sourceCode,
        problemId: problemId,
        language: language
      })
      return {
        status: ok,
        message: "Submission Queued"
      }
    }
    catch (err) {
      return {
        status: "failed",
        message: err
      }
    }
  }


  /**
   * Submission for testing solution
   * Only author and permitted person's are allowd to test
   */
  async testSubmission() {

  }

  /**
   * 
   * @param submissionId The id of the submission
   * Check if current status of the submission
   */
  async checkStats(submissionId) {
    
  }
}
