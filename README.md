T A S K Y

Observações: <br />
Não foi criada a entidade de usuário, então há credenciais padrões para o login no painel. (email: test@test.com | senha: test). <br />
O deploy desta aplicação está em uma instância AWS EC2, localizada em http://3.144.160.106/ <br />
 <br />
Pré requisitos: <br />
node.js + mysql <br />
 <br />
Servidor: <br />
~ git clone https://github.com/liimadiego/tasky.git <br />
~ cd tasky/server <br />
~ npm install <br />
~ cp .env.example .env <br />
  - preencha o .env com os dados do banco de dados, a porta em que deseja rodar (padrão 5000), uma chave qualquer para o JWT e a URL da aplicação React, que estará rodando na porta 3000 (http://localhost:3000) <br />
  - obs: DB_NAME deverá ser 'tasks' <br />
~ npm run migrations <br />
~ npm start <br />
 <br />
React App (em outro terminal, partindo da raiz do projeto): <br />
~ cd task-manager <br />
~ npm install <br />
~ cp .env.example .env <br />
  - preencha o .env com a URL da API que subimos anteriormente (se estiver no localhost será http://localhost:<PORT>) e a URL da aplicação atual, que estará rodando na porta 3000 (http://localhost:3000) <br />
~ npm start <br />
