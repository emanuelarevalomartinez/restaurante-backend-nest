import { Test, TestingModule } from '@nestjs/testing';
import { CarritoUsuarioController } from './carrito-usuario.controller';
import { CarritoUsuarioService } from './carrito-usuario.service';

describe('CarritoUsuarioController', () => {
  let controller: CarritoUsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarritoUsuarioController],
      providers: [CarritoUsuarioService],
    }).compile();

    controller = module.get<CarritoUsuarioController>(CarritoUsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
