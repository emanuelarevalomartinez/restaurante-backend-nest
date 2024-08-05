import { BadRequestException, Injectable, InternalServerErrorException, ParseUUIDPipe } from '@nestjs/common';
import { CreateCarritoUsuarioDto } from './dto/create-carrito-usuario.dto';
import { UpdateCarritoUsuarioDto } from './dto/update-carrito-usuario.dto';
import { Model } from 'mongoose';
import { CarritoUsuario } from './entities/carrito-usuario.entity';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as UUID } from 'uuid'
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { PlatosCaliente } from 'src/platos-calientes/entities/platos-caliente.entity';
import { Bebida } from 'src/bebidas/entities/bebida.entity';
import { PlatosFrio } from 'src/platos-frios/entities/platos-frio.entity';
import { Postre } from 'src/postres/entities/postre.entity';

@Injectable()
export class CarritoUsuarioService {

  constructor(

    @InjectModel( CarritoUsuario.name )
    private readonly carritoUsuarioModel: Model<CarritoUsuario>,
    
    @InjectModel( Usuario.name )
    private  readonly usuarioModel: Model<Usuario>,

    @InjectModel( PlatosCaliente.name )
    private readonly platosCalientesModel: Model<PlatosCaliente>,

    @InjectModel( PlatosFrio.name )
    private readonly platosFriosModel: Model<PlatosFrio>,

    @InjectModel( Bebida.name )
    private readonly bebidasModel: Model<Bebida>,

    @InjectModel( Postre.name )
    private readonly postresModel: Model<Postre>,
  ){

  }


  async crearCarritoCompra(idUsuario: string,idProducto: string,createCarritoUsuarioDto: CreateCarritoUsuarioDto) {

    let tipoProd: string ="";
    let idNuevoProducto:string ="";

    const findUser = await this.usuarioModel.findOne( { idUsuario: idUsuario } );
    const findPlatoCaliente = await this.platosCalientesModel.findOne( { id: idProducto } );
    const findPlatoFrio = await this.platosFriosModel.findOne( { idPlatoFrio: idProducto } );
    const findBebida = await this.bebidasModel.findOne( { idBebida: idProducto } );
    const findPostre = await this.postresModel.findOne( { idPostre: idProducto } );

    if( !findUser ){
       throw new BadRequestException(" User with idUser does not exist ");
    }

    if( findPlatoCaliente ){
      tipoProd ="Plato Caliente";
      idNuevoProducto= findPlatoCaliente.id;
    } 
    if( findPlatoFrio ){
      tipoProd ="Plato Frio";
      idNuevoProducto= findPlatoFrio.idPlatoFrio;
    } 
    if( findBebida ){
      tipoProd ="Bebida";
      idNuevoProducto = findBebida.idBebida;
    } 
    if( findPostre ){
      tipoProd ="Postre";
      idNuevoProducto = findPostre.idPostre;
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
       idProducto: idNuevoProducto,
       tipoProducto: tipoProd,
       fechaUltimaModificacion: new Date(),
     });
     return carritoUsuario;

    } catch (error) {
      throw new BadRequestException(`error al crear carrito ${error}`);
    }
  }

  async findAllCarritoCompra(idUsuario: string) {
  try {
        const allCarritos = await this.carritoUsuarioModel.find( { idUsuario: idUsuario } ).sort({ fechaUltimaModificacion: -1 });
    
     if( !allCarritos ){
         throw new BadRequestException("User id is not found");
     }

        return allCarritos;
  } catch (error) {
    throw new BadRequestException(`error al intentar encontrar los carritos ${error}`);
     
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
  async buscarUnCarroPorUsuario(idUsuario: string,idProducto: string) {
    try {

      const unCarrito = await this.carritoUsuarioModel.findOne(
        { idUsuario: idUsuario ,
          idProducto: idProducto,
        }
        );
      return unCarrito;
    } catch (error) {
      throw new BadRequestException(`Carrito with id${idUsuario} or ${idProducto} does nort exist`);
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
        {
          $set: { ...updateCarritoUsuarioDto, 
            fechaUltimaModificacion: new Date() },
        },
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
