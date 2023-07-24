import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ExternalApiService {
  async fetchOsmData(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new BadRequestException(
            'The latitudes must be between -90 and 90, longitudes between -180 and 180 and the minima must be less than the maxima.',
          );
        }

        throw new Error(
          `Failed to fetch data from the external API. Status: ${response.status}`,
        );
      }

      return response.json();
    } catch (error) {
      if (error.name === 'TypeError') {
        // Handle network errors (e.g., server not found, connection refused)
        throw new HttpException(
          'External server is not reachable',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      throw error;
    }
  }
}
