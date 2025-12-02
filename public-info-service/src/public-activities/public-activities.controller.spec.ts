import { Test, TestingModule } from '@nestjs/testing';
import { PublicActivitiesController } from './public-activities.controller';
import { PublicActivitiesService } from './public-activities.service';

describe('PublicActivitiesController', () => {
  let controller: PublicActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicActivitiesController],
      providers: [PublicActivitiesService],
    }).compile();

    controller = module.get<PublicActivitiesController>(PublicActivitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
