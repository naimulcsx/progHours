import { PrometheusController as PC } from "@willsoto/nestjs-prometheus";
import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { Auth, AuthType } from "~/modules/iam/auth/decorators/auth.decorator";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

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
