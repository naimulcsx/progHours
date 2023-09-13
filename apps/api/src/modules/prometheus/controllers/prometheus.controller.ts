import { PrometheusController as PC } from "@willsoto/nestjs-prometheus";
import { Response } from "express";

import { Controller, Get, Res } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { Auth, AuthType } from "~/modules/auth/decorators/auth.decorator";

@Controller()
@ApiTags("Metrics")
export class PrometheusController extends PC {
  @Get()
  @Auth(AuthType.None)
  @ApiOperation({ summary: "Prometheus default metrics" })
  async index(@Res({ passthrough: true }) response: Response) {
    return super.index(response);
  }
}
