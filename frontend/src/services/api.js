//Importa a biblioteca axios
import axios from 'axios';

//Cria uma conexão com o link root (url base) da api (backend)
const api = axios.create({
    baseURL: 'http://localhost:3333',
});

//Exporta essa conexão com o nome "api"
export default api;