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

/**
 * Os componentes menores que existem para ajudar na visualização da nossa aplicação 
 * são chamados presentational components.
 */
type Props = {};
export default class Login extends Component<Props> {

  render() {
    const { foto, likeCallback, addComentarioCallback } = this.props;
    return (
      <View style={styles.container}>

      <TextInput placeholder="Usuário..."
          onChangeText={texto => this.setState({usuario: texto})}/>

      <TextInput placeholder="Senha..."
          onChangeText={texto => this.setState({senha: texto})}/>

  </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      alignItems: 'center'

  }
});