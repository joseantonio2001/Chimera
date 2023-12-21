import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native'
import { useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-native';
import axios from 'axios';


const useHost = (campo) => {
    switch(campo){
        case 'estudiantes':
            if (Platform.OS === 'android') {
                return 'http://10.0.2.2:5050/estudiantes';
              } else {
                return 'http://localhost:5050/estudiantes';
              }
        case 'tareas':
          if (Platform.OS === 'android') {
            return 'http://10.0.2.2:5050/tareas';
          } else {
            return 'http://localhost:5050/tareas';
          }
       
    }
  };
  

const Alumno = ()=>{
    const navigate = useNavigate();

    const { state } = useLocation();
    const alumnoId = state ? state.id : ''; 
    const [estudiante, setEstudiante] = useState(null);
    const [tieneTareasDeHoy, setTieneTareasDeHoy] = useState(false);
    const [tieneComandas, setTieneComandas] = useState(false);
    const [tienePedidoMaterial, setTienePedidoMaterial] = useState(false);

    const handleButtonClick = (enlace) => {
      navigate(enlace);
    };

    const handleTareas = (ruta) => {
      // Lógica para redirigir a la página /tareasHoy
      navigate(ruta, { state: { id: alumnoId }});
    };

    const handleEnlace = (enlace, id) => {
        
      navigate(enlace, { state: { id:id }});
  };
  

    useEffect(() => {
        const obtenerInformacionEstudiante = async () => {
          try {
            const response = await axios.get(`${useHost('estudiantes')}/${alumnoId}`);
            const primerEstudiante = response.data[0][0];
            setEstudiante(primerEstudiante);
          } catch (error) {
            console.error('Error al obtener información del estudiante:', error);
          }
        };


        const obtenerTareas = async () => {
          try {
            const response = await axios.get(`${useHost('tareas')}/alumno/${alumnoId}`);
            setTieneTareasDeHoy(verificarTipoDeTareas(response.data, 1));
            setTieneComandas(verificarTipoDeTareas(response.data, 2));
            setTienePedidoMaterial(verificarTipoDeTareas(response.data, 3));
          } catch (error) {
            console.error('Error al obtener las tareas:', error.message);
          }
        };

        
    
        // Llamar a la función para obtener información del estudiante
        obtenerInformacionEstudiante();
        obtenerTareas();
      }, [alumnoId]); // Agregar alumnoId como dependencia para que se vuelva a ejecutar si cambia
    
      
    
      // Verificar si la información del estudiante está disponible antes de renderizar
      if (!estudiante) {
        return null; // O algún indicador de carga mientras se obtiene la información
      }

      
      return (
        <View>
          <Image style={styles.image} source={require('../../data/img/LogoColegio.png')} />
          <Text style={styles.headerText}>Lista De Tareas</Text>
          {estudiante.nombre && (
            <Text style={styles.welcomeText}>
              Bienvenido de nuevo, {estudiante.nombre}
            </Text>
          )}

      <View style={styles.imagesContainer}>
        {tieneTareasDeHoy && (
          <Pressable
            onPress={() => handleTareas('/tareasHoy')}
            accessibilityLabel="Tareas de Hoy. Haz clic para ver más detalles."
          >
            <View style={styles.imageContainer}>
              <Text style={styles.imageTitle}>Tareas de Hoy</Text>
              <Image
                style={styles.largeImage}
                source={require('../../data/img/PortadaTareasHoy.png')}
              />
            </View>
          </Pressable>
        )}

        {tieneComandas && (
          <Pressable
            onPress={() => {
              /* Acción cuando se selecciona la imagen de Comandas */
            }}
            accessibilityLabel="Tareas de las comandas. Haz clic para ver más detalles."
          >
            <View style={styles.imageContainer}>
              <Text style={styles.imageTitle}>Comandas</Text>
              <Image
                style={styles.largeImage}
                source={require('../../data/img/PortadaComandas.png')}
              />
            </View>
          </Pressable>         
        )}

        {tienePedidoMaterial && (
          <Pressable
            onPress={() => handleEnlace(`/tareainventario`, alumnoId)}
            accessibilityLabel="Pedido del Material. Haz clic para ver más detalles."
          >
            <View style={styles.imageContainer}>
              <Text style={styles.imageTitle}>Pedido del Material</Text>
              <Image
                style={styles.largeImage}
                source={require('../../data/img/PortadaMaterial.png')}
              />
            </View>
          </Pressable>
        )}
      </View>

      {/* Mostrar la imagen de Libre.png si no hay tareas disponibles */}
      {!tieneTareasDeHoy && !tieneComandas && !tienePedidoMaterial && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageTitle}>No hay tareas disponibles</Text>
          <Image style={styles.largeImage} source={require('../../data/img/Libre.png')} />
        </View>
      )}


          <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/')}>
            <Text style={styles.pressableText}>Volver a inicio</Text>
          </Pressable>
        </View>
      );
    };

    const verificarTipoDeTareas = (tareas, tipo) => {
      // Utilizamos flat para aplanar el array de arrays
    const tareasAplanadas = tareas.flat();
    
    // Usamos some para verificar si al menos una tarea tiene el tipo dado
    return tareasAplanadas.some((tarea) => tarea.tipo === tipo);
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
        marginTop: 50,
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
        borderRadius: 4,
        marginBottom: 10,
      },
    })

export default Alumno