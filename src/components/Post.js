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
  TouchableOpacity,
  TextInput
} from 'react-native';

const width = Dimensions.get('screen').width;

type Props = {};
export default class Post extends Component<Props> {

  constructor(props) {
    super(props);
    //this.state = { foto: this.props.foto }
    this.state = { foto: {...this.props.foto, likers: [{}, {}]} }
  }

  carregarIconeLike(likeada){
    return likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png')
  }

  like(){
    const { foto } = this.state;

    // bug-> nao remove a minha curtida quando eu discurto
    // if(!this.state.foto.likeada){
    //     novaLista = this.state.foto.likers.concat({login: 'meuUsuario'});
    // }

    let novaLista = [];
    if(!foto.likeada){
        novaLista = foto.likers.concat({login: 'meuUsuario'});
    } else{
        novaLista = foto.likers.filter(liker => {
          return liker.login !== 'meuUsuario';
        })
    }

    const fotoAtualizada2 = {
        ...foto,
        likeada: !foto.likeada,
        likers: novaLista
      }

    // let fotoAtualizada = foto;
    // fotoAtualizada.likeada = !foto.likeada;
    // fotoAtualizada.likers = novaLista;

    this.setState({foto: fotoAtualizada2});
  }

  exibeLikes(likers) {
    if(likers.length <= 0)
      return;
  
    return (<Text style={styles.likes}>{likers.length} {likers.length > 1 ? 'curtidas': 'curtida'}</Text>)
  }

  exibeLegenda(foto) {
    if(foto.comentario == '')
      return;
    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    );
  }

  //require('../../resources/img/alura.jpg')
  render() {
    const { foto } = this.state;
    return (
        <View>
            <View style={styles.cabecalho}>
                <Image source={{uri: foto.urlPerfil}} 
                    style={styles.fotoDePerfil} />
                <Text>{foto.loginUsuario}</Text>
            </View>
            <Image source={{uri: foto.urlFoto}}
                style={styles.foto} />
            <View style={styles.rodape}>
                <TouchableOpacity onPress={this.like.bind(this)}>
                    <Image style={styles.botaoDeLike} 
                            source={this.carregarIconeLike(foto.likeada)} />
                </TouchableOpacity>
                {/*  comentario no JSX
                {foto.likers.length > 0 ?
                    <Text style={styles.likes}>{foto.likers.length} {foto.likers.length > 1 ? 'curtidas': 'curtida'}</Text>
                    : null 
                }
                */}
                {this.exibeLikes(foto.likers)}
                
                {this.exibeLegenda(foto)}

                {foto.comentarios.map(comentario => 
                    <View style={styles.comentario} key={comentario.id}>
                        <Text style={styles.tituloComentario}>{comentario.login}</Text>
                        <Text>{comentario.texto}</Text>
                    </View>
                )}
                <View style={styles.novoComentario}>
                    <TextInput style={styles.input} placeholder="Adicione um comentário..." />
                    <Image style={styles.icone} source={ require('../../resources/img/send.png') } />
                </View>
                
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  botaoDeLike: {
    marginBottom: 10,
    width: 40,
    height: 40
  },
  rodape: {
    margin: 10
  },
  likes: {
    fontWeight: 'bold'
  },
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  },
  input: {
    flex: 1,
    height: 40
  },
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icone: {
    width: 30,
    height: 30
  }
})
