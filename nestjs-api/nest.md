# O que é Nest.js?

- Coc (Convention Over Configuration)
- Conceito de modulos
- Suporte a microserviços

## Instalação

```bash
# criar projeto
npx @nestjs/cli new nestjs-api

# cli global
npm install -g @nestjs/cli

# rodar
npm run start:dev


```

## cli

```bash

nest g resource

# generate module shared
nest g module common
```

## tsconfig.json

- monitorar mudanças somente na pasta src

```json
{
  ...
  "include": ["src"]
}
```

## sequelize

```bash
docker-compose exec app bash

npm install --save sequelize sequelize-typescript mysql2

npm install --save-dev @types/sequelize

npm install --save @nestjs/sequelize

# variaveis de ambiente
npm install --save @nestjs/config

chmod +x .docker/entrypoint.sh

# faz a build novamente
docker-compose up --build

# nestjs-api/src/app.module.ts
# nestjs-api/src/transactions/entities/transaction.entity.ts
# nestjs-api/src/transactions/transactions.module.ts
# nestjs-api/src/transactions/transactions.service.ts
# nestjs-api/src/transactions/transactions.controller.ts
```

## DTO

```bash
npm install --save class-validator class-transformer
```

- (adicionar validação global) nestjs-api/src/main.ts

```ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  ...
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422
  }));
  ...
}
bootstrap();
```

## JWT

```bash
nest g module auth

npm install --save @nestjs/passport passport passport-jwt

npm install --save-dev @types/passport-jwt

nest g service auth/jwt-strategy

nest g module tenant

nest g service tenant/tenant

nest g guard tenant/tenant
```

## Report

```bash
nest g resource
```

## KAFKA

```bash
nest g service reports/request-report-generate

npm install --save kafkajs @nestjs/microservices

#                 main.ts
# +app.connectMicroservice(makeKafkaOptions());
# +await app.startAllMicroservices();

#               reports.module
# @Module({
#   imports: [
#     SequelizeModule.forFeature([Report, Account]),
#     +ClientsModule.registerAsync([
#       +{
#         +name: 'KAFKA_SERVICE',
#         +useFactory: () => makeKafkaOptions(),
#       +},
#     +]),
#   ],
#   controllers: [ReportsController],
#   providers: [
#     ReportsService,
#     RequestReportGenerateService,
#     +{
#       +provide: 'KAFKA_PRODUCER',
#       +useFactory: async (kafkaService: ClientKafka) => {
#         +return kafkaService.connect();
#       +},
#       +inject: ['KAFKA_SERVICE'],
#     +},
#   ],
# })

docker-compose exec kafka bash

# permite publicar varias mensagens no topico
kafka-console-producer --topic reports-generated --bootstrap-server localhost:9092
```
