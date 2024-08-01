import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Bebida extends Document{

    @Prop({
        index: true,
        unique: true,
    })
    idBebida:string;

    @Prop({
      isRequired: true,  
    })
    descripcionBebida:string;

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

export const BebidasSchema = SchemaFactory.createForClass( Bebida );
