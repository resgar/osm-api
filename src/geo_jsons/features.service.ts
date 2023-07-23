import { Injectable } from '@nestjs/common';
import * as osmtogeojson from 'osmtogeojson';

@Injectable()
export class FeaturesService {
  async findAll(bbox: string): Promise<any> {
    try {
      const osmData = await this.fetchOsmData(bbox);
      const osmJsonData = JSON.parse(osmData);
      const geoJsonData = osmtogeojson(osmJsonData);
      return geoJsonData;
    } catch (error) {
      throw new Error('Error fetching or converting data.');
    }
  }

  private async fetchOsmData(bbox: string): Promise<any> {
    const url = `https://www.openstreetmap.org/api/0.6/map?bbox=${bbox}`;
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from OpenStreetMap API.');
    }

    const data = await response.text();

    return data;
  }
}
