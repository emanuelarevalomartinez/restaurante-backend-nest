import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema( { collection: "notificaciones"} )
export class Notificacion extends Document{

    @Prop({
        required:true,
    })
    idNotificacion:string;
    @Prop({
        required:true,
    })
    idUsuario:string;
    @Prop({
        required:true,
    })
    tipo:string;
    @Prop({
        required:true,
    })
    mensaje:string;
    @Prop({
        required:true,
    })
    fecha:string;
    @Prop({
        required:true,
    })
    hora:string;
    @Prop({
        required:true,
        default: Date.now,
    })
    fechaActual:Date;

}

export const SchemaNotificacion = SchemaFactory.createForClass( Notificacion );
