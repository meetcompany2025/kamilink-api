import { Test, TestingModule } from '@nestjs/testing';
import { FreightRequestsService } from './freight_requests.service';

describe('FreightRequestsService', () => {
  let service: FreightRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreightRequestsService],
    }).compile();

    service = module.get<FreightRequestsService>(FreightRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
