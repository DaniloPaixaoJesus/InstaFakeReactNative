import React, { Component } from 'react';
import { Text } from 'react-native';
import Container from '../components/Container';

class Home extends Component {

  constructor(props){
    super(props);
    // if you want to listen on navigator events, set this up
   this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    console.warn(`event onNavigatorEvent id=${event.id}`);
    console.warn(`event onNavigatorEvent type=${event.type}`);
    console.warn(`event onNavigatorEvent link=${event.link}`);
    
    if (event.type == 'DeepLink') {
      const parts = event.link;
      if (parts == 'Screen2') {
        this.props.navigator.toggleDrawer({
          side: 'left',
          visible: true,
          to: 'closed'
        });
        this.props.navigator.push({
            screen: 'Screen2',
            title: 'Screen 2',
          });
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