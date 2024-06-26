import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  // the injection depedency always is in the constructor
  constructor(
    @InjectModel(Pokemon.name) // this injectModel was made by nest team to inject model in this service
    private readonly pokemonModel: Model<Pokemon>,

    //inject directly in the constructor
    private readonly configService: ConfigService,
  ) {
    // maybe you desire to see defaul limit on console
    // console.log(process.env.DEFAULT_LIMIT);
    this.defaultLimit = configService.get<number>('defaultLimit');
    // console.log({ defaultLimit: configService.get<number>('defaultLimit') });
  }

  // the insertion to database is asyncronous
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const createdPokemon = await this.pokemonModel.create(createPokemonDto);
      return createdPokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  // term : term of search, it could be a number, a name or a mongoID
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    // reutilize the function (with full validation) findOne to find the product
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      //this "pokemon" not only have id, name , also  is a model of mongoose because throug the findOne function we get the model of mongoose
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }
  findAll(paginationDto: PaginationDto) {
    // console.log(+process.env.DEFAULT_LIMIT);

    // const { limit = +process.env.DEFAULT_LIMIT, offset = 0 } = paginationDto;
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    // verify if term is a number, if not number jump to next if
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    // return `This action returns a #${term} pokemon`;

    //mongoID
    //if product was already found in the previous step, jump to the next if, otherwise, verify if term is a valid mongoID, if it's not valid, jump to next if
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    //name
    // verify if term is a name of pokemon   , .trim to eliminate spaces back and front
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    // by ultimo if if pokemon is null, throw a exception
    // exception of user (this is controlled by the user)
    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" not found`,
      );

    return pokemon;
  }
  //async remove(_id: string) it you use _id, you must use _id in ...deleteOne({ _id })
  async remove(id: string) {
    // const pokemon = await this.findOne(id); // we can use this to validate if exist product bu it is makes double query to the database (findOne and findByIdAndDelete)
    // await pokemon.deleteOne();
    // return { id };
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    // const result = await this.pokemonModel.deleteMany({ });becarfully with this, this will delete all the products. it is like delete * from table
    //return result;
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id }); // it must be await because it is asyncronous . it wait to terminate the process to return the result
    // the linea above the id have a index, it is the same that { _id: id }
    throw new BadRequestException(`Product with id "${id}" not found`);
    return;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Product exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    // excetpion of server (this is not controlled by the user, this is a error of the server)
    throw new InternalServerErrorException(
      `Can't update Product -  Check server logs`,
    );
  }
}
