import { PartialType } from '@nestjs/mapped-types';
import { CreateBebidaDto } from './create-bebida.dto';
import { IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class UpdateBebidaDto extends PartialType(CreateBebidaDto) {

    @IsOptional()
    @IsString()
    @MinLength(1)
    descripcionBebida?:string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    precio?:number;

    @IsOptional()
    @IsNumber()
    cantRestante?:number;

    @IsOptional()
    @IsString()
    @MinLength(1)
    imagenAsociada?:string;

}
