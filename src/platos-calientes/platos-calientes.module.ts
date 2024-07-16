import { Module } from '@nestjs/common';
import { PlatosCalientesService } from './platos-calientes.service';
import { PlatosCalientesController } from './platos-calientes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatosCaliente, PlatosCalientesSchema } from './entities/platos-caliente.entity';

@Module({
  controllers: [PlatosCalientesController],
  providers: [PlatosCalientesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: PlatosCaliente.name,
        schema: PlatosCalientesSchema,
      }
    ]),
  ],
})
export class PlatosCalientesModule {}
