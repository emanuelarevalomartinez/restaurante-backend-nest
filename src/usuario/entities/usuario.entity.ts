import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Roles } from "../interfaces";


@Schema()
export class Usuario extends Document {

    @Prop({
        index: true,
        unique: true,
        isRequired: true,
    })
    id:string;

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
        default: Roles.usuario,
    })
    roles?:Roles[];
}

export const UsuarioSchema = SchemaFactory.createForClass( Usuario );
 