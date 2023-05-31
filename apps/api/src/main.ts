/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { SwaggerTheme } from "swagger-themes";

import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle("progHours")
    .setDescription("progHours API documentation")
    .setVersion("0.3.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme("v3");

  SwaggerModule.setup("api/docs", app, document, {
    customSiteTitle: "progHours - API Docs",
    customCss: theme.getBuffer("feeling-blue")
  });

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
