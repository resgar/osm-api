import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FeaturesPipe implements PipeTransform {
  private bboxPattern =
    /^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query' || metadata.data !== 'bbox') {
      // The pipe is meant to validate the 'bbox' query parameter only
      return value;
    }

    const bbox = String(value);
    if (!bbox.match(this.bboxPattern)) {
      throw new BadRequestException('Invalid bbox parameter');
    }

    return value;
  }
}
