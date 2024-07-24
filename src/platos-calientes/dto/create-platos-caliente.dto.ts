import { IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePlatosCalienteDto {
    
    id:string;

    @IsString()
    @MinLength(1)
    descripcionPlato:string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    precio:number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    cantRestante:number;

    @IsString()
    @IsOptional()
    @MinLength(1)
    imagenAsociada:string;
}
