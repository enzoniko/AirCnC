//Importa o React e as funções useEffect e useState da biblioteca react
import React, { useState, useEffect } from 'react';
//Importa o withNavigation da biblioteca de navegação do react.
//withNavigation é um componente de ordem superior que passa o suporte de navegação para um componente agrupado. 
//É útil quando você não pode passar o suporte de navegação diretamente para o componente ou não deseja passá-lo no caso de um filho profundamente aninhado
import { withNavigation } from 'react-navigation';
//Importa alguns componentes do React Native para simular tags HTML
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';

//Importa a api
import api from '../services/api';

//Cria a função SpotList que recebe como propriedades a tecnologia e a navegação que:
function SpotList({ tech, navigation }) {
    //Cria a constante spots como uma lista vazia e a guarda no estado
    //Também cria a função setSpots para mudar o valor dos spots futuramente
    const [spots, setSpots] = useState([]);

    //Usa a função useEffect para chamar a função loadSpots assim que o componente renderizar
    //https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        //Cria a função assincrona loadSpots que:
        async function loadSpots() {
            //Pega e armazena a resposta depois de enviar uma requisição get para a rota "/spots" da api
            //com os parâmetros sendo as tecnologias
            const response = await api.get('/spots', {
                params: {
                    tech
                }
            })

            //Chama a função setSpots com o argumento sendo o conteúdo da resposta assim
            //armazena dentro da variável spots dentro do estado 
            //todos os dados dos spots que usam essas tecnologias
            setSpots(response.data);
        }

        //Chama a função loadSpots
        loadSpots();

    }, []);

    //Cria a função handleNavigate que recebe como propriedade o id do spot
    function handleNavigate(id) {
        //Navega para a página de reserva desse spot
        navigation.navigate('Book', { id });
    };

    //Retorna um texto falando qual a tecnologia
    //Também retorna uma FlatList que tem scroll horizontal para mostrar cada um dos spots com essa tech
    //E pra cada item da FlatList retorna a imagem da thumbnail, a empresa, o preço e 
    //um TouchableOpacity que é como se fosse um botão, esse botão chama a função handleNavigate
    //A FlatList usa a propriedade renderItem para renderizar os itens da lista
    //E a propriedade keyExtractor é para usar o id do spot como identificador único de cada item da lista
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

//Cria os estilos com o componente StyleSheet
const styles = StyleSheet.create({
    container: {
        marginTop: 30,

    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold: {
        fontWeight: 'bold',
    },

    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },


});

//Exporta com navegação a função SpotList que vai ser usada como componente futuramente
export default withNavigation(SpotList);
