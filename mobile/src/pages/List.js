//Importa o React e as funções useEffect e useState da biblioteca react
import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client';
//Importa alguns componentes do React Native para simular tags HTML
import { Alert, SafeAreaView, ScrollView, TouchableOpacity, Text, Image, StyleSheet, AsyncStorage } from 'react-native'
//Importa o componente SpotList
import SpotList from '../components/SpotList';

import localhostConfig from '../config/localhost';

//Importa a logo
import logo from '../assets/logo.png';

//Exporta a função List
export default function List({ navigation }) {
  //Cria a constante techs como uma lista vazia e a guarda no estado
  //Também cria a função setTechs para mudar o valor das tecnologias futuramente
  const [techs, setTechs] = useState([]);

  //Assim que a página carrega pesquisa qual o id do usuário e faz uma conexão socket com o backend, passando o id como query
  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio(`http://${localhostConfig.LOCALHOST}:3333`, {
        query: { user_id }
      })
      //Quando recebe uma mensagem com o título booking_response alerta ao usuário falando se a reserva foi aprovada ou não
      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      })
    })
  }, []);

  //Usa a função useEffect para chamar a função setTechs e armazenar a lista techsArray que é gerada
  //pegando o valor da variável techs do AsyncStorage, separando pelas vírgulas e tirando os espaços assim
  //gerando uma lista para guardar no estado como techs, usando a função setTechs assim que o componente renderizar
  //https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, []);

  function handleLogout() {
    // AsyncStorage.removeItem('user');
    AsyncStorage.clear();
    alert('Você foi desconectado!');

    navigation.navigate('Login');
  }

  //Retorna a logo e uma ScrollView que é um scroll vertical.
  //Dentro do ScrollView para cada tecnologia chama o componente SpotList e passa como propriedade a tecnologia
  //A propriedade key é para identificar unicamente cada item da lista
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView>
        { techs.map(tech => <SpotList key={tech} tech={tech} />) }
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

//Cria os estilos com o componente StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 42,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
  },

  button: {
    height: 36,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }

});
