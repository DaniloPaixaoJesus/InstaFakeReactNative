import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default class HeaderDrawerMenu extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.painelFoto}>
          <Image style={styles.fotoDoPerfil}
                source={require('../../resources/img/foto_login.jpg')} />
          <View style={styles.usuarioInfo}>
            <Text style={styles.texto}>Danilo de Jesus</Text>
          </View>
        </View>
      </View>
    );
  }
}
const margem = Platform.OS == 'ios' ? 40 : 0; 
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    marginTop: margem,
    marginBottom: 15,
    //alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 2,
    borderTopColor: '#ddd',
    borderTopWidth: 2
  },
  painelFoto: {
    alignItems: 'center',
    paddingTop: 20
    //flexDirection: 'row',
    //marginBottom: 20
  },
  fotoDoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'grey'
  },
  usuarioInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  posts: {
    marginRight: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000'
  },
  texto: {
    fontSize: 20
  },
  nomeDeUsuario: {
    fontWeight: 'bold',
    color: '#000'
  }
});
