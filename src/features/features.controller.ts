import { Controller, Get, Query } from '@nestjs/common';
import { FeaturesService } from './features.service';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  async findAll(@Query() query: { bbox: string }): Promise<any> {
    return this.featuresService.findAll(query.bbox);
  }
}
