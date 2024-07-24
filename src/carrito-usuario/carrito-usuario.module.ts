import { Module } from '@nestjs/common';
import { CarritoUsuarioService } from './carrito-usuario.service';
import { CarritoUsuarioController } from './carrito-usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarritoUsuario, CarritoUsuarioSchema } from './entities/carrito-usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { Usuario, UsuarioSchema } from 'src/usuario/entities/usuario.entity';
import { PlatosCalientesModule } from 'src/platos-calientes/platos-calientes.module';
import { PlatosCaliente, PlatosCalientesSchema } from 'src/platos-calientes/entities/platos-caliente.entity';



@Module({
  imports: [
    MongooseModule.forFeature([
      {
      name: CarritoUsuario.name,
      schema: CarritoUsuarioSchema,
    },
      {
      name: Usuario.name,
      schema: UsuarioSchema,
    },
      {
      name: PlatosCaliente.name,
      schema: PlatosCalientesSchema,
    },
  ]),
  UsuarioModule,
  PlatosCalientesModule,
],
  controllers: [CarritoUsuarioController],
  providers: [CarritoUsuarioService],
})
export class CarritoUsuarioModule {}
