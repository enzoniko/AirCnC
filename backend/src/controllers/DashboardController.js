//Importa o modelo de lugar
const Spot = require('../models/Spot')

//Exporta a função show que é assincrona
module.exports = {
    //Função show assincrona
    async show(req, res) {
        //Pega o id do usuário do cabeçalho da requisição
        const { user_id } = req.headers;

        //Define os spots depois de achar os lugares que pertencem a esse usuário
        const spots = await Spot.find({ user: user_id });

        //Retorna uma resposta em json com esses lugares
        return res.json(spots);
    }
}