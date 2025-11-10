// src/modules/freight-status-history/dtos/register-freight-status-change.dto.ts

import { IsUUID, IsEnum } from 'class-validator';
import { FreightStatus } from '@prisma/client';

export class RegisterFreightStatusChangeDto {
  @IsUUID()
  freightId: string;

  @IsEnum(FreightStatus)
  newStatus: FreightStatus;
}
