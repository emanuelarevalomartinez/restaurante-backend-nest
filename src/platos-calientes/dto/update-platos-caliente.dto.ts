import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatosCalienteDto } from './create-platos-caliente.dto';
import { IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class UpdatePlatosCalienteDto extends PartialType(CreatePlatosCalienteDto) {


    @IsString()
    @IsOptional()
    @MinLength(1)
    descripcionPlato?:string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @IsOptional()
    precio?:number;

    @IsNumber()
    @IsOptional()
    cantRestante?:number;

    @IsString()
    @IsOptional()
    @MinLength(1)
    imagenAsociada?:string;

}
