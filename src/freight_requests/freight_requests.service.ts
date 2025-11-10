import { Injectable } from '@nestjs/common';
import { CreateFreightRequestDto } from './dto/create-freight_request.dto';
import { UpdateFreightRequestDto } from './dto/update-freight_request.dto';

@Injectable()
export class FreightRequestsService {
  create(createFreightRequestDto: CreateFreightRequestDto) {
    return 'This action adds a new freightRequest';
  }

  findAll() {
    return `This action returns all freightRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} freightRequest`;
  }

  update(id: number, updateFreightRequestDto: UpdateFreightRequestDto) {
    return `This action updates a #${id} freightRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} freightRequest`;
  }
}
