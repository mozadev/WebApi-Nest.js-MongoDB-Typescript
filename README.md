<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
3. Tener Nest CLI instalado
```

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker-compose up -d

```

5. Start dev environment

```
yan start:dev
```

6. Clonar el archivo `.env.temple` y renombrar la copia a **.env**

7. Fill envairoment varialbes defined in the `.env`

8. Rebuild the database with the seed

```
localhost:3000/api/v2/seed
```

## Stack usado

- MongoDB
- Nest
