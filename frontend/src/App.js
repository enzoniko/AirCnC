//Importa o React
import React from 'react';

//Importa o arquivo de estilos
import './App.css';

//Importa a logo da pasta assets
import logo from './assets/logo.svg';

//Importa as rotas 
import Routes from './routes';

//Cria a função do aplicativo
function App() {
  //Retorna um html com:
  return (
    //Uma div com a classe container
    ////Uma imagem com a logo
    ////Outra div com a classe content
    //////Um componente React representando as rotas
    <div className="container">
      <img src={logo} alt="AirCnC"/>
      <div className="content">
        <Routes />
      </div>
    </div>
      
  );
}

//Exporta essa função app para ser usada como um componente react
export default App;
