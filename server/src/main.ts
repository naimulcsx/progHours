import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./modules/app.module"
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  /**
   * Setting global prefix, all routes will be prefixed with /api
   */
  app.setGlobalPrefix("api")
  app.use(cookieParser())

  /**
   * Setup Swagger UI
   */
  const config = new DocumentBuilder()
    .setTitle("progHours")
    .setLicense(
      "MIT License",
      "https://github.com/naimulcsx/progHours/blob/main/LICENSE"
    )
    .setDescription("This is the API documentation for progHours.")
    .setExternalDoc("Contact the developer", "mailto:naimulcsx@gmail.com")
    .setExternalDoc("Github", "https://github.com/naimulcsx/progHours")
    .setVersion("1.0 alpha")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/docs", app, document)

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()
