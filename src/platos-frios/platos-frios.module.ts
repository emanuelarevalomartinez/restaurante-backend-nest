import { Module } from '@nestjs/common';
import { PlatosFriosService } from './platos-frios.service';
import { PlatosFriosController } from './platos-frios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatoFrioSchema, PlatosFrio } from './entities/platos-frio.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:PlatosFrio.name,
      schema: PlatoFrioSchema,
    }])
  ],
  controllers: [PlatosFriosController],
  providers: [PlatosFriosService],
  exports: [PlatosFriosService],
})
export class PlatosFriosModule {}
