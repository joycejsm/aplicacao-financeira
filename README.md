

# 💰 Aplicação de Gastos Compartilhados

![Screenshot do Projeto](./prints/cadastro-tela.png)
<!-- Print principal da aplicação -->

## 📌 Sobre
Esta aplicação foi desenvolvida para facilitar o **registro e acompanhamento de gastos pessoais e compartilhados** entre usuários.

O sistema permite que cada pessoa:
- **Cadastre-se e faça login**
- Registre gastos informando **descrição, valor, data e categoria**
- Visualize uma **lista de despesas**
- Acompanhe **gráficos** que mostram a distribuição dos gastos por categoria.

A proposta original incluía uma funcionalidade avançada para **controle de gastos compartilhados**: quando um usuário registrasse uma despesa em conjunto com outro usuário da plataforma, o sistema calcularia automaticamente o saldo entre eles, considerando quem pagou o quê.  
Na versão atual, essa funcionalidade foi parcialmente implementada — sendo possível marcar um gasto como compartilhado e indicar que foi pago para outro usuário, mas **sem a lógica de compensação automática entre contas**.

---

## 🚀 Tecnologias Utilizadas
- **Frontend:** React, Context API, Axios
- **Backend:** Node.js, Express
- **Banco de Dados:** PostgreSQL (gerenciado via **DBeaver** no Ubuntu)
- **Bibliotecas e Ferramentas:**
  - Chart.js (gráficos)
  - JWT (autenticação)
  - bcrypt (hash de senhas)
  - Prisma ORM
  - CSS Modules

---

## ⚙ Funcionalidades
- Cadastro e login de usuários
- Adicionar gastos com descrição, valor, data e categoria
- Marcar gastos como "compartilhados"
- Listagem de despesas
- Visualização de gráficos por categoria
- Controle parcial de gastos compartilhados (registro, mas sem compensação automática)

---



## 📥 Como Rodar Localmente

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/joycejsm/aplicacao-financeira.git
cd aplicacao-financeira
````

### 2️⃣ Configuração do Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` dentro da pasta `backend`:

```
PORT=4000
DATABASE_URL="postgresql://usuario:senha@localhost:5432/gastosdb?schema=public"
JWT_SECRET="sua_chave_secreta_aqui"
FRONTEND_URL="http://localhost:3000"
```

* **DATABASE\_URL:** string de conexão usada pelo Prisma para acessar seu banco PostgreSQL.
* No Ubuntu, você pode gerenciar e visualizar os dados usando o **DBeaver**.

Rodar o servidor backend:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

---

### 3️⃣ Configuração do Frontend

Abra outro terminal:

```bash
cd frontend
npm install
```


Rodar o frontend:

```bash

npm run dev # Vite
```





---

## 📚 Aprendizados

* Integração completa entre frontend e backend
* Uso do **Context API** para estado global
* Autenticação JWT no Node.js
* Criação de gráficos dinâmicos com Chart.js
* Manipulação de banco de dados PostgreSQL no Ubuntu via **DBeaver**

---

## 📌 Próximos Passos

* Implementar compensação automática nos gastos compartilhados
* Adicionar testes unitários e de integração
* Melhorar responsividade
* Exportar relatórios em PDF/Excel

---


