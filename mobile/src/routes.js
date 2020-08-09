//Importa createAppContainer e createSwitchNavigator de react-navigation
//https://blog.rocketseat.com.br/navegacao-react-native/
import { createAppContainer, createSwitchNavigator} from 'react-navigation';

//Importa as páginas Login, List, Book
import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

//Cria as rotas
//Tentar fazer com createAnimatedSwitchNavigator !!!
const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })
);

//Exporta as rotas
export default Routes;