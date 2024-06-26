import { Injectable } from '@nestjs/common';
import { ProductResponse } from './interfaces/product-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  //this is dependency de axios en us project
  // axios only can be used once in a project and your value dont change then the asingment inicial is the best way to use it

  // private readonly axios: AxiosInstance = axios;

  // constructor() {
  //   // this could be replaced by a provider that allows to use axios throughout th project
  //   this.axios = axios.create();
  // }

  constructor(
    @InjectModel(Pokemon.name) // this injectModel was made by nest team to inject model in this service
    private readonly prodModel: Model<Pokemon>,

    // injection of axios adapter
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.prodModel.deleteMany({}); // delete * from products;

    const data = await this.http.get<ProductResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650&offset=0',
    );

    // 2DA FORMA DE HACERLO
    //const insertPromiseArray: Promise<any>[] = [];

    // 3ERA FORMA DE HACERLO
    const productToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      // console.log({ name, url });
      // console.log(segments);
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      // console.log({ name, no });
      // 2DA FORMA DE HACERLO
      // const product = await this.prodModel.create({ name, no });
      // insertPromiseArray.push(this.prodModel.create({ name, no }));
      // 3ERA FORMA DE HACERLO
      productToInsert.push({ name, no }); // [{name: bulbasaur, no: 1}, {name: ivysaur, no: 2}]
    });
    // use foreach to iterate over the data.results array and obtend the name and url of each element. it be usefull to insert database

    // await Promise.all(insertPromiseArray);

    await this.prodModel.insertMany(productToInsert); // [{name: bulbasaur, no: 1}, {name: ivysaur, no: 2}]
    // insert into pokemons (name, no)
    //  (name: 'bulbasaur',no:  1)
    //  (name: 'pikachu',no:  2)
    //  (name: 'bulbasaur',no:  1)
    //  (name: 'bulbasaur',no:  1)

    return data.results;
    // console.log(fetch);
    // return 'Seed executed';
  }
}
