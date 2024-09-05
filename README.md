T A S K Y

Observações: 
Não foi criada a entidade de usuário, então há credenciais padrões para o login no painel. (email: test@test.com | senha: test).
O deploy desta aplicação está em uma instância AWS EC2, localizada em http://3.144.160.106/

Pré requisitos:
node.js + mysql

Servidor:
~ git clone https://github.com/liimadiego/tasky.git
~ cd tasky/server
~ npm install
~ cp .env.example .env
  - preencha o .env com os dados do banco de dados, a porta em que deseja rodar (padrão 5000), uma chave qualquer para o JWT e a URL da aplicação React, que estará rodando na porta 3000 (http://localhost:3000)
  - obs: DB_NAME deverá ser 'tasks'
~ npm run migrations
~ npm start

React App (em outro terminal, partindo da raiz do projeto):
~ cd task-manager
~ npm install
~ cp .env.example .env
  - preencha o .env com a URL da API que subimos anteriormente (se estiver no localhost será http://localhost:<PORT>) e a URL da aplicação atual, que estará rodando na porta 3000 (http://localhost:3000)
~ npm start
