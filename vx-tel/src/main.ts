import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
