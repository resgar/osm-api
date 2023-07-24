import { Injectable } from '@nestjs/common';
import * as osmtogeojson from 'osmtogeojson';
import { ExternalApiService } from './external-api.service';

@Injectable()
export class FeaturesService {
  constructor(private readonly externalApiService: ExternalApiService) {}

  async findAll(bbox: string): Promise<any> {
    try {
      const osmApiUrl = `https://www.openstreetmap.org/api/0.6/map?bbox=${bbox}`;
      const osmData = await this.externalApiService.fetchOsmData(osmApiUrl);
      const geoJsonData = osmtogeojson(osmData);
      return geoJsonData;
    } catch (error) {
      throw new Error('Error fetching or converting data.');
    }
  }
}
