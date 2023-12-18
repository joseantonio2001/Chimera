import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import StyledText from '../StyledText';
import StyledTextInput from '../StyledTextInput';
import axios from 'axios';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const useHost = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5050/inventario';
  } else {
    return 'http://localhost:5050/inventario';
  }
};

const CrearItem = () => {

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (enlace) => {
    navigate(enlace);
  };

  const handleCreateElementoInventario = async () => {

    // Peticiones para convertir a blob
    const file = await fetch(img.assets[0].uri);
    const theBlob = await file.blob();

    // Convertir a blob para que reconozca como archivo
    const formData = new FormData();
    const filename = img.assets[0].uri.split('/').pop();
    formData.append('nombre', nombre);
    formData.append('cantidad', parseInt(cantidad));
    formData.append('file', theBlob, filename);

    axios.post(`${useHost('inventario')}/crearElemento`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        // Maneja la respuesta exitosa
        navigate('/confirmaciones', { state: { mensaje: 'Elemento creado con éxito!' } });
      })
      .catch((error) => {
        // Maneja los errores
        console.error("Error al crear item: ", error);
        navigate('/confirmaciones', { state: { mensaje: 'Error en la creación del elemento', error } });
      });
  };

  const pickImage = async () => {
    const options = {
      mediaType: ImagePicker.MediaTypeOptions.Images,
    };
    const response = await ImagePicker.launchImageLibraryAsync(options);
    if (!response.cancelled) {
      setImg(response);
    }
  };

  return (
    <View>
      <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')} />
      <StyledText style={styles.titleText}>Crear un Nuevo Elemento de Inventario</StyledText>

      <StyledText style={styles.text}>Nombre del elemento:</StyledText>
      <StyledTextInput label="Nombre" value={nombre} onChangeText={text => setNombre(text)} />


      <StyledText style={styles.text}>Cantidad:</StyledText>
      <StyledTextInput
        label="Cantidad"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={(text) => setCantidad(text)}
      />

      {img && (
        <>
          <StyledText>Imagen subida</StyledText>
          <Image
            source={{ uri: img.assets[0].uri }}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </>
      )}
      <Pressable style={styles.pressableButton} onPress={pickImage}>
        <Text style={styles.pressableText}>Subir pictograma</Text>
      </Pressable>

      <View style={styles.button}>
        <Pressable style={styles.pressableButton} onPress={handleCreateElementoInventario}>
          <Text style={styles.pressableText}>Crear Elemento de Inventario</Text>
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

const styles = StyleSheet.create({
  image: {
    width: 600,
    height: 200,
    borderRadius: 4,
    alignSelf: 'center',
    paddingVertical: 10
  },
  text: {
    flex: 1,
    justifyContent: 'center', // Centra horizontalmente
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  titleText: {
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
  }, mensajeExito: {
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
});

export default CrearItem;

