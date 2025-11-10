import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';

@Injectable()
export class CancelExpiredFreightsUseCase {
  private readonly logger = new Logger(CancelExpiredFreightsUseCase.name);

  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepository: FreightsRepositoryInterface,
  ) {}

  async execute(): Promise<void> {
    const now = new Date();
    const count = await this.freightsRepository.cancelExpiredFreights(now);
    if (count > 0) {
      this.logger.log(
        `✅ ${count} expired freights were automatically canceled.`,
      );
    } else {
      this.logger.log('No expired freights to cancel.');
    }
  }
}
