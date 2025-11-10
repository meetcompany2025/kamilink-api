import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CancelExpiredFreightsUseCase } from '../freight/use-cases/cancel-expired-freights.usecase';

@Injectable()
export class FreightScheduler {
  constructor(
    private readonly cancelExpiredFreightsUseCase: CancelExpiredFreightsUseCase,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleFreightExpiration() {
    console.log('Pedidos expirados, cancelados');
    await this.cancelExpiredFreightsUseCase.execute();
  }
}
