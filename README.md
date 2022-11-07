# Api NestJS

Api feita para estudar conceitos do NestJs com integração do banco de dados postgresSQL e testes unitários!


## Tecnologias usadas
```
NestJs
Typescript
Jest
PostgresSQL
TypeORM
```

## Especificações
```
Node 17.9.1
```
## Como usar:
### Instalação : 
```
-- npm install

-- npm install @nestjs/cli

-- npm install @nestjs/typeorm pg
```

### Rodando o projeto

Para acompanhar e rodar o projeto
```
-- npm run start:dev
```
Para rodar testes
```
npm run test
```

## ROTAS DA API
Usando o insomnia ou postman
```
[POST] http://localhost:3000/mail
```
```
JSON: {
	"destinationName": "Helio",
	"destinationAddress": "helio@gmail.com",
	"dueDate": "2022-11-05T15:00:00Z",
	"subject": "Olá",
	"body": "<p>Olá!</p>"
}
```
