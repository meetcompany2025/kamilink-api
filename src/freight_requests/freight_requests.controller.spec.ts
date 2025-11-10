import { Test, TestingModule } from '@nestjs/testing';
import { FreightRequestsController } from './freight_requests.controller';
import { FreightRequestsService } from './freight_requests.service';

describe('FreightRequestsController', () => {
  let controller: FreightRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreightRequestsController],
      providers: [FreightRequestsService],
    }).compile();

    controller = module.get<FreightRequestsController>(FreightRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
