import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerIntercepter } from "./interceptors/logger.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ "Access-Control-Allow-Origin": "http://localhost:3000" });
  app.useGlobalInterceptors(new LoggerIntercepter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
