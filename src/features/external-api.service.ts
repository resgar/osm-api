import { Injectable } from '@nestjs/common';

@Injectable()
export class ExternalApiService {
  async fetchOsmData(url: string): Promise<any> {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from the external API. Status: ${response.status}`,
      );
    }

    return response.json();
  }
}
