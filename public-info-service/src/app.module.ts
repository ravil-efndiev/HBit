import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { PublicActivitiesModule } from "./public-activities/public-activities.module";
import { ApiKeyMiddleware } from "./apikey.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    PublicActivitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes("*");
  }
}
