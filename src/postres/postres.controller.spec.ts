import { Test, TestingModule } from '@nestjs/testing';
import { PostresController } from './postres.controller';
import { PostresService } from './postres.service';

describe('PostresController', () => {
  let controller: PostresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostresController],
      providers: [PostresService],
    }).compile();

    controller = module.get<PostresController>(PostresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
