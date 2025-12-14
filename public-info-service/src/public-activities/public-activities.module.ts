import { Module } from '@nestjs/common';
import { PublicActivitiesService } from './public-activities.service';
import { PublicActivitiesController } from './public-activities.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PublicActivitiesController],
  providers: [PublicActivitiesService, PrismaService],
})
export class PublicActivitiesModule {}
