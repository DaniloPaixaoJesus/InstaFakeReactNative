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

  render() {
    return (
      <FlatList style={styles.container}
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={ ({item}) => 
          <Post foto={item}/>
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
