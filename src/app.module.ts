import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlatosCalientesModule } from './platos-calientes/platos-calientes.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './usuario/usuario.module';
import { PlatosFriosModule } from './platos-frios/platos-frios.module';
import { BebidasModule } from './bebidas/bebidas.module';
import { PostresModule } from './postres/postres.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { ConfigModule } from '@nestjs/config';
import { CarritoUsuarioModule } from './carrito-usuario/carrito-usuario.module';
import { CorreosModule } from './correos/correos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
      MongooseModule.forRoot(`${process.env.DB_PROTOCOL}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`),
    PlatosCalientesModule,
    UsuarioModule,
    PlatosFriosModule,
    BebidasModule,
    PostresModule,
    NotificacionesModule,
    AutenticacionModule,
    CarritoUsuarioModule,
    CorreosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
