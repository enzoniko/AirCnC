//Importa a biblioteca do mongo DB
const mongoose = require('mongoose');

//Cria um novo schema do mongo DB para um usuário com:
const UserSchema = new mongoose.Schema({
    //O email sendo uma string
    email: String,
});

//Exporta esse modelo de usuário do mongo DB como User
module.exports = mongoose.model('User', UserSchema);