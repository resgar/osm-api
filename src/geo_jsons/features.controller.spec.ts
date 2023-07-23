import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';

describe('FeaturesController', () => {
  let controller: FeaturesController;
  let service: FeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeaturesController],
      providers: [FeaturesService],
    }).compile();

    controller = module.get<FeaturesController>(FeaturesController);
    service = module.get<FeaturesService>(FeaturesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getGeoJson service method with the provided bbox', async () => {
    const bbox = '-122.4055,37.784,-122.4045,37.785';
    const spy = jest.spyOn(service, 'findAll');
    await controller.findAll({ bbox });
    expect(spy).toHaveBeenCalledWith(bbox);
  });

  it('should return GeoJSON data from the service', async () => {
    const bbox = '-122.4055,37.784,-122.4045,37.785';
    const geoJsonData = {};
    jest.spyOn(service, 'findAll').mockResolvedValue(geoJsonData);
    const result = await controller.findAll({ bbox });
    expect(result).toBe(geoJsonData);
  });
});
