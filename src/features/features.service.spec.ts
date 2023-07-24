import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { server } from '../mocks/server';
import { FeaturesService } from './features.service';
import { ExternalApiService } from './external-api.service';

beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

describe('FeaturesService', () => {
  let service: FeaturesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FeaturesService, ExternalApiService],
    }).compile();

    service = moduleRef.get<FeaturesService>(FeaturesService);
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
    await expect(service.findAll(invalidBbox)).rejects.toThrowError(
      BadRequestException,
    );
  });

  it('should throw bad request error for too large bbox area', async () => {
    const invalidBbox = '-122.4296875,-89.999993,-122.4196875,-89.999999';
    await expect(service.findAll(invalidBbox)).rejects.toThrowError(
      BadRequestException,
    );
  });
});
