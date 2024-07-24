import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginUserDto {
    

    id:string;

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
    password:string;
}