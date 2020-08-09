//Importa a biblioteca express
const express = require('express');
//Importa as rotas
const routes = require('./routes');
//Importa a biblioteca do mongo DB
const mongoose = require('mongoose');

const databaseConfig = require('./config/database');
//Importa a biblioteca cors
const cors = require('cors');
//Importa a biblioteca path
const path = require('path');
//Importa socket
const socketio = require('socket.io');
//Importa http
const http = require('http');

//Cria o aplicativo
const app = express();
//Cria o server conectando com o app via http
const server = http.Server(app);
//Conecta com socket no server
const io = socketio(server);

//Conectar o app com o banco de dados MONGO DB
mongoose.connect(databaseConfig.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectedUsers = {};

//Quando tiver uma conexão socket com esse backend pega o id do usuário da query
//Também relaciona esse id do usuário com o id do socket e guarda no dicionário dos usuários conectados
io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

//Fala pro app usar a io do app como a io do socket, os usuários conectados da requisição igual aos usuários conectados (dicionário)
//Passa o argumento next para continuar para as próximas linhas de código
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

//GET, POST, PUT, DELETE

//req.query = Acessar query params (Filtros)
//req.params = Acessar route params (PUT e DELETE)
//req.body = Acessar corpo da requisição (POST e PUT)

//Fazer o app aceitar json() e usar cors
app.use(cors());
app.use(express.json());

//Faz o app usar a rota "/files" com a pasta uploads
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
//Fazer o app usar as rotas especificadas por nós
app.use(routes);

//Fazer o app funcionar na porta 3333 no localhost
server.listen(3333, () => console.log('Server is running...'));
