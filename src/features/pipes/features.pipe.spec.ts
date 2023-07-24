// geo-jsons.pipe.spec.ts

import { BadRequestException } from '@nestjs/common';
import { FeaturesPipe } from './features.pipe';

describe('FeaturesPipe', () => {
  let pipe: FeaturesPipe;

  beforeEach(() => {
    pipe = new FeaturesPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should validate a valid bbox parameter', () => {
    const validBbox = '-122.41,37.78,-122.40,37.79';
    const result = pipe.transform(validBbox, {
      type: 'query',
      data: 'bbox',
    });

    expect(result).toBe(validBbox);
  });

  it('should throw BadRequestException for invalid bbox parameter', () => {
    const invalidBbox = 'invalid-bbox-format';
    expect(() =>
      pipe.transform(invalidBbox, {
        type: 'query',
        data: 'bbox',
      }),
    ).toThrowError(BadRequestException);
  });

  it('should pass through for non-bbox parameters', () => {
    const someOtherParameter = 'value';
    const result = pipe.transform(someOtherParameter, {
      type: 'query',
      data: 'someOtherParam',
    });

    expect(result).toBe(someOtherParameter);
  });
});
