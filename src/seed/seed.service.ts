import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  executedSeed() {
    return 'This action returns all seed';
  }
}
