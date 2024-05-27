import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(), // this is obligatory
  PORT: Joi.number().default(3005), // if not exist, the default value is 3005
  DEFAULT_LIMIT: Joi.number().default(6), // if it doesn't come, set the default value is 7
});
