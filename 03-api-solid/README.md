#App

GymPass style app.

## Prisma
## Docker
## Rota HTTP
## Vitest
## Vite
## JWT: JSON Web Token
## CI

Usuário faz login,envia e-mail/senha, 
o back-end cria um token ÚNICO, ñ-modificável e STATELESS

Stateless: Ñ armazenado em nenhuma estutura de persistência de dados (BD);

docker compose up -d
sudo docker ps -a == Verificar se o container existe
sudo docker start nome_docker == startar a aplicação

Rodar o Server: npm run start:dev
Rodar o Vitest: npm run test

## Rfs ( Requisitos funcionais )

- Deve ser possível se cadastrar;
- Deve ser possível se autenticar;
- Deve ser possível obter o perfil e um usuário logado;
- Deve ser possível obter o número de check-ins realizados pelo usuário logado ;
- Deve ser possível o usuário obter seu histórico de check-ins;
- Deve ser possível o usuário buscar academias próximas;
- Deve ser possível o usúario buscar academias pelo nome;  
- Deve ser possível o usuário realizar check-ins em uma cademia (core);
- Deve ser possível validar o check-in de um usuário; 
- Deve ser possível cadastrar uma academia;

## RNs ( Regrs de negócio )

- O usuário ñ deve poder se cadastrar com o e-mail publicado; 
- O usuário ñ pode fazer 2 check-ins no mesmo dia;
- O usuário ñ pode fazer check-in se ñ estiver perto (100m) da academia;
- O check-in só poe ser validado até 20m após criado;
- O check-in só pode ser validado por adm; 
- A academia só pode ser cadastrada por adm; 

## Rnfs ( Requisitos ñ funcionais ) 

- A senha do usuário precisa estar criptografada;
- Os ados da aplicação precisam estar persistidos em um banco PostegreSQL;
- Todas listas de dados precisam estar paginada com 20 itens por página;
- O usuário deve ser identificdo por JWT