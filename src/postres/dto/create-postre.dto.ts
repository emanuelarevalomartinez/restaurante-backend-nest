import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePostreDto {

    @IsString()
    @MinLength(1)
    descripcionPostre:string;

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
