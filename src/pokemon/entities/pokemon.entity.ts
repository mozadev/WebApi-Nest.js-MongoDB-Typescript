import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  //id: string; mongo just give me the id
  name: string;
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
