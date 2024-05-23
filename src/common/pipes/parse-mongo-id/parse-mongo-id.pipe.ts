import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  // the pipes transform phisically changes the value
  transform(value: string, metadata: ArgumentMetadata) {
    // console.log({ value, metadata });
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} is not a valid mongoId`);
    }
    return value.toUpperCase();
  }
}
// this sure that all must be mongoid when coming to the controller, comin from the client url
