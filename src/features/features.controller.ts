import { Controller, Get, Query } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesPipe } from './pipes/features.pipe';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  async findAll(@Query('bbox', FeaturesPipe) bbox: string): Promise<any> {
    return this.featuresService.findAll(bbox);
  }
}
