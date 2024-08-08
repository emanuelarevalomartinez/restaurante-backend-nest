import { Module } from '@nestjs/common';
import { PostresService } from './postres.service';
import { PostresController } from './postres.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Postre, PostreSchema } from './entities/postre.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:Postre.name,
      schema:PostreSchema,
    }])
  ],
  controllers: [PostresController],
  providers: [PostresService],
  exports: [PostresService],
})
export class PostresModule {}
