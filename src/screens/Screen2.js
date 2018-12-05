import React, { Component } from 'react';
import { Text } from 'react-native';
import Container from '../components/Container';

class Screen2 extends Component {
  render() {
    return (
      <Container
        backgroundColor="#c95e0c"
        onPress={() => console.warn('event pressed Screen2')}
      />
    );
  }
}

export default Screen2;