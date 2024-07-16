import { Test, TestingModule } from '@nestjs/testing';
import { PlatosFriosController } from './platos-frios.controller';
import { PlatosFriosService } from './platos-frios.service';

describe('PlatosFriosController', () => {
  let controller: PlatosFriosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatosFriosController],
      providers: [PlatosFriosService],
    }).compile();

    controller = module.get<PlatosFriosController>(PlatosFriosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
