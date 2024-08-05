import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


  @Schema()
  export class PlatosFrio extends Document{

    @Prop({
        index: true,
        unique: true,
    })
    idPlatoFrio:string;

    @Prop({
      isRequired: true,  
      unique:true,
    })
    descripcionPlatoFrio:string;

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

export const PlatoFrioSchema = SchemaFactory.createForClass( PlatosFrio );
