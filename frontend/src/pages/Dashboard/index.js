//Importa o React e as funções useEffect e useState da biblioteca react
import React, { useEffect, useState, useMemo} from 'react';
//Importa o componente primário Link (Route Changer) da biblioteca react-router-dom
import { Link } from 'react-router-dom';

import socketio from 'socket.io-client';
//Importa a api
import api from '../../services/api';

//Importa o arquivo de estilos DESTA página
import './styles.css';
 
//Exporta a função Dashboard que:
export default function Dashboard() {
    //Cria a constante spots como uma lista vazia e a guarda no estado
    //Também cria a função setSpots para mudar o valor dos spots futuramente
    //Cria a constante requests como uma lista vazia e a guarda no estado
    //Também cria a função setRequests para mudar o valor dos spots futuramente
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    //Pega o id do usuário do localStorage e faz uma conexão socket com o backend passando o id como query
    //Essa conexão atualiza quando o id do usuário muda
    //A função useMemo serve para memorizar o valor da conexão na constante socket
    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id },
    }), [user_id]);

    //Sempre que as constantes socket ou a constante requests mudarem vai procurar por uma mensagem booking_request enviada pelo backend
    //Se a mensagem existir pega seus dados e coloca na lista requests com a função setRequests
    //Os três pontos são para não sobescrever nenhum item da array, só adicionar 
    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
    }, [requests, socket]);
    //Usa a função useEffect para chamar a função loadSpots assim que o componente renderizar
    //https://reactjs.org/docs/hooks-effect.html
    //A função possui o segundo argumento como uma lista vazia para sempre chamar a função loadSpots
    useEffect(() => {
        //Cria a função assincrona loadSpots que:
        async function loadSpots() {
            //Pega o item user do localStorage e armazena na constante user_id
            const user_id = localStorage.getItem('user');
            //Pega e armazena a resposta depois de enviar uma requisição get para a rota "/dashboard" da api
            //com o cabeçalho contendo o user_id
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            //Chama a função setSpots com o argumento sendo o conteúdo da resposta assim
            //armazena dentro da variável spots dentro do estado 
            //todos os dados dos spots pertencentes ao atual usuário
            setSpots(response.data)
        }

        //Chama a função loadSpots
        loadSpots();

    }, [])

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(request => request._id !== id));
    };

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id));
        
    };
    //Retorna um html com:
    //Uma tag vazia
    ////Uma lista não ordenada com a classe spot-list que:
    //////Para cada item da lista spots cria uma lista (key serve para diferenciar cada item da lista).
    //////A lista possui um cabeçalho que tem como imagem de fundo uma url 
    //////que leva para a thumbnail do spot.
    //////Também tem um texto em negrito que contém o nome da empresa dona do spot
    //////e um span com o preço do spot, se não existir valor então o valor vai ser GRATUITO.
    ////O html também usa o componente primário Link que leva para rota "/new".
    /////Dentro do Link existe um botão com a classe btn
    return (
        <>
            <ul className='notifications'>
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button onClick={() => handleAccept(request._id)} className="accept">ACEITAR</button>
                        <button onClick={() => handleReject(request._id)} className="reject">REJEITAR</button>
                    </li>
                ))}
            </ul>
            <ul className='spot-list'>
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button> 
            </Link>
        </>
    )
}