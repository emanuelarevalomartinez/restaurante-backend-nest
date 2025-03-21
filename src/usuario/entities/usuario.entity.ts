import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Roles } from "../interfaces";
import { CarritoUsuario } from "src/carrito-usuario/entities/carrito-usuario.entity";


@Schema()
export class Usuario extends Document {

    @Prop({
        index: true,
        unique: true,
        isRequired: true,
    })
    idUsuario:string;

    @Prop({
        isRequired: true,
        unique: true,
    })
    nombre:string;

    @Prop({
        isRequired: true,
    })
    email:string

    @Prop({
        isRequired: true,
    })
    password:string;

    @Prop({
        isRequired: false,
        default: Roles.user,
    })
    roles?:Roles[];
    
}

export const UsuarioSchema = SchemaFactory.createForClass( Usuario );
 