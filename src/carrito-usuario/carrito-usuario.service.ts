import { BadRequestException, Injectable, ParseUUIDPipe } from '@nestjs/common';
import { CreateCarritoUsuarioDto } from './dto/create-carrito-usuario.dto';
import { UpdateCarritoUsuarioDto } from './dto/update-carrito-usuario.dto';
import { Model } from 'mongoose';
import { CarritoUsuario } from './entities/carrito-usuario.entity';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as UUID } from 'uuid'
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class CarritoUsuarioService {

  constructor(

    @InjectModel( CarritoUsuario.name )
    private readonly carritoUsuarioModel: Model<CarritoUsuario>,
    
    @InjectModel( Usuario.name )
    private  readonly usuarioModel: Model<Usuario>,
  ){

  }


  async create(idUsuario: ParseUUIDPipe,createCarritoUsuarioDto: CreateCarritoUsuarioDto) {
    try {

      const findUser = await this.usuarioModel.findOne( { id: idUsuario } );

      if( !findUser ){
         throw new BadRequestException(" User with that id does not exist ");
      }

      const { idCarrito,...createCarritoU } = createCarritoUsuarioDto;

     const carritoUsuario = await this.carritoUsuarioModel.create({
       ...createCarritoU,
       idCarrito: UUID(),
       usuario: findUser.id,
     });
     return carritoUsuario;

    } catch (error) {
      console.log("error al crear carrito");
    }
  }

  findAll() {
    return `This action returns all carritoUsuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carritoUsuario`;
  }

  update(id: number, updateCarritoUsuarioDto: UpdateCarritoUsuarioDto) {
    return `This action updates a #${id} carritoUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} carritoUsuario`;
  }
}
