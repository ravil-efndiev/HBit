import { Module, Global } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import KeyvRedis from "@keyv/redis";
import { Keyv } from "keyv";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          stores: [
            new Keyv({
              store: new KeyvRedis(
                configService.get<string>(
                  process.env.NODE_ENV === "production"
                    ? "REDIS_PROD_URL"
                    : "REDIS_DEV_URL",
                ),
              ),
            }),
          ],
        };
      },
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}
