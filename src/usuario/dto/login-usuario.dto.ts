import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginUserDto {
    

    idUsuario:string;

   

    @IsString()
    @MinLength(1)
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    password:string;
}