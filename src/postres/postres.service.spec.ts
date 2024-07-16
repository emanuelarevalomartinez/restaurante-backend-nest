import { Test, TestingModule } from '@nestjs/testing';
import { PostresService } from './postres.service';

describe('PostresService', () => {
  let service: PostresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostresService],
    }).compile();

    service = module.get<PostresService>(PostresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
