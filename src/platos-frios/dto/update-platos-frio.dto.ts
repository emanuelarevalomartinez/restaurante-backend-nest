import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatosFrioDto } from './create-platos-frio.dto';
import { IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class UpdatePlatosFrioDto extends PartialType(CreatePlatosFrioDto) {

    @IsOptional()
    @IsString()
    @MinLength(1)
    descripcionPlatoFrio?:string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    precio?:number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    cantRestante?:number;

    @IsOptional()
    @IsString()
    @MinLength(1)
    imagenAsociada?:string;

}
