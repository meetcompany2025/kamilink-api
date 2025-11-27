import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTransporterDto } from './dto/create-transporter.dto';
import { UpdateTransporterDto } from './dto/update-transporter.dto';
import { GetAllTransportersUseCase } from './use-cases/get-all-transporters.usecase';
import { GetTransporterByDriverLicenseUseCase } from './use-cases/get-transporter-by-driver-license.usecase';
// import { GetTransporterByLicensePlateUseCase } from './use-cases/get-transporter-by-license-plate.usecase';
import { GetTransporterByIdUseCase } from './use-cases/get-transporter-by-id.usecase';

@Controller('transporters')
export class TransportersController {
  constructor(
    private getAllTransportersUseCase: GetAllTransportersUseCase,
    private getTransporterByIdUseCase: GetTransporterByIdUseCase,
    private getTransporterByDriverLicenceUseCase: GetTransporterByDriverLicenseUseCase,
    // private getTransporterByLicencePlateUseCase: GetTransporterByLicensePlateUseCase,
  ) { }

  @Get()
  findAll() {
    return this.getAllTransportersUseCase.execute();
  }

  @Get('license/:id')
  findByDriverLicense(@Param('id') id: string) {
    return this.getTransporterByDriverLicenceUseCase.execute(id);
  }

  // @Get('plate/:id')
  // findByPlate(@Param('id') id: string) {
  //   return this.getTransporterByLicencePlateUseCase.execute(id);
  // }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getTransporterByIdUseCase.execute(id);
  }

  /*@Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransporterDto: UpdateTransporterDto,
  ) {
    return this.transportersService.update(+id, updateTransporterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportersService.remove(+id);
  }*/
}
