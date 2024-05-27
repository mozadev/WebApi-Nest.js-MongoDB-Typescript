import { join } from 'path'; // en node , usually goin at start of file
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { Mongoose } from 'mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

// the module decorator is used to define a module
// module always goint inside of import array
@Module({
  imports: [
    // always It must be on the before MongooseModule.forRoot(process.ev.MONGODB)
    //  because it is used in the MongooseModule.forRoot to read the env variables
    ConfigModule.forRoot({
      load: [EnvConfiguration], //this make conversion and mapping of the env variables
      validationSchema: JoiValidationSchema, // set the validation schema by default too
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    //the container docker would be running on port 27017 to this works
    // MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    MongooseModule.forRoot(process.env.MONGODB),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {
  // constructor() {
  //   console.log(process.env);
  // }
}
