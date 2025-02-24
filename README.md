# Livraria - Sistema de Gerenciamento de Biblioteca Virtual

## Visão Geral
Esta é uma API RESTful para gerenciamento de biblioteca virtual construída com Node.js, Express, TypeScript e PostgreSQL.

## Stack Tecnológica
- Backend: Node.js com Express e TypeScript
- Banco de Dados: PostgreSQL
- ORM: TypeORM
- Documentação: Swagger UI
- Container: Docker e Docker Compose

## Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 18 ou superior (para desenvolvimento local)
- Gerenciador de pacotes npm ou yarn

## Início Rápido

1. Clone o repositório

2. Inicie a aplicação usando Docker Compose:
```bash
docker-compose up -d
```

Isso iniciará:
- Banco de dados PostgreSQL (porta 5432)
- API Backend (porta 3000)
- Interface PGAdmin (porta 5050)

## Pontos de Acesso
- API: http://localhost:3000
- PGAdmin: http://localhost:5050
  - Email: dba@mail.com
  - Senha: dba

## Configuração do Banco de Dados
- Host: localhost
- Porta: 5432
- Banco de Dados: livrariaDb
- Usuário: dba
- Senha: dba

## Desenvolvimento

### Configuração Local
1. Navegue até o diretório Backend:
```bash
cd Backend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute em modo de desenvolvimento:
```bash
npm run dev
```

### Scripts Disponíveis
- `npm start`: Executa a build de produção
- `npm run dev`: Executa em modo de desenvolvimento com hot-reload
- `npm run build`: Compila o código TypeScript
- `npm test`: Executa os testes

## Configuração Docker
A aplicação usa Docker Compose para orquestrar três serviços:
1. **livraria-postgres**: Banco de dados PostgreSQL
2. **backend**: Aplicação API Node.js
3. **pgadmin**: Interface de gerenciamento do banco de dados

## Estrutura do Projeto
```
/Backend
  /src
    /controllers    # Manipuladores de requisições
    /entities       # Modelos do banco de dados
    /middleware     # Middleware do Express
    data-source.ts  # Configuração do banco de dados
    routes.ts       # Rotas da API
    server.ts       # Ponto de entrada da aplicação
    swagger.ts      # Documentação da API
```

## Contribuindo
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Faça commit das suas alterações
4. Faça push para a branch
5. Crie um Pull Request

## Licença
Este projeto está licenciado sob a Licença MIT.