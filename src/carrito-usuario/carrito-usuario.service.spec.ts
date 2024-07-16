import { Test, TestingModule } from '@nestjs/testing';
import { CarritoUsuarioService } from './carrito-usuario.service';

describe('CarritoUsuarioService', () => {
  let service: CarritoUsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarritoUsuarioService],
    }).compile();

    service = module.get<CarritoUsuarioService>(CarritoUsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
