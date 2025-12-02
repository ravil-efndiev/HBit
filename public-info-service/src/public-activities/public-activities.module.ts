import { Module } from '@nestjs/common';
import { PublicActivitiesService } from './public-activities.service';
import { PublicActivitiesController } from './public-activities.controller';

@Module({
  controllers: [PublicActivitiesController],
  providers: [PublicActivitiesService],
})
export class PublicActivitiesModule {}
