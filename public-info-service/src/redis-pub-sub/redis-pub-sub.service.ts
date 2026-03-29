import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";
import { filter, map, Observable, Subject } from "rxjs";
import { SocialEvent } from "src/lib/types";

@Injectable()
export class RedisPubSubService implements OnModuleInit, OnModuleDestroy {
  private pub: Redis;
  private sub: Redis;
  private messages$ = new Subject<{ channel: string; message: string }>();
  private readonly socialChannel = "events:social";

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const redisUrl = this.configService.get<string>(
      process.env.NODE_ENV === "production"
        ? "REDIS_PROD_URL"
        : "REDIS_DEV_URL",
    )!;

    this.pub = new Redis(redisUrl);
    this.sub = new Redis(redisUrl);
    this.sub.subscribe(this.socialChannel);

    this.sub.on("message", (channel, message) => {
      if (channel === this.socialChannel) {
        this.messages$.next({ channel, message });
      }
    });
  }

  onModuleDestroy() {
    this.pub.quit();
    this.sub.quit();
  }

  emitSocialEvent(event: SocialEvent) {
    this.pub.publish(this.socialChannel, JSON.stringify(event));
  }

  listen(userId: string): Observable<MessageEvent> {
    return this.messages$.pipe(
      map(({ message }) => ({
        data: JSON.parse(message),
      })),
      filter((event) => event.data.userId === userId),
      map((event) => event.data),
      map(({ userId, ...rest }) => rest),
    );
  }
}
