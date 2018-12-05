import React, { Component } from 'react';
import { Text } from 'react-native';
import Container from '../components/Container';

class Screen1 extends Component {

  handlePress = () => {
    // this.props.navigator.push({
    //   screen: 'Screen2',
    //   title: 'Screen 2',
    // });
    
    // this.props.navigator.setRoot({
    //   screen: 'Screen2',
    //   title: 'Screen 2',
    // });

    this.props.navigator.handleDeepLink({ id:'menu', link: 'Screen2' });
  };

  render() {
    return (
      <Container
        backgroundColor="#F44336"
        onPress={this.handlePress}
      />
    );
  }
}

export default Screen1;