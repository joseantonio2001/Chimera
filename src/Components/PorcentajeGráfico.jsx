import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const PorcentajeGrafico = ({ porcentaje }) => {
  // Asegúrate de que el porcentaje esté en el rango de 0 a 100
  const porcentajeValido = Math.max(0, Math.min(100, porcentaje));

  // Calcula el radio y el ángulo del arco según el porcentaje
  const radio = 50;
  const ángulo = (porcentajeValido / 100) * 360;

  // Calcula la longitud del arco (strokeDasharray) para el porcentaje dado
  const longitudArco = (2 * Math.PI * radio * ángulo) / 360;
  const longitudTotal = 2 * Math.PI * radio;
  const strokeDasharray = `${longitudArco}, ${longitudTotal}`;

  return (
    <View style={styles.container}>
      <Svg height="200" width="200" viewBox="-50 -50 200 200">
        {/* Círculo de fondo gris */}
        <Circle cx="50" cy="50" r={radio} fill="#e0e0e0" />
        {/* Arco coloreado que representa el porcentaje */}
        <Circle
          cx="50"
          cy="50"
          r={radio}
          fill="transparent"
          stroke="#3498db"
          strokeWidth="10"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round" // Añadir esta propiedad para redondear los extremos del arco
          transform="rotate(-90 50 50)" // Girar el arco para que comience desde la parte superior
        />
      </Svg>
      <Text style={styles.porcentajeTexto}>Tareas completadas: {`${porcentajeValido}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  porcentajeTexto: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
});

export default PorcentajeGrafico;
