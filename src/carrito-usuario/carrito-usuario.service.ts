import { BadRequestException, Injectable, InternalServerErrorException, ParseUUIDPipe } from '@nestjs/common';
import { CreateCarritoUsuarioDto } from './dto/create-carrito-usuario.dto';
import { UpdateCarritoUsuarioDto } from './dto/update-carrito-usuario.dto';
import { Model } from 'mongoose';
import { CarritoUsuario } from './entities/carrito-usuario.entity';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as UUID } from 'uuid'
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { PlatosCaliente } from 'src/platos-calientes/entities/platos-caliente.entity';

@Injectable()
export class CarritoUsuarioService {

  constructor(

    @InjectModel( CarritoUsuario.name )
    private readonly carritoUsuarioModel: Model<CarritoUsuario>,
    
    @InjectModel( Usuario.name )
    private  readonly usuarioModel: Model<Usuario>,

    @InjectModel( PlatosCaliente.name )
    private readonly platosCalientesModel: Model<PlatosCaliente>,
  ){

  }


  async crearCarritoCompra(idUsuario: string,idProducto: string,createCarritoUsuarioDto: CreateCarritoUsuarioDto) {

    let tipoProd: string ="";

    const findUser = await this.usuarioModel.findOne( { idUsuario: idUsuario } );
    const findProducto = await this.platosCalientesModel.findOne( { id: idProducto } );

    if( !findUser ){
       throw new BadRequestException(" User with idUser does not exist ");
    }

    if( findProducto ){
      tipoProd ="Plato Caliente";
    }

    const updateUsuario = await this.usuarioModel.updateOne(
      { idUsuario: findUser.idUsuario },
      { $push: { carritos: createCarritoUsuarioDto } }
    );

    if( !updateUsuario ){
        throw new BadRequestException("The user can not update is shop-car");
    }

    try {
     const { ...createCarritoU } = createCarritoUsuarioDto;

     const carritoUsuario = await this.carritoUsuarioModel.create({
       ...createCarritoU,
       idCarrito: UUID(),
       idUsuario: findUser.idUsuario,
       idProducto: findProducto.id,
       tipoProducto: tipoProd,
     });
     return carritoUsuario;

    } catch (error) {
      console.log(`error al crear carrito ${error}`);
    }
  }

  async findAllCarritoCompra(idUsuario: string) {
  try {
        const allCarritos = await this.carritoUsuarioModel.find( { idUsuario: idUsuario } );
    
     if( !allCarritos ){
         throw new BadRequestException("User id is not found");
     }

        return allCarritos;
  } catch (error) {
    console.log(`error al intentar encontrar los carritos ${error}`);
     
  }
  }

  async buscarUnCarrito(idCarrito: string) {
    try {

      const unCarrito = await this.carritoUsuarioModel.findOne({ idCarrito: idCarrito });
      return unCarrito;
    } catch (error) {
      throw new BadRequestException(`Carrito with id${idCarrito} does nort exist`);
    }
  }

  // async actualizarCarrito(idUsuario: string,idProducto: string, updateCarritoUsuarioDto: UpdateCarritoUsuarioDto) {
  //   try {
  //       const carritoAActualizar = await this.carritoUsuarioModel.findOneAndUpdate(
  //         { 
  //           idUsuario: idUsuario ,
  //           idProducto: idProducto,
  //         },
  //         updateCarritoUsuarioDto,
  //         { new: true }
  //       );
  
  //       if (!carritoAActualizar) {
  //         throw new BadRequestException('El carrito a actualizar no fue encontrado');
  //       }
  
  //       return carritoAActualizar;

  //   } catch (error) {
  //       console.log(`error al actualizar el carrito ${error}`);
        
  //   }
  // }

  async actualizarCarrito(idUsuario: string, idProducto: string, updateCarritoUsuarioDto: UpdateCarritoUsuarioDto) {
    try {
      const carritoAActualizar = await this.carritoUsuarioModel.findOneAndUpdate(
        { 
          idUsuario: idUsuario,
          idProducto: idProducto,
        },
        updateCarritoUsuarioDto,
        { new: true }
      );
  
      if (!carritoAActualizar) {
        throw new BadRequestException('El carrito a actualizar no fue encontrado');
      }
  
      return carritoAActualizar;
    } catch (error) {
      console.error(`Error al actualizar el carrito: ${error.message}`);
      throw new InternalServerErrorException('Error al actualizar el carrito');
    }
  }
  

  async removeCarritoCompraViaUsuario(idUsuario: string,idProducto: string) {

    const { deletedCount } = await this.carritoUsuarioModel.deleteOne(
      {
      idUsuario: idUsuario,
      idProducto: idProducto,
      }
      );
    if(deletedCount == 0){
      throw new BadRequestException(`Shop-car ${idUsuario} or ${idProducto} no encontrado`);
   }
   return;
  }
  async removeCarritoCompra(idCarrito: string) {

    const { deletedCount } = await this.carritoUsuarioModel.deleteOne(
      {
      idCarrito: idCarrito,
      }
      );
    if(deletedCount == 0){
      throw new BadRequestException(`Shop-car ${idCarrito} no encontrado`);
   }
   return;
  }
}
