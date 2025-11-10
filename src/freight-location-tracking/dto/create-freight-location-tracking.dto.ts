import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateFreightLocationTrackingDto {

    @IsUUID()
    freightId: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsOptional()
    @IsNumber()
    speed?: number;

    @IsOptional()
    @IsString()
    direction?: string;
}

