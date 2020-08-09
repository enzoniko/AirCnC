//Importa o React
import React from 'react';
//Importa a DOM do react da biblioteca react-dom
import ReactDOM from 'react-dom';
//Importa o componente App que criei no arquivo App.js
import App from './App';

//Renderiza o componente App no elemento que possui a id "root" do arquivo "index.html" da pasta public
ReactDOM.render(<App />, document.getElementById('root'));

