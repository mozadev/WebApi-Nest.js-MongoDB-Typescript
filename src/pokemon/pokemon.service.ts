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
    //verify if term is a valid mongoID, if not valid jump to next if
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

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
