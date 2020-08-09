//Importa a biblioteca axios para lidar com a api
import axios from 'axios';

import localhostConfig from '../config/localhost';

//Cria a constante api e armazena a conexão base com a url da api
const api = axios.create({
  baseURL: `http://${localhostConfig.LOCALHOST}:3333`,
});

//Exporta a api
export default api;
