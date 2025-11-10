// src/freights/dto/filter-freights.dto.ts
import { IsOptional, IsEnum } from 'class-validator';
import { FreightStatus } from '@prisma/client';

export class FilterFreightsDto {
  @IsOptional()
  @IsEnum(FreightStatus)
  status?: FreightStatus;
}
// This DTO is used to filter freights based on their status.
// It allows optional filtering by the status of the freight, which can be one of the values
