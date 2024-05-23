import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ProductResponse } from './interfaces/product-response.interface';

@Injectable()
export class SeedService {
  //this is dependency de axios en us project
  // axios only can be used once in a project and your value dont change then the asingment inicial is the best way to use it
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  async executeSeed() {
    const { data } = await this.axios.get<ProductResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650&offset=0',
    );
    return data.results[0].name;
    // console.log(fetch);
    // return 'Seed executed';
  }
}
