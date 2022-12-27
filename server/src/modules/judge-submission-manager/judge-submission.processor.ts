import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bull'
import { PrismaService } from "../prisma/prisma.service"
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from "rxjs"

@Processor('submission-queue')
export class JudgeSubmissionProcessor {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService
  ) {}
  
  /**
   * 
   * @param problemDetails Details of the problem
   */
  async submitToJudge(problemDetails) {
    console.log("print judge");
    
    let judgeCredentials =
    `{
      "cmd": [{
          "args": ["/usr/bin/g++", "a.cc", "-o", "a"],
          "env": ["PATH=/usr/bin:/bin"],
          "files": [{
              "content": ""
          }, {
              "name": "stdout",
              "max": 10240
          }, {
              "name": "stderr",
              "max": 10240
          }],
          "cpuLimit": 10000000000,
          "memoryLimit": 104857600,
          "procLimit": 50,
          "copyIn": {
              "a.cc": {
                  "content": ${problemDetails.sourceCode},
              }
          },
          "copyOut": ["stdout", "stderr"],
          "copyOutCached": ["a.cc", "a"],
          "copyOutDir": "1"
      }]
    }`
    console.log(judgeCredentials);
    console.log('-----------------------------------------------------------');
    

    /**
     * Submit to goJudge
     */
    console.log("before submission");
    
    const { data } = await lastValueFrom(
      this.httpService.post('gojudge:5050/run',{
        headers: {
          'Content-Type': 'application/json',
        },
        body: judgeCredentials
      })
    )
    console.log(data);
    console.log('-----------------------------------------------------------');
    

    return data
    
  }

  /**
   * 
   * @param submissionDetails 
   */
  @Process('handle-submisson')
  async handleSubmissionJob(submissionDetails: Job<unknown>) {
    console.log('printing ');
    
    let problem = await this.prisma.judgeProblems.findUnique({
      where: {
        id: +submissionDetails.data['problemId'],
      },
      include: {
        tests: true
      }
    })
    console.log("probem: ", problem);
    
    
    let problemDetails = {
      sourceCode  : submissionDetails.data['sourceCode'],
      language    : submissionDetails.data['language'],
      cpuLimit    : problem.cpuLimit,
      memoryLimit : problem.memoryLimit
    }
    /**
     * Go judge part
     */
    let submissionCredentials = await this.submitToJudge(problemDetails)
    console.log(submissionCredentials);
    
  }
}
