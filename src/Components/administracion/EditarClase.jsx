import React, { useState, useEffect } from 'react'; // Añade 'useEffect'
import { Text, View, Button, StyleSheet, Image, FlatList } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useLocation } from 'react-router-native';
import axios from 'axios';
import StyledText from '../StyledText';
import StyledMultiSelect from '../StyledMultiSelect';

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
    axios.get(`http://localhost:5050/clases/${claseId}`)
      .then((response) => {
            console.log('Respuesta de la API para la clase:', response.data);

        setClase(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener información de la clase:', error);
      });

    // Obtener la lista de alumnos de la base de datos
    axios.get('http://localhost:5050/estudiantes')
      .then((response) => {
        setEstudiantes(response.data[0]); // Almacena la lista de estudiantes en el estado
      })
      .catch((error) => {
        console.error('Error al obtener la lista de estudiantes:', error);
      });
      // Obtener la lista de estudiatnes de esa clase
      axios.get(`http://localhost:5050/estudiantes/clases/${claseId}`)
      .then((response) => {
        setEstudiantesClase(response.data[0]);  
      })
      .catch((error) => {
        console.error('Error al obtener la lista de estudiantes de la clase:', error);
      });
  }, []);

  const handleAñadirAlumno = () => {

    if (clase && clase.length > 0 && clase[0].capacidad && selectedEstudiantes.length > clase[0].capacidad - estudiantesClase.length) {
      navigate('/confirmacioncrearusuario', { state: { mensaje: 'No se han podido incluir los alumnos en el CrearAula, esta está demasiado llena' } });
    }
    axios.post('http://localhost:5050/clases/aniadealumnos',{
      claseId,
      estudiantes: selectedEstudiantes
    })
    .then((response) => {
      console.log('Respuesta del servidor:', response);
      // Maneja la respuesta exitosa
      navigate('/confirmacioncrearusuario', { state: { mensaje: 'Alumnos añadidos con exito!' } });
    })
    .catch((error) => {
        // Maneja los errores
        navigate('/confirmacioncrearusuario', { state: { mensaje: 'Error al añadir los alumnos al aula', error } });
    });
    };

    const handleQuitarAlumno = () => {
      if (selectedEstudiantes.length === 0) {
        navigate('/confirmacioncrearusuario', { state: { mensaje: 'Selecciona estudiantes para quitar del aula.' } });
        return;
      }
  
      axios.post('http://localhost:5050/clases/quitaralumnos', {
        claseId,
        estudiantes: selectedEstudiantes
      })
        .then((response) => {
          console.log('Respuesta del servidor:', response);
          // Maneja la respuesta exitosa
          navigate('/confirmacioncrearusuario', { state: { mensaje: 'Alumnos quitados con éxito!' } });
        })
        .catch((error) => {
          // Maneja los errores
          navigate('/confirmacioncrearusuario', { state: { mensaje: 'Error al quitar los alumnos del aula', error } });
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
        <Button title="Quitar del aula" onPress={handleQuitarAlumno} />
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
          <Button title="Añadir al aula" onPress={handleAñadirAlumno} />
       </View>
      <View style={styles.button}>
        <Button title='Volver al menú de administración' onPress={() => handleButtonClick('/admin')} />
      </View>
   </View>


  )
}

const styles = StyleSheet.create({
  image: {
      width: 600,
      height: 200,
      borderRadius: 4,
      alignSelf: 'center',
      paddingVertical: 10
  },
  button: {
      width: 200,
      height: 40,
      justifyContent: 'center',
      alignSelf: 'center',
      paddingVertical: 10,
      marginBottom: 15,
      marginTop: 15
  },
  titleText: {
      flex: 1,
      justifyContent: 'center', // Centra horizontalmente
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '700',
      marginTop: 20,
      marginBottom: 20
  },
  text: {
      flex: 1,
      justifyContent: 'center', // Centra horizontalmente
      textAlign: 'center',
      fontSize: 15,
      marginTop: 10,
      marginBottom: 10,
      fontWeight: 'bold'
  }, mensajeError: {
      fontSize: 16,
      color: 'red', // Puedes cambiar el color a tu preferencia
      textAlign: 'center',
      marginTop: 10,
  }, mensajeExito: {
      fontSize: 16,
      color: 'black', // Puedes cambiar el color a tu preferencia
      textAlign: 'center',
      marginTop: 10,
  }

});



export default EditarClase;
