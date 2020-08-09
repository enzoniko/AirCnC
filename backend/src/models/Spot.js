//Importa a biblioteca do mongo DB
const mongoose = require('mongoose');

const localhostConfig = require('../config/localhost');

//Cria um novo schema do mongo DB para um lugar com:
const SpotSchema = new mongoose.Schema({
  //A foto da capa sendo uma string
  thumbnail: String,
  //A empresa sendo uma string
  company: String,
  //O preço sendo um número
  price: Number,
  //As tecnologias sendo uma lista de strings
  techs: [String],
  //E o usuário sendo do tipo ObjectId do schema do mongo DB relacionado ao modelo de usuário
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  }
}, {
  toJSON: {
      virtuals: true,
  },
});

SpotSchema.virtual('thumbnail_url').get(function () {
  return `http://${localhostConfig.LOCALHOST}:3333/files/${this.thumbnail}`
});

//Exporta esse modelo de lugar do mongo DB como Spot
module.exports = mongoose.model('Spot', SpotSchema);
