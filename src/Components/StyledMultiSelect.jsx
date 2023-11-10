import React from 'react';
import { View, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const styles = StyleSheet.create({
  container: {
    width: 500,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#999',
    borderWidth: 1,
    borderTopWidth: 0.2, // Elimina el borde superior
    borderBottomWidth: 0.2, // Elimina el borde inferior
    borderLeftWidth: 0.2, // Aplica borde en el lado izquierdo
    borderRightWidth: 0.2, // Aplica borde en el lado derecho
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  error: {
    borderColor: 'red',
  },
});

const StyledMultiSelect = ({ style = {}, error, ...props }) => {
  const containerStyle = [
    styles.container,
    style,
    error && styles.error,
  ];

  return (
    <View style={containerStyle}>
      <MultiSelect {...props} />
    </View>
  );
};

export default StyledMultiSelect;
