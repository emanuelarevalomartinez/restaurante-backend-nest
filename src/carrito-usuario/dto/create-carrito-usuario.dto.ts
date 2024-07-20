import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateCarritoUsuarioDto {

    
    idCarrito:string;

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    descripcion:string;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    cantidad:number;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    montoTotal:number;

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    imagen:string;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    cantidadAOrdenar:number;

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    tipoProducto:string;
}
