import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, ParseUUIDPipe, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './entities/usuario.entity';
import { Model } from 'mongoose';
import { Roles } from './interfaces';
import * as bycrypt from 'bcrypt'
import { v4 as UUID } from 'uuid'
import { LoginResponse, LoginUserDto, RegisterUserResponse, RegisterUserResponseExist, UsuarioUpdate, UsuarioUpdateError } from './dto';
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

  async register(createUsuarioDto: CreateUsuarioDto): Promise<RegisterUserResponse | RegisterUserResponseExist> {

    try {

     const { nombre, email,password,...datosDeUsuarioDto } = createUsuarioDto;

      this.validateRoles(createUsuarioDto.roles);

      const verificarUnsuarioExiste = await this.usuarioModel.findOne( { nombre:  nombre } );


       if(verificarUnsuarioExiste){
        if(verificarUnsuarioExiste.nombre == nombre){

          return {
            usuarioExiste: true,
            emailExiste:false,
          };
        }
       } else {

         const verificarEmailExiste = await this.usuarioModel.findOne( { email: email } );
  
         if(verificarEmailExiste){
            if(verificarEmailExiste.email == email){
              return {
                usuarioExiste: false,
                emailExiste: true,
              }
            }
         }
       }



      const usuario = await this.usuarioModel.create({
        ...datosDeUsuarioDto,
        nombre: nombre,
        email: email,
        idUsuario: UUID(),
        password: bycrypt.hashSync( password, 10 )
      });
      return {
        nombre: usuario.nombre,
        email: usuario.email,
        token: this.getJwToken( { id: usuario.idUsuario } ),
      };
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {

    const {  password } = loginUserDto;
    
    const usuario = await this.usuarioModel.findOne({
      email: loginUserDto.email,
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas').getResponse();
    }

    if( !bycrypt.compareSync( password, usuario.password ) ){
      throw new UnauthorizedException('Credenciales no son validad ( password) ').getResponse();
    }

    return {
      idUsuario: usuario.idUsuario,
      nombre: usuario.nombre,
      email: usuario.email,
      token: this.getJwToken( { id: usuario.idUsuario } ),
    };
  }

  async findAllUsuario() {
    return await this.usuarioModel.find().lean();
  }

  async findOneUsuario(idUsuario: ParseUUIDPipe) {

    const user = await this.usuarioModel.findOne( { idUsuario } ).lean()

    if(!user){
      return new NotFoundException(`User with that id ${idUsuario} does not exist`).getResponse();
    } else {
      const { _id, __v, ...rest } = user;
      return rest;
    }

  }


  async updateUsuario(idUsuario: ParseUUIDPipe, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioUpdate | UsuarioUpdateError> {
    const actualizarUsuario = await this.usuarioModel.findOne( {idUsuario:idUsuario} );

    if(!actualizarUsuario){
     throw new BadRequestException("User  with that id can not update, does not exist")
    }

    this.validateRoles(updateUsuarioDto.roles);

    const { nombre, password, email, newPassword, ...updates } = updateUsuarioDto;

    if(nombre){
      const findUserName = await this.usuarioModel.findOne( { nombre: nombre  } );

       if(findUserName){
        return {
          nombreExiste:true,
          emailExiste:false,
          passwordIncorrecta:false,
        }
       }
    }

    if(email){
      const findUseEmail = await this.usuarioModel.findOne( { email: email  } );

       if(findUseEmail){
        return {
          nombreExiste:false,
          emailExiste:true,
          passwordIncorrecta:false,
        }
       }
    }

    if(password){
      if( !bycrypt.compareSync( password, actualizarUsuario.password ) ){
        return {
          nombreExiste:false,
          emailExiste:false,
          passwordIncorrecta:true,
        }
      }
    }

    let nuevaContraseña:string;
    if (newPassword) {
        nuevaContraseña = bycrypt.hashSync(newPassword, 10);
    }

    const updateData: UpdateUsuarioDto = { ...updates };
    if (nombre) updateData.nombre = nombre;
    if (email) updateData.email = email;
    if (nuevaContraseña) updateData.password = nuevaContraseña;

    try {
        const usuarioActualizado = await this.usuarioModel.findOneAndUpdate(
            { idUsuario },
            { $set: updateData },
            { new: true },
        );
        return {
            nombre: usuarioActualizado.nombre,
            email: usuarioActualizado.email,
        };
      } catch (error) {
        this.handleDatabaseError(error);
      }

  }

  async removeUsuario(idUsuario: ParseUUIDPipe) {

   await this.carritoModel.deleteMany({ idUsuario: idUsuario });

    const { deletedCount } = await this.usuarioModel.deleteOne({ idUsuario: idUsuario });
    if(deletedCount == 0){
       throw new NotFoundException(`User whit id: ${idUsuario} not found`);
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
