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

const FS = require('fs').promises
const fs = require('fs')
const path = require('path')

/**
 * Import Entities (models)
 */
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class JudgeProblemManagerService {
  constructor(
    private prisma: PrismaService,
  ) {}

  baseFolderPath = path.join(__dirname, '../../../../', 'judgeFiles/');

  async getAllProblem() {
    return await this.prisma.judgeProblems.findMany({
        include: {
          tags: true
        }
      }
    )
  }

  async findProblemById(id: number) {
    return await this.prisma.judgeProblems.findUnique( {
      where: {
        id : +id,
      },
      include: {
        tags: true
      }
    })
  }

  // TODO: auth credential check & erro handle
  async createProblem(problemData) {
    // dummy author
    const author = await this.prisma.user.findUnique({ where: {username: "c183074" }})

    problemData.authorName = author.username
    problemData.inOutBaseFolder = this.baseFolderPath
    let tagList = []
    if (problemData.tags) {
      for (let tag of problemData.tags) {
        tagList.push({"name": tag})
      }
      delete problemData.tags
    }
    const tags =  {
      connect: tagList
    }
    problemData.tags = tags
    const newProblem = await this.prisma.judgeProblems.create({
      data: problemData
    })

    if (newProblem) {
      // TODO
      // create a folder for this problem tests
      // formate will be problemId_tests
      // full path will be ......../baseFolderPath/tests_problemId_:id/test_:serial/(abc.in / abc.out)
      const folderName = this.baseFolderPath+'tests_problemId_'+newProblem.id
      try {
        fs.mkdirSync(folderName)
      }
      catch(err) {
        throw err
      }
      return {
        newProblem,
        status: HttpStatus.OK
      }
    }
    else return "Problem Creation Falied."
  }

  // TODO: auth credential check
  async updateProblem() {

  }


  // TODO: check every exception
    // if anything fails then delete directory and files
  async writeTestsToFile(fullTestPath, data) {
    // const file = await FS.createFile(fullTestPath, 'w')
    // const result = await file.writeFile(fullTestPath, data)
    // .then(() => {
    //   file.close()
    //   return {"status": "success"}
    // })
    // .catch((err) => {
    //   file.close()
    //   return err
    // })
    const result = fs.appendFile(fullTestPath, data, (err, data) => {
      if (err) {
        throw err
      }
      return data
    })
    return result
  }
  // TODO: auth credential check
  async createProblemTest(pid, testData) {
    // check if the author is correct
    // if correct author
      // then create test in the folder
      // numbering will be according to totalInOutFiles(database)

    // dummy author
    const author = await this.prisma.user.findUnique({ where: {username: "c183074" }})
    .catch((err) => {
      return err
    })

    const judgeProblem = await this.prisma.judgeProblems.findUnique({
      where: {
        id: +pid
      }
    }).catch((err) => {
      return err
    })

    testData['problemId'] = judgeProblem.id
    testData['testFolder'] = 'tests_problemId_'+pid

    const newTest = await this.prisma.judgeProblemTests.create({
      data: {
        weight: +testData.weight,
        label: testData.lable,
        testFolder: testData.testFolder,
        problemId: testData.problemId
      }
    })
    .catch((err) => {
      return {"Status": "Failed to create test", "err": err}
    })

    // create files 
    const input = testData.input
    const output = testData.output
    const testFolderName = (Math.random() + 1).toString(36).substring(7)
    const fullTestFolderPath = path.join(this.baseFolderPath, testData.testFolder+'/'+testFolderName)
    try {
      fs.mkdirSync(fullTestFolderPath)
      const inputData = await this.writeTestsToFile(fullTestFolderPath+'/input.in', input)
      const outputData = await this.writeTestsToFile(fullTestFolderPath+'/output.out', output)
      return {"newTest": newTest, "input": inputData, "output": outputData}
    }
    catch(err) {
      throw err
    }
  }

  /*
    read x bytes from the file and returns string
  */
  async getXBytesBuffer(fullTestPath) {
    const file = await FS.open(fullTestPath, 'r');
    const { size } = await file.stat(fullTestPath)
    const bytesToRead = Math.min(size, 100)
    const { buffer } = await file.read(Buffer.alloc(bytesToRead), 0, bytesToRead, 0);
    await file.close()
  
    return buffer.toString()
  }
  // TODO: auth credential check
  // returns all compressed test belongs to the problemId
  // base folder => /home/imtiazcho/Documents/progHours/judgeFiles/
  //             => tests_problemId_66/test_1
  //             => tests_problemId_66/test_2
  async getAllTestByProblemId(pid) {
    // dummy author
    const author = await this.prisma.user.findUnique({ where: {username: "c183074" }})
    .catch((err) => {
      return err
    })

    const judgeProblem = await this.prisma.judgeProblems.findUnique({
      where: {
        id: +pid
      }
    }).catch((err) => {
      return err
    })
    const tests = await this.prisma.judgeProblemTests.findMany({
      where: {
        problem: judgeProblem
      }
    }).catch((err) => {
      return err
    })

    for (let i = 0; i < tests.length; i++) {
      const fullTestPath = this.baseFolderPath + tests[i].testFolder
      tests[i].testFolder = undefined

      let input = await this.getXBytesBuffer(fullTestPath+'/input.in')
      let output = await this.getXBytesBuffer(fullTestPath+'/output.out')

      tests[i]['input'] = input
      tests[i]['output'] = output
    }
    
    return tests
  }
}
