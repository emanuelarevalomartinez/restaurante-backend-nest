import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificacionDto } from './create-notificacion.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateNotificacionDto extends PartialType(CreateNotificacionDto) {

    @IsOptional()
    @IsString()
    @MinLength(1)
    tipo?:string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    mensaje?:string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    fecha?:string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    hora?:string;

}
