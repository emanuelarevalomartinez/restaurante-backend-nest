import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Usuario } from "../entities/usuario.entity";
import { JwtPayload } from "../interfaces/jwt.payload";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwTokenStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectModel( Usuario.name ) 
         private usuarioModel: Model<Usuario>,
         configService: ConfigService,
    ){
       super({
        secretOrKey: configService.get("JWT_SECRET"),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
       })
    }
     
   async validate( payload: JwtPayload ) :Promise<Usuario> {

    const { id } = payload;

    const usuario = await this.usuarioModel.findOne({ id });

    if( !usuario ){
       throw new UnauthorizedException(" Token no valido ");
    }

     return usuario;
   }

}