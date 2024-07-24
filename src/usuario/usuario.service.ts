import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, ParseUUIDPipe, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './entities/usuario.entity';
import { Model } from 'mongoose';
import { Roles } from './interfaces';
import * as bycrypt from 'bcrypt'
import { v4 as UUID } from 'uuid'
import { LoginResponse, LoginUserDto, RegisterUserResponse } from './dto';
import { JwtPayload } from './interfaces/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { CarritoUsuario } from 'src/carrito-usuario/entities/carrito-usuario.entity';

@Injectable()
export class UsuarioService {


 constructor(
  @InjectModel( Usuario.name ) 
  private  readonly usuarioModel: Model<Usuario>,
  @InjectModel( CarritoUsuario.name ) 
  private  readonly carritoModel: Model<CarritoUsuario>,

  private readonly jwtService: JwtService,
 ){

 }

  async register(createUsuarioDto: CreateUsuarioDto): Promise<RegisterUserResponse> {
    try {

     const {  password,...datosDeUsuarioDto } = createUsuarioDto;

      this.validateRoles(createUsuarioDto.roles);
      const usuario = await this.usuarioModel.create({
        ...datosDeUsuarioDto,
        id: UUID(),
        password: bycrypt.hashSync( password, 10 )
      });
      return {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        token: this.getJwToken( { id: usuario.id } ),
      };
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {

    const {  password } = loginUserDto;
    
    const usuario = await this.usuarioModel.findOne({
      nombre: loginUserDto.nombre,
      email: loginUserDto.email,
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas').getResponse();
    }

    if( !bycrypt.compareSync( password, usuario.password ) ){
      throw new UnauthorizedException('Credenciales no son validad ( password) ').getResponse();
    }

    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: this.getJwToken( { id: usuario.id } ),
    };
  }

  async findAllUsuario() {
    return await this.usuarioModel.find().lean();
  }

  async findOneUsuario(id: ParseUUIDPipe) {

    const user = await this.usuarioModel.findOne( { id } ).lean()

    if(!user){
      return new NotFoundException(`User with that id ${id} does not exist`).getResponse();
    } else {
      const { _id, __v, ...rest } = user;
      return rest;
    }

  }


  async updateUsuario(id: ParseUUIDPipe, updateUsuarioDto: UpdateUsuarioDto) {
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

  async removeUsuario(id: ParseUUIDPipe) {

   await this.carritoModel.deleteMany({ idUsuario: id });

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
        if (![Roles.admin, Roles.superU, Roles.user].includes(rol)) {
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
