import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { Roles } from '../interfaces';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

 @IsString()
 @IsOptional()
 @MinLength(1)
 @IsNotEmpty()
 nombre?:string;

 @IsString()
 @IsOptional()
 @MinLength(1)
 @IsEmail()
 email?:string;

 @IsString()
 @IsOptional()
 @MinLength(1)
 @IsNotEmpty()
 password?:string;

 @IsArray()
 @IsOptional()
 roles?:Roles[];

}
