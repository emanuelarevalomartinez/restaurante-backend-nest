import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, ParseUUIDPipe, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './entities/usuario.entity';
import { Model } from 'mongoose';
import { Roles } from './interfaces';
import * as bycrypt from 'bcrypt'
import { v4 as UUID } from 'uuid'
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {


 constructor(
  @InjectModel( Usuario.name ) 
  private  readonly usuarioModel: Model<Usuario>,

  private readonly jwtService: JwtService,
 ){

 }

  async register(createUsuarioDto: CreateUsuarioDto) {
    try {

     const {  password,...datosDeUsuarioDto } = createUsuarioDto;

      this.validateRoles(createUsuarioDto.roles);
      const usuario = await this.usuarioModel.create({
        ...datosDeUsuarioDto,
        id: UUID(),
        password: bycrypt.hashSync( password, 10 )
      });
      return usuario;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {

    const {  password } = loginUserDto;
    
    const usuario = await this.usuarioModel.findOne({
      nombre: loginUserDto.nombre,
      email: loginUserDto.email,
      // password: loginUserDto.password
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas').getResponse();
    }

    // if( !bycrypt.compareSync( password, usuario.password ) ){
    //   throw new UnauthorizedException('Credenciales no son validad ( password) ').getResponse();
    // }

   

    return usuario;
  }

  async findAll() {
    return await this.usuarioModel.find().lean();
  }

  async findOne(id: ParseUUIDPipe) {

    const user = await this.usuarioModel.findOne( { id } ).lean()

    if(!user){
      return new NotFoundException(`User with that id ${id} does not exist`).getResponse();
    } else {
      const { _id, __v, ...rest } = user;
      return rest;
    }

  }


  async update(id: ParseUUIDPipe, updateUsuarioDto: UpdateUsuarioDto) {
    const nuevoUsuario = await this.usuarioModel.findOne( {id:id} );

    if(!nuevoUsuario){
     return new BadRequestException("User  with that id can not update, does not exist")
    }

    this.validateRoles(updateUsuarioDto.roles);

      try {
        await nuevoUsuario.updateOne(updateUsuarioDto);
        return { ...nuevoUsuario.toObject(), ...updateUsuarioDto };
      } catch (error) {
        this.handleDatabaseError(error);
      }

  }

  async remove(id: ParseUUIDPipe) {
    const { deletedCount } = await this.usuarioModel.deleteOne({ id: id });
    if(deletedCount == 0){
       throw new NotFoundException(`User whit id: ${id} not found`);
    }
    return;
  }


  private getJwToken( payload: JwtPayload ){
      const token = this.jwtService.sign( payload );
      return token;
  }

  private validateRoles(roles?: Roles[]): void {
    if (roles) {
      for (const rol of roles) {
        if (![Roles.administrador, Roles.superUsuario, Roles.usuario].includes(rol)) {
          throw new BadRequestException('User with an unauthorized role');
        }
      }
    }
  }

  private handleDatabaseError(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException(`User exists in the database ${JSON.stringify(error.keyValue)}`);
    } else {
      throw new InternalServerErrorException("Can't process the request");
    }
  }
}
