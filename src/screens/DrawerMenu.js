import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity

 } from 'react-native';
import Container from '../components/Container';
import HeaderDrawerMenu from '../components/HeaderDrawerMenu';


const menuItemsList = [
  {id: 1, title: 'Screen01'},
  {id: 2, title: 'Screen02'},
  {id: 3, title: 'Screen03'}
];
const width = Dimensions.get('screen').width;

class DrawerMenu extends Component {

  handlePress = () => {
    // this.props.navigator.resetTo({
    //   screen: 'Screen2', // unique ID registered with Navigation.registerScreen
    //   title: undefined, // navigation bar title of the pushed screen (optional)
    //   passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
    //   animated: true, // does the push have transition animation or does it happen immediately (optional)
    //   navigatorStyle: {} // override the navigator style for the pushed screen (optional)
    // });

    this.props.navigator.handleDeepLink({ id:'menu', link: 'Screen2' });
  };

  handlePressMethod(){
    this.props.navigator.handleDeepLink({ id:'menu', link: 'Screen2' });
  };

  navToProfile(){
    this.props.navigator.handleDeepLink({ id:'menu', link: 'Feed' });
  };

  render() {
    return (
      <ScrollView>
        <TouchableOpacity onPress={()=>{this.navToProfile()}} >
            <HeaderDrawerMenu />
        </TouchableOpacity>
        <FlatList 
          data={menuItemsList}
          keyExtractor={item => item.id}
          renderItem={ ({item}) => 
          <TouchableOpacity onPress={() => {this.handlePressMethod()}}
            style={styles.touchableConteiner}>
              <Text style={styles.textoMenu}>{item.title}</Text>
          </TouchableOpacity>
          }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  touchableConteiner: {
    margin: 0, 
    alignItems: 'flex-start'
  },
  textoMenu: {
    padding: 10, 
    width:width, 
    height:50
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

export default DrawerMenu;