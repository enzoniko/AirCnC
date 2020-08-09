//Importa o React
import React from 'react'

//Importa os componentes primários da biblioteca do react-router para a DOM:
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//BrowserRouter(Routers): 
////No centro de todos os aplicativos do React Router, deve haver um componente de roteador.
//// Para projetos da Web, o react-router-dom fornece roteadores <BrowserRouter> e <HashRouter>.
//// A principal diferença entre os dois é a maneira como eles armazenam a URL e se comunicam com o servidor da web.
//// Um ​​<BrowserRouter> usa caminhos de URL regulares. Esses geralmente são os URLs mais bonitos,
//// mas eles exigem que seu servidor esteja configurado corretamente.
//// Especificamente, seu servidor da web precisa servir a mesma página em todos os URLs gerenciados no lado do cliente pelo React Router.
//// O Create React App suporta isso imediatamente no desenvolvimento,
//// e vem com instruções sobre como configurar também o servidor de produção.
//// Um ​​<HashRouter> armazena o local atual na parte de hash do URL,
//// para que o URL seja semelhante a "http://example.com/#/your/page".
//// Como o hash nunca é enviado ao servidor, isso significa que nenhuma configuração especial do servidor é necessária.

//Switch e Route(Route Matchers):
////Existem dois componentes correspondentes à rota: Switch e Route.
//// Quando um <Switch> é renderizado, ele pesquisa seus elementos filhos <Route>
//// para encontrar um cujo caminho corresponde ao URL atual. Quando encontra um, renderiza esse <Route>
//// e ignora todos os outros. Isso significa que você deve colocar <Route>s com caminhos mais específicos
//// (geralmente mais longos) antes dos menos específicos.
//// Se nenhum <Route> corresponder, o <Switch> renderiza nada (nulo).
//// Uma coisa importante a ser observada é que um <Route path> corresponde ao início do URL,
//// não a coisa toda. Portanto, um <Route path = "/"> sempre corresponderá à qualquer URL.
//// Por isso, normalmente colocamos este <Route> último em nosso <Switch>.
//// Outra solução possível é usar <Route exact path = "/"> que corresponde a todo o URL.

//Existem também os Route Changers como Link, NavLink e Redirect:
////O React Router fornece um componente <Link> para criar links no seu aplicativo.
////Onde quer que você renderize um <Link>, uma âncora (<a>) será renderizada em seu documento HTML.
////O <NavLink> é um tipo especial de <Link> que pode se estilizar automaticamente como "ativo"
////quando sua prop corresponde ao local atual.
////Sempre que quiser forçar a navegação, você pode renderizar um <Redirect>.
////Quando um <Redirect> é renderizado, ele navega usando seu prop.

//Importa todas as páginas (Login, Dashboard e New)
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';

//Exporta a função Routes para ser usada como um componente futuramente:
////Usa os componentes primários para retornar a página correspondente a rota.
////Também uso "exact" na rota "/" para corresponder só à página de Login.
////"/dashboard" corresponde à página Dashboard.
////E "/new" corresponde à página New.
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact component={Login} />
                <Route path = "/dashboard" component={Dashboard} />
                <Route path = "/new" component={New} />
            </Switch>
        </BrowserRouter>
    );
}