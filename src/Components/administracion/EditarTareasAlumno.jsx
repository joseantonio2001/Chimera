import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import { useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import StyledText from '../StyledText';
import StyledTextInput from '../StyledTextInput';
import axios from 'axios';
import dayjs from 'dayjs';
import StyledMultiSelect from '../StyledMultiSelect';

const useHost = () => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5050';
    } else {
      return 'http://localhost:5050';
    }
};

const EditarTareasAlumno = ()=>{
    const navigate = useNavigate();
    
    const handleButtonClick = (enlace, id,) => {
        navigate(enlace, { state: { id:id }});
    };


    const { state } = useLocation();
    const idAlumno = state ? state.idAlumno : '';
    const nombreAlumno= state ? state.nombreAlumno : '';
    const apellido1Alumno= state ? state.apellido1Alumno : '';
    const apellido2Alumno= state ? state.apellido2Alumno : '';
    const idProfesor = state ? state.idProfesor : '';
    const [tareas, setTareas] = useState([]);
    const [tareasAlumno, setTareasAlumno] = useState([]);
    const [selectedTareas, setSelectedTareas] = useState([]);


    const getTareasAlumno = async (idAlumno) => {
          axios.get(`${useHost()}/tareas/alumnoId/${idAlumno}`)
          .then((response) =>{
            setTareasAlumno(response.data); // No asumas que es un array          
            }) 
        .catch ((error) => {
          console.error('Error al obtener tareas del alumno:', error);
        });
      }

    
    const getTareas = async () =>{
        axios.get(`${useHost()}/tareas`)
      .then((response) => {
        setTareas(response.data[0]); // Almacena la lista de estudiantes en el estado
        })
      .catch((error) => {
        console.error('Error al obtener la lista de tareas:', error);
      });
    }
    useEffect(() => {
        getTareasAlumno(idAlumno);
        getTareas();
    }, [])

    const handleQuitarTarea = () =>{
            if (selectedTareas.length === 0) {
              navigate('/confirmaciones', { state: { mensaje: 'Selecciona estudiantes para quitar del aula.' ,  path: '/claseprofesor', id: idProfesor } });
              return;
            }
        
            axios.post(`${useHost()}/tareas/quitarasignaciones`, {
              idAlumno,
              tareas: selectedTareas
            })
              .then((response) => {
                // Maneja la respuesta exitosa
                navigate('/confirmaciones', { state: { mensaje: 'Tareas quitadas al estudiante con éxito!',  path: '/claseprofesor', id: idProfesor }} );
              })
              .catch((error) => {
                // Maneja los errores
                navigate('/confirmaciones', { state: { mensaje: 'Error al quitar las tareas al estudiante', error,  path: '/claseprofesor', id: idProfesor } } );
              });
    };
    const handleAñadirTarea = () =>{
        if (selectedTareas.length === 0) {
            navigate('/confirmaciones', { state: { mensaje: 'Selecciona tareas para añadir al estudiante.', path: '/claseprofesor', id: idProfesor } });
            return;
          }
      
          axios.post(`${useHost()}/tareas/aniadeasignaciones`, {
            idAlumno,
            tareas: selectedTareas
          })
            .then((response) => {
              // Maneja la respuesta exitosa
              navigate('/confirmaciones', { state: { mensaje: 'Tareas añadidas al estudiante con éxito!'  , path: '/claseprofesor', id: idProfesor }} );
            })
            .catch((error) => {
              // Maneja los errores
              navigate('/confirmaciones', { state: { mensaje: 'Error al añadir las tareas al estudiante', error,  path: '/claseprofesor', id: idProfesor } } );
            });
    }

    const handleSelectedTareasChange = (selectedItems) => {
        setSelectedTareas(selectedItems);
      };

      const tareasDisponibles = tareas.filter((tarea) => {
        // Filtrar estudiantes que no están en la clase
        return !tareasAlumno.some((e) => e.id === tarea.id);
      });

    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.titleText}>Editar las tareas del alumno {nombreAlumno} {apellido1Alumno} {apellido2Alumno} (ID: {idAlumno})</StyledText>

            <Text style={styles.text}>Tareas asignadas a {nombreAlumno} {apellido1Alumno} {apellido2Alumno}:</Text>
      <StyledMultiSelect
        items={tareasAlumno && Array.isArray(tareasAlumno)
            ? tareasAlumno.map((tarea) => ({
                id: tarea.id,
                name: tarea.nombre,
              }))
            : []
          }
        uniqueKey="id"
        onSelectedItemsChange={handleSelectedTareasChange}
        selectedItems={selectedTareas}
        selectText="Selecciona tareas a quitar"
        searchInputPlaceholderText="Buscar tareas..."
        hideSubmitButton
      />
    <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={handleQuitarTarea}>
                    <Text style={styles.pressableText}>Quitar tarea</Text>
                </Pressable> 
    </View>

    <Text style={styles.text}>Otras tareas:</Text>
    <StyledMultiSelect
      items={tareasDisponibles.map((tarea) => ({
        id: tarea.id,
        name: tarea.nombre,
      }))}
      uniqueKey="id"
      onSelectedItemsChange={handleSelectedTareasChange}
      selectedItems={selectedTareas}
      selectText="Selecciona tareas a añadir"
      searchInputPlaceholderText="Buscar tareas..."
      hideSubmitButton
    />
      

      <View style={styles.button}>
          <Pressable style={styles.pressableButton} onPress={handleAñadirTarea}>
              <Text style={styles.pressableText}>Añadir tarea</Text>
          </Pressable> 
       </View>

            <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/claseprofesor', idProfesor)}>
                    <Text style={styles.pressableText}>Volver atrás</Text>
                </Pressable> 
            </View>
            
        </View>
        
    )
}


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

export default EditarTareasAlumno