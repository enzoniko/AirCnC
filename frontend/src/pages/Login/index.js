//Importa o React e a função useState (Para usar o estado de funções) da biblioteca "react"
import React, { useState } from 'react';
//Importa a api do arquivo api.js da pasta services
import api from '../../services/api';

//Exporta a função Login que usa o objeto history:
////O objeto de Window da DOM fornece acesso ao histórico de sessões do navegador por meio do objeto de history.
////Expõe métodos e propriedades úteis que permitem navegar de um lado para o outro através do histórico do usuário
////e manipule o conteúdo da pilha de histórico.
export default function Login({ history }) {

    //Cria a constante email como uma string vazia e a guarda no estado
    //Também cria a função setEmail para mudar o valor de email futuramente
    const [email, setEmail] = useState('');

    //Cria a função handleSubmit que é assincrona e recebe o evento como argumento
    async function handleSubmit(event){
        //Faz com que o comportamento default do evento de enviar pra uma nova página não funcione
        event.preventDefault();

        //Cria a constante response depois de:
        ////Enviar para a rota "/sessions" da api o email do usuário
        const response = await api.post('/sessions', {
        email,
        });

        //Cria a constante _id depois de pegar a mesma do conteúdo da resposta (response.data) 
        const { _id } = response.data;

        //Guarda a constante _id no localStorage como "user"
        localStorage.setItem('user', _id);

        //Depois de tudo isso, manda o usuário para a rota "/dashboard"
        history.push('/dashboard');
    }
    
    //Retorna um html com:
    // "<> e </>" são tags vazias, sempre bom botar nessas situações pois tudo tem que ter um pai
    ////Um parágrafo de introdução
    ////Um formulário que chama a função handleSubmit com:
    //////Uma label para a input com id email
    //////Um input com valor email que quando muda pega o valor do evento (event.target.value) e
    //////atualiza a variável email que está no estado, através da função setEmail.
    //////Um botão com a classe btn
    return (
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para usa empresa
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input 
                type="email" 
                id="email" 
                required
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}
