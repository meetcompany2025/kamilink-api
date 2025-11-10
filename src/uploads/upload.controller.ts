import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageType, UserProfile } from '@prisma/client';
import { UploadService } from './upload.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { JWTPayload } from 'src/auth/jwt.strategy';
import { Request } from 'express';
import { lookup } from 'mime-types';
import { GetImagesByUserUseCase } from './use-cases/get-images-by-user.use-case';
import { GetImagesByVehicleUseCase } from './use-cases/get-images-by-vehicle.use-case';
import { GetImagesByFreightUseCase } from './use-cases/get-images-by-freight.use-case';
import { ViewImageUseCase } from './use-cases/view-image.use-case';
import { DeleteImageUseCase } from './use-cases/delete-image.use-case';

@Controller('uploads')
export class UploadController {
  constructor(
    private uploadService: UploadService,
    private readonly getImagesByUser: GetImagesByUserUseCase,
    private readonly getImagesByVehicle: GetImagesByVehicleUseCase,
    private readonly getImagesByFreight: GetImagesByFreightUseCase,
    private readonly viewImageUseCase: ViewImageUseCase,
    private readonly deleteImage: DeleteImageUseCase,
  ) {}

  /**
   * Endpoint to upload a file.
   * Only accessible by users with the CLIENT, DRIVER, or ADMIN roles.
   * @param file - The file to be uploaded.
   * @param type - The type of the image.
   * @param vehicleId - Optional vehicle ID for the upload.
   * @param freightId - Optional freight ID for the upload.
   * @param req - The request object containing user information.
   * @returns The result of the upload operation.
   */

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.CLIENT, UserProfile.TRANSPORTER, UserProfile.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('type') type: ImageType,
    @Req() req: Request, //  mover para antes dos opcionais
    @Body('vehicleId') vehicleId?: string,
    @Body('freightId') freightId?: string,
  ) {
    const user = req.user as JWTPayload;
    return this.uploadService.handleUpload(file, type, {
      userId: user.userId,
      vehicleId,
      freightId,
    });
  }

  /**
   * Endpoint to get images by user, vehicle, or freight.
   * @param userId - The ID of the user to get images for.
   * @param vehicleId - The ID of the vehicle to get images for.
   * @param freightId - The ID of the freight to get images for.
   * @returns The images associated with the specified user, vehicle, or freight.
   */

  @Get('user/:userId')
  async getByUser(@Param('userId') userId: string) {
    return await this.getImagesByUser.execute(userId);
  }

  // Endpoint to get images by vehicle ID
  @Get('vehicle/:vehicleId')
  async getByVehicle(@Param('vehicleId') vehicleId: string) {
    return await this.getImagesByVehicle.execute(vehicleId);
  }

  // Endpoint to get images by freight ID
  @Get('freight/:freightId')
  async getByFreight(@Param('freightId') freightId: string) {
    return await this.getImagesByFreight.execute(freightId);
  }

  /**
   * Endpoint to view an image by its ID.
   * @param id - The ID of the image to view.
   * @param res - The response object to send the image stream.
   */
  @Get(':id/view')
  async viewImage(@Param('id') id: string, @Res() res: Response) {
    const { stream, filename } = await this.viewImageUseCase.execute(id);

    const mimeType = lookup(filename) || 'application/octet-stream'; // Detecta o tipo real

    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': `inline; filename="${filename}"`,
    });

    stream.pipe(res);
  }

  /**
   * Endpoint to delete an image by its ID.
   * @param id - The ID of the image to delete.
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteImage.execute(id);
    return { message: 'Imagem excluída com sucesso' };
  }
}
