import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class PlatosCaliente extends Document {

    @Prop({
        index: true,
        unique: true,
    })
    id:number;

    @Prop({
      isRequired: true,  
    })
    descripcionPlato:string;

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

export const PlatosCalientesSchema = SchemaFactory.createForClass( PlatosCaliente )
