import { PartialType } from '@nestjs/mapped-types';
import { CreateFreightDto } from './create-freight_offer.dto';

export class UpdateFreightDto extends PartialType(CreateFreightDto) {}
