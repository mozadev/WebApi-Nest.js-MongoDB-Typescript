import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  // the injection depedency always is in the constructor

  constructor(
    @InjectModel(Pokemon.name) // this injectModel was made by nest team to inject model in this service
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  // the insertion to database is asyncronous
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const createdPokemon = await this.pokemonModel.create(createPokemonDto);
      return createdPokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(
        `Can't create Pokemon -  Check server logs`,
      );
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
  findAll() {
    return `This action returns all pokemon`;
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
    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" not found`,
      );

    return pokemon;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Product exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't update Product -  Check server logs`,
    );
  }
}
