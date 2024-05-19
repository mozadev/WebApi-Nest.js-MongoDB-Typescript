import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

// PartialType is a utility function provided by NestJS that allows us to create a new class that has all the properties of the original class as optional.
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
