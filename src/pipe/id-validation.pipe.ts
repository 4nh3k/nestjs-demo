import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
@Injectable()
export class IDValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      metadata.type === 'param' &&
      metadata.metatype === String &&
      Types.ObjectId.isValid(value)
    ) {
      return value;
    } else {
      throw new BadRequestException('Invalid ObjectID');
    }
  }
}
