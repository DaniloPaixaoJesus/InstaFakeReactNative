import React, { Component } from 'react';
import { Text } from 'react-native';
import Container from '../components/Container';

class Home extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Edit', // for a textual button, provide the button title (label)
        id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        testID: 'e2e_rules' // optional, used to locate this view in end-to-end tests
      },
      {
        icon: require('../../resources/img/icon1_selected.png'), // for icon button, provide the local image asset name
        id: 'add' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      }
    ],
    leftButtons: [// buttons for the left side of the nav bar (optional)
      {
        icon: require('../../resources/img/icon1.png'),
        title: 'menu', // for a textual button, provide the button title (label)
        id: 'menu', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        testID: 'e2e_rules' // optional, used to locate this view in end-to-end tests
      },
    ]
  };

  constructor(props){
    super(props);
    // if you want to listen on navigator events, set this up
   this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  openDrawerMenu(){
    this.props.navigator.toggleDrawer({
      side: 'left',
      visible: true,
      to: 'open'
    });
  }

  closeDrawerMenu(){
    this.props.navigator.toggleDrawer({
      side: 'left',
      visible: true,
      to: 'closed'
    });
  }

  navToScreen(screen, title){
    this.props.navigator.push({
      screen: screen,
      title: title,
    });
  }
  onNavigatorEvent(event) {
    if (event.type == 'DeepLink') {
      const parts = event.link;
      if (parts == 'Screen2') {
        this.closeDrawerMenu();
        this.navToScreen('Screen2', 'Screen2');
      }
    }

    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'menu') {
        this.openDrawerMenu();
      }
      if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
        this.closeDrawerMenu();
        this.navToScreen('Screen2', 'Screen2');
      }
      if (event.id == 'add') {
        this.openDrawerMenu();
      }
    }

  }


  handlePress = () => {
    // console.warn('pressed Screen3');
    // this.props.navigator.push({
    //   screen: 'Screen2',
    //   title: 'Screen 2',
    // });
    this.props.navigator.toggleDrawer({
      side: 'left'
    });
  };

  render() {
    return (
      <Container
        backgroundColor="#666666"
        onPress={this.handlePress}
      />
    );
  }
}

export default Home;