import { Module } from '@nestjs/common';
import { PlatosCalientesService } from './platos-calientes.service';
import { PlatosCalientesController } from './platos-calientes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatosCaliente, PlatosCalientesSchema } from './entities/platos-caliente.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  controllers: [PlatosCalientesController],
  providers: [PlatosCalientesService],
  imports: [
    UsuarioModule,
    MongooseModule.forFeature([
      {
        name: PlatosCaliente.name,
        schema: PlatosCalientesSchema,
      }
    ]),
  ],
  exports: [MongooseModule,PlatosCalientesService],
})
export class PlatosCalientesModule {}
