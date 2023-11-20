import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import { useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-native';
import StyledMultiSelect from '../StyledMultiSelect';
import StyledText from '../StyledText';
import axios from 'axios';

const useHost = (campo) => {
  switch(campo){
      case 'estudiantes':
          if (Platform.OS === 'android') {
              return 'http://10.0.2.2:5050/estudiantes';
            } else {
              return 'http://localhost:5050/estudiantes';
            }
      case 'profesores':
          if (Platform.OS === 'android') {
              return 'http://10.0.2.2:5050/profesores';
            } else {
              return 'http://localhost:5050/profesores';
            }
      case 'clases':
          if (Platform.OS === 'android') {
              return 'http://10.0.2.2:5050/clases';
            } else {
              return 'http://localhost:5050/clases';
            }
  }
};

const EditarClase = () => {
  const navigate = useNavigate();

    const handleButtonClick = (enlace) => {

        navigate(enlace);
    };

  const { state } = useLocation();
  const claseId = state ? state.idClase : ''; 
  const [clase, setClase] = useState(null);
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudiantesClase, setEstudiantesClase] = useState([]);
  const [selectedEstudiantes, setSelectedEstudiantes] = useState([]);

  useEffect(() => {
    // Obtener información de la clase con el ID proporcionado
    axios.get(`${useHost('clases')}/${claseId}`)
      .then((response) => {
            console.log('Respuesta de la API para la clase:', response.data);

        setClase(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener información de la clase:', error);
      });

    // Obtener la lista de alumnos de la base de datos
    axios.get(`${useHost('estudiantes')}`)
      .then((response) => {
        setEstudiantes(response.data[0]); // Almacena la lista de estudiantes en el estado
      })
      .catch((error) => {
        console.error('Error al obtener la lista de estudiantes:', error);
      });
      // Obtener la lista de estudiatnes de esa clase
      axios.get(`${useHost('estudiantes')}/clases/${claseId}`)
      .then((response) => {
        setEstudiantesClase(response.data[0]);  
      })
      .catch((error) => {
        console.error('Error al obtener la lista de estudiantes de la clase:', error);
      });
  }, []);

  const handleAñadirAlumno = () => {

    if (clase && clase.length > 0 && clase[0].capacidad && selectedEstudiantes.length > clase[0].capacidad - estudiantesClase.length) {
      navigate('/confirmaciones', { state: { mensaje: 'No se han podido incluir los alumnos en el CrearAula, esta está demasiado llena' } });
    }
    axios.post(`${useHost('clases')}/aniadealumnos`,{
      claseId,
      estudiantes: selectedEstudiantes
    })
    .then((response) => {
      console.log('Respuesta del servidor:', response);
      // Maneja la respuesta exitosa
      navigate('/confirmaciones', { state: { mensaje: 'Alumnos añadidos con exito!' } });
    })
    .catch((error) => {
        // Maneja los errores
        navigate('/confirmaciones', { state: { mensaje: 'Error al añadir los alumnos al aula', error } });
    });
    };

    const handleQuitarAlumno = () => {
      if (selectedEstudiantes.length === 0) {
        navigate('/confirmaciones', { state: { mensaje: 'Selecciona estudiantes para quitar del aula.' } });
        return;
      }
  
      axios.post(`${useHost('clases')}/quitaralumnos`, {
        claseId,
        estudiantes: selectedEstudiantes
      })
        .then((response) => {
          console.log('Respuesta del servidor:', response);
          // Maneja la respuesta exitosa
          navigate('/confirmaciones', { state: { mensaje: 'Estudiantes quitados con éxito!' } });
        })
        .catch((error) => {
          // Maneja los errores
          navigate('/confirmaciones', { state: { mensaje: 'Error al quitar los estudiantes del aula', error } });
        });
    };
  

  const estudiantesDisponibles = estudiantes.filter((estudiante) => {
    // Filtrar estudiantes que no están en la clase
    return !estudiantesClase.some((e) => e.id === estudiante.id);
  });

  const handleSelectedEstudiantesChange = (selectedItems) => {
    setSelectedEstudiantes(selectedItems);
  };

  return (
    <View>
      <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')} />

      <StyledText style={styles.titleText}>Modificar un aula</StyledText>

      <StyledText style={styles.text}>Identificador del Aula: {claseId} </StyledText>
      
      <Text style={styles.text}>Estudiantes asignados:</Text>
      <StyledMultiSelect
        items={estudiantesClase.map((estudiante) => ({
          id: estudiante.id,
          name: `${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}`,
        }))}
        uniqueKey="id"
        onSelectedItemsChange={handleSelectedEstudiantesChange}
        selectedItems={selectedEstudiantes}
        selectText="Selecciona estudiantes a quitar"
        searchInputPlaceholderText="Buscar estudiantes..."
        hideSubmitButton
      />

    <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={handleQuitarAlumno}>
                    <Text style={styles.pressableText}>Quitar del aula</Text>
                </Pressable> 
            </View>
    <Text style={styles.text}>Estudiantes a añadir:</Text>
    <StyledMultiSelect
      items={estudiantesDisponibles.map((estudiante) => ({
        id: estudiante.id,
        name: `${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}`,
      }))}
      uniqueKey="id"
      onSelectedItemsChange={selectedItems => setSelectedEstudiantes(selectedItems)}
      selectedItems={selectedEstudiantes}
      selectText="Selecciona estudiantes"
      searchInputPlaceholderText="Buscar estudiantes..."
      hideSubmitButton
    />
      

      <View style={styles.button}>
          <Pressable style={styles.pressableButton} onPress={handleAñadirAlumno}>
              <Text style={styles.pressableText}>Añadir al aula</Text>
          </Pressable> 
       </View>
      <View style={styles.button}>
        <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/admin')}>
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
      backgroundColor: '#4CAF50',  // Un verde fresco, puedes cambiarlo según tus preferencias
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



export default EditarClase;
