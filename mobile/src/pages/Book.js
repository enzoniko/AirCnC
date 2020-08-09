//Importa o React e a função useState da biblioteca react
import React, { useState } from 'react'
//Importa alguns componentes do React Native para simular tags HTML
import { Alert, Text, AsyncStorage, Platform, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'

//Importa a api
import api from '../services/api';

//Exporta a função Book que recebe como propriedade a navegação
export default function Book({ navigation }) {
    //Cria a constante date como uma string vazia e a guarda no estado
    //Também cria a função setDate para mudar o valor da data futuramente
    const [date, setDate] = useState('');
    //Armazena na constante id o parametro id do spot que foi passado pelo componente SpotList
    const id = navigation.getParam('id');

    //Cria a função assincrona handleSubmit que:
    async function handleSubmit() {
        //Armazena na constante user_id a variável user que está no AsyncStorage
        const user_id = await AsyncStorage.getItem('user');

        //Envia uma requisição post pra rota /spots/<id do spot>/bookings da api
        //onde o conteúdo é a data e o cabeçalho é o id do usuário
        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: {user_id}
        })

        //Faz um alerta na tela do usuário avisando que a solicitação da reserva foi enviada
        Alert.alert('Solicitação de reserva enviada.');

        //Navega de volta pra página List
        navigation.navigate('List');

    };

    //Cria a função assincrona handleCancel que:
    function handleCancel() {
        //Navega de volta para a página List
        navigation.navigate('List');
    }

    //Retorna um campo com um título para se botar a data, que quando muda chama a função setDate para guardar o valor da data
    //Também retorna dois botões TouchableOpacity, um chama a função handleSubmit e o outro a função handleCancel.
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

        </SafeAreaView>

    );
}

//Cria os estilos com o componente StyleSheet
const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: Platform.OS === 'android' ? 50 : 10,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30,

    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});