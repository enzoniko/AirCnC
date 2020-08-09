//Importa o modelo de usuário
const User = require('../models/User');
//Importa o modelo de lugar
const Spot = require('../models/Spot');

//Exporta as funções index e store assincronas
module.exports = {
    //Função index assincrona
    async index(req, res) {
        //Pega as tecnologias do filtro da requisição
        const { tech } = req.query;

        //Define os lugares que usam essas tecnologias
        const spots = await Spot.find({ techs: tech });
        
        //Retorna um json com esses lugares
        return res.json(spots);
    },

    //Função store assincrona
    async store(req, res) {
        //Pega o nome do arquivo da requisição
        const { filename } = req.file;
        //Pega a empresa, as tecnologias e o preço do corpo da requisição
        const { company, techs, price } = req.body;
        //Pega o id do usuário do cabeçalho da requisição
        const { user_id } = req.headers;

        //Define o usuário se achar um usuário existente com esse id
        const user = await User.findById(user_id);

        //Se esse usuário não existir
        if (!user) {
            //Retorna um erro 400 em json com uma mensagem de erro
            return res.status(400).json({
                error: "Usuário não encontrado!"
            })
        }

        //Pega o lugar depois de criar esse lugar, onde:
        const spot = await Spot.create({
            //O usuário vai ser igual ao id
            user: user_id,
            //A foto de capa vai ser igual ao nome do arquivo
            thumbnail: filename,
            //A empresa vai ser igual a empresa
            company,
            //As tecnologias vai ser igual a string da requisição separada por vírgulas e tirando os espaços
            //Assim gerando uma lista
            techs: techs.split(',').map(tech => tech.trim()),
            //E o preço vai ser igual ao preço
            price
        })
        //Retorna uma resposta em json com o lugar
        return res.json(spot)
    }
};