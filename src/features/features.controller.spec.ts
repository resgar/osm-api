import { Test } from '@nestjs/testing';
import * as fs from 'fs';

import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { ExternalApiService } from './external-api.service';

describe('FeaturesController', () => {
  let controller: FeaturesController;
  let externalApiService: ExternalApiService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FeaturesController],
      providers: [FeaturesService, ExternalApiService],
    }).compile();

    controller = moduleRef.get<FeaturesController>(FeaturesController);
    externalApiService = moduleRef.get<ExternalApiService>(ExternalApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return GeoJSON data from the service', async () => {
    const bbox = '-122.4055,37.784,-122.4045,37.785';
    const mockGeoJsonData = fs.readFileSync(
      'src/__mocks__/features.json',
      'utf8',
    );
    const response = JSON.parse(mockGeoJsonData);
    jest
      .spyOn(externalApiService, 'fetchOsmData')
      .mockImplementation(async () => response);
    const result = await controller.findAll({ bbox });
    expect(result).toBeDefined();
  });
});
