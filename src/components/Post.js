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

import InputComentario from './InputComentario';
import Likes from './Likes';

const width = Dimensions.get('screen').width;

/**
 * Os componentes menores que existem para ajudar na visualização da nossa aplicação 
 * são chamados presentational components.
 */
type Props = {};
export default class Post extends Component<Props> {

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

  render() {
    const { foto, likeCallback, addComentarioCallback } = this.props;
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
                
                <Likes foto={foto} likeCallback={likeCallback} />
                
                {this.exibeLegenda(foto)}

                {foto.comentarios.map(comentario => 
                    <View style={styles.comentario} key={comentario.id}>
                        <Text style={styles.tituloComentario}>{comentario.login}</Text>
                        <Text>{comentario.texto}</Text>
                    </View>
                )}
                <InputComentario idFoto={foto.id} addComentarioCallback={addComentarioCallback} />
                
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
  rodape: {
    margin: 10
  },
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  }
})
