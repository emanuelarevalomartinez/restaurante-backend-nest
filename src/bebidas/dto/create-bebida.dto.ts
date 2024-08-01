import { IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateBebidaDto {



    @IsString()
    @MinLength(1)
    descripcionBebida:string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    precio:number;

    @IsNumber()
    cantRestante:number;

    @IsString()
    @MinLength(1)
    imagenAsociada:string;

}
