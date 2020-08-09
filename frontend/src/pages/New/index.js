//Importa o React e as funções useMemo e useState da biblioteca react
import React, { useState, useMemo } from 'react';
//Importa a api
import api from '../../services/api';
//Importa o svg da camera da pasta assets
import camera from '../../assets/camera.svg';
//Importa o arquivo de estilos DESTA página
import './styles.css';

//Exporta a função New que usa o objeto history:
////O objeto de Window da DOM fornece acesso ao histórico de sessões do navegador por meio do objeto de history.
////Expõe métodos e propriedades úteis que permitem navegar de um lado para o outro através do histórico do usuário
////e manipule o conteúdo da pilha de histórico.
export default function New({history}) {
    //Cria a constante thumbnail como null e a guarda no estado
    //Também cria a função setThumbnail para mudar o valor de thumbnail futuramente
    const [thumbnail, setThumbnail] = useState(null);
    //Cria a constante company como uma string vazia e a guarda no estado
    //Também cria a função setCompany para mudar o valor de company futuramente
    const [company, setCompany] = useState('');
    //Cria a constante techs como uma string vazia e a guarda no estado
    //Também cria a função setTechs para mudar o valor de techs futuramente
    const [techs, setTechs] = useState('');
    //Cria a constante price como uma string vazia e a guarda no estado
    //Também cria a função setPrice para mudar o valor de price futuramente
    const [price, setPrice] = useState('');
    
    //Usa a função useMemo para retornar a url da thumbnail se uma thumbnail existir, se não
    //retorna null, mas tudo isso só acontece se a thumbnail mudar
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    //Cria a função assincrona handleSubmit que recebe o evento como argumento e que:
    async function handleSubmit(event) {
        //Faz com que o comportamento default do evento de enviar pra uma nova página não funcione
        event.preventDefault();

        //Cria a variável "data" com o objeto FormData()
        const data = new FormData();
        //Pega o item user do localStorage e armazena na constante user_id
        const user_id = localStorage.getItem('user');

        //Adiciona a thumbnail, a empresa, as tecnologias e o preço ao conteúdo da variável "data"
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        //Envia uma requisição a rota "/spots" da api que tem como conteúdo a variável "data"
        //e como cabeçalho a constante user_id
        await api.post('/spots', data, {
            headers: { user_id }
        })

        //Depois de tudo isso, manda o usuário para a rota "/dashboard"
        history.push('/dashboard');
    };

    //Retorna um html com:
    ////Um formulário que ao ser enviado chama a função handleSubmit com:
    //////Uma label para a thumbnail que tem como imagem de fundo uma url para a variável preview 
    //////e que se a variável thumbnail existir possui a classe has-thumbnail senão não tem classe.
    ////////A label também tem um input que recebe a thumbnail,
    ////////que quando muda pega o primeiro arquivo do evento (event.target.files[0]) e
    ////////atualiza a variável  que está no estado, através da função setThumbnail.
    ////////Além disso a label possui a imagem da camera.
    //////Outra label para a empresa que possui um input com valor igual à constante company
    //////que quando muda usa a função setCompany para atualizar a variável company que se encontra 
    //////no estado com o valor do evento (event.target.value).
    //////Outra label para as tecnologias que possui outro input com valor igual à constante techs 
    //////que quando muda usa a função setTechs para atualizar a variável techs que se encontra 
    //////no estado com o valor do evento (event.target.value).
    //////E por fim outra label para o preço que possui outro input com valor igual à constante price
    //////que quando muda usa a função setPrice para atualizar a variável price que se encontra
    //////no estado com o valor do evento (event.target.value).
    //////Além de tudo isso também possui um botão com a classe btn

    return (
        <form onSubmit={handleSubmit}>

            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input 
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input 
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input 
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>

        </form>

    )
}