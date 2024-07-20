import { Module } from '@nestjs/common';
import { CarritoUsuarioService } from './carrito-usuario.service';
import { CarritoUsuarioController } from './carrito-usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarritoUsuario, CarritoUsuarioSchema } from './entities/carrito-usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { Usuario, UsuarioSchema } from 'src/usuario/entities/usuario.entity';



@Module({
  imports: [
    MongooseModule.forFeature([
      {
      name: CarritoUsuario.name,
      schema: CarritoUsuarioSchema,
    },
  ]),
  UsuarioModule,
],
  controllers: [CarritoUsuarioController],
  providers: [CarritoUsuarioService],
})
export class CarritoUsuarioModule {}
