import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateNotificacionDto {


    @IsString()
    @MinLength(1)
    tipo:string;

    @IsString()
    @MinLength(1)
    mensaje:string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    fecha?:string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    hora?:string;

}
