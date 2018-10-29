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
  TouchableOpacity
} from 'react-native';

/**
 * Os componentes menores que existem para ajudar na visualização da nossa aplicação 
 * são chamados presentational components.
 */
type Props = {};
export default class Likes extends Component<Props> {

  carregarIconeLike(likeada){
    return likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png')
  }

  exibeLikes(likers) {
    if(likers.length <= 0)
      return;
  
    return (<Text style={styles.likes}>{likers.length} {likers.length > 1 ? 'curtidas': 'curtida'}</Text>)
  }

  render() {
    const { foto, likeCallback } = this.props;
    return (
        <View>
            <TouchableOpacity onPress={() => {likeCallback(foto.id)}}>
                <Image style={styles.botaoDeLike} 
                        source={this.carregarIconeLike(foto.likeada)} />
            </TouchableOpacity>
            {this.exibeLikes(foto.likers)}            
        </View>
    );
  }
}

const styles = StyleSheet.create({
  botaoDeLike: {
    marginBottom: 10,
    width: 40,
    height: 40
  },
  rodape: {
    margin: 10
  }
})
