# 🚧 Projeto Store Manager 🚧

Neste repositório contém o codigo desenvolvido no projeto Store Manager durante o curso da [Trybe](https://www.betrybe.com/) no módulo de Back-end feito pelo aluno [Matheus Marinho](https://www.linkedin.com/in/matheus-marinhodsp/).

## Objetivo do Projeto
O projeto consiste em uma aplicação Back-end feita em Node.js utlizando a arquitetura MSC, para gerenciar um banco de dados simples, o banco de dados possui as tabelas de: products, sales, e sale_products, a aplicação recebe requisições HTTP e manipula o banco de dados conforme as mesmas, sejam elas GET, POST, PUT ou DELETE, o projeto foi feito em um container docker, utilizando o arquivo **docker-compose.yml** localizado na raiz do projeto, esse arquivo docker tambem gera um container para o banco de dados.


## Tecnologias Utilizadas

- MySQL, Node.js, JavaScript, Docker, Express, Mocha.

## Comandos

Para criar o banco de dados:
`npm run migration`

Para limpar e popular o banco de dados:
`npm run seed`

Para utilizar o docker-compose:
`docker-compose up -d`

Para iniciar o arquivo node:
```
npm start
ou
npm run debug
```

Para executar os testes feitos com o Mocha:
`npm run test:mocha`

## Funcionalidade

- Segue abaixo algumas imagens do funcionamentos de algumas das requisições que podem ser feitas na aplicação.

