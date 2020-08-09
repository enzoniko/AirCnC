//Importa o React e as funções useEffect e useState da biblioteca react
import React, { useState, useEffect } from 'react';
//Importa alguns componentes do React Native para simular tags HTML
import { View, AsyncStorage, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Image, TouchableOpacity } from 'react-native';

//Importa a api
import api from '../services/api';

//Importa a logo
import logo from '../assets/logo.png';

//Exporta a função Login que recebe como propriedade a navegação
export default function Login({ navigation }) {
  //Cria a constante email como uma string vazia e a guarda no estado
  //Também cria a função setEmail para mudar o valor do email futuramente
  const [email, setEmail] = useState('');
  //Cria a constante techs como uma string vazia e a guarda no estado
  //Também cria a função setTechs para mudar o valor das tecnologias futuramente
  const [techs, setTechs] = useState('');

  //Usa a função useEffect para verificar se existe a variável user no AsyncStorage, se existir navega direto para a página List
  //https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('List');
      }
    })
  }, []);

  //Cria a função assincrona handleSubmit que:
  async function handleSubmit() {
    //Faz uma requisição post pra rota /sessions da api onde o conteúdo é o email
    //Armazena a resposta 
    const response = await api.post('/sessions', { email });

    //Pega o _id (id do usuário) do conteúdo da resposta
    const { _id } = response.data;

    //Guarda como user o id do usuário no AsyncStorage
    await AsyncStorage.setItem('user', _id);
    //Guarda como techs as tecnologias no AsyncStorage
    await AsyncStorage.setItem('techs', techs);

    //Navega para a página List
    navigation.navigate('List');
  }

  //Retorna a logo e um formulário que tem um campo com título para escrever o email e um campo com título para escrever as tecnologias
  //Também tem um botão TouchableOpacity que chama a função handleSubmit
  //Tudo está envolvido no componente KeyboardAvoidingView para não ficar embaixo do teclado
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
    >
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>Seu E-mail *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Tecnologias *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

//Cria os estilos com o componente StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 2,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
