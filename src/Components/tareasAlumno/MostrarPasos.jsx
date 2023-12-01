import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-native";

const MostrarPasos = () => {
  const [tarea, setTarea] = useState();
  const [pasos, setPasos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState();

  const modoVisualizacion = 100;
  const { id } = useParams();

  const navigate = useNavigate();

        const handleButtonClick = (enlace) => {

        navigate(enlace);
    };

  useEffect(() => {
    const obtenerNombresImagenes = async (ids) => {
      try {
        const response = await axios.post('http://localhost:5050/obtener_imagenes', {ids});
        return response.data;
      } catch (error) {
        console.error('Error al obtener nombres de imágenes:', error);
        return [];
      }
    };

    // Llamada al backend para obtener las imágenes basadas en los IDs
    const fetchData = async () => {
      try {
        const tareaResponse = await axios.get(`http://localhost:5050/tareas/${id}`);
        setTarea(tareaResponse.data[0][0]);
        const pasosResponse = await axios.get(`http://localhost:5050/pasos/${id}`);
        setPasos(pasosResponse.data[0]);
        const pasos = pasosResponse.data[0];

        const idImagenes = pasos.map((paso, index) => {
          return paso.id_imagen
        });
        const imagenesResponse = await obtenerNombresImagenes(idImagenes);

        setImages(imagenesResponse);

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const onNext = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const onPrev = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textoPaso}>{`Tarea: ${tarea.nombre}`}</Text>
      {modoVisualizacion === 100 && (
          <View>
            {pasos.slice(currentIndex, currentIndex + 1).map(paso => (
              <View key={paso.id}>
                <Text style={styles.textoPaso}>{`Paso ${paso.n_paso}: ${paso.descripcion}`}</Text>
              </View>
            ))}
          </View>
      )}
      {modoVisualizacion === 101 && (
          <View>
            {pasos.slice(currentIndex, currentIndex + 1).map(paso => (
              <View key={paso.id}>
                <Text style={styles.textoPaso}>{`Paso ${paso.n_paso}: ${paso.descripcion}`}</Text>
                <Image source={{uri: `http://localhost:5050/uploads/${images[paso.n_paso-1].url}`}} style={{ width: 200, height: 200 }} />
              </View>
            ))}
          </View>
      )}
      <View style={styles.botonContainer}>
        {currentIndex >= 1 && (
          <TouchableOpacity onPress={onPrev} style={styles.boton}>
            <Image
              source={require('../../../assets/anterior.png')}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
        )}
        {currentIndex < pasos.length - 1 ? (
          <TouchableOpacity onPress={onNext} style={styles.boton}>
            <Image
              source={require('../../../assets/siguiente.png')}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleButtonClick('/tareafinalizada')} style={styles.boton}>
            <Image
              source={require('../../../assets/finalizar.png')}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    textoPaso: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    botonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      width: 200
    },
    boton: {
      flex: 1,
      marginLeft: 10,
    },
    image: {
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    }
  };

export default MostrarPasos;
