import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, Image, TouchableOpacity, Platform} from 'react-native';
import axios from 'axios';
import {useNavigate, useLocation} from "react-router-native";



const useHost = () => {
  if (Platform.OS === 'android') {
  return 'http://10.0.2.2:5050';
  } else {
  return 'http://localhost:5050';
  }
};

const MostrarPasos = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState();

  const { state } = useLocation();

  const modoVisualizacion = 100;
  const  idEstudiante  = state ? state.id : '';
  const [pedido, setPedido] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [profesor, setProfesor] = useState([]);

  const navigate = useNavigate();

  const handleButtonClick = (enlace) => {
    eliminarElementos();
    navigate(enlace);
  };

  useEffect(() => {
    const obtenerNombresImagenes = async (ids) => {
      try {
        const response = await axios.post(`${useHost()}/obtener_imagenes`, {ids});
        return response.data;
      } catch (error) {
        console.error('Error al obtener nombres de imágenes:', error);
        return [];
      }
    };

    // Llamada al backend para obtener las imágenes basadas en los IDs
    const fetchData = async () => {
      try {
        const tareaResponse = await axios.get(`${useHost()}/pedido/${idEstudiante}`);
        const pedidoData = tareaResponse.data[0];
        setPedido(pedidoData);

        // Función auxiliar para manejar las llamadas asíncronas
        const obtenerElementos = async (pedido) => {
          const promesasElementos = pedido.map(async (elemento, index) => {
            const articuloResponse = await axios.get(`${useHost()}/inventario/${pedido[index].id_inventario}`);
            return articuloResponse.data[0];
          });

          return Promise.all(promesasElementos);
        };

  
        const elementos = await obtenerElementos(pedidoData);
        setMateriales(elementos);

        const idImagenes = elementos.flatMap(subarray => subarray.map(elemento => elemento.id_pictograma));
        const imagenesResponse = await obtenerNombresImagenes(idImagenes);

        setImages(imagenesResponse);

        const profesorResponse = await axios.get(`${useHost()}/clase/profesor/${pedidoData[0].id_clase}`);
        const profesorData = profesorResponse.data;
        setProfesor(profesorData);

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [idEstudiante]);

  const eliminarElementos = async () => {

      // Actualizar el inventario
      pedido.map(async (elemento, index) => {
        console.log('Dentro del bucle', index);

        const nuevoStock = materiales[index][0].cantidad - elemento.cantidad;
  
        await axios.put(`${useHost()}/inventario/actualizarElemento`, {
          id: elemento.id_inventario,
          nombre: materiales[index][0].nombre,
          cantidad: nuevoStock
        });
      });
  
      // Borrar el pedido 
      await axios.delete(`${useHost()}/pedido/${pedido[0].id_clase}`);
      
      // Obtener datos de tareas del estudiante
      const responseTareas = await axios.get(`${useHost()}/tareas/alumno/${idEstudiante}/3`);
      const tareas = responseTareas.data;
      console.log(tareas);
      console.log(tareas[0].id);
      // Borrar la tarea
      await axios.delete(`${useHost()}/tareas/borrarTarea/${tareas[0].id}`);
  
    
  };
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
      <Text style={styles.text} accessibilityLabel={`Pedido para la clase de ${profesor.nombre}, clase número: ${pedido[0].id_clase}`}>
        {`Pedido para la clase de ${profesor.nombre}, clase número: ${pedido[0].id_clase}`}
      </Text>
      <View>
        {materiales.slice(currentIndex, currentIndex + 1).map(elemento => (
          <View key={elemento.id}>
            <Image
              source={require(`../../../assets/${pedido[currentIndex].cantidad}.png`)}
              style={{ width: 200, height: 200 }}
              accessibilityLabel={`Imagen ${pedido[currentIndex].cantidad}`}
            />
            <Image
              source={{ uri: `${useHost()}/uploads/${images[currentIndex].url}` }}
              style={{ width: 200, height: 200 }}
              accessibilityLabel="Descripción de la imagen"
            />
          </View>
        ))}
      </View>

      <View style={styles.botonContainer}>
        {currentIndex >= 1 && (
          <TouchableOpacity onPress={onPrev} style={styles.boton} accessibilityLabel="Anterior">
            <Image
              source={require('../../../assets/anterior.png')}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
        )}
        {currentIndex < materiales.length - 1 ? (
          <TouchableOpacity onPress={onNext} style={styles.boton} accessibilityLabel="Siguiente">
            <Image
              source={require('../../../assets/siguiente.png')}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleButtonClick('/tareafinalizada')} style={styles.boton} accessibilityLabel="Finalizado">
            <Image
              source={require('../../../assets/finalizado.png')}
              style={{ width: 150, height: 150 }}
            />
          </TouchableOpacity>
        )}
      </View>
      {loading && <ActivityIndicator size="large" accessibilityLabel="Cargando datos" />}
    </View>
  );
};

const styles = {
  text: {
    justifyContent: 'center', // Centra horizontalmente
    fontSize: 20,
    fontWeight: '700',
},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
