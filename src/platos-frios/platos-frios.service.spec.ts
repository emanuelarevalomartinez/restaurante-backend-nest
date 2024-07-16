import { Test, TestingModule } from '@nestjs/testing';
import { PlatosFriosService } from './platos-frios.service';

describe('PlatosFriosService', () => {
  let service: PlatosFriosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatosFriosService],
    }).compile();

    service = module.get<PlatosFriosService>(PlatosFriosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
