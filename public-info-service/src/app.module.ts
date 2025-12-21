import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { PublicActivitiesModule } from "./public-activities/public-activities.module";
import { ApiKeyMiddleware } from "./middleware/apikey.middleware";
import { UsersModule } from './users/users.module';
import { RedisModule } from './redis/redis.module';
import { SocialModule } from './social/social.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    PublicActivitiesModule,
    UsersModule,
    RedisModule,
    SocialModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes("*");
  }
}
