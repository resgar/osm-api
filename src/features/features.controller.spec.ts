import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { server } from '../mocks/server';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { ExternalApiService } from './external-api.service';

beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

describe('FeaturesController', () => {
  let controller: FeaturesController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FeaturesController],
      providers: [FeaturesService, ExternalApiService],
    }).compile();

    controller = moduleRef.get<FeaturesController>(FeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return GeoJSON data from the service', async () => {
    const bbox = '-122.4055,37.784,-122.4045,37.785';
    const result = await controller.findAll(bbox);
    expect(result).toBeDefined();
  });

  it('should throw BadRequestException for an invalid bbox', async () => {
    const invalidBbox = 'invalid-bbox-format';

    await expect(controller.findAll(invalidBbox)).rejects.toThrow(
      BadRequestException,
    );
  });
});
