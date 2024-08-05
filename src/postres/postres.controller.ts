import { Controller, Get, Post, Body, Patch, Param, Delete, ParseBoolPipe } from '@nestjs/common';
import { PostresService } from './postres.service';
import { CreatePostreDto } from './dto/create-postre.dto';
import { UpdatePostreDto } from './dto/update-postre.dto';

@Controller('postres')
export class PostresController {
  constructor(private readonly postresService: PostresService) {}

  @Post()
  create(@Body() createPostreDto: CreatePostreDto) {
    return this.postresService.create(createPostreDto);
  }

  @Get(':ordenAsc?')
  findAll(
    @Param('ordenAsc', new ParseBoolPipe({ optional: true })) ordenAsc?: boolean
    ) {
    return this.postresService.findAll(ordenAsc);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postresService.findOne(+id);
  }

  @Patch(':idPostre')
  update(
    @Param('idPostre') idPostre: string,
     @Body() updatePostreDto: UpdatePostreDto
     ) {
    return this.postresService.update(idPostre, updatePostreDto);
  }

  @Patch('updateWhitPostre/:idPostre/:cantidad')
  updateWhitPedido(
    @Param('idPostre') idPostre: string,
    @Param('cantidad') cantidad: number,
     ) {
    return this.postresService.updateByPedido(idPostre, cantidad);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postresService.remove(+id);
  }
}
