import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisPubSubService } from 'src/redis-pub-sub/redis-pub-sub.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [SocialController],
  providers: [SocialService, PrismaService, RedisPubSubService, ConfigService],
})
export class SocialModule {}
