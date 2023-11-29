import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import { useEffect, useState } from 'react'; // Añade 'useEffect'
import { Picker } from '@react-native-picker/picker';
import StyledMultiSelect from '../StyledMultiSelect';
import StyledText from '../StyledText';
import StyledTextInput from '../StyledTextInput';
import axios from 'axios';
import { useNavigate } from 'react-router-native';

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


const CrearAula = () => {
    const navigate = useNavigate();

    const handleButtonClick = (enlace) => {

        navigate(enlace);
    };

    const [capacidad, setCapacidad] = useState('');
    const [profesores, setProfesores] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState('');
    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedEstudiantes, setSelectedEstudiantes] = useState([]);


    useEffect( () => {
        // Realiza una solicitud GET al servidor para obtener la lista de profesores
        axios.get(`${useHost('profesores')}`)
            .then((response) => {
                setProfesores(response.data[0]); // Almacena la lista de profesores en el estado
            })
            .catch((error) => {
                console.error('Error al obtener la lista de profesores: ' + error);
            });
        axios.get(`${useHost('estudiantes')}`)
            .then((response) => {
                setEstudiantes(response.data[0]); // Almacena la lista de estudiantes en el estado
            })
            .catch((error) => {
                console.error('Error al obtener la lista de estudiantes: ' + error);
            });
    }, []);

    const handleCreateAula = () => {
        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.post(`${useHost('clases')}/crearAula`, {
            capacidad,
            id_profesor: selectedProfesor,
            estudiantes: selectedEstudiantes
        })
            .then((response) => {
                // Maneja la respuesta exitosa
                navigate('/confirmaciones', { state: { mensaje: 'Clase creada con éxito!' } });
            })
            .catch((error) => {
                // Maneja los errores
                navigate('/confirmaciones', { state: { mensaje: 'Error en la creación del aula', error } });
            });

    };

    return (
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')} />
            <StyledText style={styles.titleText}>Crear una nueva aula</StyledText>

            <StyledText style={styles.text}>Capacidad del Aula:</StyledText>
            <StyledTextInput
                label="Capacidad"
                value={capacidad}
                onChangeText={text => setCapacidad(text)}
            />


            <StyledText style={styles.text}>Selecciona un Profesor:</StyledText>
            <Picker
                style={pickerStyles.picker}
                selectedValue={selectedProfesor}
                onValueChange={(itemValue, itemIndex) => setSelectedProfesor(itemValue)}
            >
                {profesores.map((profesor) => (
                    <Picker.Item
                        key={profesor.id}
                        label={`${profesor.nombre} ${profesor.apellido1} ${profesor.apellido2}`}
                        value={profesor.id}
                    />
                ))}
            </Picker>

            <Text style={styles.text}>Estudiantes:</Text>
            <StyledMultiSelect
                items={estudiantes.map(estudiante => ({ id: estudiante.id, name: `${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}` }))}
                uniqueKey="id"
                onSelectedItemsChange={selectedItems => setSelectedEstudiantes(selectedItems)}
                selectedItems={selectedEstudiantes}
                selectText="Selecciona estudiantes"
                searchInputPlaceholderText="Buscar estudiantes..."
                hideSubmitButton
            />



            <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={handleCreateAula}>
                    <Text style={styles.pressableText}>Crear clase</Text>
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

const pickerStyles = StyleSheet.create({
    picker: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#999',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 5,
        marginBottom: 5,
        width: 500,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});



export default CrearAula