import React, { useState, useEffect } from 'react'; // Añade 'useEffect'
import {Text, TouchableOpacity,View, Button, StyleSheet, Image, Platform, Pressable} from 'react-native'
import { useNavigate, useLocation } from 'react-router-native';
import StyledText from './StyledText';
import axios from 'axios';
import PorcentajeGrafico from './PorcentajeGráfico';


const StatsAlumno = ()=>{
    const navigate = useNavigate();
    const { state } = useLocation();
    const profesorId=state ? state.idProfesor : '';
    const alumno=state ? state.alumno : '';
    const idClase=state ? state.idClase: '';
    const [nombreProfe, setNombreProfe] = useState('');
    const [idProfe, setIdProfe] = useState('');
    const [apellido1Profe, setApellido1Profe] = useState('');
    const [apellido2Profe, setApellido2Profe] = useState('');
    const [numeroTareasHechas, setNumeroTareasHechas] = useState(0);
    const [numeroTareasPedientes, setNumeroTareasPendientes] = useState(0);
    const [numeroTareasTotal, setNumeroTareasTotal] = useState(0);
    const [tareasTodas, setTareasTodas] = useState([]);
    const [tareasHechas, setTareasHechas] = useState([]);
    const [tareasPendientes, setTareasPendientes] = useState([]);
    
    const handleButtonClick = (enlace, id) => {
        
        navigate(enlace, { state: { id:id }});
    };

    const useHost = () => {
        if (Platform.OS === 'android') {
        return 'http://10.0.2.2:5050';
        } else {
        return 'http://localhost:5050';
        }
    };

    const getTareasAlumno = async (idAlumno) => {
        getTareasPendientesAlumno(idAlumno);
        getTareasHechasAlumno(idAlumno);
        getTareasTodasAlumno(idAlumno);
    };

    const getTareasPendientesAlumno = async (idAlumno) => {
        try {
          const response = await axios.get(`${useHost()}/tareas/alumnoId/${idAlumno}`);
          const tareas = response.data;
          setTareasPendientes(tareas);
          setNumeroTareasPendientes(tareas.length);
        } catch (error) {
          console.error('Error al obtener tareas del alumno:', error);
        }
      };

      const getTareasHechasAlumno = async (idAlumno) => {
        try {
          const response = await axios.get(`${useHost()}/tareasFinalizadas/alumno/${idAlumno}`);
          const tareas = response.data[0];
          console.log('Tareas Hechas: ', tareas);
          setTareasHechas(tareas);
          setNumeroTareasHechas(tareas.length);
        } catch (error) {
          console.error('Error al obtener tareas del alumno:', error);
        }
      };

      const getTareasTodasAlumno = async (idAlumno) => {
        try {
          const response = await axios.get(`${useHost()}/tareasTodas/alumno/${idAlumno}`);
          const tareas = response.data[0];
          setTareasTodas(tareas);
          setNumeroTareasTotal(tareas.length);
        } catch (error) {
          console.error('Error al obtener tareas del alumno:', error);
        }
      };

    const getDatosProfe = () => {
        axios.get(`${useHost()}/profesores/${profesorId}`)
            .then((response) => {
                const resultado = response.data[0];
                if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
                    resultado.forEach((profe) => {
                        setIdProfe(profe.id);
                        setNombreProfe(profe.nombre);
                        setApellido1Profe(profe.apellido1);
                        setApellido2Profe(profe.apellido2);
                    });
                }
            })
            .catch((error) => {
                // Manejar los errores
                console.error('Error en la solicitud GET:', error);
            });
    };


    useEffect(() => {
        getDatosProfe();
        getTareasAlumno(alumno.id);
    }, [])
    
    

    return(
        <View>
            <Image style={styles.image} source={require('../../data/img/LogoColegio.png')}/>
            <View>
                <Text style={styles.titleText}>PROGRESO DE {alumno.nombre} {alumno.apellido1} {alumno.apellido2}  </Text>
                <Text style={styles.text}>{alumno.nombre} pertenece a la clase de {nombreProfe} {apellido1Profe} {apellido2Profe} (ID Profesor {idProfe}, ID Clase {idClase}).</Text>
                <Text style={styles.text}>El alumno ha realizado {numeroTareasHechas} tarea(s) hasta ahora. </Text>
                <Text style={styles.text}>
                    Tareas pendientes: {tareasPendientes.length > 0 ? tareasPendientes.map((tarea) => tarea.nombre).join(', ') : 'NINGUNA'}.
                </Text>
                <Text style={styles.text}>
                    Tareas hechas: {tareasHechas.length > 0 ? tareasHechas.map((tarea) => tarea.nombre).join(', ') : 'NINGUNA'}
                </Text>
                <Text style={styles.titleText}> RESUMEN: </Text>
                <Text style={styles.text}> El alumno ha realizado {numeroTareasHechas} de {numeroTareasTotal} tareas totales que se le han asignado:</Text>
                <View style={styles.container}>
                    <PorcentajeGrafico porcentaje={((numeroTareasHechas/numeroTareasTotal)*100)} />
                </View>
            </View>
            
            <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/claseprofesor', profesorId)}>
                <Text style={styles.pressableText}>Volver a inicio</Text>
            </Pressable>
        </View>
        
    )
}
const styles=StyleSheet.create({
    image:{
        width: 600,
        height: 200,
        borderRadius: 4,
        alignSelf: 'center',
        paddingVertical: 10,
        marginBottom: 50
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
    titleText: {
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 20,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 10,
        color: 'black'
    },
    text: {
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'left', 
        marginLeft: 20,
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5,
        color: 'black'
    },
    pressableText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', // Texto en negrita
        textAlign: 'center',
    },
    view:{
        alignSelf: 'center'
    }, 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        width: 400,
        alignSelf: 'center'
      }
})



export default StatsAlumno