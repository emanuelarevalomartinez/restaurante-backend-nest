import { Module } from '@nestjs/common';
import { BebidasService } from './bebidas.service';
import { BebidasController } from './bebidas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bebida, BebidasSchema } from './entities/bebida.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name: Bebida.name,
      schema: BebidasSchema,
    }])
  ],
  controllers: [BebidasController],
  providers: [BebidasService],
  exports:[MongooseModule,BebidasService],
})
export class BebidasModule {}
