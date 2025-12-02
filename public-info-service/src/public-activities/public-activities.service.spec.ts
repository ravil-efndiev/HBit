import { Test, TestingModule } from '@nestjs/testing';
import { PublicActivitiesService } from './public-activities.service';

describe('PublicActivitiesService', () => {
  let service: PublicActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicActivitiesService],
    }).compile();

    service = module.get<PublicActivitiesService>(PublicActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
