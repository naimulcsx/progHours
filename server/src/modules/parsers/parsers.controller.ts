import { Body, Controller, Post, Res } from "@nestjs/common"
import { Response } from "express"
import { ParsersService } from "./parsers.service"

@Controller("/parsers")
export class ParsersController {
  constructor(private readonly parsersService: ParsersService) {}
  @Post("/test")
  async parseProblem(@Body() body, @Res({ passthrough: true }) res: Response) {
    let { link } = body
    link = this.parsersService.unifyLink(link)
    const result = await this.parsersService.parseProblem(link)
    res.status(200)
    return result
  }
}
