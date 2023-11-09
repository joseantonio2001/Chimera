import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class SquareButton extends Component {
  render() {
    const { title, onPress } = this.props;

    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(233, 252, 226, 0.5)', // Fondo translúcido
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  plus: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default SquareButton;