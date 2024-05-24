import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ProductResponse } from './interfaces/product-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  //this is dependency de axios en us project
  // axios only can be used once in a project and your value dont change then the asingment inicial is the best way to use it
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name) // this injectModel was made by nest team to inject model in this service
    private readonly x: Model<Pokemon>,
  ) {}

  // constructor() {
  //   // this could be replaced by a provider that allows to use axios throughout th project
  //   this.axios = axios.create();
  // }

  async executeSeed() {
    const { data } = await this.axios.get<ProductResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1&offset=0',
    );

    data.results.forEach(({ name, url }) => {
      // console.log({ name, url });
      // console.log(segments);
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      console.log({ name, no });
    });
    // use foreach to iterate over the data.results array and obtend the name and url of each element. it be usefull to insert database

    return data.results;
    // console.log(fetch);
    // return 'Seed executed';
  }
}
