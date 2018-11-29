/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  AsyncStorage
} from 'react-native';
import Post from './Post';
import InstaluraFetchService from '../services/InstaluraFetchService';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const width = Dimensions.get('screen').width;

//https://instalura-api.herokuapp.com/api/public/fotos/${this.loginPesquisado.value}
const fotosTeste = [
  {id: 1, usuario: 'Danilo'},
  {id: 2, usuario: 'Daniel'},
  {id: 3, usuario: 'Adriel'}
];

/**
 * App Class
 * componente maior que isola e encapsula as regras do seu negócio chamamos de container components.
 */
type Props = {};
export default class Feed extends Component<Props> {
  
  //construtor da classe App
  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    InstaluraFetchService.get('fotos').then(json => this.setState({fotos: json}))
  }

  adicionaComentario(idFoto, comentario, inputComentario) {
    if(comentario === '')
        return;   
    const foto = this.buscaPorId(idFoto);
    const dados = { texto : comentario };
    InstaluraFetchService
      .post(`fotos/${idFoto}/comment`, dados)
      .then(comentario => {
        console.warn('comentario=>', comentario);
        //concatena duas listas -> ES6
        const novaListaComentarios = [ ...foto.comentarios, comentario ];
        const fotoAtualizada = {
          ...foto,
          comentarios: novaListaComentarios
        }
        this.atualizaFotos(fotoAtualizada);
        inputComentario.clear();
      });
  }

  like(idFoto){
    const foto = this.state.fotos.find(foto => foto.id === idFoto);
    AsyncStorage.getItem('usuario').then(usuarioLogado => {
        let novaLista = [];
        if(!foto.likeada){
            novaLista = foto.likers.concat({login: usuarioLogado});
        } else{
            novaLista = foto.likers.filter(liker => {
              return liker.login !== usuarioLogado;
            })
        }
        return novaLista;
      }).then(novaLista => {
        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
          }
        this.atualizaFotos(fotoAtualizada);
    });

    const uri = `https://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`;
      AsyncStorage.getItem('token')
        .then(token =>{
          return {
            method: 'POST',
            headers: new Headers({
              "X-AUTH-TOKEN": token
            })
          }
        })
        .then(requestInfo => fetch(uri, requestInfo));
  }

  buscaPorId(idFoto){
    return this.state.fotos.find(foto => foto.id === idFoto);
  }

  atualizaFotos(fotoAtualizada){
    const fotos = this.state.fotos
                    .map(
                      foto => foto.id === fotoAtualizada.id ? fotoAtualizada: foto
                    );
    this.setState({fotos});
    //this.setState({fotos:fotos}); mesmo que
                
  }

  render() {
    return (
      <FlatList 
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={ ({item}) => 
          <Post foto={item}
              likeCallback={this.like.bind(this)}
              addComentarioCallback={this.adicionaComentario.bind(this)}
          />
        }
      />
    );
  }
}

//const margem = Platform.OS == 'ios' ? 20 : 0; //nao eh mais necessario apos o uso do react-native-navegator
const styles = StyleSheet.create({
  // containerFlatList: {
  //   marginTop: margem
  // },
  cabecalho: {
    margin: 10, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  fotoDePerfil: {
    marginRight: 10, 
    borderRadius: 20, 
    width:40, height:40
  },
  foto: {
    width:width, 
    height:width
  }
})
