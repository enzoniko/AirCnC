//Importa o React
import React from 'react';
import { YellowBox } from 'react-native';
//Importa as rotas
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);
//Exporta a função App que retorna o componente Routes
export default function App() {
  return <Routes />
};

