import { PartialType } from '@nestjs/mapped-types'; 
import { CreateFreightOfferDto } from './create-freight_offer.dto';

export class UpdateFreightOfferDto extends PartialType(CreateFreightOfferDto) {}
