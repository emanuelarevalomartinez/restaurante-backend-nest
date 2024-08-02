import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostreDto } from './dto/create-postre.dto';
import { UpdatePostreDto } from './dto/update-postre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Postre } from './entities/postre.entity';
import { Model } from 'mongoose';
import { v4 as UUID } from 'uuid'

@Injectable()
export class PostresService {

constructor(
  @InjectModel(Postre.name)
  private readonly postresModule: Model<Postre>,
){

}

  async create(createPostreDto: CreatePostreDto) {
   try {
      const nuevoPostre = await this.postresModule.create({
        idPostre: UUID(),
        ...createPostreDto,
      })
      return nuevoPostre;
   } catch (error) {
        throw new BadRequestException(`Nuevo postre no pudo ser creado ${error}`);
   }
  }

  async findAll() {
    try {
      return await this.postresModule.find().select({
        _id: 0,
        __v:0,
      })
      .then( postres=> {
        const postresConImagenes = postres.filter( postre=> postre.imagenAsociada && typeof postre.imagenAsociada === "string" );
          return postresConImagenes.map(postre => ({
         ...postre.toObject(),
          imagenAsociada: `http://localhost:3000/images/postres/${postre.imagenAsociada}`
        }));
      } )
    } catch (error) {
      throw new BadRequestException("All postres can not find");
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} postre`;
  }

  update(id: number, updatePostreDto: UpdatePostreDto) {
    return `This action updates a #${id} postre`;
  }

  remove(id: number) {
    return `This action removes a #${id} postre`;
  }
}
