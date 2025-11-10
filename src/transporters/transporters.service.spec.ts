import { Test, TestingModule } from '@nestjs/testing';
import { TransportersService } from './transporters.service';

describe('TransportersService', () => {
  let service: TransportersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportersService],
    }).compile();

    service = module.get<TransportersService>(TransportersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
