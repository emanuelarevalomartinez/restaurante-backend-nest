import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";


export const GetUser = createParamDecorator( 
    ( data, ctx: ExecutionContext )=> {
     const req = ctx.switchToHttp().getRequest();
     const usuario = req.user;

     if( !usuario ){
        throw new InternalServerErrorException("User not found (request) ");
     }

     return usuario;
} )