import { Test } from '@nestjs/testing';
import * as fs from 'fs';

import { FeaturesService } from './features.service';
import { ExternalApiService } from './external-api.service';

describe('FeaturesService', () => {
  let service: FeaturesService;
  let externalApiService: ExternalApiService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FeaturesService, ExternalApiService],
    }).compile();

    service = moduleRef.get<FeaturesService>(FeaturesService);
    externalApiService = moduleRef.get<ExternalApiService>(ExternalApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch GeoJSON data for a given bbox', async () => {
    const bbox = '-122.4055,37.784,-122.4045,37.785';
    const mockGeoJsonData = fs.readFileSync(
      'src/__mocks__/features.json',
      'utf8',
    );

    jest
      .spyOn(externalApiService, 'fetchOsmData')
      .mockImplementation(async () => JSON.parse(mockGeoJsonData));

    const geoJsonData = await service.findAll(bbox);
    expect(geoJsonData).toBeDefined();
  });

  it('should throw an error for an invalid bbox', async () => {
    const invalidBbox = 'invalid_bbox';
    await expect(service.findAll(invalidBbox)).rejects.toThrowError();
  });
});
