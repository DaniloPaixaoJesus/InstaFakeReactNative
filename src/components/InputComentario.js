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
  View, 
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';


/**
 * Os componentes menores que existem para ajudar na visualização da nossa aplicação 
 * são chamados presentational components.
 */
type Props = {};
export default class InputComentario extends Component<Props> {

  constructor() {
    super();
    this.state = {
        comentario: ''
    }
  }

  render() {
    const { addComentarioCallback, idFoto } = this.props;
    const { comentario } = this.state;
    return (
        <View style={styles.novoComentario}>
            <TextInput style={styles.input} placeholder="Adicione um comentário..." 
                ref={input => this.inputComentario = input} 
                onChangeText={texto => this.setState({comentario: texto})}
            />
            <TouchableOpacity onPress={
                ()=> {
                    this.props.addComentarioCallback(idFoto, this.state.comentario, this.inputComentario);
                    this.setState({comentario:''});
                }
            }>
                <Image style={styles.icone} source={ require('../../resources/img/send.png') } />
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40
  },
  icone: {
    width: 30,
    height: 30
  }
})
