// This is simple function that runs smoothly in the aplicattion and get the environment variables
export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3002,
  defaultLimit: +process.env.DEFAULT_LIMIT || 7,
});

// The environment value is stored as a string, so we need to convert it to number
// const enfv = () => {
//     return {

//     }
// }
