//Importa o modelo de reservas
const Booking = require('../models/Booking');

//Exporta a função store que é assincrona
module.exports = {
    //Função store assincrona
    async store(req, res) {
        //Pega o id do usuário do cabeçalho da requisição
        const { user_id } = req.headers;
        //Pega o id do lugar dos parametros da requisição
        const { spot_id } = req.params;
        //Pega a data do corpo da requisição
        const { date } = req.body;

        //Define a reserva depois de criar uma reserva com:
        const booking = await Booking.create({
            //O usuário sendo o id do usuário
            user: user_id,
            //O lugar sendo o id do lugar
            spot: spot_id,
            //E a data sendo a data
            date,
        });

        //Espera popular o lugar com todas as suas informações
        //Espera popular o usuário com todas as suas informações
        //Completa a reserva depois de executar a população
        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.spot.user];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        };

        //Retorna uma resposta em json com a reserva
        return res.json(booking);
    }
};