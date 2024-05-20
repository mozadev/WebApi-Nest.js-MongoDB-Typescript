import {
  IsInt,
  IsPositive,
  IsString,
  MinLength,
  isString,
} from 'class-validator';

export class CreatePokemonDto {
  //isInt, isPositive, min1
  @IsInt()
  @IsPositive()
  @MinLength(1)
  no: number;
  //isString, min1
  @IsString()
  @MinLength(1)
  name: string;
}
