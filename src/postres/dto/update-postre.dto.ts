import { PartialType } from '@nestjs/mapped-types';
import { CreatePostreDto } from './create-postre.dto';
import { IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class UpdatePostreDto extends PartialType(CreatePostreDto) {

    @IsOptional()
    @IsString()
    @MinLength(1)
    descripcionPostre?:string;

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
