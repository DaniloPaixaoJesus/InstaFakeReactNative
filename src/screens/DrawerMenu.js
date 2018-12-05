import React, { Component } from 'react';
import { 
  View,
  Image,
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
  {id: 1, title: 'InstaFake', menuId:'menu', screen: 'Feed', icon: '', style: ''},
  {id: 2, title: 'Map', menuId:'menu', screen: 'MapScreen', icon: '', style: ''},
  {id: 3, title: 'GridView', menuId:'menu', screen: 'Screen2', icon: '', style: ''},
  {id: 4, title: 'ListView', menuId:'menu', screen: 'Screen2', icon: '', style: ''},
  {id: 5, title: 'Photo', menuId:'menu', screen: 'Screen2', icon: '', style: ''},
  {id: 6, title: 'Set up', menuId:'menu', screen: 'Screen2', icon: '', style: ''},
  {id: 7, title: 'Log out', menuId:'menu', screen: 'Screen2', icon: '', style: ''}
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

  navToLinkScreen(id, screen){//''
    this.props.navigator.handleDeepLink({ id:id, link:screen });
  };

  render() {
    return (
      <ScrollView style={styles.content} >
        <TouchableOpacity>
            <HeaderDrawerMenu />
        </TouchableOpacity>
        <FlatList 
          data={menuItemsList}
          keyExtractor={item => item.id}
          renderItem={ ({item}) => 
          <TouchableOpacity onPress={() => {this.navToLinkScreen(item.menuId, item.screen)}}
            style={styles.touchableConteiner}>
            <Image source={require('../../resources/img/icon1.png')} />
            <Text style={styles.textoMenu}>{item.title}</Text>
          </TouchableOpacity>
          }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content:{
    backgroundColor: '#F2F2F2'
  },
  touchableConteiner: {
    flexDirection: 'row',
    flex: 1,
    margin: 10, 
    alignItems: 'flex-start',
    justifyContent: 'flex-start' //,
    //borderBottomColor: '#ddd',
    //borderBottomWidth: 1
  },
  textoMenu: {
    fontSize: 18,
    color: '#000',
    paddingBottom: 2, 
    paddingLeft: 10, 
    width:width, 
    height:50
  }
})

export default DrawerMenu;