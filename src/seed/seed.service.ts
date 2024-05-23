import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SeedService {
  executedSeed() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=650&offset=0');
    return 'This action returns all seed';
  }
}
