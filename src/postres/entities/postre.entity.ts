import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

 @Schema()
export class Postre extends Document{

    @Prop({
        index: true,
        unique: true,
    })
    idPostre:string;

    @Prop({
      isRequired: true,  
      unique:true,
    })
    descripcionPostre:string;

    @Prop({
        isRequired: true,  
      })
    precio:number;

    @Prop({
        isRequired: true,  
      })
    cantRestante:number;

    @Prop({
        isRequired: true,  
      })
    imagenAsociada:string;

}

export const PostreSchema = SchemaFactory.createForClass( Postre );
