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
  FlatList
} from 'react-native';
import Post from './src/components/Post';

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

type Props = {};
export default class App extends Component<Props> {
  
  //construtor da classe App
  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
        .then(resposta => resposta.json())
        .then(json => this.setState({fotos: json}));
  }

  adicionaComentario(idFoto, comentario, inputComentario) {
    if(comentario === '')
        return;   
    const foto = this.state.fotos.find(foto => foto.id === idFoto) 
    const novaListaComentarios = [
      ...foto.comentarios,
      {
        id: comentario,
        login: 'meuUsuario',
        texto: comentario
      }
    ];
    const fotoAtualizada = {
      ...foto,
      comentarios: novaListaComentarios
    }
    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
    this.setState({fotos});//é o mesmo que this.setState({fotos:fotos});
    inputComentario.clear();
  }

  like(idFoto){
    const foto = this.state.fotos.find(foto => foto.id === idFoto)
    let novaLista = [];
    if(!foto.likeada){
        novaLista = foto.likers.concat({login: 'meuUsuario'});
    } else{
        novaLista = foto.likers.filter(liker => {
          return liker.login !== 'meuUsuario';
        })
    }
    const fotoAtualizada = {
        ...foto,
        likeada: !foto.likeada,
        likers: novaLista
      }
    // let fotoAtualizada = foto;
    // fotoAtualizada.likeada = !foto.likeada;
    // fotoAtualizada.likers = novaLista;


    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada:foto);
    this.setState({fotos});
  }

  render() {
    return (
      <FlatList style={styles.container}
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

const margem = Platform.OS == 'ios' ? 20 : 0;
const styles = StyleSheet.create({
  container: {
    marginTop: margem
  },
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
