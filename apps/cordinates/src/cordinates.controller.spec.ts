import { Test, TestingModule } from '@nestjs/testing';
import { CordinatesController } from './cordinates.controller';
import { CordinatesService } from './cordinates.service';

describe('CordinatesController', () => {
  let cordinatesController: CordinatesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CordinatesController],
      providers: [CordinatesService],
    }).compile();

    cordinatesController = app.get<CordinatesController>(CordinatesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cordinatesController.getHello()).toBe('Hello World!');
    });
  });
});
