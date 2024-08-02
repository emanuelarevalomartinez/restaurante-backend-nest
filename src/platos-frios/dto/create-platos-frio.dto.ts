import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePlatosFrioDto {

    @IsString()
    @MinLength(1)
    descripcionPlatoFrio:string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    precio:number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    cantRestante:number;

    @IsString()
    @MinLength(1)
    imagenAsociada:string;
}
