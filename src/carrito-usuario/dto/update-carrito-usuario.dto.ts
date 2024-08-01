import { PartialType } from '@nestjs/mapped-types';
import { CreateCarritoUsuarioDto } from './create-carrito-usuario.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCarritoUsuarioDto extends PartialType(CreateCarritoUsuarioDto) {

    @IsString()
    @IsOptional()
    idProducto?:string;

    @IsString()
    @IsOptional()
    descripcion?:string;


    @IsNumber()
    @IsOptional()
    montoTotal?:number;

    @IsString()
    @IsOptional()
    imagen?:string;

    @IsNumber()
    @IsOptional()
    cantidadAOrdenar?:number;


}
