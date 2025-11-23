# Express Learning API

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```
DB_URL=file:./src/db/database.sqlite
PORT=3000
```

## Executar

```bash
npm start
```

## Scripts

| Script      | Comando               | Descrição            |
| ----------- | --------------------- | -------------------- |
| start       | `npm start`           | Inicia o servidor    |
| dev         | `npm run dev`         | Modo desenvolvimento |
| build       | `npm run build`       | Compila TypeScript   |
| migrate-new | `npm run migrate-new` | Gera nova migração   |
| migrate-up  | `npm run migrate-up`  | Executa migrações    |

## Dependências

| Pacote             | Versão   | Descrição             |
| ------------------ | -------- | --------------------- |
| @libsql/client     | ^0.15.15 | Cliente SQLite        |
| bcrypt             | ^6.0.0   | Hash de senhas        |
| dotenv             | ^17.2.3  | Variáveis de ambiente |
| drizzle-orm        | ^0.44.7  | ORM SQL               |
| express            | ^5.1.0   | Framework web         |
| swagger-jsdoc      | ^6.2.8   | Documentação Swagger  |
| swagger-ui-express | ^5.0.1   | UI Swagger            |
| uuidv7             | ^1.0.2   | Gerador de UUID       |
| zod                | ^4.1.12  | Validação de schemas  |

## DevDependencies

| Pacote                    | Versão   | Descrição                                |
| ------------------------- | -------- | ---------------------------------------- |
| @types/bcrypt             | ^6.0.0   | Tipos TypeScript para bcrypt             |
| @types/express            | ^5.0.5   | Tipos TypeScript para Express            |
| @types/node               | ^20.10.6 | Tipos TypeScript para Node.js            |
| @types/swagger-jsdoc      | ^6.0.4   | Tipos TypeScript para swagger-jsdoc      |
| @types/swagger-ui-express | ^4.1.8   | Tipos TypeScript para swagger-ui-express |
| drizzle-kit               | ^0.31.7  | CLI para Drizzle ORM                     |
| ts-node                   | ^10.9.2  | Executor de TypeScript                   |
| tsx                       | ^4.20.6  | Executor rápido de TypeScript            |
| typescript                | ^5.9.3   | TypeScript                               |

## API Documentation

Acesse a documentação Swagger em: `http://localhost:3000/docs`

## Estrutura do Projeto

```
src/
├── controllers/     # Controllers da aplicação
├── core/           # Configurações principais
├── db/             # Banco de dados e schema
├── models/         # Modelos de dados
├── repositories/   # Acesso a dados
├── routes/         # Rotas da API
├── schemas/        # Validação com Zod
├── services/       # Lógica de negócio
├── utils/          # Utilitários
└── server.ts       # Arquivo principal
```
