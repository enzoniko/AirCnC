//Importa a biblioteca do mongo DB
const mongoose = require('mongoose');

//Cria um novo schema do mongo DB para uma reserva com:
const BookingSchema = new mongoose.Schema({
    //A data sendo uma string
    date: String,
    //A variável approved sendo uma booleana
    approved: Boolean,
    //O usuário sendo do tipo ObjectId do schema do mongo DB relacionado ao modelo de usuário
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    //O lugar sendo do tipo ObjectId do schema do mongo DB relacionado ao modelo de lugar
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot',
    }
});

//Exporta esse modelo de reserva do mongo DB como Booking
module.exports = mongoose.model('Booking', BookingSchema);
