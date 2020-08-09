//Importa o express
const express = require('express');
//Importar o multer para ler requisições multipart forms
const multer = require('multer');

//Importar as configurações de upload
const uploadConfig = require('./config/upload');

//Importar os arquivos controladores
//Cadastro de usuários
const SessionController = require('./controllers/SessionController');
//Cadastro de lugares para alugar
//Procura por lugares com tech especificada
const SpotController = require('./controllers/SpotController');
//Mostrar os lugares do usuário
const DashboardController = require('./controllers/DashboardController');
//Criar reservas nos lugares
const BookingController = require('./controllers/BookingController');

const ApprovalController = require('./controllers/ApprovalController');

const RejectionController = require('./controllers/RejectionController');

//Cria as rotas
const routes = express.Router();
//Importa e configura o upload
const upload = multer(uploadConfig);

//Especifica todas as rotas e seus controladores
//Rota de cadastro/login
routes.post('/sessions', SessionController.store);

//Rota que mostra os lugares com tech especifica
routes.get('/spots', SpotController.index);
//Rota que cria lugares para alugar
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

//Rota que mostra todos os lugares pertencentes ao usuário
routes.get('/dashboard', DashboardController.show);

//Rota que reserva lugares
routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);

routes.post('/bookings/:booking_id/rejections', RejectionController.store);
//Exporta as rotas
module.exports = routes;