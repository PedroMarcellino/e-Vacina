# 🌐 e-Vacina (Front-end)

Este projeto faz parte do **TCC – Curso Técnico em Análise e Desenvolvimento de Sistemas (ADS)** e consiste em um **web site para monitoramento digital de vacinação**.  

O front-end foi desenvolvido com **Angular**, consumindo a **API REST** construída em **Laravel**, garantindo uma aplicação moderna, escalável e responsiva.

---

## 📌 Objetivos do Projeto
- Proporcionar uma **interface intuitiva** e de fácil uso para cadastro e acompanhamento de vacinas.  
- Integrar de forma segura com a **API em Laravel** para manipulação dos dados.  
- Oferecer uma experiência fluida, responsiva e acessível para usuários e administradores.  

---

## 🛠️ Tecnologias Utilizadas
- **[Angular](https://angular.io/)** – Framework front-end.  
- **TypeScript** – Linguagem principal.  
- **Bootstrap / CSS3** – Estilização e responsividade.  
- **RxJS & HttpClient** – Consumo da API REST do Laravel.  
- **Node.js & npm** – Gerenciamento de pacotes e dependências.  

---

## ⚙️ Funcionalidades
- Interface para **cadastro e atualização** de vacinas.  
- Visualização do **histórico de aplicações**.  
- Painel de controle administrativo.  
- Integração total com a API back-end (Laravel).  

---

## 🔗 Integração com a API (Laravel)
O front-end se comunica com a API do back-end através de **requisições HTTP** (REST).  
As principais integrações são:  

- **GET /vacinas** → Listar vacinas.  
- **POST /vacinas** → Cadastrar nova vacina.  
- **PUT /vacinas/{id}** → Atualizar dados da vacina.  
- **DELETE /vacinas/{id}** → Remover vacina.  

> A URL base da API deve ser configurada no arquivo de **environments** do Angular:
```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};

Baixar as dependências:
npm install

Iniciar o servidor:
ng serve

Acesse no navegador:
http://localhost:4200
