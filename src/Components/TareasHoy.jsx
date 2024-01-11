import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-native';
import axios from 'axios';
import {modoVisualizacion} from "./Main";


const useHost = () =>{
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5050/';
  } else {
    return 'http://localhost:5050/';
  }
}

const useHostParam = (ruta) => {
  switch(ruta){
    case 'tareas':
      if (Platform.OS === 'android') {
        return 'http://10.0.2.2:5050/tareas';
      } else {
        return 'http://localhost:5050/tareas';
      }
    case 'uploads':
      if (Platform.OS === 'android') {
        return 'http://10.0.2.2:5050/uploads';
      } else {
        return 'http://localhost:5050/uploads';
      }
  }
   
  
};



const TareasHoy = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const alumnoId = state ? state.alumnoId : '';
  const tipoTarea = 1;
  const [tareasDeHoy, setTareasDeHoy] = useState([]);
  const [tareasPortada, setTareasPortada] = useState([]);
  const [portadas, setPortadas] = useState([]);

  const handleButtonClick = (enlace) => {
    navigate(enlace, { state: { alumnoId }});
  };

  const handleTareas = (ruta) => {
    // Lógica para redirigir a la página /tareasHoy
    navigate(ruta);
  };

  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const response = await axios.get(`${useHostParam('tareas')}/alumno/${alumnoId}/${tipoTarea}`);
        const tareasConPortadas = await Promise.all(
          response.data.map(async (tarea) => {
            try {
              const tareaPortadaResponse = await axios.get(`${useHostParam('uploads')}/id/${tarea.portada}`);
              return tareaPortadaResponse.data[0];
            } catch (error) {
              console.error(`Error al obtener la portada para la tarea ${tarea.id}:`, error.message);
              return tarea; // En caso de error, devolver la tarea sin la información de la portada
            }
          })
        );

        
        // Actualizar el estado con las tareas que incluyen la URL base64
        setTareasDeHoy(response.data);
        setTareasPortada(tareasConPortadas);
          
      } catch (error) {
        console.error('Error al obtener las tareas:', error.message);
      }
      
            
    };

  

    obtenerTareas();
  }, [alumnoId]);

 


  return (
    <View>
    <Image style={styles.image} source={require('../../data/img/LogoColegio.png')} />
        {(modoVisualizacion === '101' || modoVisualizacion === '010') && (
            <View>
                <Text style={styles.headerText}>Tareas de Hoy</Text>
                <Image
                style={styles.largeImage}
                source={require('../../data/img/PortadaTareasHoy.png')}
              />
            </View>
        )}
        {modoVisualizacion === '100' && (
            <View>
                <Text style={styles.headerText}>Tareas de Hoy</Text>
            </View>
        )}
        {modoVisualizacion === '001' && (
            <View>
                <Image
                style={styles.largeImage}
                source={require('../../data/img/PortadaTareasHoy.png')}
              />
            </View>
        )}

    <View style={styles.imagesContainer}>
      
      {tareasDeHoy.map((tarea, index) => (
        <View key={index} style={styles.imageContainer}>
            {(modoVisualizacion === '101' || modoVisualizacion === '010') && (
                <View>
                    <Text style={styles.imageTitle}>{tarea.nombre}</Text>
            <Pressable onPress={() => handleTareas(`/mostrarpasos/${tarea.id}`)}>
                <Image
                     source={{ uri: `${useHost()}${tareasPortada[index].ruta}` }}
                    style={styles.largeImage}
                  />
            </Pressable>
                </View>
            )}
            {modoVisualizacion === '100' && (
                <View>
                    <Pressable onPress={() => handleTareas(`/mostrarpasos/${tarea.id}`)}>
                    <Text style={styles.imageTitle}>{tarea.nombre}</Text>
            </Pressable>
                </View>
            )}
            {modoVisualizacion === '001' && (
                <View>
            <Pressable onPress={() => handleTareas(`/mostrarpasos/${tarea.id}`)}>
                <Image
                     source={{ uri: `${useHost()}${tareasPortada[index].ruta}` }}
                    style={styles.largeImage}
                  />
            </Pressable>
                </View>
            )}

        </View>
      ))}

      
    </View>
    <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/estudiante')}>
        <Text style={styles.pressableText}>Volver atrás</Text>
      </Pressable>
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
    welcomeText: {
        fontSize: 18,
        textAlign: 'left',
        color: '#333',
        marginLeft: 10,
        marginBottom: 10,
      },
    pressableText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', // Texto en negrita
        textAlign: 'center',
    },    

    imagesContainer: {
        flexDirection: 'row', // Hace que los elementos hijos se coloquen en una fila
        justifyContent: 'space-around', // Espaciado uniforme entre los elementos hijos
        alignItems: 'center', // Centra los elementos verticalmente
        marginTop: 20,
      },
    
      imageContainer: {
        alignItems: 'center',
      },
    
      imageTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5, // Ajustar según tus necesidades
      },
      largeImage: {
        width: 150, // Ajustar según tus necesidades
        height: 150, // Ajustar según tus necesidades
          alignSelf: 'center',
        borderRadius: 4,
        marginBottom: 10,
      },
    })

export default TareasHoy
