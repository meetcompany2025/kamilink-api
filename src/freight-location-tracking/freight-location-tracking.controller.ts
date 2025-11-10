// src/modules/freight-location-tracking/controllers/freight-location-tracking.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetLatestFreightLocationTrackingUseCase } from './use-cases/get-latest-freight-location-tracking.usecase';
import { RegisterFreightLocationDto } from './dto/register-freight-location.dto';
import { FreightLocationTrackingUseCase } from './use-cases/freight-location-tracking.usecase.';

@Controller('freight-location-tracking')
export class FreightLocationTrackingController {
  constructor(
    private readonly getLatestUseCase: GetLatestFreightLocationTrackingUseCase,
    private readonly freightLocationTrackingUseCase: FreightLocationTrackingUseCase,
  ) {}

  @Get(':freightId')
  async getLatestLocation(@Param('freightId') freightId: string) {
    return this.getLatestUseCase.execute(freightId);
  }

  @Post('location')
  async registerLocation(@Body() dto: RegisterFreightLocationDto) {
    return this.freightLocationTrackingUseCase.registerLocation(dto);
  }
}
