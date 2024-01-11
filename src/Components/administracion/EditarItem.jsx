import React, { useEffect, useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocation, useNavigate } from 'react-router-native';
import StyledText from '../StyledText';
import StyledTextInput from '../StyledTextInput';
import axios from 'axios';

const useHost = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5050/inventario';
  } else {
    return 'http://localhost:5050/inventario';
  }
};

const EditaItem = () => {
  const navigate = useNavigate();

  const handleButtonClick = (enlace) => {
    navigate(enlace);
  };

  const { state } = useLocation();
  const id = state ? state.id : '';
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');

  const getDatosItem = () => {
    axios
      .get(`${useHost()}/${id}`)
      .then((response) => {
        const resultado = response.data[0];
        if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
          resultado.forEach((item) => {
            setNombre(item.nombre);
            setCantidad(item.cantidad);
          });
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud GET:', error);
      });
  };

  useEffect(() => {
    getDatosItem();
  }, []);

  const handleEditItem = () => {
    axios
      .put(`${useHost()}/actualizarElemento/${id}`, {
        nombre,
        cantidad,
      })
      .then((response) => {
        navigate('/confirmaciones', { state: { mensaje: '¡Material editado con éxito!' } });
      })
      .catch((error) => {
        navigate('/confirmaciones', { state: { mensaje: 'Error en la edición del material', error } });
      });
  };

  return (
    <View>
      <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')} />
      <StyledText style={styles.titleText}>Editar Alumno ID: {id}</StyledText>
      <StyledText style={styles.text}>Nombre y apellidos:</StyledText>
      <StyledTextInput label="Nombre" value={nombre} onChangeText={(text) => setNombre(text)} />
      <StyledTextInput label="Cantidad" value={cantidad} onChangeText={(text) => setCantidad(text)} />

      <View style={styles.button}>
        <Pressable style={styles.pressableButton} onPress={handleEditItem}>
          <Text style={styles.pressableText}>Editar material</Text>
        </Pressable>
      </View>

      <View style={styles.button}>
        <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/admin')}>
          <Text style={styles.pressableText}>Volver atrás</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles=StyleSheet.create({
    image:{
        width: 600,
        height: 200,
        borderRadius: 4,
        alignSelf: 'center',
        paddingVertical: 10
    },
    text:{
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    titleText:{
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    mensajeError: {
        fontSize: 16,
        color: 'red', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
    },mensajeExito: {
        fontSize: 16,
        color: 'black', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
    },
    pressableButton: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#049CDC',  // Un verde fresco, puedes cambiarlo según tus preferencias
        borderRadius: 10,
        elevation: 3, // Sombra para un efecto de elevación
        marginBottom: 15,
        marginTop: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',  // Un tono de gris oscuro, puedes ajustarlo según tus preferencias
        marginTop: 20,
        marginBottom: 10,
    },
    pressableText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', // Texto en negrita
        textAlign: 'center',
    },  
})

export default EditaItem;
