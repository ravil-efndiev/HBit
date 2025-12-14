import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { PublicActivitiesModule } from "./public-activities/public-activities.module";
import { ApiKeyMiddleware } from "./middleware/apikey.middleware";
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    PublicActivitiesModule,
    UsersModule,
    RedisModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, ApiKeyMiddleware).forRoutes("*");
  }
}
