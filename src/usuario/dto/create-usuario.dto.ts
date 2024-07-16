import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Roles } from "../interfaces";

export class CreateUsuarioDto {


    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    nombre:string;

    @IsString()
    @MinLength(1)
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    password:string

    @IsArray()
    @IsOptional()
    roles?:Roles[];

}
