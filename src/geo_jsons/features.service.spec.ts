import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesService } from './features.service';

describe('FeaturesService', () => {
  let service: FeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeaturesService],
    }).compile();

    service = module.get<FeaturesService>(FeaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch GeoJSON data for a given bbox', async () => {
    const bbox = '-122.4055,37.784,-122.4045,37.785';
    const geoJsonData = await service.findAll(bbox);
    expect(geoJsonData).toBeDefined();
  });

  it('should throw an error for an invalid bbox', async () => {
    const invalidBbox = 'invalid_bbox';
    await expect(service.findAll(invalidBbox)).rejects.toThrowError();
  });
});
