import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { PlatosCaliente } from "src/platos-calientes/entities/platos-caliente.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";


@Schema()
export class CarritoUsuario extends Document{

    @Prop({
        required:false,
        index: true,
        unique:true,
    })
    idCarrito: string;
    @Prop({
        required:true,
    })
    descripcion: string;
    @Prop({
        required:true,
    })
    cantidad: number;
    @Prop({
        required:true,
    })
    montoTotal: number;
    @Prop({
        required:true,
    })
    imagen: string;
    @Prop({
        required:true,
    })
    cantidadAOrdenar: string;

    @Prop({
        required:true,
    })
    tipoProducto:string;

    @Prop({
        type: Types.ObjectId,
        ref: 'Usuario',
        required: true,
      })
      idUsuario: Usuario | Types.ObjectId;

      @Prop({
        type: Types.ObjectId,
        ref: 'Platos-Caliente',
        required: true,
      })
      idProducto: PlatosCaliente | Types.ObjectId;
}

export const CarritoUsuarioSchema = SchemaFactory.createForClass( CarritoUsuario );
