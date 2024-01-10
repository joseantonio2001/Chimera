import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, Image, TouchableOpacity, Button} from 'react-native';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-native";
import { modoVisualizacion } from '../Main';
import { Video, ResizeMode } from 'expo-av';
const MostrarPasos = () => {
  const [tarea, setTarea] = useState();
  const [pasos, setPasos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState();
  const [videoUrl, setVideoUrl] = useState();

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

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

    const obtenerVideo = async (id) => {
        try {
            console.log(id);
            const response = await axios.get(`http://localhost:5050/obtener_video/${id}`);
            console.log('Video obtenido:');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener video:', error);
            return [];
        }
    }

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
        const videoResponse = await obtenerVideo(tareaResponse.data[0][0].video);

        setImages(imagenesResponse);
        setVideoUrl(videoResponse);

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
      {modoVisualizacion === '100' && (
          <View>
            {pasos.slice(currentIndex, currentIndex + 1).map(paso => (
              <View key={paso.id}>
                <Text style={styles.textoPaso}>{`Paso ${paso.n_paso}: ${paso.descripcion}`}</Text>
              </View>
            ))}
          </View>
      )}
      {modoVisualizacion === '101' && (
          <View>
            {pasos.slice(currentIndex, currentIndex + 1).map(paso => (
              <View key={paso.id}>
                <Text style={styles.textoPaso}>{`Paso ${paso.n_paso}: ${paso.descripcion}`}</Text>
                <Image source={{uri: `http://localhost:5050/uploads/${images[paso.n_paso-1].url}`}} style={{ width: 200, height: 200 }} />
              </View>
            ))}
          </View>
      )}
      {modoVisualizacion === '010' && (
          <View>
            <Video
                style={styles.video}
                ref={video}
              source={{
                uri: `http://localhost:5050/videos/${videoUrl.url}`,
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
              <View style={styles.buttons}>
      <TouchableOpacity onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          } style={styles.botonPlay}>
          {status.isPlaying ? (
              <Image
          source={require('../../../assets/pausa.png')}
          style={{ width: 100, height: 100 }}
        />
          ) : (
              <Image
          source={require('../../../assets/play.png')}
          style={{ width: 100, height: 100 }}
        />
          )}

      </TouchableOpacity>
      </View>
          </View>
      )}
      <View style={styles.botonContainer}>
        {currentIndex >= 1 && modoVisualizacion !== '010' && (
          <TouchableOpacity onPress={onPrev} style={styles.boton}>
            <Image
              source={require('../../../assets/anterior.png')}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
        )}
        {currentIndex < pasos.length - 1 && modoVisualizacion !== '010' ? (
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
    video: {
      width: 1000,
      height: 600,
      alignItems: 'center',
    },
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
    botonPlay: {
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundVideo: {
      width: 600,
      height: 600,
    },
  };

export default MostrarPasos;
