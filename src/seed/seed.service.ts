import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class SeedService {
  //this is dependency de axios en us project
  // axios only can be used once in a project and your value dont change then the asingment inicial is the best way to use it
  private readonly axios: AxiosInstance;

  executedSeed() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=650&offset=0');
    return 'This action returns all seed';
  }
}
