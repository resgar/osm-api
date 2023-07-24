import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { ExternalApiService } from './external-api.service';
import { FeaturesController } from './features.controller';

@Module({
  controllers: [FeaturesController],
  providers: [FeaturesService, ExternalApiService],
})
export class FeaturesModule {}
