// index, show, store, update, destroy
//Importa o modelo de usuário
const User = require('../models/User');

//Exporta a função que cria usuários
module.exports = {
    //Função assincrona
    async store(req, res) {
        //Pega o email do corpo da requisição
        const { email } = req.body;

        //Pega o usuário depois de ver se o email já existe
        let user = await User.findOne({ email });

        //Se o email não existe então o usuário não existe
        //Se o usuário não existe
        if (!user) {
            //Pega o usuário depois de criar ele com seu email
            user = await User.create({ email });
        };

        //Retorna uma resposta em json com o usuário
        return res.json(user);
    }
};